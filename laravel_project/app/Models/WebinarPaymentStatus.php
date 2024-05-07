<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebinarPaymentStatus extends Model
{
    protected $table = 'webinar_payment_status';
    use HasFactory;


    static $rules = [
        'user_id' => 'required',
        'webinar_id' => 'required',
    ];

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'webinar_id',
        'amount',
        'gateway',
        'status',
    ];
}