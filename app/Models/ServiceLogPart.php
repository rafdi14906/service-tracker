<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceLogPart extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'service_log_id',
        'part_code',
        'part_name',
        'part_quantity',
        'part_cost',
        'subtotal_part_cost',
        'is_guarantee',
        'guarantee_until',
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
