<?php

function insert_series($data)
{
    global $DB;
    $data = (object) $data[0];

    $record = new stdClass();
    $record->mentor_id = $data->mentor_id;
    $record->approved = $data->approved;
    $record->start_time = $data->start_time;
    $record->end_time = $data->end_time;
    $record->start_date = $data->start_date;
    $record->end_date = $data->end_date;
    $record->saturday = $data->saturday;
    $record->sunday = $data->sunday;
    $record->monday = $data->monday;
    $record->tuesday = $data->tuesday;
    $record->wednesday = $data->wednesday;
    $record->thursday = $data->thursday;
    $record->friday = $data->friday;

    $res = $DB->insert_record('mentor_available_series', $record);
    return $res;

}

function update_series($data)
{
    global $DB;
    $result = [];
    $data = (object) $data[0];
    $exists = $DB->get_record('mentor_available_series', ['id' => $data->id]);
    if ($exists) {
        $exists->mentor_id = $data->mentor_id;
        $exists->approved = $data->approved;
        $exists->start_time = $data->start_time;
        $exists->end_time = $data->end_time;
        $exists->start_date = $data->start_date;
        $exists->end_date = $data->end_date;
        $exists->session_price = $data->session_price;
        $exists->session_duration = $data->session_duration;
        $exists->saturday = $data->saturday;
        $exists->sunday = $data->sunday;
        $exists->monday = $data->monday;
        $exists->tuesday = $data->tuesday;
        $exists->wednesday = $data->wednesday;
        $exists->thursday = $data->thursday;
        $exists->friday = $data->friday;
        $result = $DB->update_record('mentor_available_series', $exists);
        return $exists->id;
    }
    return $result;

}

function delete_series($id)
{
    global $DB;
    $record = $DB->get_record('mentor_available_series', ['id' => $id]);
    $result = $DB->delete_records('mentor_available_series', ['id' => $id]);

    if ($record && !$result == false) {
        $DB->delete_records('mentor_available_date_slots', ['series_id' => $id]);
        return $record;
    }

    return [];
}


function approve_series($data)
{
    global $DB;
    $info = (object) $data[0];
    $mentor_available_time_slots = [];
    $counter = 0;
    $record = $DB->get_record('mentor_available_series', ['id' =>$info->id, 'approved' => 0]);
    if ($record) {
        $record->approved = 1;
        $record->session_price = $info->session_price;
        $record->session_duration = $info->session_duration;
        $result = $DB->update_record('mentor_available_series', $record);
        $availableDate = get_available_day($record);
        if ($result) {
            $date1 = new DateTime($record->start_date);
            $date2 = new DateTime($record->end_date);
            // Calculate the difference between the two dates
            $interval = new DateInterval('P1D');
            $currentDate = $date1;
            $time1 = new DateTime($currentDate->format('Y-m-d') . ' ' . $record->start_time);
            $time2 = new DateTime($currentDate->format('Y-m-d') . ' ' . $record->end_time);

            // Loop through and print the dates
            while ($currentDate < $date2) {

                if (in_array(strtolower(get_current_day($currentDate)), $availableDate)) {
                    $counter++; //for Counting the number of rows will be inserted
                    $data = new stdClass();
                    $data->series_id = $record->id;
                    $data->date = $currentDate->format('Y-m-d');
                    $data->slot_start_time = $record->start_time;
                    $data->slot_end_time = $record->end_time;
                    $data->available = 1;
                    $data->slot_duration = $time1->diff($time2)->format('%H');
                    $data->active = 1;
                    array_push($mentor_available_time_slots, (array) $data);
                }
                // Increment the date by 1 day
                $currentDate->add($interval);
            }
            $DB->insert_records('mentor_available_date_slots', $mentor_available_time_slots);
            $numOfRecords = $DB->get_records('mentor_available_date_slots', ['series_id' => $info->id]); //for checking is records are inserted or not
            if ($counter == count($numOfRecords)) {
                $record->available_days = ucwords(implode(', ', $availableDate));
                return $record;
            }
            return [];

        }
    }
    return [];

}


function get_series_with_slots($id)
{

    global $DB;
    $record = $DB->get_record('mentor_available_series', ['id' => $id]);
    if ($record)
        return $record;
    return [];
}
function update_available_slot($data)
{
    global $DB;
    $slotData = (object) $data[0];
    $exists = $DB->get_record('mentor_available_date_slots', ['id' => $slotData->id]);
    if ($exists) {
        $exists->date = $slotData->date;
        $exists->slot_start_time = $slotData->slot_start_time;
        $exists->slot_end_time = $slotData->slot_end_time;
        $exists->available = $slotData->available;
        $exists->slot_duration = $slotData->slot_duration;
        $exists->active = $slotData->active;
        $result = $DB->update_record('mentor_available_date_slots', $exists);
        if ($result) {
            return $exists;
        }
    }
    return [];
}

function delete_mentor_series_vailable_time_slot($id)
{
    global $DB;

    $record = $DB->get_record('mentor_available_date_slots', ['id' => $id]);
    $result = $DB->delete_records('mentor_available_date_slots', ['id' => $id]);

    if ($result)
        return $record;
    return [];
}


function get_sessions_times($date)
{
    global $DB;
    $sql = "SELECT slot_start_time, slot_end_time,active
    FROM {mentor_available_date_slots}
    WHERE date = :dates";

    // Define parameters to bind to the query
    $params = ['dates' => $date];

    // Execute the query
    $records = $DB->get_records_sql($sql, $params);
    //$times = $DB->get_records('mentor_available_date_slots', ['date' => $date]);
    return $records;

}

//-----------------------Common Functions-------------------------------

function get_current_day($currentDate)
{

    return $currentDate->format('l');
}
function get_available_day($record)
{
    $dayName = [];
    $days = new stdClass();
    $days->saturday = $record->saturday;
    $days->sunday = $record->sunday;
    $days->monday = $record->monday;
    $days->tuesday = $record->tuesday;
    $days->wednesday = $record->wednesday;
    $days->thursday = $record->thursday;
    $days->friday = $record->friday;

    foreach ($days as $key => $day) {
        if ($day == 1)
            array_push($dayName, $key);
    }
    return $dayName;
}

function sendResponseFailed($message)
{
    return ['status' => false, 'message' => $message, 'data' => []];
}

function sendResponseSuccess($data, $message)
{
    return ['status' => true, 'message' => $message, 'data' => $data];
}

function returnValue($data = null)
{
    if ($data == 1) {
        return [
            'status' => new external_value(PARAM_BOOL, 'status'),
            'message' => new external_value(PARAM_RAW, 'message'),
            'data' => new external_multiple_structure(new external_single_structure([
                'id' => new external_value(PARAM_INT, 'id'),
                'mentor_id' => new external_value(PARAM_INT, 'Mentor ID'),
                'approved' => new external_value(PARAM_INT, 'Approved'),
                'start_time' => new external_value(PARAM_RAW, 'Start Time'),
                'end_time' => new external_value(PARAM_RAW, 'End Time'),
                'start_date' => new external_value(PARAM_RAW, 'Start Date'),
                'end_date' => new external_value(PARAM_RAW, 'End Date'),
                'session_price' => new external_value(PARAM_TEXT, 'Slot Price'),
                'session_duration' => new external_value(PARAM_INT,'Slot Duration'),
                'available_days' => new external_value(PARAM_RAW, 'Available Days'),
                'time_slots' => new external_multiple_structure((new external_single_structure([
                    'id' => new external_value(PARAM_INT, 'id'),
                    'series_id' => new external_value(PARAM_INT, 'Mentor ID'),
                    'date' => new external_value(PARAM_TEXT, 'Approved'),
                    'slot_start_time' => new external_value(PARAM_TEXT, 'Start Time'),
                    'slot_end_time' => new external_value(PARAM_TEXT, 'End Time'),
                    'available' => new external_value(PARAM_INT, 'available status'),
                    'slot_duration' => new external_value(PARAM_TEXT, 'Slot duration'),
                ])))
            ])),

        ];
    } elseif ($data == 2) {
        //return parameter of update_mentor_available_slots
        return [
            'status' => new external_value(PARAM_BOOL, 'status'),
            'message' => new external_value(PARAM_RAW, 'message'),
            'data' => new external_multiple_structure((new external_single_structure([
                'id' => new external_value(PARAM_INT, 'id'),
                'series_id' => new external_value(PARAM_INT, 'Mentor ID'),
                'date' => new external_value(PARAM_TEXT, 'Approved'),
                'slot_start_time' => new external_value(PARAM_TEXT, 'Start Time'),
                'slot_end_time' => new external_value(PARAM_TEXT, 'End Time'),
                'available' => new external_value(PARAM_INT, 'available status'),
                'slot_duration' => new external_value(PARAM_TEXT, 'Slot duration'),
                'active' => new external_value(PARAM_INT, 'Slot Status'),
            ])))
        ];


    }
    return [
        'status' => new external_value(PARAM_BOOL, 'status'),
        'message' => new external_value(PARAM_RAW, 'message'),
        'data' => new external_multiple_structure(new external_single_structure([
            'id' => new external_value(PARAM_INT, 'id'),
            'mentor_id' => new external_value(PARAM_INT, 'Mentor ID'),
            'approved' => new external_value(PARAM_INT, 'Approved'),
            'start_time' => new external_value(PARAM_RAW, 'Start Time'),
            'end_time' => new external_value(PARAM_RAW, 'End Time'),
            'start_date' => new external_value(PARAM_RAW, 'Start Date'),
            'end_date' => new external_value(PARAM_RAW, 'End Date'),
            'session_price' => new external_value(PARAM_TEXT, 'Slot Price'),
            'session_duration' => new external_value(PARAM_INT,'Slot Duration'),
            'saturday' => new external_value(PARAM_TEXT, 'Series Days'),
            'sunday' => new external_value(PARAM_TEXT, 'Series Days'),
            'monday' => new external_value(PARAM_TEXT, 'Series Days'),
            'tuesday' => new external_value(PARAM_TEXT, 'Series Days'),
            'wednesday' => new external_value(PARAM_TEXT, 'Series Days'),
            'thursday' => new external_value(PARAM_TEXT, 'Series Days'),
            'friday' => new external_value(PARAM_TEXT, 'Series Days'),
        ])),

    ];
}

function inputValue($data = null)
{

    if ($data == 2) {
        return [
            'data' => new external_multiple_structure((new external_single_structure([
                'id' => new external_value(PARAM_INT, 'id'),
                'series_id' => new external_value(PARAM_INT, 'Mentor ID'),
                'date' => new external_value(PARAM_TEXT, 'Approved'),
                'slot_start_time' => new external_value(PARAM_TEXT, 'Start Time'),
                'slot_end_time' => new external_value(PARAM_TEXT, 'End Time'),
                'available' => new external_value(PARAM_INT, 'available status'),
                'slot_duration' => new external_value(PARAM_TEXT, 'Slot duration'),
                'active' => new external_value(PARAM_INT, 'Slot Status'),
            ])))
        ];
    }

    return [
        'data' => new external_multiple_structure(new external_single_structure([
            'id' => new external_value(PARAM_INT, 'id'),
            'mentor_id' => new external_value(PARAM_INT, 'Mentor ID'),
            'approved' => new external_value(PARAM_INT, 'Approved'),
            'start_time' => new external_value(PARAM_RAW, 'Start Time'),
            'end_time' => new external_value(PARAM_RAW, 'End Time'),
            'start_date' => new external_value(PARAM_RAW, 'Start Date'),
            'end_date' => new external_value(PARAM_RAW, 'End Date'),
            'session_price' => new external_value(PARAM_TEXT, 'Slot Price'),
            'session_duration'=>new external_value(PARAM_INT,'Slot Duration'),
            'saturday' => new external_value(PARAM_TEXT, 'Series Days'),
            'sunday' => new external_value(PARAM_TEXT, 'Series Days'),
            'monday' => new external_value(PARAM_TEXT, 'Series Days'),
            'tuesday' => new external_value(PARAM_TEXT, 'Series Days'),
            'wednesday' => new external_value(PARAM_TEXT, 'Series Days'),
            'thursday' => new external_value(PARAM_TEXT, 'Series Days'),
            'friday' => new external_value(PARAM_TEXT, 'Series Days'),
        ]))
    ];
}
//-----------------------Common Functions-------------------------------