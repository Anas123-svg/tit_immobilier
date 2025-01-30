<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tenant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        // Private owner fields
        'private_pronouns',
        'private_name',
        'private_gender',
        'private_birth_date',
        'private_place_of_birth',
        'private_address',
        'private_nationality',
        'private_document_type',
        'private_document_number',
        'private_date_of_issue',
        'private_signatory_authority',
        'private_expiry_date',
        'private_taxpayer_account_number',
        'private_occupation',
        'private_contact',
        'private_whatsapp_contact',
        'private_email',
        'private_mail_box',
        'private_marital_status',
        'private_number_of_children',
        'private_emergency_contact_name',
        'private_emergency_contact',
        'private_emergency_contact_relation',
        'private_photo',
        'private_documents',

        // Business owner fields
        'business_company_name',
        'business_taxpayer_account_number',
        'business_business_registration_number',
        'business_industry_sector',
        'business_office_phone_number',
        'business_whatsapp_contact',
        'business_email',
        'business_head_office',
        'business_mail_box',
        'business_capital',
        'business_manager_pronouns_title',
        'business_manager_name',
        'business_manager_gender',
        'business_manager_contact',
        'business_manager_date_of_birth',
        'business_manager_place_of_birth',
        'business_manager_address',
        'business_manager_job_position',
        'business_manager_type_of_document',
        'business_manager_document_number',
        'business_manager_date_of_issue',
        'business_manager_authorizing_authority',
        'business_manager_expiry_date',
        'business_photo',
        'business_documents',
        'is_business_tenant',
        'status',
        'payment_status',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'private_documents' => 'array',
        'business_documents' => 'array',
        'is_business_tenant' => 'boolean',
    ];
}
