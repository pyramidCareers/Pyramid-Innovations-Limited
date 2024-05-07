<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'started_at',
        'ended_at',
        'organization',
        'job_description'
    ];

    /**
     * Returns the user assoicated with this experience
     *
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    // public function jobseeker () {
    //     return $this->belongsTo(JobSeeker::class);
    // }
    // public function organization () {
    //     return $this->belongsTo(Organization::class);
    // }
}
