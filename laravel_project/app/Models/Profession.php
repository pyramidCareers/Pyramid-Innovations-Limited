<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profession extends Model
{
    use HasFactory;

    static $rules = [
        'title' => 'required'
    ];

    protected $fillable = [
        'title',
        'description'
    ];

    public function jobseeker () {
        return $this->belongsTo(JobSeeker::class);
    }
}
