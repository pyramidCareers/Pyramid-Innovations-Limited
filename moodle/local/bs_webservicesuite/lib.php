<?php

// This file is part of Moodle - http://moodle.org/
//
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
 * Version information
 *
 * @package    local_bs_webservicesuite
 * @copyright  2023 Brain Station 23 LTD.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Function to update or sync course completion status with laravel.
 */
function local_bs_werservicesuite_update_completion_status() {
    global $DB;

    $records = $DB->get_records('ws_course_completion_sync', array('sync_flag' => 0));

    if($records){
        foreach($records as $record) {

            // TODO: Implement laravel API to update course completion status in laravel DB.
            $url = get_config('local_bs_webservicesuite', 'job_portal_url') . '/api/update-pet-status';
            $header = array(
                'Content-Type:application/json',
            );
            $data = array(
                'moodle_user_id' => $record->user_id,
                'course_id' => $record->course_id,
            );

            $data = json_encode($data);
            
            $response = curlWithBody($url, $header, 'POST', $data);

            $response = json_decode($response, true);

            if($response['status'] == 'true') {
                $record->sync_flag = 1;
                $record->timesynced = time();
                $record->api_log = $response['message'];
                $DB->update_record('ws_course_completion_sync', $record);
            }
            
        }
    }
}

function curlWithBody($url,$header,$method,$body_data_json){
    $curl = curl_init($url);
    curl_setopt($curl,CURLOPT_HTTPHEADER, $header);
    curl_setopt($curl,CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl,CURLOPT_POSTFIELDS, $body_data_json);
    curl_setopt($curl,CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($curl, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
    $response = curl_exec($curl);
    curl_close($curl);
    return $response;
}