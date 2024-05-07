<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\JobApplyCondition;
use Exception;
use Illuminate\Http\Request;

class JobApplyConditionController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jobApplyConditions = JobApplyCondition::paginate();
        return $this->sendResponse($jobApplyConditions, 'Job Apply Conditions retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate(JobApplyCondition::$rules);
        try {
            // Check if the same course has already been added for this job id.

            $conditionRecord = JobApplyCondition::where('job_id', $request->input('job_id'))
                                                ->where('condition_value', $request->input('condition_value'))
                                                ->first();
            if($conditionRecord) {
                return $this->sendError('This course has already been added for this job!');
            }

            $jobApplyCondition = JobApplyCondition::create($request->all());
            return $this->sendResponse($jobApplyCondition, 'Job Apply Condition Created Successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Failed to Create Job Apply Condition', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $jobApplyCondition = JobApplyCondition::find($id);
            if (!$jobApplyCondition) {
                return $this->sendError('Job Apply Condition not found.', [], 404);
            }
            return $this->sendResponse($jobApplyCondition, 'Job Apply Condition retrieved successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Job Apply Condition not found', [], 404);
        }
    }

    /**
     * Display the specified resource by jobId.
     */
    public function showByJobId(string $jobId)
    {
        try {
            $jobApplyCondition = JobApplyCondition::with('job')
                            ->where('job_id', $jobId)
                            ->paginate();
            return $this->sendResponse($jobApplyCondition, 'Job Apply Condition retrieved successfully.');
        } catch (Exception $e) {
                return $this->sendError('Job Apply Condition not found', [], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $jobApplyCondition = JobApplyCondition::find($id);
        $jobApplyCondition->update($request->all());

        if($jobApplyCondition){
            return $this->sendResponse($jobApplyCondition, 'Job Apply Condition updated successfully.');
        }
        else{
            return $this->sendError('Job Apply Condition not found', [], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $jobApplyCondition = JobApplyCondition::find($id);
        if ($jobApplyCondition != null) {
            $result = $jobApplyCondition->delete();

            if ($result) {
                return $this->sendResponse($jobApplyCondition, 'Data is deleted successfully!');
            } else {
                return $this->sendError($jobApplyCondition, 'Data failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this ID');
        }
    }

}
