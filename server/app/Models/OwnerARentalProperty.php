<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OwnerARentalProperty extends Model
{
    use HasFactory;

    protected $table = 'owner_a_rental_property';

    protected $fillable = [
        'owner_id',
        'owner_name',
        'very_concerned',
        'type_of_property',
        'numerotation',
        'total',
        'door_no',
        'type_of_rental',
        'floor',
        'number_of_rooms',
        'surface',
        'rent_amount',
        'amount_of_charges',
        'profile_photo',
        'documents',
    ];

    protected $casts = [
        'documents' => 'array',
    ];

    public function owner()
    {
        return $this->belongsTo(Owner::class);
    }
}
