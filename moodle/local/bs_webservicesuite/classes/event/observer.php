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
 * Observer class.
 *
 * @package    local_bs_webservicesuit
 * @copyright  2023 Brain Station 23 LTD.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
namespace local_bs_webservicesuite\event;

defined('MOODLE_INTERNAL') || die();
global $CFG;

use core\event\course_completed;

use stdClass;

class observer
{
    public static function on_course_completion(course_completed $event) {
        global $DB, $CFG;

        require_once($CFG->dirroot.'/local/bs_webservicesuite/lib.php');
        $event->get_data();

        $data = new stdClass();
        $data->course_id = $event->courseid;
        $data->user_id = $event->userid;
        $data->sync_flag = 0;
        $data->timesynced = 0;
        $data->api_log = '';
        $data->time_completed = time();
        // var_dump($data);
        // die;

        // echo $event->courseid;
        // $DB->insert_record('ws_course_completion_sync', $data);
        if(!$DB->get_record('ws_course_completion_sync', ['user_id' => $event->userid, 'course_id' => $event->courseid])) {
            $DB->insert_record('ws_course_completion_sync', $data);
        }
    }
}