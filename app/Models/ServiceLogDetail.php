<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceLogDetail extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'service_log_id',
        'service_name',
        'service_cost',
    ];

    /**
     * Relationship with ServiceLog
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function serviceLog(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(ServiceLog::class);
    }
}
