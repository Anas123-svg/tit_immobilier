<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TenantShortTermContract extends Model
{
    use HasFactory;

    // Define the table name
    protected $table = 'tenant_short_term_contract';

    // Specify the fillable attributes for mass assignment
    protected $fillable = [
        'owner_id',
        'tenant_id',
        'concerned',
        'location',
        'cost_of_rent',
        'billing_type',
        'booking_date',
        'entry_date',
        'end_date',
        'due_date',
        'rental_amount',
        'number_of_hours',
        'options',
    ];

    // Ensure the 'options' field is cast to an array
    protected $casts = [
        'options' => 'array',
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
