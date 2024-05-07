<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FavoriteJobs extends Model
{
    use HasFactory;


    protected $fillable=['job_id','user_id'];


    public function job():BelongsTo{
        return $this->belongsTo(Job::class);
    }
    public function User():BelongsTo{
        return $this->belongsTo(User::class);
    }
}
