<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class CrmManagementProspectingStage extends Model
{
    use HasFactory;

    protected $table = 'crm_management_prospecting_stage';
    protected $fillable = ['label'];

}
