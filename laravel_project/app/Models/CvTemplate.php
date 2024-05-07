<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CvTemplate extends Model
{
    use HasFactory;

    static $rules = [
        'name' => 'required',
        'link' => 'required|file|mimes:pdf,docx'
    ];

    protected $fillable = [
        'name',
        'description',
        'link',
        'tag'
    ];

    /**
     *  Returns the user info of the employer.
     *
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getLinkAttribute($value)
    {
        if($value) {
            return asset(Storage::url('public/' . $value));
        }
        return null;
    }
}
