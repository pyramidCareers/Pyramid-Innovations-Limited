<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Job;
use App\Models\Education;
use App\Models\Experience;
use App\Models\UsersSkill;
use App\Models\PasswordResetTokens;
use Illuminate\Support\Facades\Storage;
use App\Models\CvAccessRequests;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'password',
        'phone',
        'user_type',
        'auth_type',
        'moodle_userid',
        'moodle_username',
        'moodle_password',
        'moodle_auth_token',
        'force_password_change',
        'gender'
    ];

    protected $perPage = 10;
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     *  Returns the jobs posted by this user.
     *
     */
    public function Jobs()
    {
        return $this->belongsTo(Job::class);
    }

    /**
     *  Returns the educational qualification of the user.
     *
     */
    public function educations()
    {
        return $this->hasMany(Education::class);
    }

    /**
     *  Returns the experiences of the user.
     *
     */
    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    /**
     *  Returns the skills of the user.
     *
     */
    public function usersSkills()
    {
        return $this->hasMany(UsersSkill::class);
    }

    /**
     *  Serves the password reset request of the user.
     *
     */
    public function passwordResetTokens()
    {
        return $this->hasMany(PasswordResetTokens::class);
    }

    public function jobSeeker()
    {
        return $this->hasOne(JobSeeker::class);
    }

    public function companyinfo()
    {
        return $this->hasOne(Employer::class);
    }

    public function getProfilePicAttribute($value)
    {
        if ($value) {
            return asset(Storage::url('public/' . $value));
        }
        return null;
    }

    public function jobApplications()
    {
        return $this->hasMany(JobApplication::class);
    }

    public function certifications()
    {
        return $this->hasMany(Certification::class);
    }

    public function extracurriculars()
    {
        return $this->hasMany(ExtraCurriculars::class);
    }

    public function cvTemplates()
    {
        return $this->hasMany(CvTemplate::class);
    }

    public function favoriteJob()
    {
        return $this->hasMany(FavoriteJobs::class);
    }
    public function experience()
    {
        return $this->hasMany(Experience::class);
    }
    public function CvAccessRequests()
    {
        return $this->hasMany(CvAccessRequests::class,'user_id');
    }

    public function mentor()
    {
        return $this->hasOne(Mentor::class);
    }

    public function webinar(){
        return $this->hasMany(MentorWebinars::class);
    }
}
