<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OwnerPortfolioManagement extends Model
{
    use HasFactory;

    protected $table = 'owner_portfolio_management';

    protected $fillable = [
        'owner_id',
        'owner_name',
        'property_concerned',
        'users',
    ];

    protected $casts = [
        'users' => 'array',
    ];
}