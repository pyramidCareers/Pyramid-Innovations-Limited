<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CvAccessRequestFilters extends Model
{
    use HasFactory;

    protected $fillable=['request_id','filter_name','filter_value'];

    public function filters():BelongsTo{
        return $this->belongsTo(CvAccessRequests::class);
    }
}
