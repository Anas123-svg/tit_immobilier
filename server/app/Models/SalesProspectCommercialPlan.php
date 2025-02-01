<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SalesProspectCommercialPlan extends Model
{
    use HasFactory;
    protected $table = 'sales_prospect_commercial_plan';
    protected $fillable=[
        'prospect_id',
        'prospect_sales_type_of_commercial_action',
        'prospect_sales_object',
        'description',
        'documents',
        'is_prospect_location'
    ];

    protected $casts = [
        'documents' => 'array',
    ];


    public function saleProspect()
    {
        return $this->belongsTo(SaleProspect::class, 'prospect_id');
    }

}
