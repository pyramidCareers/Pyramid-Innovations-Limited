<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Job;

class JobApplication extends Model
{
    use HasFactory;

    static $rules = [
		'user_id' => 'required',
		'job_id' => 'required',
    ];

    protected $perPage = 10;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'job_id',
        'shortlisted',
        'status'
    ];

    /**
     * Returns the job details asscociated with this job application.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    /**
     * Returns the user details who applied.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
