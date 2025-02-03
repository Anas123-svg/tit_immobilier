<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TenantFillInventory extends Model
{
    use HasFactory;

    protected $table = 'tenant_fill_inventory';

    protected $fillable = [
        'tenant_id',
        'contract_id',
        'date_of_establishment',
        'state_type',
        'observation',
        'inventory_of_elements',
        'documents'
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
        'inventory_of_elements' => 'array',
        'documents' => 'array'
    ];
}
