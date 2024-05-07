<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class Job extends Model
{
    use HasFactory;

    static $rules = [
        'employer_user_id' => 'required',
        'title' => 'required',
        'description' => 'required',
        'requirement_details' => 'required',
        'additional_requirements' => 'required',
        'responsibilities' => 'required',
        'salary_lower_limit' => 'required',
        'salary_upper_limit' => 'required',
    ];

    protected $perPage = 10;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'employer_user_id',
        'title',
        'description',
        'requirement_details',
        'additional_requirements',
        'responsibilities',
        'salary_lower_limit',
        'salary_upper_limit',
        'currency',
        'other_benefits',
        'location',
        'category',
        'created_by',
        'job_type',
        'experience_level',
        'experience_lower_limit',
        'experience_upper_limit',
        'company_site_link',
        'published',
        'number_of_vacancies',
        'application_deadline'
    ];

    /**
     *
     */
    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_user_id', 'id');
    }

    public function companyinfo()
    {
        return $this->belongsTo(Employer::class, 'employer_user_id', 'user_id');
    }

    public function jobApplications()
    {
        return $this->hasMany(JobApplication::class);
    }

    public function ownJobApplication()
    {
        return $this->hasOne(JobApplication::class)->where('user_id', Auth::user()->id);
    }

    public function jobApplyConditions()
    {
        return $this->hasMany(JobApplyCondition::class);
    }

    public function jobReadyPrograms()
    {
        return $this->hasOne(JobReadyProgram::class);
    }

    public function jobReadyCourses()
    {
        return $this->hasMany(JobReadyCourse::class);
    }

    public function jobDetails()
    {
        return $this->hasMany(FavoriteJobs::class);
    }

    public function ownFavoriteJob()
    {
        return $this->hasOne(FavoriteJobs::class)->where('user_id', Auth::user()->id);
    }

    // public function hasJobApplication()
    // {
    //     return $this->hasOne(JobApplication::class);
    // }
}
