<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplyCondition extends Model
{
    use HasFactory;

    static $rules = [
		'job_id' => 'required',
        'condition_type' => 'required',
        'condition_value' => 'required'
    ];

    protected $perPage = 10;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'job_id',
        'condition_type',
        'condition_value',
        'condition_description'
    ];

    /**
     * Returns the job details asscociated with this job apply condition.
     */
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
