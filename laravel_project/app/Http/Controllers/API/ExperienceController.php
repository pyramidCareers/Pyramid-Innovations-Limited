<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\Experience;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use Exception;

class ExperienceController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $experiences = Experience::where('user_id', $id)->get();
        try {
            $allexperiences = [];
            foreach ($experiences as $experience) {
                array_push($allexperiences, $experience);
            }
            return $this->sendResponse($allexperiences, 'Jobs retrieved successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in retrieving jobs.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $id)
    {
        try {
            $experience = new Experience();
            $experience->user_id = $id;
            $experience->title = $request->title;
            $experience->started_at = $request->started_at;
            $experience->ended_at = $request->ended_at;
            $experience->organization = $request->organization;
            $experience->job_description = $request->job_description;
            $experience->save();

            return $this->sendResponse($experience, 'User Skill created successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in creating job.');
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
    public function update(Request $request, string $userId, string $id)
    { 
        try {
            $experience = Experience::where('user_id', $userId)
                        ->where('id', $id)
                        ->first();

            $experience->update($request->all());
            return $this->sendResponse($experience, 'Experience updated successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in updating experience.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $userId, string $id)
    {
        $experience = Experience::find($id);
        if ($experience != null) {
            $result = $experience->delete();

            if ($result) {
                return $this->sendResponse($experience, 'Data is deleted successfully!');
            } else {
                return $this->sendError($experience, 'Data failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this ID');
        }
    }
}
