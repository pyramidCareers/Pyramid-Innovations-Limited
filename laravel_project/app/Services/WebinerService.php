<?php

namespace App\Services;

use App\Http\Controllers\API\BaseController;
use App\Models\Mentor;
use App\Models\MentorWebinars;
use App\Models\WebinarPayment;
use App\Models\WebinarPaymentStatus;
use App\Models\WebinarRegisteredUsers;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Carbon;

class WebinerService extends BaseController
{
    public function create_events($data)
    {
        if (self::is_created($data))
            return [];
        if (!self::isEndTimeValid($data->start_time, $data->end_time))
            return [];
        $zoom_meeting_details = $this->createZoomMeeting($data);

        $data->merge([
            'duration' => self::get_duration($data),
            'meeting_link' => $zoom_meeting_details['join_url'],
            'start_link' => $zoom_meeting_details['start_url'],
            'meeting_platform' => 'Zoom'
        ]);
        $data = MentorWebinars::create($data->all());

        $data['zoom_meeting_details'] = $zoom_meeting_details;
        return $data;
    }

    public function get_events()
    {
        $data = MentorWebinars::with('user')->orderBy('date', 'desc')->paginate(10); //add paginate
        return $data;
    }

    public function update_events($request)
    {
        if (isset($request->start_time) || isset($request->end_time) || isset($request->date)) {
            $data = MentorWebinars::find($request->id);
            if (isset($request->start_time))
                $data->start_time = $request->start_time;
            if (isset($request->end_time))
                $data->end_time = $request->end_time;
            if (isset($request->date))
                $data->date = $request->date;
            if (!self::isEndTimeValid($data->start_time, $data->end_time))
                return [];
            if (!self::is_created($data, 1)) {
                $data = MentorWebinars::find($request->id);
                $request->merge(['duration' => self::get_duration($request)]);
                $data->update($request->all());
                return $data;
            }
        } else {
            $data = MentorWebinars::find($request->id);
            $data->update($request->all());
            return $data;
        }
        return [];


    }

    function delete_events($request)
    {
        $data = MentorWebinars::find($request->id);
        if ($data)
            $data->delete();
        return $data;

    }

    function get_pending_events()
    {
        $data = MentorWebinars::where('approved', 0)->paginate(10);
        return $data;
    }

    function get_events_by_user($user_Id)
    {
        $data = MentorWebinars::where('user_id', $user_Id)->paginate(10);
        return $data;
    }

    function get_webinar_by_id($id)
    {
        // $webinar = MentorWebinars::find($id);
        // $webinar->registered_users = WebinarRegisteredUsers::where('webinar_id', $id)->count();
        // $webinar->mentor = Mentor::with('user')->where('user_id', $webinar->user_id)->first();
        // $webinar->payment_status = WebinarPaymentStatus::where('user_id', $userId)
        //                             ->where('webinar_id', $id)->exists();

        $webinar = MentorWebinars::where('id', $id)
            ->with('user', 'user.mentor', 'paymentInfo')
            ->withCount('particiapnts')
            ->first();
        return $webinar;
    }

    function get_jobseeker_calander_view($user_id, $month, $year)
    {
        $data = [];
        $record = MentorWebinars::where('user_id', $user_id)->where('approved', 1)
            ->whereMonth('date', '=', $month)->whereYear('date', '=', $year)->get();

        foreach ($record as $value) {
            if (isset($data[$value->date])) {
                $data[$value->date][] = [
                    'id' => $value->id,
                    'user_id' => $value->user_id,
                    'title' => $value->title,
                    'description' => $value->description,
                    'start_time' => $value->start_time,
                    'end_time' => $value->end_time,
                    'duration' => $value->duration
                ];
            } else {
                $data[$value->date] = [
                    [
                        'id' => $value->id,
                        'user_id' => $value->user_id,
                        'title' => $value->title,
                        'description' => $value->description,
                        'start_time' => $value->start_time,
                        'end_time' => $value->end_time,
                        'duration' => $value->duration
                    ]
                ];
            }
        }

        return $data;
    }

    function get_mentor_calander_view($user_id, $month, $year)
    {
        $data = [];
        $record = MentorWebinars::where('user_id', $user_id)
            ->whereMonth('date', '=', $month)->whereYear('date', '=', $year)->get();

        foreach ($record as $value) {
            if (isset($data[$value->date])) {
                $data[$value->date][] = [
                    'id' => $value->id,
                    'user_id' => $value->user_id,
                    'approved' => $value->approved,
                    'title' => $value->title,
                    'description' => $value->description,
                    'start_time' => $value->start_time,
                    'end_time' => $value->end_time,
                    'duration' => $value->duration
                ];
            } else {
                $data[$value->date] = [
                    [
                        'id' => $value->id,
                        'user_id' => $value->user_id,
                        'approved' => $value->approved,
                        'title' => $value->title,
                        'description' => $value->description,
                        'start_time' => $value->start_time,
                        'end_time' => $value->end_time,
                        'duration' => $value->duration
                    ]
                ];
            }
        }

        return $data;
    }


    //Registered Users

    function register_event($request)
    {
        $data = MentorWebinars::find($request->webinar_id);

        if ($data->registration_fee) {
            $status = WebinarPaymentStatus::where('webinar_id', $request->webinar_id)->where('user_id', $request->user_id)->exists();
            if ($status) {
                if ($data && !self::is_registered($request)) {
                    $data = WebinarRegisteredUsers::create($request->all());
                    return $data;
                }
                return ['status' => 'Already Registered'];
            }
            return ['status' => 'Payment Required'];

        } else {
            if ($data && !self::is_registered($request)) {
                $data = WebinarRegisteredUsers::create($request->all());
                return $data;
            }
        }

        return ['status' => 'Already Registered'];
    }

    function unregister_event($request)
    {
        if (self::is_registered($request)) {
            $data = WebinarRegisteredUsers::where('user_id', $request->user_id)->where('webinar_id', $request->webinar_id)->get();
            WebinarRegisteredUsers::where('user_id', $request->user_id)->where('webinar_id', $request->webinar_id)->delete();
            return $data;
        }
        return [];
    }

    function get_registered_users($data)
    {

        $data = WebinarRegisteredUsers::where('webinar_id', $data->wid)->get();
        return $data;
    }


    //User Can Pay Registration Fees for Webinars

    function pay_entry_fee($request)
    {

        $exists = MentorWebinars::where('id', $request->webinar_id)->exists();
        if ($exists) {
            $record = WebinarPayment::create($request->all());
            return $record;
        }
        return [];

    }

    function check_entry_fee($request)
    {
        if (WebinarPayment::where('webinar_id', $request->webinar_id)->where('user_id', $request->user_id)->exists()) {
            return true;
        }
        return false;
    }


    //APIs for Mentors Lists

    function get_mentor_list_of_upcomming_webinar()
    {
        $mentors = MentorWebinars::where('approved', 1)->wheredate('date', '>=', date('Y-m-d'))->distinct()->pluck('user_id')->toArray();
        $mentorsDetails = Mentor::with('user')->whereIn('user_id', $mentors)->paginate(10);
        return $mentorsDetails;
    }

    function get_mentor_lists()
    {
        $mentors = Mentor::with('user')->paginate(10);
        return $mentors;
    }

    function get_registered_webinars($user_id, $status)
    {
        $webinarsIds = WebinarRegisteredUsers::where('user_id', $user_id)->pluck('webinar_id')->toArray();
        $webinars = MentorWebinars::whereIn('id', $webinarsIds);

        $webinars = $this->filter_webinar_by_status($webinars, $status);

        return $webinars->OrderBy('date')->paginate(10);
    }

    function get_webinars_by_mentor($user_id, $status)
    {
        $webinars = MentorWebinars::where('user_id', $user_id);

        $webinars = $this->filter_webinar_by_status($webinars, $status);

        return $webinars->OrderBy('date')->paginate(10);
    }

    /**
     * This function filters webinars based
     * on the given status (upcoming, past or null)
     */
    function filter_webinar_by_status($webinars, $status)
    {
        $currentDateTime = Carbon::now();

        // Comparing both date and time when the date is same
        if ($status == 'upcoming') {
            $webinars = $webinars->where(function ($query) use ($currentDateTime) {
                $query->where('date', '>', $currentDateTime->toDateString())
                    ->orWhere(function ($query) use ($currentDateTime) {
                        $query->where('date', $currentDateTime->toDateString())
                            ->where('start_time', '>=', $currentDateTime->toTimeString());
                    });
            });
        } else if ($status == 'past') {
            $webinars = $webinars->where(function ($query) use ($currentDateTime) {
                $query->where('date', '<', $currentDateTime->toDateString())
                    ->orWhere(function ($query) use ($currentDateTime) {
                        $query->where('date', $currentDateTime->toDateString())
                            ->where('start_time', '<', $currentDateTime->toTimeString());
                    });
            });
        }
        return $webinars;
    }

    //API for Webinar joining eligiblity

    function join_webinar($webinar_id, $user_id)
    {
        $WebinarData = MentorWebinars::where('id', $webinar_id)->first();
        $isRegistered = WebinarRegisteredUsers::where('user_id', $user_id)->where('webinar_id', $webinar_id)->exists();

        if ($isRegistered || $user_id == $WebinarData->user_id) {
            return $WebinarData;
        } else {
            return [];
        }

    }



    //---------------- common functions ------------

    function is_registered($data)
    {
        if (WebinarRegisteredUsers::where('user_id', $data->user_id)->where('webinar_id', $data->webinar_id)->exists())
            return true;
        return false;
    }
    function make_decisions($data, $msg)
    {
        if ($data) {
            return $this->sendResponse($data, $msg . ' successfully.');
        }
        return $this->sendError($msg . ' unsuccessful');
    }

    function get_duration($data)
    {
        $time_difference = strtotime($data->end_time) - strtotime($data->start_time);
        $duration = $time_difference / 60;
        return $duration;
    }
    public function is_created($data, $update = null)
    {
        $exists = false;
        if ($update) {
            $exists = MentorWebinars::where('date', $data->date)
                ->where('user_id', $data->user_id)
                ->where('id', '!=', $data->id)
                ->where(function ($query) use ($data) {
                    $query->where(function ($q) use ($data) {
                        $q->whereTime('start_time', '>=', $data->start_time)
                            ->whereTime('start_time', '<', $data->end_time);
                    })->orWhere(function ($q) use ($data) {
                        $q->whereTime('end_time', '>', $data->start_time)
                            ->whereTime('end_time', '<=', $data->end_time);
                    });
                })
                ->exists();
        } else {
            $exists = MentorWebinars::where('date', $data->date)
                ->where('user_id', $data->user_id)
                ->where(function ($query) use ($data) {
                    $query->where(function ($q) use ($data) {
                        $q->whereTime('start_time', '>=', $data->start_time)
                            ->whereTime('start_time', '<', $data->end_time);
                    })->orWhere(function ($q) use ($data) {
                        $q->whereTime('end_time', '>', $data->start_time)
                            ->whereTime('end_time', '<=', $data->end_time);
                    });
                })
                ->exists();
        }
        if ($exists)
            return true;
        return false;

    }

    /**
     * This function creates a zoom meeting
     * and returns the zoom meeting link.
     */
    public function createZoomMeeting($meeting_data)
    {
        $account_id = env('ZOOM_ACCOUNT_ID');
        $client_id = env('ZOOM_CLIENT_ID');
        $client_secret_key = env('ZOOM_CLIENT_SECRET_KEY');

        $token_response = Http::asForm()->withBasicAuth($client_id, $client_secret_key)
            ->post('https://zoom.us/oauth/token', [
                'grant_type' => 'account_credentials',
                'account_id' => $account_id,
            ]);

        if ($token_response->successful()) {
            $data = $token_response->json();
            $access_token = $data['access_token'];

            $zoom_api_endpoint = 'https://api.zoom.us/v2/users/me/meetings';

            $data = [
                'topic' => $meeting_data->title,
                'duration' => self::get_duration($meeting_data),
                'default_password' => false,
                'start_time' => $meeting_data->date . "T" . $meeting_data->start_time . ":00Z",
                'settings' => [
                    'waiting_room' => false,
                    'join_before_host' => true,
                    "mute_upon_entry" => true,
                    "request_permission_to_unmute_participants" => false,
                    "timezone" => 'Asia/Dhaka',
                ]
            ];

            $meeting_response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $access_token,
            ])->post($zoom_api_endpoint, $data);

            return $meeting_response->json();
        } else {
            $errorResponse = $token_response->json();
            return $errorResponse;
        }
    }

    public function get_all_events($filter)
    {
        $now = now(); // Get the current date and time

        $data = MentorWebinars::with('user')
            ->where('approved', $filter)
            ->where(function ($query) use ($now) {
                $query->whereDate('date', '>', $now->toDateString())
                    ->orWhere(function ($subquery) use ($now) {
                        $subquery->whereDate('date', $now->toDateString())
                            ->whereTime('start_time', '>', $now->toTimeString());
                    });
            })
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->paginate(10);

        return $data;
    }

    function isEndTimeValid($start_time, $end_time)
    {
        // Convert start_time and end_time to Carbon instances
        $startTime = Carbon::parse($start_time);
        $endTime = Carbon::parse($end_time);

        // Compare the Carbon instances
        if ($endTime->lt($startTime)) {
            return false; // end_time is less than start_time
        } else {
            return true; // end_time is greater than or equal to start_time
        }
    }
}
