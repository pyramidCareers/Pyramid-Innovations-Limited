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
 * Library function for auth_pyramid plugin.
 *
 * @package   auth_pyramid
 * @copyright 2022 Brain Station 23
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * Assign capabilities to a role based on the category context.
 *
 * @param string $roleid The roleid
 * @param string $contextid The contextid
 */
function auth_pyramid_assign_capabilities($roleid, $contextid) {
    $capabilitylist = auth_get_capability_list();
    foreach ($capabilitylist as $capability) {
        assign_capability($capability, 1, $roleid, $contextid);

    }

    // Reset any cache of this role, including MUC.
    accesslib_clear_role_cache($roleid);
}

/**
 * Returns the capability list to be given to a specific role.
 * 
 */
function auth_get_capability_list() {

    // List of capabilites need to be assigned to the specific role. 
    // TODO: Make capability list dynamic using get_config() function.
    $capabilitylist = [
        'moodle/category:manage', 
        'moodle/category:viewcourselist',
        'moodle/course:create',
        'mod/quiz:addinstance',
        'moodle/question:add',
        'moodle/question:editall',
        'moodle/question:editmine',
        'moodle/question:flag',
        'moodle/question:managecategory',
        'moodle/question:moveall',
        'moodle/question:viewall',
        'moodle/question:viewmine',
        'mod/quiz:attempt',
        'mod/quiz:deleteattempts',
        'mod/quiz:emailconfirmsubmission',
        'mod/quiz:emailnotifysubmission',
        'mod/quiz:emailwarnoverdue',
        'mod/quiz:grade',
        'mod/quiz:ignoretimelimits',
        'mod/quiz:manage',
        'mod/quiz:manageoverrides',
        'mod/quiz:regrade',
        'mod/quiz:view',
        'mod/quiz:viewoverrides',
        'mod/quiz:viewreports',
    ];

    return $capabilitylist;
}

/**
 * Returns the context object based on the category id.
 * 
 * @param int $categoryid The category id
 * @return object $context The context object
 */
function auth_pyramid_get_context($categoryid) {
    global $DB;
    // Course category context level = 40.
    $context = $DB->get_record('context', array('contextlevel' => 40, 'instanceid' => $categoryid));
    return $context;
}

/**
 * Makes the specified user a siteadmin.
 * 
 * @param int $userid The userid
 */
function auth_pyramid_create_a_siteadmin($userid) {
    global $CFG;
    $admins = array();
    foreach (explode(',', $CFG->siteadmins) as $admin) {
        $admin = (int)$admin;
        if ($admin) {
            $admins[$admin] = $admin;
        }
    }

    $logstringold = implode(', ', $admins);

    $admins[$userid] = $userid;

    $logstringnew = implode(', ', $admins);

    set_config('siteadmins', implode(',', $admins));
    add_to_config_log('siteadmins', $logstringold, $logstringnew, 'core');
}


/**
 * Returns response for user type: Employer.
 * 
 * @param object The user object
 * @param int The HTTP response code
 * @return json
 */
function auth_pyramid_json_response($data, $code) {
    global $USER;
    $data = [
        'success' => true,
        // 'data' => [
        //     'id'        => $userinfo->id,
        //     'firstname' => $userinfo->firstname,
        //     'lastname'  => $userinfo->lastname,
        //     'email'     => $userinfo->email,
        //     'user_type' => $userinfo->usertype,
        //     'token'     => $userinfo->token,
        //     'sesskey'   => $USER->sesskey,
        //     'auth'      => $userinfo->auth,
        // ]
        'data' => $data,
    ];

    header('Content-type: application/json');
    http_response_code($code);
    echo json_encode($data);
    exit();
}

/**
 * Reponse error json
 * @param string Error message
 * @return json
 */
function auth_pyramid_error_response($message, $code=400) {
    $data = [
        'success' => false,
        'data' => [],
        'error' => [
            'message' => $message,
            'code' => $code,
        ]
    ];

    header('Content-type: application/json');
    http_response_code($code);
    echo json_encode($data);
    exit();
}


/**
 * Get token for a user. 
 * 

 * @param object $userinfo
 * @param string $servicename
 * 
 * @return string $token
 */
function auth_pyramid_get_token($userinfo, $servicename) {

    global $CFG, $DB, $USER;

    $username = $userinfo->username;
    $password = $userinfo->password;
    $username = trim(core_text::strtolower($username));
    if (is_restored_user($username)) {
        throw new moodle_exception('restoredaccountresetpassword', 'webservice');
    }

    $systemcontext = context_system::instance();

    $reason = null;
    $user = $DB->get_record('user', array('username' => $username));
    //$user = authenticate_user_login($username, $password, false, $reason, false);
    if (!empty($user)) {

        // Cannot authenticate unless maintenance access is granted.
        $hasmaintenanceaccess = has_capability('moodle/site:maintenanceaccess', $systemcontext, $user);
        if (!empty($CFG->maintenance_enabled) and !$hasmaintenanceaccess) {
            throw new moodle_exception('sitemaintenance', 'admin');
        }

        if (isguestuser($user)) {
            throw new moodle_exception('noguest');
        }
        if (empty($user->confirmed)) {
            throw new moodle_exception('usernotconfirmed', 'moodle', '', $user->username);
        }
        // check credential expiry
        $userauth = get_auth_plugin($user->auth);
        if (!empty($userauth->config->expiration) and $userauth->config->expiration == 1) {
            $days2expire = $userauth->password_expire($user->username);
            if (intval($days2expire) < 0 ) {
                throw new moodle_exception('passwordisexpired', 'webservice');
            }
        }

        // let enrol plugins deal with new enrolments if necessary
        enrol_check_plugins($user);

        // setup user session to check capability
        \core\session\manager::set_user($user);

        //check if the service exists and is enabled
        $service = $DB->get_record('external_services', array('shortname' => $servicename, 'enabled' => 1));
        if (empty($service)) {
            // will throw exception if no token found
            throw new moodle_exception('servicenotavailable', 'webservice');
        }

        // Get an existing token or create a new one.
        $token = external_generate_token_for_current_user($service);
        $privatetoken = $token->privatetoken;
        external_log_token_request($token);

        $siteadmin = has_capability('moodle/site:config', $systemcontext, $USER->id);

        $usertoken = new stdClass;
        $usertoken->token = $token->token;
        // Private token, only transmitted to https sites and non-admin users.
        if (is_https() and !$siteadmin) {
            $usertoken->privatetoken = $privatetoken;
        } else {
            $usertoken->privatetoken = null;
        }
        return $usertoken->token;
    } else {
        throw new moodle_exception('invalidlogin');
    }
}
