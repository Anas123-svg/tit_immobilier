<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class OwnerReversalRentalProperty extends Model
{
    use HasFactory;

    protected $table = 'owner_reversal_rental_property';

    protected $fillable = [
        'owner_id',
        'good',
        'filter_by',
        'date_debut',
        'end_date',
        'comments',
    ];
}