<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OwnerRentProperty extends Model
{
    use HasFactory;

    protected $table = 'owner_rent_property';

    protected $fillable = [
        'owner_id',
        'owner',
        'property_name',
        'type_of_property',
        'number_of_floors',
        'number_of_rentals',
        'type_of_numbering',
        'area_m2',
        'market_value',
        'island',
        'batch',
        'block',
        'cie_identifier_number',
        'sodeci_identifier_number',
        'description',
        'city',
        'municipality',
        'neighborhood',
        'longitude',
        'latitude',
        'height',
        'altitude',
        'on_the_corner',
        'near_water',
        'feet_in_the_water',
        'distance_from_water',
        'on_the_main_road',
        'distance_from_road',
        'dry_land',
        'low_depth',
        'school_nearby',
        'market_nearby',
        'assigned_agents',
        'photo',
        'documents',
        'level',
        'door_number',
        'rental_type',
        'rent',
        'charges',
        'room',
        'area',
        'status'
    ];

    protected $casts = [
        'assigned_agents' => 'array',
        'documents' => 'array',
    ];
}
