<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExtraCurriculars extends Model
{
    use HasFactory;

    static $rules = [
        'organization_name' => 'required',
    ];

    protected $fillable = [
        'organization_name',
        'role',
        'category',
        'start_date',
        'end_date',
        'description'
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
