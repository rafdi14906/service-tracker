<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServiceLog extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'vehicle_id',
        'date',
        'transaction_number',
        'workshop_name',
        'workshop_address',
        'workshop_phone',
        'mechanic',
        'grand_total_cost',
        'total_service_cost',
        'total_parts_cost',
        'note',
        'receipt_path',
    ];

    /**
     * Relationship with vehicle
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vehicle(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    /**
     * Relationship with service log details
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function details(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ServiceLogDetail::class);
    }

    /**
     * Relationship with service log parts
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function parts(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ServiceLogPart::class);
    }

    /**
     * Relationship with service attachment
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attachments(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(ServiceLogAttachment::class);
    }
}
