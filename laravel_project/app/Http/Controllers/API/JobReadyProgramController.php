<?php

namespace App\Http\Controllers\API;

use App\Models\JobApplication;
use App\Models\JobReadyProgram;
use Illuminate\Http\Request;
use Exception;

use function PHPUnit\Framework\isEmpty;

class JobReadyProgramController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $jobReadyPrograms = JobReadyProgram::paginate();
            return $this->sendResponse($jobReadyPrograms, 'Job Ready Programs retrieved successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in retrieving jobs ready programs');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate(JobReadyProgram::$rules);
        try {
            // Check if the same course has already been added for this job id.

            $conditionRecord = JobReadyProgram::where('job_id', $request->input('job_id'))->first();

            if($conditionRecord) {
                return $this->sendError('This job has already been added for job ready program!');
            }

            $jobReadyProgram = JobReadyProgram::create($request->all());
            return $this->sendResponse($jobReadyProgram, 'Job Ready Program Created Successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Failed to Create Job Ready Program', $e->getMessage());
        }
    }


    /**
     * This function returns this job has any job ready program or not.
     */
    public function hasJobReadyProgram(string $jobId) {
        try {
            $hasProgram = JobReadyProgram::where('job_id', $jobId)->count();
            
            if (!$hasProgram) {
                return $this->sendResponse($hasProgram, 'This job do not have any job ready program.');
            }            

            return $this->sendResponse($hasProgram, 'This job has job ready program.');
        } catch (Exception $e) {
            return $this->sendError('Job Apply Condition not found', [], 404);
        }
    }

    /**
     * This method adds shortlisted job 
     * applications to job ready program.
     */
    public function addToJobReadyProgram(Request $request) {
        $jobId = $request->input('job_id');
        try {
            JobApplication::where('job_id', $jobId)
                                ->where('shortlisted', '1')
                                ->update(['shortlisted' => '2']);
            JobReadyProgram::where('job_id', $jobId)->update(['published' => '1']);
                              
            return $this->sendResponse(null, 'Added to job ready program.');
        } catch (Exception $e) {
            return $this->sendError('Could not add to job ready program', [], 404);
        }
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
    public function destroy(string $id) {
        
        $jobReadyProgram = JobReadyProgram::where('job_id', $id)->first();

        if ($jobReadyProgram != null) {
            $result = $jobReadyProgram->delete();

            if ($result) {
                return $this->sendResponse($jobReadyProgram, 'Job ready program deleted successfully!');
            } else {
                return $this->sendError($jobReadyProgram, 'Job ready program failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this Job ID');
        }
    }
}
