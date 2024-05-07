<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Employer extends Model
{
    use HasFactory;

    static $rules = [
        'user_id' => 'required',
        // 'organization_name' => 'required',
        // 'organization_details' => 'required',
    ];
    protected $perPage = 20;
    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'org_name',
        'org_details',
        'logo',
        'location',
        'org_address1',
        'org_address2',
        'org_url',
        'org_size_upper_limit',
        'org_size_lower_limit',
        'industry',
        'created_by'
    ];

    /**
     *  Returns the user info of the employer.
     *
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     *  Returns the user info of the employer.
     *
     */
    public function careerpage()
    {
        return $this->hasOne(CareerPage::class, 'user_id');
    }

    public function getLogoAttribute($value)
    {
        if($value) {
            return asset(Storage::url('public/' . $value));
        }
        return null;
    }
}
