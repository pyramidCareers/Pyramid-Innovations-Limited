<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobReadyCourse extends Model
{
    use HasFactory;

    static $rules = [
		'job_id' => 'required',
		'course_id' => 'required',
		'course_name' => 'required|string'
    ];

    protected $perPage = 10;

    protected $fillable = [
      'job_id',
      'course_id',
      'course_name'
    ];

    /**
     * Returns the job details asscociated with this job ready course.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
