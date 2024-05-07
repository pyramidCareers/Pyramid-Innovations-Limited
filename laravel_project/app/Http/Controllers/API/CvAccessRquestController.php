<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\CvAccessRequestFilters;
use App\Models\CvAccessRequests;
use Illuminate\Http\Request;
use App\Models\User;

class CvAccessRquestController extends BaseController
{
    public function cvRquest(Request $request)
    {
        $filter = [];
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'number_of_cv' => 'required|integer|min:1',
            'filters.*.filter_name' => 'required',
            'filters.*.filter_value' => 'required',
        ]);

        $cvAccessRequest = CvAccessRequests::create([
            'user_id' => $validatedData['user_id'],
            'number_of_cv' => $validatedData['number_of_cv']
        ]);

        foreach ($request['cvfilters'] as $filterData) {
            $filters = CvAccessRequestFilters::create([
                'request_id' => $cvAccessRequest->id,
                'filter_name' => $filterData['filter_name'],
                'filter_value' => $filterData['filter_value'],
            ]);
            array_push($filter, $filters);
        }

        $cvAccessRequest->cvfilters = $filter;
        $userData = User::find($cvAccessRequest->user_id);
        $cvAccessRequest->user = $userData;

        if ($cvAccessRequest && $filter) {
            return $this->sendResponse($cvAccessRequest, 'CV access request created successfully.');
        }
        return $this->sendError('CV access request failed');
    }

    public function getCvRquestList()
    {
        $data = CvAccessRequests::with('Cvfilters', 'User')->paginate(10);
        if ($data) {
            return $this->sendResponse($data, 'CV access request list.');
        }
        return $this->sendError('CV access request list Retrive failed');
    }

    public function getCvRquestById($id)
    {
        $data = CvAccessRequests::with('Cvfilters', 'User')->where('user_id', $id)->paginate(10);
        if ($data) {
            return $this->sendResponse($data, 'CV access request list.');
        }
        return $this->sendError('CV access request list Retrive failed');
    }

    public function updateCvRquest(Request $request)
    {
        $request->validate([
            'approved_by' => 'required',
            'status' => 'required',
        ]);

        $updateStatus = CvAccessRequests::where('id', $request->id)->update($request->all());
        $updatedData = CvAccessRequests::find($request->id);
        $updatedData->cvfilters = CvAccessRequestFilters::where('request_id', $request->id)->get();
        $updatedData->user = User::find($updatedData->user_id);
        if ($updateStatus) {
            return $this->sendResponse($updatedData, 'CV access request Status Updated.');
        }
        return $this->sendError('CV access request Status Update failed');
    }

    public function updateCvRquestFilters(Request $request)
    {

        $reqData = $request->cvfilters;

        if (isset($request->number_of_cv)) {
            $OldRequest = CvAccessRequests::findorfail($request->id);
            $OldRequest->update([
                "number_of_cv" => $request->number_of_cv
            ]);
        }

        foreach ($reqData as $filterData) {
            if ($request->id == isset($filterData['request_id'])) {
                $existingFilter = CvAccessRequestFilters::find($filterData['id']);
                if ($existingFilter) {
                    $existingFilter->update([
                        'filter_name' => $filterData['filter_name'],
                        'filter_value' => $filterData['filter_value'],
                    ]);
                }
            } else {
                CvAccessRequestFilters::create([
                    'request_id' => $request->id,
                    'filter_name' => $filterData['filter_name'],
                    'filter_value' => $filterData['filter_value'],
                ]);
            }
        }

        $data = CvAccessRequests::findOrFail($request->id);
        $data->cvfilters = CvAccessRequestFilters::where('request_id', $request->id)->get();
        $data->user = User::find($data->user_id);
        if ($data) {
            return $this->sendResponse($data, 'CV access request Filters Updated.');
        }
        return $this->sendError('CV access request Filters Update failed');
    }
}