<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TreasurySupply extends Model
{
    use HasFactory;

    // Define the table name if it doesn't follow Laravel's pluralization convention
    protected $table = 'treasury_supply';

    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'treasury_id',
        'owner_id',
        'property_id',
        'property_type',
        'account_to_be_funded',
        'label',
        'date',
        'mode',
        'external_type_owner',
        'source_of_income',
        'done_by',
        'tiers',
        'bank',
        'cheque',
        'account_no',
        'amount',
        'documents',
    ];

    protected $casts = [
        'documents' => 'array',
    ];
    public function treasury()
    {
        return $this->belongsTo(Treasury::class, 'treasury_id');
    }

    public function owner()
    {
        return $this->belongsTo(Owner::class, 'owner_id');
    }
}
