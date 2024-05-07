<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\Job;
use App\Http\Controllers\API\BaseController;
use App\Models\JobReadyProgram;
use Illuminate\Http\Request;
use Exception;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class JobController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id = null)
    {
        try {
            if($id) {
                $jobs = Job::with('employer', 'companyinfo')
                            ->where('employer_user_id', $id)
                            ->orderByDesc('updated_at')
                            ->paginate();
            } else {
                $jobs = Job::with('employer', 'companyinfo')
                            ->where('published', 1)
                            ->orderByDesc('updated_at')
                            ->paginate();
            }

            return $this->sendResponse($jobs, 'Jobs retrieved successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in retrieving jobs.');
        }
    }
    /**
     * Display the list of jobs by employer user id (Only published jobs) for career pages.
     * 
     * @param string $userid
     * 
     */
    public function showByEmployerUserId(string $userId)
    {
        try {
            $jobs = Job::with('employer', 'companyinfo')
                        ->where('employer_user_id', $userId)
                        ->where('published', 1)
                        ->orderByDesc('updated_at')
                        ->paginate();
            
            return $this->sendResponse($jobs, 'Jobs retrieved successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in retrieving jobs.');
        }
    }
    /**
     * Search jobs with titles, category, location, organization name.
     */
    public function search(Request $request)
    {
        $title = $request->input('title');
        $category = $request->input('category');
        $location = $request->input('location');
        $organizationName = $request->input('org_name');
        $jobType = $request->input('job_type');
        $experienceLevel = $request->input('experience_level');
        $experienceLowerLimit = $request->input('experience_lower_limit');
        $experienceUpperLimit = $request->input('experience_upper_limit');
        $industry = $request->input('industry');
        $datePosted = $request->input('date_posted');

        try {

            $filteredJobs = Job::with(['employer', 'companyinfo'])
                                ->where(function ($query)
                                    use ($title, $category, $location, $organizationName,
                                        $jobType, $experienceLevel, $experienceLowerLimit,
                                        $experienceUpperLimit, $industry, $datePosted) {
                                    $query->where('title', 'like', "%$title%")
                                        ->where('category', 'like', "%$category%")
                                        ->where('location', 'like', "%$location%");
                                    if ($jobType) {
                                        $query->where('job_type', 'like', "%$jobType%");
                                    }

                                    if ($experienceLevel) {
                                        $query->where('experience_level', 'like', "%$experienceLevel%");
                                    }

                                    if ($experienceUpperLimit) {
                                        $query->where('experience_upper_limit', '<=', $experienceUpperLimit);
                                    }

                                    if ($experienceLowerLimit) {
                                        $query->where('experience_lower_limit', '>=', $experienceLowerLimit);
                                    }
                                    if ($datePosted) {
                                        $query->where('created_at', '>=', $datePosted);
                                    }
                                    if ($organizationName) {
                                        $query->whereHas('companyinfo', function ($subquery) use ($organizationName) {
                                            $subquery->where('org_name', 'like', "%$organizationName%");
                                        });
                                    }
                                    if ($industry) {
                                        $query->whereHas('companyinfo', function ($subquery) use ($industry) {
                                            $subquery->where('industry', 'like', "%$industry%");
                                        });
                                    }
                                })
                                ->where('published', 1)
                                ->orderByDesc('updated_at')
                                ->paginate();
            return $this->sendResponse($filteredJobs, 'Jobs retrieved successfully.');

        } catch (Exception $e) {
            return $this->sendError('Error in retrieving jobs.'. $e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            request()->validate(Job::$rules);
            $loggedInUserId= Auth::user()->id;

            // Check if the employer user id is the same as logged in user.
            // Or if the logged in user is an admin.
            if($request->input('employer_user_id')  == $loggedInUserId || Auth::user()->user_type === 'admin') {
                $jobData = $request->all();
                $jobData['created_by'] = $loggedInUserId;
                $jobData['published'] = 0;

                $jobCreated = Job::create($jobData);
                return $this->sendResponse($jobCreated, 'Job created successfully.');
            } else {
                return $this->sendError('Unauthorized');
            }

        }
        catch (Exception $e) {
            return $this->sendError('Error in creating job.' . $e);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $job = Job::with('employer', 'companyinfo', 'jobApplyConditions')
                        ->where('id', $id)
                        ->first();
            if($job){
                return $this->sendResponse($job, 'Job retrieved successfully.');
            } else {
                return $this->sendError('Error in retrieving job');
            }
        }
        catch (Exception $e) {
            return $this->sendError('Error in retrieving job.');
        }

    }

    /**
     * Display the specified resource.
     */
    public function showByUserid(string $id, string $userid)
    {
        try {

            $job = Job::where('id', $id)
                    ->with('employer', 'companyinfo', 'ownJobApplication', 'jobApplyConditions', 'ownFavoriteJob', 'jobReadyPrograms', 'jobReadyCourses')
                    ->withCount('jobApplications')
                    ->first();

            if(!$job) {
                return $this->sendError('Error in retrieving job.');
                
            } 

            $job->status = $job->ownJobApplication ? 1 : 0;
            $job->is_favorite = $job->ownFavoriteJob ? 1 : 0;
            
            return $this->sendResponse($job, 'Job retrieved successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in retrieving job.');
        }

    }

    public function get_company_logo($logo)
    {
        if ($logo) {
            $filePath = 'public/' . $logo;
            if (Storage::exists($filePath)) {
                return asset(Storage::url($filePath));
            }
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $job = Job::find($id);

            // Check if the user is an admin user or employer is updating his own created jobs.
            if(!$job || (Auth::user()->id !== $job->employer_user_id && Auth::user()->user_type !== 'admin')) {
                return $this->sendError('Unauthorized.', [], 403);
            }
            $job->update($request->all());

            return $this->sendResponse($job, 'Job updated successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in updating job.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $job = Job::find($id);
        if ($job != null) {
            $result = $job->delete();

            if ($result) {
                return $this->sendResponse($job, 'Data is deleted successfully!');
            } else {
                return $this->sendError($job, 'Data failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this ID');
        }
    }
}
