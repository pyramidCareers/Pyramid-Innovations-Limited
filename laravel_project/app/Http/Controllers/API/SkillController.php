<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\Skill;
use App\Http\Controllers\API\BaseController;
use Exception;

class SkillController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $skill = Skill::all();
            return $this->sendResponse($skill, 'Skill retrieved successfully!');
        }
        catch (Exception $e) {
            return $this->sendError('Skill failed to retrieve!');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store (Request $request)
    {
        $skill = new Skill();
        $skill->title = $request->title;
        $skill->description = $request->description;
        $result = $skill->save();

        if ($result) {
            return $this->sendResponse($skill, 'Skill created successfully!');
        } else {
            return $this->sendError('Skill failed to create!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $skill = Skill::find($id);
        if($skill) {
            return $this->sendResponse($skill, 'Skill retrieved successfully!');
        } else {
            return $this->sendError('No Skill found with this ID!');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update (Request $request, $id)
    {
        $skill = Skill::find($id);
        if ($skill != null) {
            if ($request->has('title')) {
                $skill->title = $request->title;
            }
            if ($request->has('description')) {
                $skill->description = $request->description;
            }
            $result = $skill->save();

            if ($result) {
                return $this->sendResponse($skill, 'Skill updated successfully!');
            } else {
                return $this->sendError('Skill failed to update!');
            }
        } else {
            return $this->sendError('No Skill found with this ID!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy (string $id)
    {
        $skill = Skill::find($id);
        if ($skill != null) {
            $result = $skill->delete();

            if ($result) {
                return $this->sendResponse($skill, 'Skill deleted successfully!');
            } else {
                return $this->sendError('Skill failed to delete!');
            }
        } else {
            return $this->sendError('No Skill found with this ID!');
        }
    }
}
