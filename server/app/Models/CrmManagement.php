<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class CrmManagement extends Model
{
    use HasFactory;
    protected $table = 'crm_management';
    protected $fillable = [
        'user_id',
        'chef_commerçial',
        'charge_a_fee_for_pre_booking_a_sale',
        'charge_a_fee_for_pre_booking_a_rental',
        'sale_pre_reservation_fees',
        'rental_pre_reservation_fees',

    ];
}
