<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TenantContract extends Model
{
    use HasFactory;

    // Define the table name (optional if the model name matches the table name)
    protected $table = 'tenant_contracts';

    // Specify the fillable attributes for mass assignment
    protected $fillable = [
        'owner_id',
        'tenant_id',
        'concerned',
        'location',
        'cost_of_rent',
        'contract_type',
        'date_of_signature',
        'entry_date',
        'end_date',
        'Number_of_months_of_deposit',
        'deposit_amount',
        'caution_to_be_paid',
        'number_of_months_in_advance',
        'advance_amount',
        'penalty_for_delay',
        'payment_limit',
        'tacit_renewal',
        'Frequency',
        'digital_signature_of_the_contract',
        'due_date',
    ];

    /**
     * Define the relationship with the Owner model.
     */
    public function owner()
    {
        return $this->belongsTo(Owner::class);
    }

    /**
     * Define the relationship with the Tenant model.
     */
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
