<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ExtraCurriculars;
use Illuminate\Http\Request;

class ExtraCurricularsController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $extracurriculars = ExtraCurriculars::where('user_id', $id)->get();
        try {
            return $this->sendResponse($extracurriculars, 'Extra-Curricular Activities retrieved successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in retrieving Extra-Curricular Activities.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $id)
    {
        request()->validate(ExtraCurriculars::$rules);
        try {
            $extracurricular = new ExtraCurriculars();
            $extracurricular->user_id = $id;
            $extracurricular->organization_name = $request->organization_name;
            $extracurricular->role = $request->role;
            $extracurricular->category = $request->category;
            $extracurricular->start_date = $request->start_date;
            $extracurricular->end_date = $request->end_date;
            $extracurricular->description = $request->description;
            $extracurricular->save();

            return $this->sendResponse($extracurricular, 'Extra Curricular Activities created successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error in creating Extra Curricular Activities.');
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
            $extracurricular = ExtraCurriculars::where('user_id', $userId)
                ->where('id', $id)
                ->first();

            $extracurricular->update($request->all());
            return $this->sendResponse($extracurricular, 'Extracurricular Activities updated successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in updating Extracurricular Activities.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $userID, string $id)
    {
        $extracurricular = ExtraCurriculars::find($id);
        if ($extracurricular != null) {
            $result = $extracurricular->delete();

            if ($result) {
                return $this->sendResponse($extracurricular, 'Data is deleted successfully!');
            } else {
                return $this->sendError($extracurricular, 'Data failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this ID');
        }
    }
}
