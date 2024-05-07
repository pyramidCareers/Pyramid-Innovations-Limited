<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers\API;

use App\Models\PasswordResetTokens;
use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\ForgetPassword;
use App\Http\Controllers\API\BaseController;
use Illuminate\Support\Facades\Hash;
use Mail;

class ForgetPasswordController extends BaseController
{
    /**
     * Display a listing of the resource.
     */
    public function verifyEmail (Request $request)
    {
        $user = User::where('email', $request->email)->first();
        $frontendLink = env('FRONTEND_LINK');
        $randCode = $this->generateRandomCode();

        if ($user) {
            $mailData = [
                'title' => 'Dear '.$user->firstname.',',
                'body' => 'We have received a request to reset the password for your account. If you have requested for the password reset please click the following link to reset your password: ',
                'link' => $frontendLink.'/user/forget-password/'.$randCode,
                'body2' => 'This link will be valid for next 10 minutes.',
                'thanks' => 'Thank you, ',
                'pyramid_name' => 'Pyramid Innovations Ltd.'
            ];

            Mail::to($request->email)->send(new ForgetPassword($mailData));

            $tokenData = [
                'email' => $request->email,
                'token' => $randCode,
                'status' => 1,
                'created_at' => time(),
                'updated_at' => time(),
            ];

            //  and then create user in laravel DB.
            $token = PasswordResetTokens::create($tokenData);

            return $this->sendResponse($token, 'Email sent successfully!');
        } else {
            return $this->sendError('User not found!');
        }
    }

    function generateRandomCode() {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $code = '';

        for ($i = 0; $i < 10; $i++) {
            $randomIndex = rand(0, strlen($characters) - 1);
            $code .= $characters[$randomIndex];
        }

        return $code;
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
