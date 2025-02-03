<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TenantInvoice extends Model
{
    protected $table = 'tenant_invioce';  // Note: Ensure this table name is correct (typo in 'invoice')

    protected $fillable = [
        'tenant_id',
        'contract_id',
        'Label',
        'Echeance',
        'details',
        'status'
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }

    public function contract()
    {
        return $this->belongsTo(TenantContract::class, 'contract_id');
    }

    protected $casts = [
        'details' => 'array',
    ];
}
