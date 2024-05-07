<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\PaymentCompletionStatus;
use App\Services\JobApplicationService;
use Exception;
use Illuminate\Http\Request;
use DB;

class PaymentCompletionStatusController extends BaseController
{
    public function updatePaymentStatus(Request $request)
    {
        try {
            request()->validate(PaymentCompletionStatus::$rules);
            $userId = $request->input('user_id');
            $jobId = $request->input('job_id');
            $paymentStatus = PaymentCompletionStatus::where('user_id', $userId)
                            ->where('job_id', $jobId)
                            ->first();
            if($paymentStatus) {
                return $this->sendError('Error in update job application payment completion  status. Already exists!');
            }
            $record = PaymentCompletionStatus::create($request->all());
            (new JobApplicationService())->updateSingleApplicationStatusInfo($userId, $jobId);
            return $this->sendResponse($record, 'Job application payment completion status udpated successfully.');

        } catch (Exception $e) {
            return $this->sendError('Error in update job application payment completion  status.' . $e);

        }

    }
    
}
