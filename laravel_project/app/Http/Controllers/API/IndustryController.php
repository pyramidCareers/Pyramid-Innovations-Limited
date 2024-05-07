<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\Industry;
use App\Http\Controllers\API\BaseController;
use Illuminate\Http\Request;
use Exception;

class IndustryController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
           $industry = Industry::all();
           return $this->sendResponse($industry, 'Data is retrieved successfully!');
        }
        catch (\Exception $e) {
            return $this->sendError($industry, 'Data failed to retrieve!');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $industry = new Industry();
            $industry->title = $request->title;
            $industry->description = $request->description;
            $result = $industry->save();
            return $this->sendResponse($industry, 'Data is stored successfully!');
        } catch (\Exception $e) {
            return $this->sendError($industry, 'Data failed to store!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $industry = Industry::find($id);
        if($industry) {
            return $this->sendResponse($industry, 'Data is retrieved successfully!');
        } else {
            return $this->sendError('No data found with this ID');
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $industry = Industry::find($id);
            if ($industry != null) {
                if ($request->has('title')) {
                    $industry->title = $request->title;
                }
                if ($request->has('description')) {
                    $industry->description = $request->description;
                }
                $result = $industry->save();

                if ($result) {
                    return $this->sendResponse($industry, 'Data is updated successfully!');
                } else {
                    return $this->sendError($industry, 'Data failed to update!');
                }
            } 
        }  
        catch (\Exception $e) {
            return $this->sendError($industry,'Id not found!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $industry = Industry::find($id);
        if ($industry != null) {
            $result = $industry->delete();

            if ($result) {
                return $this->sendResponse($industry, 'Data is deleted successfully!');
            } else {
                return $this->sendError($industry, 'Data failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this ID');
        }
    }
}
