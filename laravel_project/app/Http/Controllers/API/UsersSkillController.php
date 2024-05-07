<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\UsersSkill;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use Exception;

class UsersSkillController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $usersskill = UsersSkill::where('user_id', $id)->get();
        try {
            $allskills = [];
            foreach ($usersskill as $skill) {
                array_push($allskills, $skill);
            }
            return $this->sendResponse($allskills, 'Jobs retrieved successfully.');
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
            $userskill = new UsersSkill();
            $userskill->user_id = $id;
            $userskill->title = $request->title;
            $userskill->created_at = time();
            $userskill->updated_at = time();
            $userskill->save();

            return $this->sendResponse($userskill, 'User Skill created successfully.');
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
            $usersskill = UsersSkill::where('user_id', $userId)
                        ->where('id', $id)
                        ->first();

            $usersskill->update($request->all());
            return $this->sendResponse($usersskill, 'User Skill created successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in updating skills.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $userId, string $id)
    {
        $skill = UsersSkill::find($id);
        if ($skill != null) {
            $result = $skill->delete();

            if ($result) {
                return $this->sendResponse($skill, 'Data is deleted successfully!');
            } else {
                return $this->sendError($skill, 'Data failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this ID');
        }
    }

    /**
     * @param Request $request
     * @return mixed
     * Search Users Skill Based on Regex
     */
    public function searchSkill (Request $request)
    {
        $searchResult = UsersSkill::select('title')
            ->where('title', 'REGEXP', $request->data)
            ->distinct()
            ->pluck('title')
            ->toArray();

        return $searchResult;
    }
}
