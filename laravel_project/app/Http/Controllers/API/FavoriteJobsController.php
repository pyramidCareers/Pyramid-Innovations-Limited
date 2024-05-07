<?php

namespace App\Http\Controllers\API;

use App\Models\FavoriteJobs;
use App\Http\Controllers\API\BaseController;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Pagination\Paginator;
class FavoriteJobsController extends BaseController
{

    public function store(Request $request, $id)
    {
        $request->validate(['user_id' => 'required']);
        $foundFavoriteJob = FavoriteJobs::where('user_id', $request->user_id)->where('job_id', $id)->first();

        if ($foundFavoriteJob) {
            return $this->sendError('Already marked as Favorite!');
        }
        $job = new FavoriteJobs();
        $job->job_id = $id;
        $job->user_id = $request->user_id;
        $fav = $job->save();

        if ($fav) {
            return $this->sendResponse($job, 'Favorite Jobs marked successfully.');
        } else {
            return $this->sendError('Failed to Mark as Favorite jobs');
        }
    }

    public function destroy(Request $request, $id)
    {
        $foundFavoriteJob = FavoriteJobs::where('user_id', $request->user_id)->where('job_id', $id)->first();

        if ($foundFavoriteJob != null) {
            $Response = $foundFavoriteJob->delete();
            if ($Response) {
                return $this->sendResponse($foundFavoriteJob, 'Favorite Jobs deleted successfully.');
            } else {
                return $this->sendError($foundFavoriteJob, 'Favorite Job Removed!');
            }
        } else {
            return $this->sendError('No favourite Jobs Found!');
        }
    }

    public function getAllFavoriteJobs($id)
    {
        $FavoriteJobs = FavoriteJobs::with('Job')->where('user_id', $id)->paginate();
        return $this->sendResponse($FavoriteJobs, 'Favourite Jobs List.');
    }
}
