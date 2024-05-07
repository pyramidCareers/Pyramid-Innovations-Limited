<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mentor extends Model
{
    use HasFactory;

    static $rules = [
        'user_id' => 'required',
    ];

    protected $perPage = 10;
    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'created_by',
        'bio',
        'profession',
        'industry',
        'specialty',
    ];

    /**
     *  Returns the user info of the job seeker.
     *
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function webinar(){
        return $this->hasMany(MentorWebinars::class,'user_id');
    }
}
