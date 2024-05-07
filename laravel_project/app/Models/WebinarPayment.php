<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebinarPayment extends Model
{
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
        'webinar_id',
        'user_id',
    ];
}
