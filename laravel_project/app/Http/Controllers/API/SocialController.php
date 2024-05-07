<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController;
use App\Models\Employer;
use App\Models\JobSeeker;
use App\Models\User;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
class SocialController extends BaseController
{
    // Linkedin Socialite
    public function provider ()
    {
        $socialiteUrl =  Socialite::driver('linkedin')->redirect()->getTargetUrl();
        return $this->sendResponse($socialiteUrl, 'Link retrieved successfully.');
    }

    public  function providerCallback ()
    {
        $linkedinUser = Socialite::driver('linkedin')->stateless()->user();

        $name = $linkedinUser->name;
        $lastSpacePos = strrpos($name, " ");

        $user = [];
        $user['username'] = $linkedinUser->email;
        $user['firstname'] = substr($name, 0, $lastSpacePos);
        $user['lastname'] = substr($name, $lastSpacePos + 1);
        $user['email'] = $linkedinUser->email;
        $user['password'] = 'LUser@1'.$linkedinUser->id;
        $user['user_type'] = 'jobseeker';
        $user['auth_type'] = 'Linkedin';

        $userExists = User::where('email', $linkedinUser->email)->first();
        if ($userExists) {
            $token = $userExists->createToken('authToken')->plainTextToken;
            return redirect()->away(env('FRONTEND_LINK') . '/oauth-login?token=' . $token . '&user_id=' . $userExists->id);
        } else {
            $redirectUrl = $this->user_create($user);
            return redirect()->away($redirectUrl);
        }
    }



    // Google Socialite
    public function providerGoogle ()
    {
        $socialiteUrl =  Socialite::driver('google')->redirect()->getTargetUrl();
        return $this->sendResponse($socialiteUrl, 'Link retrieved successfully.');
    }

    public  function providerGoogleCallback ()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $name = $googleUser->name;
        $lastSpacePos = strrpos($name, " ");

        $user = [];
        $user['username'] = $googleUser->email;
        $user['firstname'] = substr($name, 0, $lastSpacePos);
        $user['lastname'] = substr($name, $lastSpacePos + 1);
        $user['email'] = $googleUser->email;
        $user['password'] = 'GUser@2'.$googleUser->id;
        $user['user_type'] = 'jobseeker';
        $user['auth_type'] = 'Google';

        $userExists = User::where('email', $googleUser->email)->first();
        if ($userExists) {
            $token = $userExists->createToken('authToken')->plainTextToken;
            return redirect()->away(env('FRONTEND_LINK') . '/oauth-login?token=' . $token . '&user_id=' . $userExists->id);
        } else {
            $redirectUrl = $this->user_create($user);
            return redirect()->away($redirectUrl);
        }
    }


     // Facebook Socialite
    public function providerFacebook ()
    {
        $socialiteUrl =  Socialite::driver('facebook')->redirect()->getTargetUrl();
        return $this->sendResponse($socialiteUrl, 'Link retrived successfully.');
    }

    public  function providerfacebookCallback ()
    {
        $facebookUser = Socialite::driver('facebook')->stateless()->user();

        $name = $facebookUser->name;
        $lastSpacePos = strrpos($name, " ");

        $user = [];
        $user['username'] = $facebookUser->email;
        $user['firstname'] = substr($name, 0, $lastSpacePos);
        $user['lastname'] = substr($name, $lastSpacePos + 1);
        $user['email'] = $facebookUser->email;
        $user['password'] = 'GUser@2'.$facebookUser->id;
        $user['user_type'] = 'jobseeker';
        $user['auth_type'] = 'Google';

        $userExists = User::where('email', $facebookUser->email)->first();
        if ($userExists) {
            $token = $userExists->createToken('authToken')->plainTextToken;
            return $this->sendAuthResponse('User Exists', true, 201, 'Successfully created user', $user, $token);
        } else {
            $this->user_create($user);
        }
    }

    public function  user_create (array $user) {
        $response = $this->postRequest('/auth/pyramid/register.php', $user);

        if ($response->successful()) {
            $responseData = $response->json();
            $moodleUser = $responseData['data'];
            $userData = [
                'firstname' => $user['firstname'],
                'lastname' => $user['lastname'],
                'email' => $user['email'],
                'password' => Hash::make($user['password']),
                'user_type' => $user['user_type'],
                'auth_type' => $user['auth_type'],
                'moodle_userid' => $moodleUser['id'],
                'moodle_username' => $moodleUser['email'],
                'moodle_password' => Hash::make($user['password']),
                'moodle_auth_token' => $moodleUser['token']
            ];

            //  and then create user in laravel DB.
            $user = User::create($userData);

            $userProfile = [
                'user_id' => $user->id,
            ];

            JobSeeker::create($userProfile);

            $token = $user->createToken('authToken')->plainTextToken;
            $redirectUrl = env('FRONTEND_LINK') . '/oauth-login?token=' . $token . '&user_id=' . $user->id;
            return $redirectUrl;
        }  else {
            // Handle failed response.
            return $this->sendErrorResponse('Failed to create user', false, $response->status(), $response->body());
        }
    }
}
