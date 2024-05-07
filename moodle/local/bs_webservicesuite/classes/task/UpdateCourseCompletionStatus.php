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
 * Scheduled tasks to sync course completion data.
 *
 * @package    local_bs_webservicesuite.
 * @copyright  2023 Brain Station 23 LTD.
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace local_bs_webservicesuite\task;

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot.'/local/bs_webservicesuite/lib.php');

class UpdateCourseCompletionStatus extends \core\task\scheduled_task
{
    public function get_name() {
        return get_string('update_completion_status', 'local_bs_webservicesuite');
    }

    public function execute() {

        local_bs_werservicesuite_update_completion_status();
    }
}