<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OwnerMandate extends Model
{
    use HasFactory;

    protected $table = 'owner_mandate';

    protected $fillable = [
        'owner_id',
        'type_of_mandate',
        'owner_name',
        'very_concerned',
        'type_of_property',
        'neighborhood',
        'tax_payable',
        'billing_type',
        'commission',
        'deduct_commission',
        'vat_on_commission',
        'date_of_signature',
        'debut_date',
        'end_date',
        'digital_signature_of_the_mandate',
        'tacit_renewal',
    ];
}
