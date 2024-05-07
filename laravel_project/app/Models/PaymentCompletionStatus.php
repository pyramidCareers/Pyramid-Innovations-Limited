<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentCompletionStatus extends Model
{
    use HasFactory;

    static $rules = [
        'user_id' => 'required',
        'job_id' => 'required',
        'status' => 'required'
    ];

    protected $perPage = 10;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'job_id',
        'amount',
        'gateway',
        'status'
    ];
}
