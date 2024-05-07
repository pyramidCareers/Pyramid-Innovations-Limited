<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\JobSeeker;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\JobApplication;
use App\Http\Controllers\API\BaseController;
use App\Jobs\UpdateJobApplicationStatus;
use App\Models\Job;
use App\Services\JobApplicationService;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Services\JobApplicationFilter;
use Exception;

class JobApplicationController extends BaseController
{

    protected $JobApplicationfilter;
    public function __construct(JobApplicationFilter $filterService)
    {
        $this->JobApplicationfilter = $filterService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobapplications = JobApplication::all();
        return $this->sendResponse($jobapplications, 'JobApplications retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate(JobApplication::$rules);
        try {
            // Check if the user has already applied for this job.
            $applicationRecord = JobApplication::where('job_id', $request->input('job_id'))
                ->where('user_id', $request->input('user_id'))
                ->first();
            if ($applicationRecord) {
                return $this->sendError('User has already applied for this job!');
            }
            $jobapplicationCreated = JobApplication::create($request->all());
            return $this->sendResponse($jobapplicationCreated, 'JobApplication Created Successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to Create JobApplication', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $jobapplication = JobApplication::find($id);
            if (!$jobapplication) {
                return $this->sendError('JobApplication not found.', [], 404);
            }
            return $this->sendResponse($jobapplication, 'JobApplication retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('JobApplication not found', [], 404);
        }
    }

    /**
     * Display the specified resource.
     */
    public function showByJobId(string $jobid)
    {
        if ($jobid) {

            $job = Job::where('id', $jobid)->first();

            $jobApplications = JobApplication::with('user.jobSeeker')
                ->where('job_id', $jobid)
                ->paginate();

            $collection1 = collect($job);
            $collection2 = collect($jobApplications);

            $combinedResults = $collection1->merge($collection2);

            return $this->sendResponse($combinedResults, 'Job Application retrieved successfully.');
        } else {
            return $this->sendError('JobApplications not found', [], 404);
        }
    }

    // public function jobApplicationFilter(Request $request, string $jobId)
    // {
    //     try {
    //         $shortlisted = $request->input('shortlisted');
    //         $institution = $request->input('institution');
    //         $specialty = $request->input('specialty');
    //         $field_of_study = $request->input('field_of_study');
    //         $certificate_name = $request->input('certificate_name');
    //         $issuing_organization = $request->input('issuing_organization');


    //         $job = Job::where('id', $jobId)->first();
    //         // 'usersSkills', 'experiences', 'educations', 'certifications', 'extracurriculars'

    //         $jobApplications = JobApplication::with('user.jobSeeker')
    //             ->where(function ($query) use ($institution, $shortlisted, $specialty, $field_of_study, $certificate_name, $issuing_organization, ) {
    //                 if ($shortlisted) {
    //                     $query->where('shortlisted', '=', $shortlisted);
    //                 }
    //                 if ($institution) {
    //                     $query->whereHas('user.educations', function ($subquery) use ($institution) {
    //                         $subquery->where('institution', 'like', "%$institution%");
    //                     });
    //                 }
    //                 if ($specialty) {
    //                     $query->whereHas('user.jobSeeker', function ($subquery) use ($specialty) {
    //                         $subquery->where('speciality', 'like', "%$specialty%");
    //                     });
    //                 }
    //                 if ($field_of_study) {
    //                     $query->whereHas('user.jobSeeker', function ($subquery) use ($field_of_study) {
    //                         $subquery->where('field_of_study', 'like', "%$field_of_study%");
    //                     });
    //                 }
    //                 if ($certificate_name) {
    //                     $query->whereHas('user.certifications', function ($subquery) use ($certificate_name) {
    //                         $subquery->where('certificate_name', 'like', "%$certificate_name%");
    //                     });
    //                 }
    //                 if ($issuing_organization) {
    //                     $query->whereHas('user.certifications', function ($subquery) use ($issuing_organization) {
    //                         $subquery->where('issuing_organization', 'like', "%$issuing_organization%");
    //                     });
    //                 }
    //             })
    //             ->where('job_id', $jobId)
    //             ->paginate();

    //         $collection1 = collect($job);
    //         $collection2 = collect($jobApplications);

    //         $combinedResults = $collection1->merge($collection2);

    //         return $this->sendResponse($combinedResults, 'Job Application retrieved successfully.');
    //     } catch (Exception $e) {
    //         return $this->sendError('JobApplications not found' . $e, [], 404);
    //     }
    // }

    /**
     * Get the list of job applications by userid.
     */
    public function showByUserId($userId)
    {
        try {
            $jobApplications = JobApplication::with('job.companyinfo')
                ->where('user_id', $userId)
                ->paginate();
            return $this->sendResponse($jobApplications, 'Job Applications retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('JobApplications not found for this user', [], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $jobApplication = JobApplication::find($id);
        $jobApplication->update($request->all());

        if ($jobApplication) {
            return $this->sendResponse($jobApplication, 'JobApplication updated successfully.');
        } else {
            return $this->sendError('JobApplication not found', [], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jobapplication = JobApplication::find($id);
        if ($jobapplication != null) {
            $result = $jobapplication->delete();

            if ($result) {
                return $this->sendResponse($jobapplication, 'Data is deleted successfully!');
            } else {
                return $this->sendError($jobapplication, 'Data failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this ID');
        }
    }

    public function jobApplication_Filter(Request $request, $jobid)
    {

        try {
            $userIds = [];
            $UserData = [];
            $userIds = $this->JobApplicationfilter->jobApplication_Filter($request,$jobid);

            $job = Job::find($jobid);

            if ($userIds) {
                $UserData = JobApplication::with('user.jobSeeker')->whereIn('user_id', $userIds)->where('job_id', $jobid)->paginate();
            }

            $collection1 = collect($job);
            $collection2 = collect($UserData);
            $combinedResults = $collection1->merge($collection2);
            return $this->sendResponse($combinedResults, 'Job Applicationts retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('No data found with this ID. ' . $e);
        }
    }

    public function ExportFilteredUsers(Request $request)
    {
        $userIds = $this->JobApplicationfilter->jobApplication_Filter($request);
        return Excel::download(new UsersExport($userIds), 'ApplicantData.csv');
    }
    /**
     * This API updates the every job application statuses via an background task.
     *
     */
    public function unlockJobApplicationsByJobId($jobId)
    {
        try {
            UpdateJobApplicationStatus::dispatch($jobId);
            return $this->sendResponse($jobId, 'Job unlocked, you can add PET to this course!');
        } catch (Exception $e) {
            return $this->sendErrorr('There was an error while dispatching the job. Please try again. ' . $e->getMessage());
        }
    }
}