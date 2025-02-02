<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TenantPenalty extends Model
{
    use HasFactory;

    protected $table = 'tenant_penalty';

    protected $fillable = [
        'tenant_id',
        'contract_id',
        'month',
        'rent',
        'charge',
        'total',
    ];

    // Define relationships
    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'tenant_id');
    }

    public function contract()
    {
        return $this->belongsTo(TenantContract::class, 'contract_id');
    }
}
