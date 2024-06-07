<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceLogAttachment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'service_log_id',
        'path',
        'note',
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
