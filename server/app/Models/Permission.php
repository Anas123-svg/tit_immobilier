<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Permission extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'description',
        'assigned_permissions',
    ];

    protected $casts = [
        'assigned_permissions' => 'array', // Automatically cast to array when retrieving
    ];
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_permissions');
    }
}
