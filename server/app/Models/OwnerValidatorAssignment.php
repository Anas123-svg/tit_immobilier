<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class OwnerValidatorAssignment extends Model
{
    use HasFactory;

    protected $table = 'owner_validator_assignment';

    protected $fillable = [
        'type_of_selection',
        'users',
        'owners',
    ];

    protected $casts = [
        'users' => 'array',
        'owners' => 'array',
    ];
}