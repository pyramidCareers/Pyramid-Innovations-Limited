<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CareerPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'verified',
        'brandcolor',
        'cover',
        'galleryimage1',
        'galleryimage2',
        'galleryimage3',
        'galleryimage4',
        'galleryimage5',
        'fblink',
        'linkedinlink',
        'email',
        'sub_domain'
    ];

    /**
     *  Returns the user info of the employer.
     *
     */
    public function employer()
    {
        return $this->belongsTo(Employer::class, 'user_id','user_id');
    }

    public function getCoverAttribute($value)
    {
        if($value) {
            return asset(Storage::url('public/' . $value));
        }
        return null;
    }
    public function getGalleryimage1Attribute($value)
    {
        if($value) {
            return asset(Storage::url('public/' . $value));
        }
        return null;
    }
    public function getGalleryimage2Attribute($value)
    {
        if($value) {
            return asset(Storage::url('public/' . $value));
        }
        return null;
    }
    public function getGalleryimage3Attribute($value)
    {
        if($value) {
            return asset(Storage::url('public/' . $value));
        }
        return null;
    }
    public function getGalleryimage4Attribute($value)
    {
        if($value) {
            return asset(Storage::url('public/' . $value));
        }
        return null;
    }
    public function getGalleryimage5Attribute($value)
    {
        if($value) {
            return asset(Storage::url('public/' . $value));
        }
        return null;
    }

    public function getSubDomainAttribute($value)
    {
        if($value) {
            return $value. '.pyramid.careers';
        }
        return null;
    }
}
