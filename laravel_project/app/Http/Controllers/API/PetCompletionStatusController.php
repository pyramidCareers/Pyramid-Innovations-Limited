<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\JobApplication;
use App\Models\PetCompletionStatus;
use App\Models\User;
use App\Services\JobApplicationService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use stdClass;

class PetCompletionStatusController extends BaseController
{
    public function updatePetStatus(Request $request)
    {


        try {
            request()->validate(PetCompletionStatus::$rules);
            $moodleUserId = $request->input('moodle_user_id');
            $courseId = $request->input('course_id');

            $user = User::where('moodle_userid', $moodleUserId)->first();

            if (!$user) {
                return $this->sendError('Error in update PET status, User not found!');
            }

            $petStatus = PetCompletionStatus::where('user_id', $user->id)
                ->where('course_id', $courseId)
                ->first();

            if ($petStatus) {
                return $this->sendError('Error in update job application PET completion  status. Already exists!');
            }

            $petCompletionData = [
                'user_id' => $user->id,
                'moodle_user_id' => $moodleUserId,
                'course_id' => $courseId,
                'email' => $user->email,
                'time_completed' => Carbon::now(),
                'status' => 1,
            ];
            $record = PetCompletionStatus::create($petCompletionData);

            // Creating a object of Job Application Service Class
            $jobApplicationService = new JobApplicationService();

            // Getting all job id's applied by the user
            $jobIds = JobApplication::where('user_id', $user->id)->get();

            // Iterating each job id
            foreach ($jobIds as $jobId) {
                $jobApplicationService->updateSingleApplicationStatusInfo($user->id, $jobId->job_id);
            }

            return $this->sendResponse($record, 'PET Completion status udpated successfully.');
            // dd($user);

        } catch (Exception $e) {
            return $this->sendError('Error in update PET status.' . $e);

        }

    }

    public function getCompletionStatus(Request $request)
    {
        try {
            $userId = $request->input('user_id');
            $jobId = $request->input('job_id');

            $result = DB::table('job_apply_conditions as jac')
                ->leftJoin('pet_completion_statuses as pcs', function ($join) use ($userId) {
                    $join->on('pcs.course_id', '=', 'jac.condition_value')
                        ->where('pcs.user_id', '=', $userId);
                })
                ->leftJoin('payment_completion_statuses as paycs', function ($join) use ($userId) {
                    $join->on('paycs.job_id', '=', 'jac.job_id')
                        ->where('jac.condition_type', '=', 'application_fee')
                        ->where('paycs.user_id', '=', $userId);
                })
                ->where('jac.job_id', '=', $jobId)
                ->select('jac.*', 'pcs.status as pet_status', 'paycs.status as payment_status')
                ->get();
            // getCompletionStatus
            return $this->sendResponse($result, 'PET Completion status retrived successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error in retriving PET status.' . $e);
        }

    }

    public function getCompletedCourseByUserId(Request $request)
    {
        try {
            $CourseIds = PetCompletionStatus::where('user_id', $request->user_id)->pluck('course_id')->toArray();
            $field = 'ids';
            if (count($CourseIds) == 1) $field = 'id';

            $ids = implode(',', $CourseIds);
            $wstoken = User::find($request->user_id)->moodle_auth_token;
            $wsfunction = "core_course_get_courses_by_field";
            $moodlewsrestformat = "json";
            if (count($CourseIds)!=0) {
            $data = [
                'wstoken' => $wstoken,
                'wsfunction' => $wsfunction,
                'field' => $field,
                'value' => $ids,
                'moodlewsrestformat' => $moodlewsrestformat
            ];

            $res = json_decode($this->postRequest('/webservice/rest/server.php', $data));
            return $this->sendResponse($res, 'PET Completion Courses retrived successfully.');
            
            }
            return $this->sendResponse([], 'No data found');
        } catch (Exception $e) {
            return $this->sendResponse([], 'Error in retriving PET Courses');
        }
    }

}