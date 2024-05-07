<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CareerPage;
use App\Models\Employer;
use Http;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Matrix\Exception;

class CareerPageController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        $employer = Employer::where('user_id', $id)->first();
        $career_page_exists = CareerPage::where('user_id', $id)->first();

        if ($employer && !$career_page_exists) {
            $career_page = new CareerPage();
            $response = $this->saveOrUpdateCareerPageData ($career_page, $id, $request, $employer);
            return $this->sendResponse($response, 'Career Page Created Successfully.');
        }
        elseif ($employer && $career_page_exists) {
            $career_page_exists = CareerPage::where('user_id', $id)->first();
            $response = $this->saveOrUpdateCareerPageData ($career_page_exists, $id, $request, $employer);
            return $this->sendResponse($response, 'Career Page Updated Successfully.');
        }
        return $this->sendError('No Employer Found.', [], 404);
    }

    /**
     * @param $career_page
     * @param $id
     * @param $request
     * @param $employer
     * @return mixed
     * Save or Update the Career Page Data
     */
    public function saveOrUpdateCareerPageData ($career_page, $id, $request, $employer) {
        $career_page->user_id = $id;
        $career_page->verified = $request->verified ?? 0;
        $career_page->brandcolor = $request->brandcolor;
        $career_page->fblink = $request->fblink;
        $career_page->linkedinlink = $request->linkedinlink;
        $career_page->email = $request->email;
        $career_page->sub_domain = $request->sub_domain;

        if ($request->hasFile('cover')) {
            $cover = $request->file('cover');
            $filePath = 'public/' . basename($career_page->cover);
            $career_page->cover = $this->image_store($filePath, $cover, $employer, $id);
        }

        if ($request->hasFile('galleryimage1')) {
            $galleryimage1 = $request->file('galleryimage1');
            $filePath = 'public/' . basename($career_page->galleryimage1);
            $career_page->galleryimage1 = $this->image_store($filePath, $galleryimage1, $employer, $id);
        }

        if ($request->hasFile('galleryimage2')) {
            $galleryimage2 = $request->file('galleryimage2');
            $filePath = 'public/' . basename($career_page->galleryimage2);
            $career_page->galleryimage2 = $this->image_store($filePath, $galleryimage2, $employer, $id);
        }

        if ($request->hasFile('galleryimage3')) {
            $galleryimage3 = $request->file('galleryimage3');
            $filePath = 'public/' . basename($career_page->galleryimage3);
            $career_page->galleryimage3 = $this->image_store($filePath, $galleryimage3, $employer, $id);
        }

        if ($request->hasFile('galleryimage4')) {
            $galleryimage4 = $request->file('galleryimage4');
            $filePath = 'public/' . basename($career_page->galleryimage4);
            $career_page->galleryimage4 = $this->image_store($filePath, $galleryimage4, $employer, $id);
        }

        if ($request->hasFile('galleryimage5')) {
            $galleryimage5 = $request->file('galleryimage5');
            $filePath = 'public/' . basename($career_page->galleryimage5);
            $career_page->galleryimage5 = $this->image_store($filePath, $galleryimage5, $employer, $id);
        }

        $career_page->save();
        return $career_page;
    }

    /**
     * @param $filePath
     * @param $image
     * @param $employer
     * @param $id
     * @return string
     * Image store in public storage
     */
    public function image_store ($filePath, $image, $employer, $id) {
        if (Storage::exists($filePath)) {
            Storage::delete($filePath);
        }
        $fileName = time() . '-careerpage-' . $employer->user_id . '-' . $id . '-' . $image->getClientOriginalName();
        $image->storeAs('public', $fileName);
        return $fileName;
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $careerPage = CareerPage::with('employer')
                ->where('user_id', $id)
                ->first();

            if (!$careerPage) {
                return $this->sendError('Career Page not found.', [], 404);
            }
            return $this->sendResponse($careerPage, 'Career Page retrieved successfully.');

        } catch (\Exception $e) {
            return $this->sendError('Career Page not found.', [], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employer = Employer::where('user_id', $id)->first();
        $career_page_exists = CareerPage::where('user_id', $id)->first();

        if ($employer && $career_page_exists) {
            $this->deleteImages ($career_page_exists->cover);
            $this->deleteImages ($career_page_exists->galleryimage1);
            $this->deleteImages ($career_page_exists->galleryimage2);
            $this->deleteImages ($career_page_exists->galleryimage3);
            $this->deleteImages ($career_page_exists->galleryimage4);
            $this->deleteImages ($career_page_exists->galleryimage5);

            $result = $career_page_exists->delete();
            if ($result) {
                return $this->sendResponse($career_page_exists, 'Data is deleted successfully!');
            } else {
                return $this->sendError($career_page_exists, 'Data failed to delete!');
            }
        }
    }

    public function deleteImages ($image) {
        if ($image) {
            $filePath = 'public/' . basename($image);
            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     * sub-domain available or not
     */

    public function subdomain_availability (Request $request) {
        $result = CareerPage::select('sub_domain')
            ->where('sub_domain', $request->sub_domain)
            ->pluck('sub_domain')
            ->toArray();

        if ($result) {
            return $this->sendError($result, 'Sub Domain Not Available!');
        } else {
            return $this->sendResponse($result, 'Sub Domain Available!');
        }
    }


    /**
     * Display the specified resource by sub-domain.
     */
    public function sub_domain_data($subdomain)
    {
        try {
            $careerPage = CareerPage::with('employer')
                ->where('sub_domain', $subdomain)
                ->first();

            if (!$careerPage) {
                return $this->sendError('Career Page not found.', [], 404);
            }
            return $this->sendResponse($careerPage, 'Career Page retrieved successfully.');

        } catch (\Exception $e) {
            return $this->sendError('Career Page not found.', [], 404);
        }
    }


    public function pyramid_careers(Request $request)
    {
        $endpoint = env('APP_URL')."/api/employee/pyramid/careers"; //

        if (isset($request->email) && isset($request->password)) {
            $token = $this->postRequest(env('APP_URL')."/api/login", $request->all());
            if (isset($token['token']) && isset($request->subdomain)) {
                $headers = [
                    'Authorization' => 'Bearer ' . $token['token'],
                    'Accept' => 'application/json'
                ];
                $response = Http::withHeaders($headers)->withUrlParameters([
                    'endpoint' => $endpoint,
                    'subdomain' => $request->subdomain,
                ])->get('{+endpoint}/{subdomain}');
                if ($response)
                    return json_decode($response);
                return json_decode($response);
            } else {
                return $this->sendError('Token or Subdomain not found.', [], 404);
            }
        } else if (isset($request->subdomain) && isset($request->token)) {
            $headers = [
                'Authorization' => 'Bearer ' . $request->token,
                'Accept' => 'application/json'
            ];
            $response = Http::withHeaders($headers)->withUrlParameters([
                'endpoint' => $endpoint,
                'subdomain' => $request->subdomain,
            ])->get('{+endpoint}/{subdomain}');
            if ($response)
                return json_decode($response);
            return json_decode($response);
        } else {
            return $this->sendError('Invalid Request', [], 404);
        }
    }
}