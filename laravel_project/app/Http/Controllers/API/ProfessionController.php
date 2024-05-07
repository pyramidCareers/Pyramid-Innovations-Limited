<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\Profession;
use App\Http\Controllers\API\BaseController;
use Illuminate\Http\Request;

class ProfessionController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Profession::all();
        try{
            $profession = Profession::all();
            return $this->sendResponse($profession, 'Profession retrieved successfully!');
        }
        catch (Exception $e) {
            return $this->sendError('Profession failed to retrieve!');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $profession = new Profession();
        $profession->title = $request->title;
        $profession->description = $request->description;
        $result = $profession->save();

        if ($result) {
            return $this->sendResponse($profession, 'Profession created successfully.');
        } else {
            return $this->sendError('Profession failed to create.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $profession = Profession::find($id);
        if($profession) {
            return $this->sendResponse($profession, 'Profession retrieved successfully!');
        } else {
            return $this->sendError('No Profession found with this ID');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $profession = Profession::find($id);
        if ($profession != null) {
            if ($request->has('title')) {
                $profession->title = $request->title;
            }
            if ($request->has('description')) {
                $profession->description = $request->description;
            }
            $result = $profession->save();

            if ($result) {
                return $this->sendResponse($profession, 'Profession updated successfully!');
            } else {
                return $this->sendError('Profession failed to update!');
            }
        } else {
            return $this->sendError('No profession found with this ID');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $profession = Profession::find($id);
        if ($profession != null) {
            $result = $profession->delete();

            if ($result) {
                return $this->sendResponse($profession, 'Profession deleted successfully!');
            } else {
                return $this->sendError('Profession failed to delete!');
            }
        } else {
            return $this->sendError('No Profession found with this ID!');
        }
    }
}
