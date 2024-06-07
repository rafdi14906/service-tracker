<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Setting extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'retail_name',
        'retail_address',
        'retail_phone',
        'retail_email',
        'retail_logo',
        'retail_favicon',
        'created_by',
        'updated_by',
        'deleted_by',
    ];
}
