<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    use HasFactory;

    static $rules = [
        'title' => 'required'
    ];

    protected $fillable = [
        'title',
        'description'
    ];

    public function experience () {
        return $this->belongsTo(experience::class);
    }
}
