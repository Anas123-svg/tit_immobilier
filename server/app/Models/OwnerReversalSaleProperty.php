<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class OwnerReversalSaleProperty extends Model
{
    use HasFactory;

    protected $table = 'owner_reversal_sale_property';

    protected $fillable = [
        'owner_id',
        'property_type',
        'owner_name',
        'client',
        'case',
    ];
}