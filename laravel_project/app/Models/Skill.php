<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    static $rules = [
        'title' => 'required'
    ];

    protected $fillable = [
        'title',
        'description'
    ];

    public function usersskill () {
        return $this->belongsTo(users_skill::class);
    }
}
