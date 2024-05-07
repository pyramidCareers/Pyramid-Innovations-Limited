<?php

namespace App\Services;

use App\Models\JobApplication;
use App\Models\JobApplyCondition;
use Illuminate\Support\Facades\DB;

/**
 * This class contains helper methods
 * for Job Application Handling
 */
class JobApplicationService {

    /**
     * This function gets the completed job 
     * applications for a specific Job ID
     */
    public function getCompletedJobApplications($jobId) {
        $completedJobApplications = JobApplication::select('user_id')->where('job_id', $jobId)->where('status', 'completed')->get();
        return $completedJobApplications;
    }

    public function getAllUserApplicationInfo($jobId) {
        $completedJobApplications = $this->getCompletedJobApplications($jobId);

        $result = DB::table('job_apply_conditions as jac')
            ->leftJoin('pet_completion_statuses as pcs', function ($join) use ($completedJobApplications) {
                $join->on('pcs.course_id', '=', 'jac.condition_value')
                    ->where('jac.condition_type', '=', 'PET')
                    ->whereIn('pcs.user_id', $completedJobApplications);
            })
            ->leftJoin('payment_completion_statuses as paycs', function ($join) use ($completedJobApplications) {
                $join->on('paycs.job_id', '=', 'jac.job_id')
                    ->where('jac.condition_type', '=', 'application_fee')
                    ->whereIn('paycs.user_id', $completedJobApplications);
            })
            ->where('jac.job_id', $jobId)
            ->select('jac.*', 'pcs.status as pet_status', 'paycs.status as payment_status', 'pcs.user_id as pcs_user', 'paycs.user_id as paycs_user')
            ->get();

        return $result;
    }

    public function updateAllApplicationStatusInfo($jobId) {
        $completedJobApplications = $this->getCompletedJobApplications($jobId);
        
        $jobApplications = $this->getAllUserApplicationInfo($jobId);
        
        $count = JobApplyCondition::where('job_id', $jobId)->count();

        foreach($completedJobApplications as $completedJobApplication) {
            $completedUserId = $completedJobApplication->user_id;

            $userCount = 0;
            foreach ($jobApplications as $jobApplication) {
                if ($jobApplication->pcs_user == $completedUserId || $jobApplication->paycs_user == $completedUserId) {
                    $userCount++;
                }
            }

            if ($userCount != $count) {
                JobApplication::where('user_id', $completedUserId)->where('job_id', $jobId)->update(['status' => 'pending']);
            }
        }
    }

    /**
     * This method gets the count of completed
     * job conditions by the spefic user.
     */
    public function getConditionsCountCompletedByUser($userId, $jobId)
    {
        $result = DB::table('job_apply_conditions as jac')
            ->leftJoin('pet_completion_statuses as pcs', function ($join) use ($userId) {
                $join->on('pcs.course_id', '=', 'jac.condition_value')
                    ->where('jac.condition_type', '=', 'PET')
                    ->where('pcs.user_id', '=', $userId);
            })
            ->leftJoin('payment_completion_statuses as paycs', function ($join) use ($userId) {
                $join->on('paycs.job_id', '=', 'jac.job_id')
                    ->where('jac.condition_type', '=', 'application_fee')
                    ->where('paycs.user_id', '=', $userId);
            })
            ->where('jac.job_id', '=', $jobId)
            ->selectRaw('SUM(pcs.status IS NOT NULL) as pet_status_count')
            ->selectRaw('SUM(paycs.status IS NOT NULL) as payment_status_count')
            ->get();
                
        return $result;
    }

    /**
     * This method updates the status
     * of a job application for a specific
     * user who has completed all conditions
     * related to the specific job.
     * 
     * @param userId User ID
     * @param jobId Job ID
     */
    public function updateSingleApplicationStatusInfo($userId, $jobId) {
        // Getting count of all job conditions, completed by the user.
        $completedConditions = $this->getConditionsCountCompletedByUser($userId, $jobId);

        // Getting number of job conditions for this specific job. 
        $jobConditions = JobApplyCondition::where('job_id', $jobId)->count();

        // Counting number of conditions completed by user
        $totalCompletedConditions = (int) $completedConditions[0]->pet_status_count + (int) $completedConditions[0]->payment_status_count;

        // Checking whether the user meets all the conditions
        if ($totalCompletedConditions == $jobConditions) {
            // Updating the job application status
            JobApplication::where('user_id', $userId)->where('job_id', $jobId)->update(['status' => 'completed']);
        } 
    }
}