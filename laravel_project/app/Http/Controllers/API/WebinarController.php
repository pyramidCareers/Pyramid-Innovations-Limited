<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController;
use App\Services\WebinerService;
use Illuminate\Http\Request;

class WebinarController extends BaseController
{
    protected $webinar;
    public function __construct(WebinerService $service)
    {
        $this->webinar = $service;
    }

    //Webinars APIs
    public function create_webinar(Request $request)
    {
        $results = $this->webinar->create_events($request);
        return $this->webinar->make_decisions($results, "Event Created");
    }

    public function get_webinars()
    {
        $results = $this->webinar->get_events();
        return $this->webinar->make_decisions($results, "Event Retrived");
    }

    public function update_webinar(Request $request)
    {
        $results = $this->webinar->update_events($request);
        return $this->webinar->make_decisions($results, "Event Update");
    }

    public function delete_webinar(Request $request)
    {
        $results = $this->webinar->delete_events($request);
        return $this->webinar->make_decisions($results, "Event Delete");
    }

    public function get_pending_events()
    {
        $results = $this->webinar->get_pending_events();
        return $this->webinar->make_decisions($results, "Pending Events Retrived");
    }

    public function get_events_by_user($user_id)
    {
        $results = $this->webinar->get_events_by_user($user_id);
        return $this->webinar->make_decisions($results, "Events Retrived");
    }

    public function get_webinar_by_id($webinar_id)
    {
        $results = $this->webinar->get_webinar_by_id($webinar_id);
        return $this->webinar->make_decisions($results, "Event Retrived");
    }

    public function get_jobseeker_calander_view($user_id, $month, $year)
    {
        $results = $this->webinar->get_jobseeker_calander_view($user_id, $month, $year);
        return $this->webinar->make_decisions($results, "Jobseeker Calander View Retrived");
    }


    public function get_mentor_calander_view($user_id, $month, $year)
    {
        $results = $this->webinar->get_mentor_calander_view($user_id, $month, $year);
        return $this->webinar->make_decisions($results, "Mentor Calander View Retrived");
    }

    //Registered Users APIs

    public function register_event(Request $request)
    {
        $results = $this->webinar->register_event($request);
        if (isset($results['status'])) {
            return $this->sendResponse($results, "Registration canceled");
        } else {
            return $this->webinar->make_decisions($results, "Registration");
        }

    }

    public function unregister_event(Request $request)
    {
        $results = $this->webinar->unregister_event($request);
        return $this->webinar->make_decisions($results, "Unregistration");
    }

    public function get_registered_users(Request $request)
    {
        $results = $this->webinar->get_registered_users($request);
        return $this->webinar->make_decisions($results, "Registered Users Retrived");
    }

    public function is_registered(Request $request){
        $results = $this->webinar->is_registered($request);
        return $this->webinar->make_decisions($results, "Registration status Retrived");
    }


    // Function for pay Entry fee for webinar


    public function pay_entry_fee(Request $request)
    {
        $results = $this->webinar->pay_entry_fee($request);
        return $this->webinar->make_decisions($results, "Entry Fee Paid");
    }

    public function check_entry_fee(Request $request)
    {
        $results = $this->webinar->check_entry_fee($request);
        return $this->webinar->make_decisions($results, "Entry Fee Checked");
    }


    //APIs for Mentor lists

    public function get_mentor_list_of_upcomming_webinar()
    {
        $results = $this->webinar->get_mentor_list_of_upcomming_webinar();
        return $this->webinar->make_decisions($results, "Mentor List of Upcomming Webinar Retrived");
    }

    public function get_mentor_lists()
    {
        $results = $this->webinar->get_mentor_lists();
        return $this->webinar->make_decisions($results, "Mentor List Retrived");
    }

    public function get_registered_webinars($user_id, Request $request)
    {
        $results = $this->webinar->get_registered_webinars($user_id, $request->status);
        return $this->webinar->make_decisions($results, "Registered Webinar Retrived");
    }

    public function get_webinars_by_mentor($user_id, Request $request)
    {
        $results = $this->webinar->get_webinars_by_mentor($user_id, $request->status);
        return $this->webinar->make_decisions($results, "Mentor Webinar Retrived");
    }

    public function join_webinar($webinar_id, $user_id)
    {
        $results = $this->webinar->join_webinar($webinar_id, $user_id);
        return $this->webinar->make_decisions($results, "Webinar Joining");
    }

    public function webinarFilter (Request $request) {
        try {
            if ($request->has('filter')) {
                $filter = $request->filter;
                $results = $this->webinar->get_all_events($filter);
            } else {
                $results = $this->webinar->get_events();
            }
            return $this->webinar->make_decisions($results, "All Events Retrived");
        } catch (Exception $e) {
            return $this->sendError('Mentor data update failed.', $e->getMessage());
        }
    }
}
