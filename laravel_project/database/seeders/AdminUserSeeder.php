<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $body = [
            'username' => 'pyramid_admin@yopmail.com',
            'email' => 'pyramid_admin@yopmail.com',
            'firstname' => 'Pyramid',
            'lastname' => 'Admin',
            'password' => 'Admin@123',
            'user_type' => 'admin'
        ];
        $path = '/auth/pyramid/register.php';
        $response = Http::asForm()
                ->withOptions([
                    'verify' => false,
                    'base_uri' => env('MOODLE_API_URL'),
                    'headers' => [
                        'Accept' => 'application/json'
                    ]
                ])
                ->post($path, $body);

        if ($response->successful()) {
            $responseData = $response->json();
            $moodleUser = $responseData['data'];
            $userData = [
                'firstname' => 'Pyramid',
                'lastname' => 'Admin',
                'email' => 'pyramid_admin@yopmail.com',
                'password' => Hash::make('Admin@123'),
                'phone' => '0156039860938',
                'user_type' => 'admin',
                'moodle_userid' => $moodleUser['id'],
                'moodle_username' => $moodleUser['email'],
                'moodle_password' => Hash::make('Admin@123'),
                'moodle_auth_token' => $moodleUser['token']
            ];

            //  and then create user in laravel DB.
            $user = User::create($userData);
        } else {
            // Handle failed response.
            throw new Exception('Failed to create admin user.');
        }
    }
}
