<?php

namespace App\Http\Controllers\API;

use App\Models\JobApplication;
use App\Models\JobReadyCourse;
use App\Models\PetCompletionStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Exception;

class JobReadyCourseController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $jobReadyCourses = JobReadyCourse::paginate();
            return $this->sendResponse($jobReadyCourses, 'Job Ready Courses retrieved successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in retrieving jobs ready courses');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate(JobReadyCourse::$rules);
        try {
            // Check if the same course has already been added for this job id.

            $conditionRecord = JobReadyCourse::where('job_id', $request->input('job_id'))
                                                ->where('course_id', $request->input('course_id'))
                                                ->first();
            if($conditionRecord) {
                return $this->sendError('This course has already been added for this job!');
            }

            $jobReadyCourse = JobReadyCourse::create($request->all());
            return $this->sendResponse($jobReadyCourse, 'Job Ready Course Created Successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Failed to Create Job Ready Course', $e->getMessage());
        }
    }


    public function getCompletionTable(Request $request) {
        $jobId = $request->input('job_id');
        $completionStatus = DB::table('job_ready_courses')
            ->leftJoin('pet_completion_statuses', function ($join) use ($jobId) {
                $join->on('job_ready_courses.course_id', '=', 'pet_completion_statuses.course_id')
                    ->whereIn('pet_completion_statuses.user_id', function ($query) use ($jobId) {
                        $query->select('user_id')
                            ->from('job_applications')
                            ->where('job_id', $jobId);
                    });
            })
            ->select('job_ready_courses.course_id', 'job_ready_courses.course_name', 'pet_completion_statuses.user_id', 'pet_completion_statuses.email')
            ->orderBy('course_name')
            ->get();

        $courses = JobReadyCourse::where('job_id', $jobId)->get();
        $users = JobApplication::with('user')->where('job_id', $jobId)->where('shortlisted', '2')->get();
        $matrix[0][0] = ''; 

        $col = 1;
        foreach($courses as $course) {
            $matrix[0][$col] = $course->course_name;
            $col++;
        }

        $row = 1;
        foreach($users as $user) {
            $matrix[$row][0] = $user->user;
            $col = 1;
            foreach($courses as $course) {
                $matrix[$row][$col] = $this->hasCompleted($user->user_id, $course->course_id);
                $col++;
            }
            $row++;
        }

        return $this->sendResponse($matrix, 'Job Ready Course Completion status retrieved successfully.');
    }

    private function hasCompleted($user_id, $course_id) {
        return PetCompletionStatus::where('user_id', $user_id)->where('course_id', $course_id)->count();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $jobReadyCourse = JobReadyCourse::where('job_id', $request->input('job_id'))
                            ->where('course_id', $request->input('course_id'))->first();

        if ($jobReadyCourse != null) {
            $result = $jobReadyCourse->delete();

            if ($result) {
                return $this->sendResponse($jobReadyCourse, 'Job ready course deleted successfully!');
            } else {
                return $this->sendError($jobReadyCourse, 'Job ready course failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this Job ID and Course ID');
        }
    }
}
