<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasFactory;

    static $rules = [
        'certificate_name' => 'required',
        'issuing_organization' => 'required',
        'issue_date' => 'required',
       ];

    protected $fillable = [
        'certificate_name',
        'issuing_organization',
        'issue_date',
        'expiration_date',
        'credential_id',
        'credential_url'
    ];

    /**
     * Returns the user assoicated with this experience
     *
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
