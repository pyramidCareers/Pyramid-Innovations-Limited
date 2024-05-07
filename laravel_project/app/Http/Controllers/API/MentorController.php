<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Models\Mentor;
use App\Models\MentorWebinars;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class MentorController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $mentors = Mentor::with('user')->paginate();
            return $this->sendResponse($mentors, 'Mentors retrived successfully');

        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve mentors. ', $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate(Mentor::$rules);

        try {
            $mentor = Mentor::create($request->all());

            return $this->sendResponse($mentor, 'Mentor created successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve mentors. ', $e->getMessage());
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $mentor = Mentor::with('user')->find($id);
            if (!$mentor) {
                return $this->sendError('Failed to retrieve mentor by id.');
            }
            return $this->sendResponse($mentor, 'Mentor retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve mentor. ', $e->getMessage());
        }
    }

    /**
     * Display the specified resource by user id.
     */
    public function showByUserId(string $userId)
    {
        try {
            // $mentor = User::with('mentor')->find($userId);
            $mentor = Mentor::where('user_id', $userId)
                ->with('user')
                ->first();
            if (!$mentor) {
                return $this->sendError('Failed to retrieve mentor by user id. ');
            }
            return $this->sendResponse($mentor, 'Mentor retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve mentor by user id. ', $e->getMessage());
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $mentor = Mentor::findOrFail($id);
            $mentor->update($request->all());
            return $this->sendResponse($mentor, 'Mentor data updated successfully.');
        } catch (Exception $e) {
            return $this->sendError('Mentor data update failed.', $e->getMessage());
        }
    }

    public function updateByUserId(Request $request, string $userId)
    {
        try {
            $mentor = Mentor::where('user_id', $userId)->first();

            // Check if 'status' is present in the request.
            if ($request->has('status')) {
                $status = $request->status;
                $mentor->status = $status;
            }
            $mentor->update($request->all());

            return $this->sendResponse($mentor, 'Mentor data updated successfully.');
        } catch (Exception $e) {
            return $this->sendError('Mentor data update failed.', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        try {
            $mentor = Mentor::destroy($id);
            return $this->sendResponse($mentor, 'Mentor deleted successfully.');
        } catch (Exception $e) {
            return $this->sendError('Mentor not found.', $e->getMessage());
        }
    }

    public function getPendingMentors()
    {
        try {
            $mentors = Mentor::with('user')->whereIn('status', ['pending', 'created'])->paginate(10);

            // Check if any mentors with the specified statuses were found.
            if ($mentors->isEmpty()) {
                return $this->sendError('No Mentors available with pending or approved status.');
            }
            return $this->sendResponse($mentors, 'Mentor retrieved successfully.');

        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve mentor. ', $e->getMessage());
        }
    }

    public function getWebinarList($id)
    {
        try {
            $mentor = Mentor::with('user')->where('user_id', $id)->first();
            if ($mentor) {
                // Get the current date and time
                $now = Carbon::now();

                // Retrieve total number of past events
                $totalPastEvents = MentorWebinars::where('user_id', $id)
                    ->where(function ($query) use ($now) {
                        $query->whereDate('date', '<', $now->toDateString())
                            ->orWhere(function ($subquery) use ($now) {
                                $subquery->whereDate('date', $now->toDateString())
                                    ->whereTime('start_time', '<', $now->toTimeString());
                            });
                    })
                    ->count();

                // Retrieve total number of future events
                $totalFutureEvents = MentorWebinars::where('user_id', $id)
                    ->where(function ($query) use ($now) {
                        $query->whereDate('date', '>', $now->toDateString())
                            ->orWhere(function ($subquery) use ($now) {
                                $subquery->whereDate('date', $now->toDateString())
                                    ->whereTime('start_time', '>', $now->toTimeString());
                            });
                    })
                    ->count();

                // Retrieve details of the 5 nearest future events
                $nearestFutureEvents = MentorWebinars::where('user_id', $id)
                    ->where(function ($query) use ($now) {
                        $query->whereDate('date', '>', $now->toDateString())
                            ->orWhere(function ($subquery) use ($now) {
                                $subquery->whereDate('date', $now->toDateString())
                                    ->whereTime('start_time', '>', $now->toTimeString());
                            });
                    })
                    ->orderBy('date')
                    ->orderBy('start_time')
                    ->limit(5)
                    ->get();

                $response = [
                    'mentor' => $mentor,
                    'totalPastEvents' => $totalPastEvents,
                    'totalFutureEvents' => $totalFutureEvents,
                    'nearestFutureEvents' => $nearestFutureEvents,
                ];

                return $this->sendResponse($response, 'Mentor retrieved successfully.');
            } else {
                return $this->sendError('Failed to retrieve mentor. ');
            }
        } catch (Exception $e) {
            return $this->sendError('Failed to retrieve mentor. ', $e->getMessage());
        }
    }


    public function searchMentor(Request $request)
    {
        $key = $request->key;
        $mentors = Mentor::with('user')->whereHas('user', function ($query) use ($key) {
            $query->where(function ($query) use ($key) {
                $query->where('firstname', 'like', '%' . $key . '%')
                    ->orWhere('lastname', 'like', '%' . $key . '%');
            });
        })->orWhere('specialty', 'LIKE', '%' . $key . '%')->orWhere('industry', 'LIKE', '%' . $key . '%')->paginate(10);

        if (count($mentors) != 0)
            return $this->sendResponse($mentors, 'Mentors retrieved successfully.');
        return $this->sendError('No mentors found.');
    }
}
