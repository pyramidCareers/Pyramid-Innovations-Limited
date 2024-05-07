<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\Controller;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */

    public function sendResponse($result, $message): \Illuminate\Http\JsonResponse
    {
        $response = [
            'status' => true,
            'message' => $message,
            'data' => $result,
        ];

        return response()->json($response, 200);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendError($error, $errorMessages = [], $code = 404): \Illuminate\Http\JsonResponse
    {
        $response = [
            'status' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }
        return response()->json($response, $code);
    }

    public function postRequest($path, $body)
    {
        return Http::asForm()
            ->withOptions([
                'verify' => false,
                'base_uri' => env('MOODLE_API_URL'),
                'headers' => [
                    'Accept' => 'application/json'
                ]
            ])
            ->post($path, $body);
    }

    public function sendAuthResponse($message, $status, $statusCode, $statusMessage, $data, $token)
    {
        $response = [
            'message' => $message,
            'status' => $status,
            'statusMessage' => $statusMessage,
            'statusCode' => $statusCode,
            'user' => $data,
            'token' => $token
        ];

        return response($response, $statusCode);
    }

    public function sendErrorResponse($message, $status, $statusCode, $statusMessage)
    {
        $response = [
            'message' => $message,
            'status' => $status,
            'statusMessage' => $statusMessage,
            'statusCode' => $statusCode,
        ];
        return response($response, $statusCode);
    }

    public function prepareMoodleRequestBody($fields, $userType)
    {
        return [
            'username' => $fields['email'],
            'email' => $fields['email'],
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'password' => $fields['password'],
            'user_type' => $userType
        ];
    }

    public function prepareUserMoodleData($fields, $moodleUser, $userType)
    {
        return [
            'firstname' => $fields['firstname'],
            'lastname' => $fields['lastname'],
            'email' => $fields['email'],
            'password' => Hash::make($fields['password']),
            'phone' => $fields['phone'],
            'user_type' => $userType,
            'moodle_userid' => $moodleUser['id'],
            'moodle_username' => $moodleUser['email'],
            'moodle_password' => Hash::make($fields['password']),
            'moodle_auth_token' => $moodleUser['token'],
            'force_password_change' => 1
        ];
    }

    public function createUser($fields, $userType) {
        $body = $this->prepareMoodleRequestBody($fields, $userType);
        // dd($userType);
        try {
            $response = $this->postRequest('/auth/pyramid/register.php', $body);
            if ($response->successful()) {
                $responseData = $response->json();
                $moodleUser = $responseData['data'];

                $userData = $this->prepareUserMoodleData($fields, $moodleUser, $userType);
               
                // TODO: Need to refactor this if block to be more genereic.
                // Adding this quickfix.
                // Gender field is required only for mentor registration.
                if($userType === 'mentor') {
                    $userData['gender'] = $fields['gender'];
                }
                
                //  and then create user in laravel DB.
                $user = User::create($userData);

                $token = $user->createToken('authToken')->plainTextToken;
                return [$user, $token];
            } else {
                // Handle failed response.
                throw new Exception($response->body());
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }

    }
}
