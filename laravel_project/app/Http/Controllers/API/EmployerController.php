<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\Employer;
use App\Http\Controllers\API\BaseController;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\JobReadyProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Support\Facades\Auth;

class EmployerController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Employer::all();
        try {
            $employers = Employer::with('user')->paginate();
            return $this->sendResponse($employers, 'Employers retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve employers.', [], 500);
        }
    }

    /**
     * Search employers with keyword (Organization name)
     */
    public function search(string $keyword)
    {
        try {
            $filteredEmployer = Employer::with('user')
                            ->where('org_name', 'like', '%'.$keyword.'%')
                            ->paginate();

            return $this->sendResponse($filteredEmployer, 'Employers retrieved successfully.');

        } catch (Exception $e) {
            return $this->sendError('Error in retrieving Employers.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate(Employer::$rules);
        try{
        $employerCreated = Employer::create($request->all());

            if($employerCreated)
            {
                return $this->sendResponse($employerCreated, 'Employer created successfully.');
            }
        }
            catch (\Exception $e)
            {
                return $this->sendError($employerCreated, 'Error found.', 404);
            }
    }

    /**
     * Display the specified employer info with user data by user id.
     */
    public function show(string $userId)
    {
        try{
            $employer = Employer::with('user')
                        ->where('user_id', $userId)->first();

            if (!$employer) {
                return $this->sendError('Employer not found.', [], 404);
            }
            return $this->sendResponse($employer, 'Employer retrieved successfully.');
        }
        catch (\Exception $e) {
            return $this->sendError('Employer not found.', [], 404);
        }

    }

    /**
     * Update the specified employer by userid.
     */
    public function update(Request $request, string $userId)
    {
      try{
        $employer = Employer::where('user_id', $userId)->first();

        $employer->update($request->all());

        return $this->sendResponse($employer, 'Updated successfully.');
      }
      catch (\Exception $e) {
        return $this->sendError('Update failed.', [], 500);
      }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employer = Employer::find($id);
        if ($employer != null) {
            $result = $employer->delete();

            if ($result) {
                return $this->sendResponse($employer, 'Data is deleted successfully!');
            } else {
                return $this->sendError($employer, 'Data failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this ID');
        }
    }

    // Employer Logo CRUD
    public function updateEmployerLogo(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        $employer = Employer::findOrFail($id);

        // Handle the uploaded file
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');

            if ($employer->logo) {
                $filePath = 'public/' . basename($employer->logo);
                if (Storage::exists($filePath)) {
                    Storage::delete($filePath);
                }
            }

            $fileName = time() . '-logo-' .$employer->user_id .'-'. $id . '-'. $logo->getClientOriginalName();
            $logo->storeAs('public', $fileName);
            $employer->logo = $fileName;
            $employer->save();

            return $this->sendResponse($employer, 'Logo updated successfully.');
        }
        return $this->sendError('No Logo uploaded.', [], 400);
    }

    public function getEmployerLogo ($id)
    {
        $employer = Employer::findOrFail($id);
        if ($employer->logo) {
            return $this->sendResponse($employer->logo, 'Employer Logo Found.');
        }
        return $this->sendError('No Logo found.', [], 404);
    }

    public function deleteEmployerLogo($id)
    {
        $employer = Employer::findOrFail($id);

        if ($employer->logo) {
            $filePath = 'public/' . basename($employer->logo);
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }

            $employer->logo = null;
            $employer->save();

            return $this->sendResponse($employer, 'Logo deleted successfully.');
        }
        return $this->sendError('No Logo found.', [], 404);
    }

    /**
     * Update the specified employer by userid.
     */
    public function updateByUserId(Request $request, string $userId)
    {
        try {
            $employer = Employer::where('user_id', $userId)->first();

            // Check if the user is an admin user or employer is updating his own profile.
            if(!$employer || (Auth::user()->id !== $employer->user_id && Auth::user()->user_type !== 'admin')) {
                return $this->sendError('Unauthorized.', [], 403);
            }
            $employer->update($request->all());

            if ($request->hasFile('logo')) {
                $logo = $request->file('logo');
                $fileName = time() . '-logo-' . $userId . '-' . $employer->id . '-' . $logo->getClientOriginalName();
                $logo->storeAs('public', $fileName);
                $employer->logo = $fileName;
                $employer->save();
            }

            return $this->sendResponse($employer, 'Employer data updated successfully.');
        } catch (Exception $e) {
            return $this->sendError('Employer not found.', [], 404);
        }

    }

    /**
     * This function gets the number of
     * total posted job by the given user id
     */
    public function getTotalPostedJob(string $user_id) {
        return Job::where('employer_user_id', $user_id)->count();
    }

    /**
     * This method gets the total job applications
     * against those jobs which was posted by given employer id.
     */
    public function getTotalJobApplications(string $user_id) {
        return JobApplication::whereIn('job_id', function ($query) use ($user_id) {
                    $query->select('id')
                        ->from('jobs')
                        ->where('employer_user_id', $user_id);
                })->count();
    }

    /**
     * This method gets the total shortlisted user
     * against those jobs which was posted by given employer id.
     */
    public function getTotalShortListedUser(string $user_id) {
        return JobApplication::whereIn('job_id', function ($query) use ($user_id) {
                    $query->select('id')
                        ->from('jobs')
                        ->where('employer_user_id', $user_id);
                })->where('shortlisted', '>', 0)->count();
    }

    /**
     * This method gets the total Job Ready Programs
     * against those jobs which was posted by given employer id.
     */
    public function getTotalJobReadyPrograms(string $user_id) {
        return JobReadyProgram::whereIn('job_id', function ($query) use ($user_id) {
                    $query->select('id')
                        ->from('jobs')
                        ->where('employer_user_id', $user_id);
                })->count();
    }

    /**
     * This function gets the recently posted
     * published jobs by the given user id.
     */
    public function getRecentlyPostedPublishedJobs(string $user_id) {
        return Job::with('companyinfo')
                ->where('employer_user_id', $user_id)
                ->where('published', 1)
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();
    }

    /**
     * This function gets all the
     * important dashboard information
     * for the authenticated employer.
     */
    public function getDashBoardInfo() {
        // Getting the employer based on the Auth Id
        $employer = Employer::where('user_id', Auth::id())->first();

        // Validating employer exists or not
        if (!$employer) {
            return $this->sendError('Invalid employer credentials.', [], 404);
        }

        $data = [
            'total_posted_job' => $this->getTotalPostedJob($employer->user_id),
            'total_job_applications' => $this->getTotalJobApplications($employer->user_id),
            'total_shortlisted_users' => $this->getTotalShortListedUser($employer->user_id),
            'total_jobready_programs' => $this->getTotalJobReadyPrograms($employer->user_id),
            'recently_posted_published_jobs' => $this->getRecentlyPostedPublishedJobs($employer->user_id)
        ];
        return $this->sendResponse($data, 'Employer dashboard data retrived successfully.');
    }
}
