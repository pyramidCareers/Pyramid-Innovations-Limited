<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\EmployerController;
use App\Http\Controllers\API\JobController;
use App\Http\Controllers\API\JobApplicationController;
use App\Http\Controllers\API\JobSeekerController;
use App\Http\Controllers\API\SslCommerzPaymentController;
use App\Http\Controllers\API\CvAccessRquestController;
use App\Http\Controllers\API\WebinarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\SkillController;
use App\Http\Controllers\API\IndustryController;
use App\Http\Controllers\API\OrganizationController;
use App\Http\Controllers\API\ProfessionController;
use App\Http\Controllers\API\ForgetPasswordController;
use App\Http\Controllers\API\EducationController;
use App\Http\Controllers\API\ExperienceController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\UsersSkillController;
use App\Http\Controllers\API\CertificationController;
use App\Http\Controllers\API\ExtraCurricularsController;
use App\Http\Controllers\API\AdminController;
use App\Http\Controllers\API\CvTemplateController;
use App\Http\Controllers\API\JobApplyConditionController;
use App\Http\Controllers\API\myResumeController;
use App\Http\Controllers\API\PetCompletionStatusController;
use App\Http\Controllers\API\FavoriteJobsController;
use App\Http\Controllers\API\CareerPageController;
use App\Http\Controllers\API\JobReadyProgramController;
use App\Http\Controllers\API\JobReadyCourseController;
use App\Http\Controllers\API\MentorController;
use App\Http\Controllers\API\PaymentCompletionStatusController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/sso-login', [AuthController::class, 'ssoLogin']);
Route::post('/jwt-token', [AuthController::class, 'getJwtToken']);

// Forget Password
Route::post('forgetpassword', [ForgetPasswordController::class, 'verifyEmail']);
Route::get('resetpassword/{token}', [AuthController::class, 'varifyToken']);
Route::post('newpassword', [AuthController::class, 'resetPassword']);

// Job Details.
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/job/{id}', [JobController::class, 'show']);
Route::post('/jobs/search', [JobController::class, 'search']);

// Jobs list by employer user id.
Route::get('/jobs/employer/user/{id}', [JobController::class, 'showByEmployerUserId']);

// Job apply condition routes.
Route::group(['prefix' => '/jobapplyconditions'], function () {
  Route::get('/', [JobApplyConditionController::class, 'index']);
  Route::get('/job/{id}', [JobApplyConditionController::class, 'showByJobId']);
});

// Update pet completion status.
Route::post('/update-pet-status', [PetCompletionStatusController::class, 'updatePetStatus']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::group(['middleware' => ['auth:sanctum']], function () {
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::get('/job/{id}/user/{user_id}', [JobController::class, 'showByUserid']);

  // Admin routes.

  Route::group(['middleware' => ['isAdmin']], function () {
    Route::post('/admin/employer/create', [AdminController::class, 'createEmployer']);
    Route::post('/admin/jobseeker/create', [AdminController::class, 'createJobSeeker']);
    Route::post('/admin/job/create', [AdminController::class, 'createJob']);
    Route::post('/admin/mentor/create', [AdminController::class, 'createMentor']);
    Route::post('/admin/create', [AdminController::class, 'createAdmin']);
    Route::get('/mentors', [AdminController::class, 'getAllMentors']);
    Route::get('/admins', [AdminController::class, 'getAllAdmins']);
    Route::post('/admin/dashboard', [AdminController::class, 'getDashBoardInfo']);
  });


  // JobSeeker Profile.
  Route::get('/jobseekers', [JobSeekerController::class, 'index']);
  Route::get('/jobseeker/{id}', [JobSeekerController::class, 'show']);

  Route::post('/jobseeker/create', [JobSeekerController::class, 'store']);
  Route::post('/jobseeker/update/{id}', [JobSeekerController::class, 'update']);
  Route::put('/jobseeker/update/user/{id}', [JobSeekerController::class, 'updateByUserId']);
  Route::post('/jobseeker/delete/{id}', [JobSeekerController::class, 'destroy']);

  //Job Seeker Search APIs
  Route::post('/jobseeker/profession/search', [JobSeekerController::class, 'searchProfession']);
  Route::post('/jobseeker/industry/search', [JobSeekerController::class, 'searchIndustry']);
  Route::post('/jobseeker/speciality/search', [JobSeekerController::class, 'searchSpeciality']);
  Route::post('/jobseeker/fieldofstudy/search', [JobSeekerController::class, 'searchFieldOfStudy']);
  Route::post('/jobseeker/institution/search', [JobSeekerController::class, 'searchInstitution']);
  Route::post('/jobseeker/certificate/search', [JobSeekerController::class, 'searchCertificate']);
  Route::post('/jobseeker/issuingOrganization/search', [JobSeekerController::class, 'searchIssuingOrganization']);

  // Job Seeker Dashboard APIs
  Route::post('/jobseeker/dashboard', [JobSeekerController::class, 'getDashBoardInfo']);


  // User Profile.
  Route::get('/users', [UserController::class, 'index']);
  Route::get('/user/{id}', [UserController::class, 'show']);
  Route::put('/user/{id}', [UserController::class, 'update']);
  Route::post('/user_by_name', [UserController::class, 'getUserByName']);

  // Employer Profile.
  Route::get('/employers', [EmployerController::class, 'index']);
  Route::get('/employers/search/{keyword}', [EmployerController::class, 'search']);
  Route::get('/employer/{id}', [EmployerController::class, 'show']);

  Route::post('/employer/create', [EmployerController::class, 'store']);
  Route::put('/employer/update/{id}', [EmployerController::class, 'update']);
  Route::post('/employer/delete/{id}', [EmployerController::class, 'destroy']);
  Route::put('/employer/update/user/{id}', [EmployerController::class, 'updateByUserId']);

  // Employer Dashboard APIs
  Route::post('/employer/dashboard', [EmployerController::class, 'getDashBoardInfo']);

  // Job Details.
  Route::get('/jobs/employer/{id}', [JobController::class, 'index']);

  Route::post('/job/create', [JobController::class, 'store']);
  Route::put('/job/update/{id}', [JobController::class, 'update']);
  Route::post('/job/delete/{id}', [JobController::class, 'destroy']);

  // Job Application Details.
  Route::get('/jobapplications', [JobApplicationController::class, 'index']);
  Route::get('/jobapplication/{id}', [JobApplicationController::class, 'show']);
  Route::get('/jobapplication/job/{id}', [JobApplicationController::class, 'showByJobId']);
  Route::get('/jobapplication/user/{id}', [JobApplicationController::class, 'showByUserId']);

  //  Route::post('/jobapplication/job/{id}/filter', [JobApplicationController::class, 'jobApplicationFilter']);
  Route::post('/jobapplication/job/{id}/filter', [JobApplicationController::class, 'jobApplication_Filter']);
  //Export Filtered Users
  Route::post('/export-user', [JobApplicationController::class, 'ExportFilteredUsers']);

  Route::post('/jobapplication/create', [JobApplicationController::class, 'store']);
  Route::put('/jobapplication/update/{id}', [JobApplicationController::class, 'update']);
  Route::post('/jobapplication/delete/{id}', [JobApplicationController::class, 'destroy']);

  // Unlock job applications: This updates all the job applications of this job via a background task.
  Route::post('/unlock-job-applications/{jobId}', [JobApplicationController::class, 'unlockJobApplicationsByJobId']);

  // Job apply condition routes.
  Route::group(['prefix' => '/jobapplyconditions'], function () {
    Route::get('/{id}', [JobApplyConditionController::class, 'show']);
    Route::post('/create', [JobApplyConditionController::class, 'store']);
    Route::put('/update/{id}', [JobApplyConditionController::class, 'update']);
    Route::delete('/delete/{id}', [JobApplyConditionController::class, 'destroy']);
  });

  Route::post('/get-completion-status', [PetCompletionStatusController::class, 'getCompletionStatus']);

  // Job Ready Program and Course
  Route::post('/jobreadyprogram/create', [JobReadyProgramController::class, 'store']);
  Route::delete('/jobreadyprogram/delete/{id}', [JobReadyProgramController::class, 'destroy']);
  Route::post('/jobreadyprogram/add', [JobReadyProgramController::class, 'addToJobReadyProgram']);
  Route::get('/hasjobreadyprogram/{id}', [JobReadyProgramController::class, 'hasJobReadyProgram']);

  Route::post('/jobreadycourse/create', [JobReadyCourseController::class, 'store']);
  Route::post('/jobreadycourse/delete', [JobReadyCourseController::class, 'destroy']);
  Route::post('/jobreadycourse/completion', [JobReadyCourseController::class, 'getCompletionTable']);

  // Job application payment status
  Route::post('/update-payment-status', [PaymentCompletionStatusController::class, 'updatePaymentStatus']);

  // User's Profile Picture CRUD
  Route::post('users/{id}/profile-pic', [AuthController::class, 'updateProfilePicture']);
  Route::get('users/{id}/profile-pic', [AuthController::class, 'getProfilePicture']);
  Route::delete('users/{id}/profile-pic', [AuthController::class, 'deleteProfilePicture']);

  // Employer Logo CRUD
  Route::post('employer/{id}/logo', [EmployerController::class, 'updateEmployerLogo']);
  Route::get('employer/{id}/logo', [EmployerController::class, 'getEmployerLogo']);
  Route::delete('employer/{id}/logo', [EmployerController::class, 'deleteEmployerLogo']);

  // Jobseeker Education CRUD
  Route::get('jobseeker/user/{id}/education/view', [EducationController::class, 'index']);
  Route::put('jobseeker/user/{userId}/education/update/{id}', [EducationController::class, 'update']);
  Route::delete('jobseeker/user/{userId}/education/delete/{id}', [EducationController::class, 'destroy']);
  Route::post('jobseeker/user/{id}/education/create', [EducationController::class, 'store']);

  // Jobseeker Experience CRUD
  Route::get('jobseeker/user/{id}/experience/view', [ExperienceController::class, 'index']);
  Route::put('jobseeker/user/{userId}/experience/update/{id}', [ExperienceController::class, 'update']);
  Route::delete('jobseeker/user/{userId}/experience/delete/{id}', [ExperienceController::class, 'destroy']);
  Route::post('jobseeker/user/{id}/experience/create', [ExperienceController::class, 'store']);

  // Jobseeker Users_Skills CRUD
  Route::post('jobseeker/user/{id}/users_skills/create', [UsersSkillController::class, 'store']);
  Route::get('jobseeker/user/{id}/users_skills/view', [UsersSkillController::class, 'index']);
  Route::put('jobseeker/user/{userId}/users_skills/update/{id}', [UsersSkillController::class, 'update']);
  Route::delete('jobseeker/user/{userId}/users_skills/delete/{id}', [UsersSkillController::class, 'destroy']);

  // Jobseeker Certification CRUD
  Route::get('jobseeker/user/{id}/certification/view', [CertificationController::class, 'index']);
  Route::put('jobseeker/user/{userId}/certification/update/{id}', [CertificationController::class, 'update']);
  Route::delete('jobseeker/user/{userId}/certification/delete/{id}', [CertificationController::class, 'destroy']);
  Route::post('jobseeker/user/{id}/certification/create', [CertificationController::class, 'store']);

  // Jobseeker Extra-Curriculars CRUD
  Route::get('jobseeker/user/{id}/extracurriculars/view', [ExtraCurricularsController::class, 'index']);
  Route::put('jobseeker/user/{userId}/extracurriculars/update/{id}', [ExtraCurricularsController::class, 'update']);
  Route::delete('jobseeker/user/{userId}/extracurriculars/delete/{id}', [ExtraCurricularsController::class, 'destroy']);
  Route::post('jobseeker/user/{id}/extracurriculars/create', [ExtraCurricularsController::class, 'store']);

  // Search Skills
  Route::post('jobseeker/users_skills/search', [UsersSkillController::class, 'searchSkill']);

  // Password Change
  Route::post('passwordchange', [AuthController::class, 'passwordChange']);

  // CV Template
  Route::post('admin/upload-resume-template', [CvTemplateController::class, 'store']);
  Route::delete('admin/delete-resume-template/{id}', [CvTemplateController::class, 'destroy']);
  Route::put('admin/update-resume-template/{id}', [CvTemplateController::class, 'update']);
  Route::get('admin/get-resume-template', [CvTemplateController::class, 'index']);

  // favorite_jobs API
  Route::post('/jobs/{id}/favorite', [FavoriteJobsController::class, 'store'])->name('jobs.favorite');
  Route::delete('/jobs/{id}/unfavorite', [FavoriteJobsController::class, 'destroy'])->name('destroy');
  Route::get('/favoritejobs/{id}', [FavoriteJobsController::class, 'getAllFavoriteJobs'])->name('getAllFavorite');

  // Career Pages APIs
  Route::post('employer/modify-career-pages/{id}', [CareerPageController::class, 'store']);
  Route::delete('employer/delete-career-pages/{id}', [CareerPageController::class, 'destroy']);
  Route::get('employer/get-career-pages/{id}', [CareerPageController::class, 'show']);
  Route::post('employer/sub-domain-availability', [CareerPageController::class, 'subdomain_availability']);

  // Download myResume API
  Route::get('/jobseeker/{id}/download', [myResumeController::class, 'download_Resume']);

  //Payment Status
  Route::post('payment/details', [SslCommerzPaymentController::class, 'getCompletedTransection']);

  // Cv Access Request API
  Route::post('cv/request', [CvAccessRquestController::class, 'cvRquest']);
  Route::get('cv/get-requests', [CvAccessRquestController::class, 'getCvRquestList']);
  Route::get('cv/get-requests/{id}', [CvAccessRquestController::class, 'getCvRquestById']);
  Route::put('cv/update-request-status', [CvAccessRquestController::class, 'updateCvRquest']);
  Route::put('cv/update-filters', [CvAccessRquestController::class, 'updateCvRquestFilters']);

  //Filter & Export Jobseekers APIs
  Route::post('jobseekers/filter', [JobSeekerController::class, 'FilterJobSeeker']);
  Route::get('jobseekers/filter/export', [JobSeekerController::class, 'ExportFilteredJobSeeker']);

  //Get Completed Course by User ID API
  Route::post('pet/get-courses', [PetCompletionStatusController::class, 'getCompletedCourseByUserId']);

  // Mentors profile  APis
  Route::group(['prefix' => '/mentor'], function () {
    Route::get('/', [MentorController::class, 'index']);
    Route::get('/pending', [MentorController::class, 'getPendingMentors']);
    Route::get('/{id}', [MentorController::class, 'show']);
    Route::get('/user/{userId}', [MentorController::class, 'showByUserId']);
    // Route::post('/create', [MentorController::class, 'store']);
    Route::put('/update/{id}', [MentorController::class, 'update']);
    Route::put('/update/user/{userId}', [MentorController::class, 'updateByUserId']);
    Route::delete('/delete/{id}', [MentorController::class, 'destroy']);
    Route::get('/user/{id}/dashboard', [MentorController::class, 'getWebinarList']);
  });

  //Mentor Webinar APIs
  Route::post('create/webinar', [WebinarController::class, 'create_webinar']);
  Route::get('get/webinars', [WebinarController::class, 'get_webinars']);
  Route::put('update/webinar', [WebinarController::class, 'update_webinar']);
  Route::delete('delete/webinar', [WebinarController::class, 'delete_webinar']);
  Route::get('get/webinar/pending', [WebinarController::class, 'get_pending_events']);
  Route::get('get/webinar/user/{user_id}', [WebinarController::class, 'get_events_by_user']);
  Route::get('get/webinar/{webinar_id}', [WebinarController::class, 'get_webinar_by_id']);
  Route::get('get/webinar/jobseeker/{user_id}/month/{month}/year/{year}', [WebinarController::class, 'get_jobseeker_calander_view']); // Webinar's calendar view for jobseekers point
  Route::get('get/webinar/user/{user_id}/month/{month}/year/{year}', [WebinarController::class, 'get_mentor_calander_view']);
  //Webinars Participants Registration/unregistration
  Route::post('register/webinar', [WebinarController::class, 'register_event']);
  Route::get('get/webinar/participants', [WebinarController::class, 'get_registered_users']);
  Route::post('unregister/webinar', [WebinarController::class, 'unregister_event']);
  Route::post('webinar/registration/status', [WebinarController::class, 'is_registered']);

  //Webinar's Payments
  Route::post('payment/webinar', [WebinarController::class, 'pay_entry_fee']);
  Route::post('payment/webinar/status', [WebinarController::class, 'check_entry_fee']);

  //Upcoming Webinar and Mentors Info
  Route::get('upcoming/webinar/mentors', [WebinarController::class, 'get_mentor_list_of_upcomming_webinar']);
  Route::get('get/mentors', [WebinarController::class, 'get_mentor_lists']);
  Route::post('get/registered/webinars/{user_id}', [WebinarController::class, 'get_registered_webinars']);
  Route::post('get/mentor/webinars/{user_id}', [WebinarController::class, 'get_webinars_by_mentor']);

  //Join Webinar
  Route::get('zoom/webinar/{webinar_id}/user/{user_id}/join', [WebinarController::class, 'join_webinar']);
  //Search Mentor
  Route::post('mentor/search', [MentorController::class, 'searchMentor']);
  // Webiner Filter (pending/approved) From Admin Panel
  Route::post('webinar/filter', [WebinarController::class, 'webinarFilter']);
  // Subdomain Data under auth Guard
  Route::get('employee/pyramid/careers/{subdomain}',[CareerPageController::class, 'sub_domain_data']);
});

// Career Pages API get by sub-domain, available for public
Route::get('employer/get-career-pages/subdomain/{subdomain}', [CareerPageController::class, 'sub_domain_data']);

//Pyramid Career Pages API get by sub-domain and email and pass or authToken, available for public
Route::post('employee/pyramid/careers',[CareerPageController::class, 'pyramid_careers']);

/*
 ---------------------------------------------------------------------
 - APIs Currently not in use
 ---------------------------------------------------------------------
 */

// Skill CRUD
Route::post('skills/insert', [SkillController::class, 'store']);
Route::get('skills/view', [SkillController::class, 'index']);
Route::get('skills/view/{id}', [SkillController::class, 'show']);
Route::put('skills/update/{id}', [SkillController::class, 'update']);
Route::delete('skills/delete/{id}', [SkillController::class, 'destroy']);

// Industry CRUD
Route::post('industry/insert', [IndustryController::class, 'store']);
Route::get('industry/view', [IndustryController::class, 'index']);
Route::get('industry/view/{id}', [IndustryController::class, 'show']);
Route::put('industry/update/{id}', [IndustryController::class, 'update']);
Route::delete('industry/delete/{id}', [IndustryController::class, 'destroy']);

// Organization CRUD
Route::post('organization/insert', [OrganizationController::class, 'store']);
Route::get('organization/view', [OrganizationController::class, 'index']);
Route::get('organization/view/{id}', [OrganizationController::class, 'show']);
Route::put('organization/update/{id}', [OrganizationController::class, 'update']);
Route::delete('organization/delete/{id}', [OrganizationController::class, 'destroy']);

// Profession CRUD
Route::post('profession/insert', [ProfessionController::class, 'store']);
Route::get('profession/view', [ProfessionController::class, 'index']);
Route::get('profession/view/{id}', [ProfessionController::class, 'show']);
Route::put('profession/update/{id}', [ProfessionController::class, 'update']);
Route::delete('profession/delete/{id}', [ProfessionController::class, 'destroy']);