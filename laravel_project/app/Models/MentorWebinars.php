<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class MentorWebinars extends Model
{
    use HasFactory;

    static $rules = [
        'user_id' => 'required',
        'title' => 'required',
        'description' => 'required',
        'date' => 'required',
        'start_time' => 'required',
        'end_time' => 'required',
    ];

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'approved',
        'date',
        'start_time',
        'end_time',
        'duration',
        'registration_fee',
        'meeting_link',
        'start_link',
        'meeting_platform'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function particiapnts()
    {
        return $this->hasMany(WebinarRegisteredUsers::class, 'webinar_id');
    }

    public function paymentInfo()
    {
        return $this->hasOne(WebinarPaymentStatus::class, 'webinar_id')->where('user_id', Auth::user()->id);
    }


}
