<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class CrmManagement extends Model
{
    use HasFactory;
    protected $table = 'crm_management';
    protected $fillable = [
        'user_id',
        'chef_commerçial'
    ];
}
