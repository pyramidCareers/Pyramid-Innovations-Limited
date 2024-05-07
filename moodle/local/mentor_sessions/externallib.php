<?php
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * External Web Service Template
 * @package local
 * @subpackage mentor_sessions
 * @author     Brain station 23 ltd <brainstation-23.com>
 * @copyright  2023 Brain station 23 ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
require_once($CFG->libdir . "/externallib.php");
require_once($CFG->dirroot . "/course/externallib.php");
require_once(__DIR__ . '/lib.php');
class local_mentor_sessions_external extends external_api
{
    //Insert Mentor Series Data
    public static function add_mentor_series_parameters()
    {
        return new external_function_parameters([
            'data' => new external_multiple_structure(new external_single_structure([
                'mentor_id' => new external_value(PARAM_INT, 'Mentor ID'),
                'approved' => new external_value(PARAM_INT, 'Approved'),
                'start_time' => new external_value(PARAM_RAW, 'Start Time'),
                'end_time' => new external_value(PARAM_RAW, 'End Time'),
                'start_date' => new external_value(PARAM_RAW, 'Start Date'),
                'end_date' => new external_value(PARAM_RAW, 'End Date'),
                'slot_price' => new external_value(PARAM_TEXT, 'Slot Price'),
                'saturday' => new external_value(PARAM_TEXT, 'Series Days'),
                'sunday' => new external_value(PARAM_TEXT, 'Series Days'),
                'monday' => new external_value(PARAM_TEXT, 'Series Days'),
                'tuesday' => new external_value(PARAM_TEXT, 'Series Days'),
                'wednesday' => new external_value(PARAM_TEXT, 'Series Days'),
                'thursday' => new external_value(PARAM_TEXT, 'Series Days'),
                'friday' => new external_value(PARAM_TEXT, 'Series Days'),
            ]))
        ]);
    }
    public static function add_mentor_series($data)
    {
        global $DB;
        $result = insert_series($data);
        $res = $DB->get_records('mentor_available_series', ['id' => $result]);
        if ($result)
            return sendResponseSuccess($res, "Data Inserted Successfully");
        return sendResponseFailed("Data Not Inserted");

    }
    public static function add_mentor_series_returns()
    {
        return new external_single_structure(returnValue());

    }


    //Get All Mentor Series Data
    public static function get_mentor_series_parameters()
    {
        return new external_function_parameters([]);
    }
    public static function get_mentor_series()
    {
        global $DB;
        $data = $DB->get_records('mentor_available_series');
        if ($data)
            return sendResponseSuccess($data, "Data Fetched Successfully");
        return sendResponseFailed("Data Retrieve Failed");

    }
    public static function get_mentor_series_returns()
    {
        return new external_single_structure(returnValue());
    }


    //Update Series Record 
    public static function update_mentor_series_parameters()
    {
        return new external_function_parameters(inputValue());
    }

    public static function update_mentor_series($data)
    {
        global $DB;
        $resArray = [];
        $recordId = update_series($data);
        $res = $DB->get_record('mentor_available_series', ['id' => $recordId]);
        if ($res) {
            array_push($resArray, $res);
            return sendResponseSuccess($resArray, "Data Updated Successfully");
        }

        return sendResponseFailed("Data Updated Successfully");

    }

    public static function update_mentor_series_returns()
    {
        return new external_single_structure(returnValue());
    }


    //Delete Mentor Series Record
    public static function delete_mentor_series_parameters()
    {
        return new external_function_parameters([
            'id' => new external_value(PARAM_INT, 'id')
        ]);
    }

    public static function delete_mentor_series($id)
    {
        $resArray = [];
        $result = (array) delete_series($id);
        if (count($result) == 0) {
            return sendResponseFailed("No Record Found");
        } else {
            array_push($resArray, $result);
            return sendResponseSuccess($resArray, "Data Deleted Successfully");
        }
    }

    public static function delete_mentor_series_returns()
    {

        return new external_single_structure(returnValue());
    }


    //Mentorship Series Approval
    public static function approve_mentor_series_parameters()
    {
        return new external_function_parameters([
            'data' => new external_multiple_structure((new external_single_structure([
                'id' => new external_value(PARAM_INT, 'id'),
                'session_price' => new external_value(PARAM_INT, 'Mentor ID'),
                'session_duration' => new external_value(PARAM_INT, 'Approved'),
            ])))
        ]);
    }

    public static function approve_mentor_series($data)
    {

        global $DB;
        $result = approve_series($data);
        $resArray = [];
        if (!$result) {
            return sendResponseFailed("Series already approved or No Records Found");
        } else {
            
            $timeSlots = $DB->get_records('mentor_available_date_slots', ['series_id' => $data[0]['id']]);
            $result->time_slots = $timeSlots;
            array_push($resArray, $result);
            return sendResponseSuccess($resArray, "Approved & Time slot created Successfully");
        }
    }

    public static function approve_mentor_series_returns()
    {
        return new external_single_structure(returnValue(1));
    }

    //Fetch all records 
    public static function get_mentor_series_with_slots_parameters()
    {
        return new external_function_parameters([
            'id' => new external_value(PARAM_INT, 'id')
        ]);
    }
    public static function get_mentor_series_with_slots($id)
    {
        global $DB;
        $result = get_series_with_slots($id);
        $resArray = [];
        if (count($result) == 0) {
            return sendResponseFailed("No Record Found");
        } else {

            $timeSlots = $DB->get_records('mentor_available_date_slots', ['series_id' => $id]);
            $result->available_days = ucwords(implode(', ', get_available_day($result)));
            $result->time_slots = $timeSlots;
            array_push($resArray, $result);
            return sendResponseSuccess($resArray, "Approved & Time slot Retrived Successfully");
        }
    }
    public static function get_mentor_series_with_slots_returns()
    {
        return new external_single_structure(returnValue(1)); //1 is for fetch return parameters
    }

    //Update Mentor Available Slots Table
    public static function update_mentor_available_slots_parameters()
    {
        return new external_function_parameters(inputValue(2)); //2 is for update input parameters
    }

    public static function update_mentor_available_slots($data)
    {

        $resArray = [];
        $result = update_available_slot($data);
        if (count($result) == 0) {
            return sendResponseFailed("No Record Found");
        } else {
            array_push($resArray, $result);
            return sendResponseSuccess($resArray, "Slot Updated Successfully");
        }
    }

    public static function update_mentor_available_slots_returns()
    {
        return new external_single_structure(returnValue(2)); //2 is for update return parameters
    }

    public static function delete_mentor_series_single_slot_parameters()
    {
        return new external_function_parameters([
            'id' => new external_value(PARAM_INT, 'id')
        ]);
    }

    public static function delete_mentor_series_single_slot($id)
    {
        $result = delete_mentor_series_vailable_time_slot($id);
        $resArray = [];
        if (count($result) == 0) {
            return sendResponseFailed("No Record Found");
        } else {
            array_push($resArray, $result);
            return sendResponseSuccess($resArray, "Data Deleted Successfully");
        }

    }

    public static function delete_mentor_series_single_slot_returns()
    {
        return new external_single_structure(returnValue(2)); //2 is for delete return parameters
    }

    //Mentor Sessions
    public function get_sessions_time_slots_parameters()
    {
        return new external_function_parameters([
            'date' => new external_value(PARAM_RAW, 'date'),
        ]);
    }

    public function get_sessions_time_slots($date)
    {
        $resuts = get_sessions_times($date);

        return sendResponseSuccess($resuts, "Data Fetched Successfully");
    }

    public function get_sessions_time_slots_returns()
    {
        return new external_single_structure(
            [
                'data' => new external_multiple_structure(new external_single_structure([
                    'slot_start_time' => new external_value(PARAM_TEXT, 'start time'),
                    'slot_end_time' => new external_value(PARAM_TEXT, 'end time'),
                    'active' => new external_value(PARAM_INT, 'Active status'),
                ]))
            ]
        );
    }

}