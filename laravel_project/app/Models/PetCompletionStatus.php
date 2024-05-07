<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PetCompletionStatus extends Model
{
    use HasFactory;
    
    static $rules = [
        'moodle_user_id' => 'required',
        'course_id' => 'required',
    ];

    protected $perPage = 10;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'moodle_user_id',
        'email',
        'course_id',
        'time_completed',
        'status'
    ];
}

