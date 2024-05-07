<?php

namespace App\Http\Controllers\API;

use App\Models\Employer;
use App\Models\Job;
use App\Models\JobApplication;
use App\Models\JobSeeker;
use App\Models\Mentor;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminController extends BaseController
{

    public function createEmployer(Request $request)
    {
        // Validation needs to be refactored from single class.
        $fields = $request->validate([
            'firstname' =>'required|string',
            'lastname' =>'required|string',
            'email' =>'required|string|email|unique:users',
            'password' =>'required|string|confirmed',
            'phone' => 'required|string',
        ]);

        $body = $this->prepareMoodleRequestBody($fields, 'employer');

        $response = $this->postRequest('/auth/pyramid/register.php', $body);

        if ($response->successful()) {
            $responseData = $response->json();
            $moodleUser = $responseData['data'];

            $userData = $this->prepareUserMoodleData($fields, $moodleUser, 'employer');

            //  and then create user in laravel DB.
            $user = User::create($userData);

            // Create user profile. (Employer/JobSeeker).
            $userProfile = [
                'user_id' => $user->id,
                'created_by' => Auth::user()->id,
            ];
            Employer::create($userProfile);

            $token = $user->createToken('authToken')->plainTextToken;
            return $this->sendAuthResponse('Successfully created user', true, 201, 'Successfully created user', $user, $token);
        } else {
            // Handle failed response.
            return $this->sendErrorResponse('Failed to create user', false, $response->status(), $response->body());
        }
    }

    public function createJobSeeker(Request $request)
    {
        // Validation needs to be refactored from single class.
        $fields = $request->validate([
            'firstname' =>'required|string',
            'lastname' =>'required|string',
            'email' =>'required|string|email|unique:users',
            'password' =>'required|string|confirmed',
            'phone' => 'required|string',
        ]);

        $body = $this->prepareMoodleRequestBody($fields, 'jobseeker');

        $response = $this->postRequest('/auth/pyramid/register.php', $body);

        if ($response->successful()) {
            $responseData = $response->json();
            $moodleUser = $responseData['data'];

            $userData = $this->prepareUserMoodleData($fields, $moodleUser, 'jobseeker');

            //  and then create user in laravel DB.
            $user = User::create($userData);

            // Create user profile. (Employer/JobSeeker).
            $userProfile = [
                'user_id' => $user->id,
                'created_by' => Auth::user()->id,
            ];
            JobSeeker::create($userProfile);

            $token = $user->createToken('authToken')->plainTextToken;
            return $this->sendAuthResponse('Successfully created user', true, 201, 'Successfully created user', $user, $token);
        } else {
            // Handle failed response.
            return $this->sendErrorResponse('Failed to create user', false, $response->status(), $response->body());
        }
    }

    public function createJob(Request $request)
    {
        try {
            request()->validate(Job::$rules);
            $job = $request->all();
            $job['created_by'] = Auth::user()->id;

            $jobCreated = Job::create($job);
            return $this->sendResponse($jobCreated, 'Job created successfully.');
        }
        catch (Exception $e) {
            return $this->sendError('Error in creating job.');
        }
    }

    public function createMentor(Request $request)
    {
        // Validation needs to be refactored from single class.
        $fields = $request->validate([
            'firstname' =>'required|string',
            'lastname' =>'required|string',
            'email' =>'required|string|email|unique:users',
            'password' =>'required|string|confirmed',
            'phone' => 'required|string',
            'gender' => 'required|string'
        ]);

        // Create user.
        try {
            list($user, $token) = $this->createUser($fields, 'mentor');
            $userProfile = [
                'user_id' => $user->id,
                'created_by' => Auth::user()->id,
            ];
            Mentor::create($userProfile);
            return $this->sendAuthResponse('Successfully created user', true, 201, 'Successfully created user', $user, $token);
        } catch (Exception $e) {
            // Handle failed response.
            return $this->sendErrorResponse('Failed to create user', false, 401, $e->getMessage());
        }

    }

    public function createAdmin(Request $request)
    {
        // Validation needs to be refactored from single class.
        $fields = $request->validate([
            'firstname' =>'required|string',
            'lastname' =>'required|string',
            'email' =>'required|string|email|unique:users',
            'password' =>'required|string|confirmed',
            'phone' => 'required|string',
        ]);

        // Create user.
        try {
            list($user, $token) = $this->createUser($fields, 'admin');
            return $this->sendAuthResponse('Successfully created user', true, 201, 'Successfully created user', $user, $token);
        } catch (Exception $e) {
            // Handle failed response.
            return $this->sendErrorResponse('Failed to create user', false, 401, $e->getMessage());
        }
    }

    public function getAllMentors()
    {
        try {
            $mentors = Mentor::with('user')
                ->paginate();

            return $this->sendResponse($mentors, 'Mentors retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error in retrieving mentors');
        }
    }

    public function getAllAdmins()
    {
        try {
            $admins = User::where('user_type', 'admin')->paginate();

            return $this->sendResponse($admins, 'Admins retrieved successfully.');
        } catch (Exception $e) {
            return $this->sendError('Error in retrieving admins');
        }
    }

    /**
     * This method gets the number of
     * total job applications for all jobs.
     */
    public function getTotalApplicationCount() {
        return JobApplication::count();
    }

    /**
     * This method gets the number
     * of total job seekers.
     */
    public function getTotalJobSeekerCount() {
        return JobSeeker::count();
    }

    /**
     * This method gets the number
     * of total employers.
     */
    public function getTotalEmployerCount() {
        return Employer::count();
    }

    /**
     * This method gets the number
     * of total jobs.
     */
    public function getTotalJobCount() {
        return Job::count();
    }

    /**
     * This method gets the number
     * of total mentors.
     */
    public function getTotalMentorCount() {
        return User::where('user_type', 'mentor')->count();
    }

    /**
     * This function gets the recently
     * posted published jobs.
     */
    public function getRecentlyPostedPublishedJobs() {
        return Job::with('companyinfo')
                ->where('published', 1)
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();
    }

    public function getTotalPublishedJobCount() {
        return Job::where('published', 1)->count();
    }

    /**
     * This function gets all the
     * important dashboard information
     * for the authenticated admin.
     */
    public function getDashBoardInfo() {
        $data = [
            'total_job_seeker_count' => $this->getTotalJobSeekerCount(),
            'total_employer_count' => $this->getTotalEmployerCount(),
            'total_mentor_count' => $this->getTotalMentorCount(),
            'total_job_count' => $this->getTotalJobCount(),
            'total_published_job_count' => $this->getTotalPublishedJobCount(),
            'total_job_application_count' => $this->getTotalApplicationCount(),
            'recently_posted_published_job' => $this->getRecentlyPostedPublishedJobs(),
        ];
        return $this->sendResponse($data, 'Admin dashboard data retrived successfully.');
    }
}
