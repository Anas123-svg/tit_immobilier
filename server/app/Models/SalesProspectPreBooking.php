<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SalesProspectPreBooking extends Model
{
    use HasFactory;
    protected $table = 'sales_prospect_pre_booking';
    protected $fillable=[
        'prospect_id',
        'email',
        'phone',
        'is_prospect_location'
    ];

    public function saleProspect()
    {
        return $this->belongsTo(SaleProspect::class, 'prospect_id');
    }


}
