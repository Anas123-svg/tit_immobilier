<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessOwner extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'taxpayer_identification_number',
        'business_registration_number',
        'industry_sector',
        'office_phone_number',
        'whatsapp_contact',
        'email',
        'head_office',
        'po_box',
        'capital',
        'manager_pronouns_title',
        'manager_name',
        'manager_gender',
        'manager_contact',
        'manager_date_of_birth',
        'manager_place_of_birth',
        'manager_address',
        'manager_job_position',
        'manager_type_of_document',
        'manager_document_number',
        'manager_date_of_issue',
        'manager_authorizing_authority',
        'manager_expiry_date',
        'photo',
        'documents',
    ];

    protected $casts = [
        'documents' => 'array',
    ];
}
