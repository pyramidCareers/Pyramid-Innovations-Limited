<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'institution',
        'year',
        'result',
        'total_cgpa',
        'grade_type',
        'letter_marks'
    ];

    /**
     * Returns the user assoicated with this experience
     *
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function jobseeker () {
        return $this->belongsTo(JobSeeker::class);
    }

}
