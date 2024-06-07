<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vehicle extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category',
        'plate_number',
        'brand',
        'seri',
        'type',
        'cylinder_capacity',
        'year',
        'fuel_type',
        'color',
        'model',
        'chassis_number',
        'engine_number',
    ];
}
