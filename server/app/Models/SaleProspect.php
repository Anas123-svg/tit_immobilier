<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SaleProspect extends Model
{
    use HasFactory;

    protected $fillable = [
        'prospect_sales_prospect_type',
        'prospect_sales_source_of_prospect',
        'prospect_sales_civility',
        'prospect_sales_name_surname',
        'prospect_sales_phone',
        'prospect_sales_contact_whatsapp',
        'prospect_sales_email',
        'prospect_sales_marital_status',
        'prospect_sales_children',
        'prospect_sales_profession',
        'prospect_sales_number_of_children',
        'prospect_sales_type_of_need',
        'prospect_sales_type_of_property',
        'prospect_sales_management_rentals',
        'prospect_sales_management_rentals_income',
        'prospect_sales_management_percentage',
        'prospect_sales_purchase_budget_min',
        'prospect_sales_purchase_budget_max',
        'prospect_sales_description',
        'prospect_sales_would',
        'prospect_sales_municipality',
        'prospect_sales_neighborhood',
        'prospect_sales_photo',
        'prospect_sales_documents',
        'is_prospect_location'
    ];

    protected $casts = [
        'prospect_sales_management_rentals_income' => 'decimal:2',
        'prospect_sales_purchase_budget_min' => 'decimal:2',
        'prospect_sales_purchase_budget_max' => 'decimal:2',
        'prospect_sales_documents' => 'array',
    ];
}
