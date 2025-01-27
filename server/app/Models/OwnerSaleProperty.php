<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OwnerSaleProperty extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id','owner', 'property_name', 'type_of_property', 'number_of_floors', 
        'area', 'market_value', 'island', 'batch', 'cie_identifier_number', 
        'sodeci_identifier_number', 'boundary_marking_done', 'domain_type', 
        'has_title_deed', 'serviced', 'approved', 'description', 'city', 
        'municipality', 'neighborhood', 'longitude', 'latitude', 'height', 
        'altitude', 'number_of_parking_spaces', 'number_of_levels', 'garden', 
        'pool', 'on_the_corner', 'near_water', 'feet_in_water', 
        'distance_from_water', 'on_main_road', 'distance_from_road', 
        'dry_land', 'low_depth', 'school_nearby', 'market_nearby', 
        'assigned_agents', 'photo', 'documents'
    ];

    protected $casts = [
        'assigned_agents' => 'array',
        'documents' => 'array',
    ];
}
