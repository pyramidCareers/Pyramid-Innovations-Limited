<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Http\Controllers\API\JobSeekerController;
use Illuminate\Support\Facades\Storage;

class JobSeeker extends Model
{
    use HasFactory;

    static $rules = [
        'user_id' => 'required',
        // 'resume'  => 'required|mimes:pdf|max:2048',
        // 'expected_salary' => 'required|gt:0',
        // 'currency' => 'required',
        // 'current_notice_period' => 'required|gte:0',
    ];

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'jobseeking_status',
        'expected_salary',
        'currency',
        'current_notice_period',
        'current_profession',
        'industry',
        'speciality',
        'field_of_study',
        'resume',
        'created_by',
        'years_of_experience'
    ];

    /**
     *  Returns the user info of the job seeker. 
     * 
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getResumeAttribute($value)
    {
        if($value) {
            return asset(Storage::url('public/' . $value));
        } 
        return null;
    }

    public function education () {
        return $this->hasMany(Education::class);
    }
    public function experience () {
        return $this->hasMany(Experience::class);
    }

    public function userskill () {
        return $this->hasMany(UsersSkill::class);
    }

    public function profession () {
        return $this->hasOne(Profession::class);
    }

    public function industry () {
        return $this->hasOne(Industry::class);
    }
}
