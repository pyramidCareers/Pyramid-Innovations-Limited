<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CvTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CvTemplateController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $cvTemplate = CvTemplate::with('user')->paginate();
            return $this->sendResponse($cvTemplate, 'CV Templates retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Failed to retrieve employers.', [], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if(Auth::user()->user_type !== 'admin') {
            return $this->sendErrorResponse('Only Admin have this Authority', false, 401, 'Only Admin have this Authority');
        } else {
            request()->validate(CvTemplate::$rules);
            try {
                $cvtemplate = new CvTemplate();
                $cvtemplate->user_id = Auth::user()->id;
                $cvtemplate->name = $request->name;
                $cvtemplate->description = $request->description;
                $cvtemplate->tag = $request->tag;
                $link = $request->file('link');

                $fileName = time() . '-link-' .$cvtemplate->user_id .'-'.  $link->getClientOriginalName();
                $link->storeAs('public', $fileName);
                $cvtemplate->link = $fileName;
                $cvtemplate->save();

                return $this->sendResponse($cvtemplate, 'cvtemplate created successfully.');
            } catch (Exception $e) {
                return $this->sendError('Error in creating cvtemplate.');
            }
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
    public function update(Request $request, string $id)
    {
        if(Auth::user()->user_type !== 'admin') {
            return $this->sendErrorResponse('Only Admin have this Authority', false, 401, 'Only Admin have this Authority');
        } else {
            try {
                $cvtemplate = CvTemplate::find($id);
                if ($cvtemplate != null) {
                    if($request->hasFile('link')) {
                        request()->validate(CvTemplate::$rules);
                        $filePath = 'public/' . basename($cvtemplate->link);

                        if (Storage::exists($filePath)) {
                            Storage::delete($filePath);
                        }

                        $link = $request->file('link');
                        $fileName = time() . '-link-' .$cvtemplate->user_id .'-'.  $link->getClientOriginalName();
                        $link->storeAs('public', $fileName);
                        $cvtemplate->link = $fileName;
                    }

                    if($request->tag != null) {
                        $cvtemplate->tag = $request->tag;
                    }
                    if ($request->name != null){
                        $cvtemplate->name = $request->name;
                    }
                    if ($request->description != null){
                        $cvtemplate->description = $request->description;
                    }
                    $cvtemplate->save();
                }
                return $this->sendResponse($cvtemplate, 'cvtemplate updated successfully.');
            } catch (Exception $e) {
                return $this->sendError('Error in updating cvtemplate.');
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        if(Auth::user()->user_type !== 'admin') {
            return $this->sendErrorResponse('Only Admin have this Authority', false, 401, 'Only Admin have this Authority');
        } else {
            $cvTemplate = CvTemplate::find($id);
            if ($cvTemplate != null) {
                $filePath = 'public/' . basename($cvTemplate->link);
                if (Storage::exists($filePath)) {
                    Storage::delete($filePath);
                }
                $result = $cvTemplate->delete();
            } else {
                return $this->sendError('No data found with this ID');
            }
        }
       if ($result) {
          return $this->sendResponse($cvTemplate, 'Data is deleted successfully!');
       } else {
          return $this->sendError($cvTemplate, 'Data failed to delete!');
       }

    }
}
