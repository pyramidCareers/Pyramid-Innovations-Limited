<?php

use App\Http\Controllers\API\SslCommerzPaymentController;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\API\SocialController;
use Laravel\Socialite\Facades\Socialite;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Linkedin OAuth2
Route::get('/linkedin', [SocialController::class, 'provider']);
Route::get('/linkedin/callback', [SocialController::class, 'providerCallback']);

// Google OAuth2
Route::get('/google', [SocialController::class, 'providerGoogle']);
Route::get('/google/callback', [SocialController::class, 'providerGoogleCallback']);

// Facebook OAuth2
Route::get('/facebook', [SocialController::class, 'providerFacebook']);
Route::get('/facebook/callback', [SocialController::class, 'providerFacebookCallback']);

// SSLCOMMERZ Start
Route::post('/pay', [SslCommerzPaymentController::class, 'index'])->name('pay');
Route::get('/payment/{jobid}/{userid}/{fee}/{type}', [SslCommerzPaymentController::class, 'getUserData']);
Route::get('/payment/{webinar_id}/{userid}/{fee}/{type}/pay', [SslCommerzPaymentController::class, 'getUserDataForWebinar']);

Route::post('/success', [SslCommerzPaymentController::class, 'success']);
Route::post('/fail', [SslCommerzPaymentController::class, 'fail']);
Route::post('/cancel', [SslCommerzPaymentController::class, 'cancel']);

Route::post('/ipn', [SslCommerzPaymentController::class, 'ipn']);
//SSLCOMMERZ END
