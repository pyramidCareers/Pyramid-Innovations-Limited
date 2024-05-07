<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\Organization;
use App\Http\Controllers\API\BaseController;
use Illuminate\Http\Request;
use Exception;
class OrganizationController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
            $org = Organization::all();
            return $this->sendResponse($org, 'Organization retrieved successfully!');
        }
        catch (Exception $e) {
            return $this->sendError('Organization failed to retrieve!');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store (Request $request)
    {
        $organization = new Organization();
        $organization->title = $request->title;
        $organization->description = $request->description;
        $result = $organization->save();

        if ($result) {
            return $this->sendResponse($organization, 'Organization created successfully!');
        } else {
            return $this->sendError('Organization failed to create!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $organization = Organization::find($id);
        if($organization) {
            return $this->sendResponse($organization, 'Organization retrieved successfully!');
        } else {
            return $this->sendError('No Organization found with this ID!');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $organization = Organization::find($id);
        if ($organization != null) {
            if ($request->has('title')) {
                $organization->title = $request->title;
            }
            if ($request->has('description')) {
                $organization->description = $request->description;
            }
            $result = $organization->save();

            if ($result) {
                return $this->sendResponse($organization, 'Organization updated successfully!');
            } else {
                return $this->sendError('Organization failed to update!');
            }
        } else {
            return $this->sendError('No Organization found with this ID!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $organization = Organization::find($id);
        if ($organization != null) {
            $result = $organization->delete();

            if ($result) {
                return $this->sendResponse($organization, 'Organization deleted successfully!');
            } else {
                return $this->sendError('Organization failed to delete!');
            }
        } else {
            return $this->sendError('No Organization found with this ID!');
        }
    }
}
