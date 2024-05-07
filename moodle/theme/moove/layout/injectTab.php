<?php

use Firebase\JWT\JWT;

global $SESSION, $USER, $DB;

$component = 'theme_moove';
$TabName = get_config($component, 'TabName');
$frontendUrl = get_config($component, 'Tablink');

if (isset($SESSION->redirectToJobportal)) {
    $link = $SESSION->redirectToJobportal;
} else {
    $link = $frontendUrl;
}

$email = null;
$token = null;

if(isset($USER->email)) {
    $email = $USER->email;
    $token = $DB->get_record('external_tokens', array('userid' => $USER->id));
}

$payload = [
    'iss' => 'Pyramid',           // Configures the issuer (iss claim)
    'aud' => 'Pyramid_Frontend',            // Configures the audience (aud claim)
    'iat' => time(),                     // Configures the time that the token was issued (iat claim)
    'exp' => time() + 3600,              // Configures the expiration time of the token (exp claim)
    'email' => $email,
    'token' => $token->token,
    'redirect_url' => $link,
];

$secret = get_config('auth_pyramid', 'pyramid_jwt_secret');
$jwtToken = JWT::encode($payload, $secret, 'HS256');

$data = [
    "text" => $TabName,
    "url" => $link . 'sso_login?jwt=' . $jwtToken,
];

array_push($primarymenu['moremenu']['nodearray'], $data);
array_push($primarymenu['mobileprimarynav'], $data);
