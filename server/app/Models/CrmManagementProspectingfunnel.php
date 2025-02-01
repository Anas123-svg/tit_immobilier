<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CrmManagementProspectingfunnel extends Model
{
    use HasFactory;

    protected $table = 'crm_prospecting_funnel';


    protected $fillable = [
        'stage', 
        'is_rental', 
        'duration_of_treatment', 
        'commercial_actions',
    ];

    protected $casts = [
        'commercial_actions' => 'array',
        'is_rental' => 'boolean',
        'duration_of_treatment' => 'integer',
    ];

}
