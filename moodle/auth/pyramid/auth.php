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
 * Authentication for auth_pyramid plugin.
 *
 * @package   auth_pyramid
 * @copyright 2022 Brain Station 23
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->libdir.'/authlib.php');
require_once($CFG->dirroot."/user/profile/lib.php");
require_once($CFG->libdir . '/externallib.php');
require_once($CFG->dirroot.'/course/lib.php');
require_once($CFG->dirroot.'/lib/accesslib.php');
require_once($CFG->dirroot.'/auth/pyramid/lib.php');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
 * Plugin for cdp authentication.
 */
class auth_plugin_pyramid extends auth_plugin_base {

    /**
     * Constructor.
     * @throws dml_exception
     */
    public function __construct() {
        $this->authtype = 'pyramid';
        $this->config = get_config('auth_pyramid');
    }

    /**
     * Returns true if the username and password work or don't exist and false
     * if the user exists and the password is wrong.
     *
     * @param string $username The username
     * @param string $password The password
     * @return bool Authentication success or failure.
     * @throws dml_exception
     */
    function user_login ($username, $password) {
        global $CFG, $DB;
        if ($user = $DB->get_record('user', array('username'=>$username, 'mnethostid'=>$CFG->mnet_localhost_id, 'auth'=>'pyramid'))) {

            if(!isset($_REQUEST['logintoken']) && $_SERVER['REQUEST_METHOD'] == 'GET' && isset($_REQUEST['id'])){
                return true;
            } else {
                return validate_internal_user_password($user, $password);
            }
        }
        return false;
    }

    /**
     * Updates the user's password.
     *
     * called when the user password is updated.
     *
     * @param object $user User table object
     * @param string $newpassword Plaintext password
     * @return boolean result
     *
     * @throws dml_exception
     */
    function user_update_password($user, $newpassword) {
        $user = get_complete_user_data('id', $user->id);
        // This will also update the stored hash to the latest algorithm
        // if the existing hash is using an out-of-date algorithm (or the
        // legacy md5 algorithm).
        return update_internal_user_password($user, $newpassword);
    }

    /**
     * Returns true if this authentication plugin doesn't support local passwords -  which we don't so we
     * store 'not_cached' in the user table.
     *
     * {@inheritDoc}
     * @see auth_plugin_base::prevent_local_passwords()
     *
     * return bool
     */
    function prevent_local_passwords() {
        return false;
    }

    /**
     * Returns true if this authentication plugin is 'internal'.
     *
     * @return bool
     */
    function is_internal() {
        return true;
    }


    /**
     * Returns true if this authentication plugin can change the user's
     * password.
     *
     * @return bool
     */
    function can_change_password() {
        return false;
    }

    /**
     * Returns the URL for changing the user's pw, or empty if the default can
     * be used.
     *
     * @return moodle_url|null
     */
    function change_password_url() {
        return null;
    }

    /**
     * Returns true if this authentication plugin can edit the users' profile.
     *
     * @return false
     */
    function can_edit_profile(){
        return false;
    }

    /**
     * Returns the URL for editing users' profile, or empty if the defaults URL can be used.
     *
     * @return null
     */
    function edit_profile_url(){
        return null;
    }

    /**
     * Returns true if plugin allows resetting of internal password.
     *
     * @return bool
     */
    function can_reset_password() {
        return false;
    }

    /**
     * Returns true if plugin can be manually set.
     *
     * @return bool
     */
    function can_be_manually_set() {
        return true;
    }


    /**
     * Calls register for registering a user into moodle with required parameters.
     * 
     * @param object The object contains user info from params.
     *
     */
    public function register($userinfo) {
        global $DB, $USER;
        try{

            if ($userinfo->email) {
                $user = $DB->get_record('user',array('email' => $userinfo->email));

                // Handles the exception if the username or email already exists.
                if($user){
                    // Send error response in API.
                    auth_pyramid_error_response(get_string('user_exists_error', 'auth_pyramid'), 403);
                    return;
                }
                
                $id = $this->create_pyramid_user($userinfo);
                $user = $DB->get_record('user', array('id' => $id));
                
                // Now Complete the Login Cycle
                complete_user_login($user);

                // Get user token for 'moodle_mobile_app' service.
                $token = auth_pyramid_get_token($userinfo, 'moodle_mobile_app');
                $user->usertype = $userinfo->usertype;
                $user->token = $token;


                if($userinfo->usertype === 'admin') {
                    // Assigning role to admin.
                    auth_pyramid_create_a_siteadmin($user->id);
                } else {
                    // Assigning role to jobseeker/employer/mentor.
                    $roleid = $DB->get_record('role', ['shortname' => $userinfo->usertype])->id;
                    if ($roleid) {
                        role_assign($roleid, $id, 1);
                    }
                }

                $userdata = [
                    'id'        => $user->id,
                    'firstname' => $user->firstname,
                    'lastname'  => $user->lastname,
                    'email'     => $user->email,
                    'password'  => $userinfo->password,
                    'token'     => $user->token,
                    'user_type' => $user->usertype,
                    'sesskey'   => $USER->sesskey,
                    'auth'      => $user->auth,
                ];
                
                auth_pyramid_json_response($userdata, 201);
                
            } else{
                auth_pyramid_error_response(get_string('invalid_paramters', 'auth_pyramid'), 400);
            }

        } catch (Exception $e){
            auth_pyramid_error_response($e->getMessage(), 400);
        }
    }
    /**
     * Login function of a user.
     * 
     * @param object The object contains user info from params.
     *
     */
    public function login($userinfo) {
        global $DB, $USER;
        try{

            if ($userinfo->email) {
                $user = $DB->get_record('user',array('email' => $userinfo->email));

                // Handles the exception if the username or email doesn't exist.
                if(!$user){
                    // Send error response in API.
                    auth_pyramid_error_response(get_string('user_doesnt_exist', 'auth_pyramid'), 404);
                    return;
                }
                if($this->user_login($userinfo->username, $userinfo->password)) {
                    // Now completes the user login.
                    complete_user_login($user);
                    $token = auth_pyramid_get_token($userinfo, 'moodle_mobile_app');
                    $user->token = $token;

                    $userdata = [
                        'id'        => $user->id,
                        'firstname' => $user->firstname,
                        'lastname'  => $user->lastname,
                        'email'     => $user->email,
                        'token'     => $user->token,
                        'sesskey'   => $USER->sesskey,
                        'auth'      => $user->auth,
                    ];
                    auth_pyramid_json_response($userdata, 200);
                } else {
                    auth_pyramid_error_response(get_string('wrong_credentials', 'auth_pyramid'), 401);
                }
            }

        } catch (Exception $e){
            auth_pyramid_error_response($e->getMessage(), 400);
        }
    }

    /**
     * SSO login from laravel/angular.
     * 
     * @param object The object contains user info from params.
     *
     */
    public function sso_login($jwt) {
        global $DB, $USER, $SESSION;

        // JWT secret key used for verification
        $secret = get_config('auth_pyramid', 'pyramid_jwt_secret');
        try {
            // Decode the JWT token
            $decryptedData = JWT::decode($jwt, new Key($secret, 'HS256'));
            if ($decryptedData->email) {
                
                $user = $DB->get_record('user',array('email' => $decryptedData->email));
                
                // Handles the exception if the username or email doesn't exist.
                if(!$user){
                    // Send error response in API.
                    auth_pyramid_error_response(get_string('user_doesnt_exist', 'auth_pyramid'), 404);
                    return;
                }

                $usertoken = $DB->get_record('external_tokens', array('userid' => $user->id));
                if($decryptedData->token !== $usertoken->token) {
                    // Send error response in API.
                    auth_pyramid_error_response(get_string('user_doesnt_exist', 'auth_pyramid'), 404);
                    return;
                }
                complete_user_login($user);
                $SESSION->redirectToJobportal = $decryptedData->return_url;
                redirect($decryptedData->redirect_url, get_string('login_success', 'auth_pyramid'));
            }

        } catch (Exception $e) {
            // Handle any exceptions or invalid tokens
            auth_pyramid_error_response($e->getMessage(), 400);
        }
    }

    /**
     * Creates a new user with auth type 'pyramid'.
     * 
     * @param object The user object.
     * @return int
     */
    private function create_pyramid_user($account) {
        global $CFG;
        require_once($CFG->dirroot . '/user/lib.php');

        // we need to configure a new user account
        $user = new stdClass();

        $user->mnethostid = $CFG->mnet_localhost_id;
        $user->confirmed = 1;
        $user->username =  $account->username;
        $user->password = $account->password;
        $user->firstname = $account->firstname; 
        $user->lastname = $account->lastname;
        $user->email = $account->email;
        $user->description = '';
        $user->auth = 'pyramid';
        return user_create_user($user);
    }

}



