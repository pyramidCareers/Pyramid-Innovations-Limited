<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use Illuminate\Http\Request;

class CertificationController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        $certifications = Certification::where('user_id', $id)->get();
        try {
            return $this->sendResponse($certifications, 'Certificates retrieved successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in retrieving Certificates.');
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $id)
    {
        request()->validate(Certification::$rules);
        try {
            $certification = new Certification();
            $certification->user_id = $id;
            $certification->certificate_name = $request->certificate_name;
            $certification->issuing_organization = $request->issuing_organization;
            $certification->issue_date = $request->issue_date;
            $certification->expiration_date = $request->expiration_date;
            $certification->credential_id = $request->credential_id;
            $certification->credential_url = $request->credential_url;
            $certification->save();

            return $this->sendResponse($certification, 'certification created successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error in creating certification.');
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
            $certification = Certification::where('user_id', $userId)
                ->where('id', $id)
                ->first();

            $certification->update($request->all());
            return $this->sendResponse($certification, 'certification updated successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in updating certification.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $userId, string $id)
    {
        $certification = Certification::find($id);
        if ($certification != null) {
            $result = $certification->delete();

            if ($result) {
                return $this->sendResponse($certification, 'Data is deleted successfully!');
            } else {
                return $this->sendError($certification, 'Data failed to delete!');
            }
        } else {
            return $this->sendError('No data found with this ID');
        }
    }
}
