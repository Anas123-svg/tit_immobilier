<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TenantPayment extends Model
{
    use HasFactory;

    protected $table = 'tenant_payment';

    protected $fillable = [
        'tenant_id',
        'contract_id',
        'type_payment',
        'Treasury',
        'payment_method',
        'payment_date',
        'done_by',
        'other_name',
        'phone_no',
        'Transaction_details',
        'documents',
        'amount',
    ];

    protected $casts = [
        'documents' => 'array',
    ];
    // Relationships
    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }

    public function contract()
    {
        return $this->belongsTo(TenantContract::class, 'contract_id');
    }
}
