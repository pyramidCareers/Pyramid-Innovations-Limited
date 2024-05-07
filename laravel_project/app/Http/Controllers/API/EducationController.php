<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\Education;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController;
use Exception;

class EducationController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $educations = Education::where('user_id', $id)->get();
        try {
            $alleducation = [];
            foreach ($educations as $education) {
                array_push($alleducation, $education);
            }
            return $this->sendResponse($alleducation, 'Jobs retrieved successfully.');
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
//        request()->validate(Education::$rules);
        try {
            $education = new Education();
            $education->user_id = $id;
            $education->title = $request->title;
            $education->institution = $request->institution;
            $education->year = $request->year;
            $education->result = $request->result;
            $education->total_cgpa = $request->total_cgpa;
            $education->grade_type = $request->grade_type;
            $education->letter_marks = $request->letter_marks;
            $education->save();

            return $this->sendResponse($education, 'Education created successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error in creating education.');
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
        // $education = Education::where('user_id', $userId AND 'id', $id)->first();
        try {
            $education = Education::where('user_id', $userId)
                        ->where('id', $id)
                        ->first();

            $education->update($request->all());
            return $this->sendResponse($education, 'Education updated successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in updating education.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $userId, string $id)
    {
        $education = Education::find($id);
        if ($education != null) {
            $result = $education->delete();

            if ($result) {
                return $this->sendResponse($education, 'Data is deleted successfully!');
            } else {
                return $this->sendError($education, 'Data failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this ID');
        }
    }
}
