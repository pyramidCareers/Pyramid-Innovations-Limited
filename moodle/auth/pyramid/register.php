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
 * Callback to register the user. 
 *
 * @package   auth_pyramid
 * @copyright 2022 Brain Station 23
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once('../../config.php');
require_once($CFG->dirroot . '/auth/pyramid/auth.php');
require_once($CFG->dirroot . '/auth/pyramid/lib.php');

defined('MOODLE_INTERNAL') || die();

$username   = required_param('username', PARAM_TEXT);
$email      = required_param('email', PARAM_TEXT);
$password   = required_param('password', PARAM_TEXT);
$firstname  = required_param('firstname', PARAM_TEXT);
$lastname   = required_param('lastname', PARAM_TEXT);
$usertype   = required_param('user_type', PARAM_TEXT);

$userinfo = new stdClass();

$userinfo->username = $username;
$userinfo->email    = $email;
$userinfo->password = $password;
$userinfo->firstname = $firstname;
$userinfo->lastname = $lastname;
$userinfo->usertype = $usertype;

foreach($userinfo as $key => $value) {
    if(!$value) {
        auth_pyramid_error_response(get_string('missing_params', 'auth_pyramid', $key), 400);
        exit;
    }
}

// Get the pyramid plugin instance.
$authplugin = get_auth_plugin('pyramid');

if(isset($authplugin))
{
    $authplugin->register($userinfo);
} else {
    auth_pyramid_error_response(get_string('plugin_not_found', 'auth_pyramid'), 400);
}