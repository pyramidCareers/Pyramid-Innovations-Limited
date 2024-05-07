<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\PasswordResetTokens;
use App\Models\User;
use App\Models\JobSeeker;
use App\Models\Employer;
use App\Http\Controllers\API\BaseController;
use App\Models\Mentor;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class AuthController extends BaseController
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
            'user_type' => 'required|string'

        ]);

        $body = [
            'username' => $fields['email'],
            'email' => $fields['email'],
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'password' => $fields['password'],
            'user_type' => $fields['user_type']
        ];

        $response = $this->postRequest('/auth/pyramid/register.php', $body);

        if ($response->successful()) {
            $responseData = $response->json();
            $moodleUser = $responseData['data'];
            $userData = [
                'firstname' => $fields['firstname'],
                'lastname' => $fields['lastname'],
                'email' => $fields['email'],
                'password' => Hash::make($fields['password']),
                'phone' => $request->phone,
                'user_type' => $fields['user_type'],
                'auth_type' => 'manual',
                'moodle_userid' => $moodleUser['id'],
                'moodle_username' => $moodleUser['email'],
                'moodle_password' => Hash::make($fields['password']),
                'moodle_auth_token' => $moodleUser['token']
            ];

            //  and then create user in laravel DB.
            $user = User::create($userData);

            // Create user profile. (Employer/JobSeeker).
            $userProfile = [
                'user_id' => $user->id,
            ];
            if ($user->user_type == 'employer') {
                Employer::create($userProfile);
            } else if ($user->user_type == 'jobseeker') {
                JobSeeker::create($userProfile);
            }

            $token = $user->createToken('authToken')->plainTextToken;
            return $this->sendAuthResponse('Successfully created user', true, 201, 'Successfully created user', $user, $token);
        } else {
            // Handle failed response.
            return $this->sendErrorResponse('Failed to create user', false, $response->status(), $response->body());
        }
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'

        ]);
        // Check email.
        $user = User::where('email', $fields['email'])->first();
        // Check password.
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return $this->sendErrorResponse('Wrong username or password', false, 401, 'Wrong username or password');
        }
        $token = $user->createToken('authToken')->plainTextToken;

        // Get moodle token.
        $body = [
            'email' => $fields['email'],
            'password' => $fields['password'],
        ];
        $response = $this->postRequest('/auth/pyramid/login.php', $body);

        if ($response->successful()) {
            $responseData = $response->json();
            $moodleUser = $responseData['data'];

            // Send updated moodle auth token.
            $user->moodle_auth_token = $moodleUser['token'];
            $user->moodle_userid = $moodleUser['id'];

            return $this->sendAuthResponse('Login Successful', true, 200, 'Login Successful', $user, $token);

        } else {
            // Handle failed response.
            return $this->sendErrorResponse('Failed to login', false, $response->status(), $response->body());
        }
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Successfully logged out'
        ];
    }

    public function ssoLogin(Request $request)
    {
        $fields = $request->validate([
            'jwt' => 'required|string',
        ]);
        $secret = env('JWT_SECRET');
        try {
            $decryptedData = JWT::decode($fields['jwt'], new Key($secret, 'HS256'));
            if(!$decryptedData->email) {
                return $this->sendErrorResponse('Email not found', false, 403, 'Invalid Login');
            }
            if(!$decryptedData->token) {
                return $this->sendErrorResponse('Token not found', false, 403, 'Invalid Login');
            }
            $email = $decryptedData->email;
            $token = $decryptedData->token;
            // Check email.
            $user = User::where('email', $email)->first();
            if($token !== $user->moodle_auth_token) {
                // Handle failed response.
                return $this->sendErrorResponse('Failed to login', false, 403, 'Invalid Token');
            }
            $token = $user->createToken('authToken')->plainTextToken;

            $response = [
                'user' => $user,
                'token' => $token,
                'redirect_url' => $decryptedData->redirect_url,
            ];
            return $this->sendResponse($response, 'Login successful');

        } catch (Exception $e) {
            return $this->sendErrorResponse('Failed to login', false, 403, 'Something went wrong');
        }

        // return $this->sendAuthResponse('Login Successful', true, 200, 'Login Successful', $user, $token);
    }

    public function getJwtToken(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'token' => 'required|string',
            'redirect_url' => 'required|string',
            'return_url' => 'required|string'
        ]);

        $payload = [
            'iss' => 'Pyramid',           // Configures the issuer (iss claim)
            'aud' => 'Pyramid_Frontend',            // Configures the audience (aud claim)
            'iat' => time(),                     // Configures the time that the token was issued (iat claim)
            'exp' => time() + 3600,              // Configures the expiration time of the token (exp claim)
            'email' => $fields['email'],
            'token' => $fields['token'],
            'redirect_url' => $fields['redirect_url'],
            'return_url' => $fields['return_url']
        ];
        $secret = env('JWT_SECRET');
        $jwtToken = JWT::encode($payload, $secret, 'HS256');
        $response = [
            'jwtToken' => $jwtToken
        ];

        return $this->sendResponse($response, 'JWT generated successfully');

    }

    // public function postRequest($path, $body)
    // {
    //     return Http::asForm()
    //         ->withOptions([
    //             'verify' => false,
    //             'base_uri' => env('MOODLE_API_URL'),
    //             'headers' => [
    //                 'Accept' => 'application/json'
    //             ]
    //         ])
    //         ->post($path, $body);
    // }

    // public function sendAuthResponse($message, $status, $statusCode, $statusMessage, $data, $token)
    // {
    //     $response = [
    //         'message' => $message,
    //         'status' => $status,
    //         'statusMessage' => $statusMessage,
    //         'statusCode' => $statusCode,
    //         'user' => $data,
    //         'token' => $token
    //     ];

    //     return response($response, $statusCode);
    // }

    // public function sendErrorResponse($message, $status, $statusCode, $statusMessage)
    // {
    //     $response = [
    //         'message' => $message,
    //         'status' => $status,
    //         'statusMessage' => $statusMessage,
    //         'statusCode' => $statusCode,
    //     ];
    //     return response($response, $statusCode);
    // }

    // User's Profile Picture CRUD
    public function updateProfilePicture(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'profile_pic' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = User::findOrFail($id);

        // Handle the uploaded file
        if ($request->hasFile('profile_pic')) {
            $profilePic = $request->file('profile_pic');
            if ($user->profile_pic) {
                $filePath = 'public/' . basename($user->profile_pic);
                if (Storage::exists($filePath)) {
                    Storage::delete($filePath);
                }
            }

            $fileName = time() . '_' . $id . '_' . $profilePic->getClientOriginalName();
            $profilePic->storeAs('public', $fileName);
            $user->profile_pic = $fileName;
            $user->save();

            return $this->sendResponse($user, 'Profile Pic Updated Successfully.');
        }

        return $this->sendError('Profile picture not uploaded.', [], 400);
    }

    public function getProfilePicture($id)
    {
        $user = User::findOrFail($id);
        if ($user->profile_pic) {
            return $this->sendResponse($user->profile_pic, 'Profile Pic Found.');
        }
        // Return a default profile picture or an error response
        return $this->sendError('Profile picture not found.', [], 404);
    }

    public function deleteProfilePicture($id)
    {
        $user = User::findOrFail($id);
        if ($user->profile_pic) {
            $filePath = 'public/' . basename($user->profile_pic);

            if (Storage::exists($filePath)) {
                Storage::delete($filePath);
            }
            $user->profile_pic = null;
            $user->save();
            return $this->sendResponse($user, 'Profile Pic Deleted Successfully.');
        }

        return $this->sendError('Profile picture not found.', [], 404);
    }

    public function varifyToken($token)
    {
        $token = PasswordResetTokens::where('token', $token)->first();

        if ($token) {
            $currentTimestamp = time();
            $tokenTimestamp = $token->created_at;
            $tokenTimestamp = strtotime($tokenTimestamp);
            $timeDifference = $currentTimestamp - $tokenTimestamp;
            $minutesDifference = round($timeDifference / 60);

            if ($minutesDifference > 10) {
                return response()->json([
                    'message' => 'Token Expired! Please Try Again.'
                ]);
            } else {
                return response()->json([
                    'message' => 'Token Varified',
                    'email' => $token->email
                ]);
            }
        } else {
            return response()->json([
                'message' => 'Token not found!',
            ]);
        }
    }

    public function resetPassword(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'

        ]);

        $user = User::where('email', $fields['email'])->first();

        // Handle the uploaded file
        if ($user) {
            // Reset Moodle Password.
            $body = [
                'email' => $fields['email'],
                'password' => $fields['password'],
            ];

            $response = $this->postRequest('/auth/pyramid/resetpassword.php', $body);


            if ($response->successful()) {
                // Update password in laravel db.
                $user->password = Hash::make($fields['password']);
                $user->moodle_password = Hash::make($fields['password']);
                $user->save();

                return $this->sendResponse($user, 'Password Reset Successful');

            } else {
                // Handle failed response.
                return $this->sendErrorResponse('Failed to Set New Password', false, $response->status(), $response->body());
            }
        } else {
            return response()->json([
                'error' => 'No user found!',
            ], 400);
        }
    }

    public function passwordChange(Request $request)
    {

        $fields = $request->validate([
            'email' => 'required|string|email',
            'current_password' => 'required|string',
            'new_password' => 'required|string'
        ]);

        $loggedInUserId = Auth::user()->id;

        $email = $request->email;
        $currentPasssword = $request->current_password;
        $newPassword = $request->new_password;

        // Check email.
        $user = User::find($loggedInUserId);

        // Check password.
        if (!$user || !Hash::check($currentPasssword, $user->password)) {
            return $this->sendErrorResponse('Wrong password', false, 401, 'Wrong password');
        } else {
            if ($email == $user->email) {
                $body = [
                    'email' => $fields['email'],
                    'password' => $newPassword,
                ];
                $response = $this->postRequest('/auth/pyramid/resetpassword.php', $body);

                if ($response->successful()) {
                    // Update password in laravel db.
                    $user->password = Hash::make($fields['new_password']);
                    $user->moodle_password = Hash::make($fields['new_password']);
                    $user->save();

                    return $this->sendResponse($user, 'Password Reset Successful');
                } else {
                    // Handle failed response.
                    return $this->sendErrorResponse('Failed to Set New Password', false, $response->status(), $response->body());
                }
            } else {
                return response()->json([
                    'error' => 'Wrong E-mail or Current Password!',
                ], 400);
            }
        }
    }
}
