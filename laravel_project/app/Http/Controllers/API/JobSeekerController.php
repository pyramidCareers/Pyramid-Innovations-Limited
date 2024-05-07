<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Exports\UsersExport;
use App\Models\Certification;
use App\Models\Education;
use App\Models\JobSeeker;
use App\Http\Controllers\API\BaseController;
use App\Models\FavoriteJobs;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use App\Services\JobApplicationFilter;
use App\Services\SearchService;
use Illuminate\Database\Console\Migrations\ResetCommand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Exception;
use Illuminate\Support\Facades\Auth;

class JobSeekerController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    protected $search,$JobSeekfilter;

    public function __construct(SearchService $searchService,JobApplicationFilter $filter)
    {
        $this->search = $searchService;
        $this->JobSeekfilter = $filter;
    }

    public function index()
    {
        try {
            $jobseekers = JobSeeker::with('user')->paginate();
            return $this->sendResponse($jobseekers, 'Jobseekers retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve jobseekers. ', $e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate(JobSeeker::$rules);

        // Retrieve the uploaded file
        // $file = $request->file('resume');

        // Move the uploaded file to the desired directory (e.g., public/storage/uploads)
        // $filePath = $file->store('uploads', 'public');

        // Generate the file URL
        // $request->resume = asset('storage/' . $filePath);

        // Store the uploaded PDF
        // $pdfName = null;
        // if($request->file('resume')) {
        //     $resume = $request->file('resume');

        //     $pdfName = time() . '.' . $resume->getClientOriginalExtension();

        //     $resume->storeAs('public', $pdfName);
        //     $request->resume = $pdfName;
        // }

        $jobseekerCreated = JobSeeker::create($request->all());

        return $this->sendResponse($jobseekerCreated, 'Jobseeker created successfully.');

        // return JobSeeker::create([
        //     'user_id'               => $request->user_id,
        //     'jobseeking_status'     => $request->jobseeking_status,
        //     'expected_salary'       => $request->expected_salary,
        //     'currency'              => $request->currency,
        //     'current_notice_period' => $request->current_notice_period,
        //     'current_profession'    => $request->current_profession,
        //     'industry'              => $request->industry,
        //     'speciality'            => $request->speciality,
        //     'field_of_study'        => $request->field_of_study,
        //     'resume'                => $pdfName,
        // ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $jobseeker = User::with('jobSeeker', 'usersSkills', 'experiences', 'educations', 'certifications', 'extracurriculars')->find($id);

            if (!$jobseeker) {
                return $this->sendError($jobseeker, 'Jobseeker not found.', 404);
            }

            return $this->sendResponse($jobseeker, 'Jobseeker retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Jobseeker not found.', [], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $jobseeker = JobSeeker::findOrFail($id);

        $jobseeker->update($request->all());

        $pdfName = null;
        if ($request->hasFile('resume')) {

            $resume = $request->file('resume');

            $pdfName = time() . '-resume-' . $resume->getClientOriginalName();

            $resume->storeAs('public', $pdfName);
            $jobseeker->resume = $pdfName;
            $jobseeker->save();
        }

        return $this->sendResponse($jobseeker, 'Updated successfully.');
    }

    /**
     * Update the job seeker profile info with user id.
     */
    public function updateByUserId(Request $request, $userId)
    {
        // $jobseeker = JobSeeker::findOrFail($id);
        // Get job seekeer by user id.
        try {
            $jobseeker = JobSeeker::where('user_id', $userId)->first();

            $pdfName = null;
            if ($request->hasFile('resume')) {

                if ($jobseeker->resume) {
                    $filePath = 'public/' . basename($jobseeker->resume);
                    if (Storage::exists($filePath)) {
                        Storage::delete($filePath);
                    }
                }
                $jobseeker->update($request->all());

                $resume = $request->file('resume');
                $pdfName = time() . '-resume-' . $jobseeker->user_id . '-' . $jobseeker->id . '-' . $resume->getClientOriginalName();
                $resume->storeAs('public', $pdfName);
                $jobseeker->resume = $pdfName;
                $jobseeker->save();
            } else {
                $jobseeker->update($request->all());
            }
            return $this->sendResponse($jobseeker, 'Updated successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error in updating job seeker profile' . $e);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jobseeker = JobSeeker::destroy($id);
        if ($jobseeker) {
            return $this->sendResponse($jobseeker, 'Jobseeker deleted successfully.');
        } else {
            return $this->sendError('Jobseeker not found.', [], 404);
        }
    }

    /**
     * @param Request $request
     * @return mixed
     * Search Profession Based on Regex
     */
    public function searchProfession(Request $request)
    {
        return $this->search->Search($request, JobSeeker::class, "current_profession");
    }

    /**
     * @param Request $request
     * @return mixed
     * Search Industry Based on Regex
     */
    public function searchIndustry(Request $request)
    {
        return $this->search->Search($request, JobSeeker::class, "industry");

    }

    /**
     * @param Request $request
     * @return mixed
     * Search Speciality Based on Regex
     */
    public function searchSpeciality(Request $request)
    {
        return $this->search->Search($request, JobSeeker::class, "speciality");
    }
    public function searchFieldOfStudy(Request $request)
    {

        return $this->search->Search($request, JobSeeker::class, "field_of_study");
    }
    public function searchCertificate(Request $request)
    {
        return $this->search->Search($request, Certification::class, "certificate_name");
    }
    public function searchInstitution(Request $request)
    {

        return $this->search->Search($request, Education::class, "institution");
    }

    public function searchIssuingOrganization(Request $request)
    {

        return $this->search->Search($request, Certification::class, "issuing_organization");
    }

    public function FilterJobSeeker(Request $request)
    {

        $userIds = $this->JobSeekfilter->jobApplication_Filter($request);

        if ($userIds) {
            $UserData = User::with('jobSeeker')->whereIn('id', $userIds)->paginate();
            return $this->sendResponse($UserData, 'Jobseekers retrieved successfully.');
        }
        return $this->sendResponse([],'No Jobseekers found.');

    }

    public function ExportFilteredJobSeeker(Request $request)
    {

        $userIds = $this->JobSeekfilter->jobApplication_Filter($request);
        if ($userIds) {
            return Excel::download(new UsersExport($userIds), 'jobseekersList.xlsx');
        }
        return $this->sendError('No Jobseekers found.', [], 404);

    }

    /**
     * This function gets the number of total
     * applied jobs by the given user id.
     */
    public function getTotalAppliedJobCount(string $user_id) {
        return JobApplication::where('user_id', $user_id)->count();
    }

    /**
     * This function gets the number of total
     * favourite jobs by the given user id.
     */
    public function getTotalFavouriteJobCount(string $user_id) {
        return FavoriteJobs::where('user_id', $user_id)->count();
    }

    /**
     * This function gets all the recently
     * posted published jobs and limited to 10 entries.
     */
    public function getRecentlyPostedPublishedJobs() {
        return Job::with('companyinfo')
                ->where('published', 1)
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get();
    }

    /**
     * This function gets all the 
     * important dashboard information
     * for the authenticated job seeker.
     */
    public function getDashBoardInfo() {
        // Getting the job seeker based on the Auth Id
        $job_seeker = JobSeeker::where('user_id', Auth::id())->first();
        
        // Validating job seeker exists or not
        if (!$job_seeker) {
            return $this->sendError('Invalid job seeker credentials.', [], 404);
        }

        $data = [
            'total_applied_job' => $this->getTotalAppliedJobCount($job_seeker->user_id),
            'total_favourite_job' => $this->getTotalFavouriteJobCount($job_seeker->user_id),
            'recently_posted_published_jobs' => $this->getRecentlyPostedPublishedJobs()
        ];
        return $this->sendResponse($data, 'Job seeker dashboard data retrived successfully.');
    }
}