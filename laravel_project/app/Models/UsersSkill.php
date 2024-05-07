<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class UsersSkill extends Model
{
    use HasFactory;

    protected $fillable = [
      'title',
      'created_at',
      'updated_at'
    ];


    /**
     * Returns the user that owns the userskill.
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    // public function skill () {
    //     return $this->hasMany(Skill::class);
    // }
    // public function jobseeker () {
    //     return $this->belongsTo(JobSeeker::class);
    // }
}
