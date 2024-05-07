<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobReadyProgram extends Model
{
    use HasFactory;

    static $rules = [
		'job_id' => 'required',
		'title' => 'required|string'
    ];

    protected $perPage = 10;

    protected $fillable = [
      'job_id',
      'title'
    ];

    /**
     * Returns the job details asscociated with this job ready program.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
