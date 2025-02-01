<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProspectSalesOffer extends Model
{
    use HasFactory;

    protected $table = 'sales_prospect_offer';


    protected $fillable = [
        'prospect_sales_type_of_offer',
        'free_offer_area',
        'free_offer_bathroom',
        'free_offer_quantity',
        'free_offer_featured_offer',
        'free_offer_description',
        'free_offer_longitude',
        'free_offer_latitude',
        'free_offer_photo',
        'free_offer_documents',
        'rooms',
        'showers',
        'living_rooms',
        'garages',
        'cuisine',
        'wifi',
        'air_conditioner',
        'parking',
        'pool',
        'emergency_exit',
        'security_guard',
        'fire_hydrant',
        'gallery',
        'video',
        'plan',
        'real_estate_dev_programme',
        'real_estate_dev_home',
        'sub_div_project',
        'subdivision',
        'subdivision_island',
        'subdivision_lot',
        'house_for_sale',
        'is_prospect_location'
    ];

    protected $casts = [
        'wifi' => 'boolean',
        'air_conditioner' => 'boolean',
        'parking' => 'boolean',
        'pool' => 'boolean',
        'emergency_exit' => 'boolean',
        'security_guard' => 'boolean',
        'fire_hydrant' => 'boolean',
        'free_offer_documents' => 'array',
        'gallery' => 'array',
        'plan' => 'array',
    ];
}
