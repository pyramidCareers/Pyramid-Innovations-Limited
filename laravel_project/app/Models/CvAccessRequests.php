<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CvAccessRequests extends Model
{
    use HasFactory;

    protected $fillable=['user_id','number_of_cv','status','approved_by','approved_at'];

    public function User():BelongsTo{
        return $this->belongsTo(User::class);
    }
    public function Cvfilters():HasMany{
        return $this->hasMany(CvAccessRequestFilters::class,'request_id');
    }
}
