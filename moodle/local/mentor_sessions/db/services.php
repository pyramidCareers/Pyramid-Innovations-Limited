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
 * Web service local plugin template external functions and service definitions.
 *
 * @package    local
 * @subpackage mentor_sessions
 * @author     Brain station 23 ltd <brainstation-23.com>
 * @copyright  2023 Brain station 23 ltd
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

// We defined the web service functions to install.
$functions = array(
    'add_mentor_series' => array(
        'classname' => 'local_mentor_sessions_external',
        'methodname' => 'add_mentor_series',
        'classpath' => 'local/mentor_sessions/externallib.php',
        'description' => 'Function for creating Mentors Series',
        'ajax' => true,
        'type' => 'write',
        'services' => array(MOODLE_OFFICIAL_MOBILE_SERVICE),
    ),
    'get_mentor_series' => array(
        'classname' => 'local_mentor_sessions_external',
        'methodname' => 'get_mentor_series',
        'classpath' => 'local/mentor_sessions/externallib.php',
        'description' => 'Function for get Mentors Series',
        'ajax' => true,
        'type' => 'read',
        'services' => array(MOODLE_OFFICIAL_MOBILE_SERVICE)

    ),
    'update_mentor_series' => array(
        'classname' => 'local_mentor_sessions_external',
        'methodname' => 'update_mentor_series',
        'classpath' => 'local/mentor_sessions/externallib.php',
        'description' => 'Function for get Mentors Series',
        'ajax' => true,
        'type' => 'write',
        'services' => array(MOODLE_OFFICIAL_MOBILE_SERVICE)

    ),
    'delete_mentor_series' => array(
        'classname' => 'local_mentor_sessions_external',
        'methodname' => 'delete_mentor_series',
        'classpath' => 'local/mentor_sessions/externallib.php',
        'description' => 'Function for get Mentors Series',
        'ajax' => true,
        'type' => 'write',
        'services' => array(MOODLE_OFFICIAL_MOBILE_SERVICE)

    ),
    'approve_mentor_series' => array(
        'classname' => 'local_mentor_sessions_external',
        'methodname' => 'approve_mentor_series',
        'classpath' => 'local/mentor_sessions/externallib.php',
        'description' => 'Function for get Mentors Series',
        'ajax' => true,
        'type' => 'write',
        'services' => array(MOODLE_OFFICIAL_MOBILE_SERVICE)
    ),
    'get_mentor_series_with_slots' => array(
        'classname' => 'local_mentor_sessions_external',
        'methodname' => 'get_mentor_series_with_slots',
        'classpath' => 'local/mentor_sessions/externallib.php',
        'description' => 'Function for get Mentors Series',
        'ajax' => true,
        'type' => 'read',
        'services' => array(MOODLE_OFFICIAL_MOBILE_SERVICE)

    ),
    'update_mentor_available_slots' => array(
        'classname' => 'local_mentor_sessions_external',
        'methodname' => 'update_mentor_available_slots',
        'classpath' => 'local/mentor_sessions/externallib.php',
        'description' => 'Function for get Mentors Series',
        'ajax' => true,
        'type' => 'write',
        'services' => array(MOODLE_OFFICIAL_MOBILE_SERVICE)

    ),
    'delete_mentor_series_single_slot' => array(
        'classname' => 'local_mentor_sessions_external',
        'methodname' => 'delete_mentor_series_single_slot',
        'classpath' => 'local/mentor_sessions/externallib.php',
        'description' => 'Function for get Mentors Series',
        'ajax' => true,
        'type' => 'write',
        'services' => array(MOODLE_OFFICIAL_MOBILE_SERVICE)

    ),
    'get_sessions_time_slots' => array(
        'classname' => 'local_mentor_sessions_external',
        'methodname' => 'get_sessions_time_slots',
        'classpath' => 'local/mentor_sessions/externallib.php',
        'description' => 'Function for get Mentors Series',
        'ajax' => true,
        'type' => 'write',
        'services' => array(MOODLE_OFFICIAL_MOBILE_SERVICE)

    )

);