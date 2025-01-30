<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Owner extends Model
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
        'private_expiry_date',
        'private_taxpayer_identification_number',
        'private_occupation',
        'private_contact',
        'private_whatsapp_contact',
        'private_email',
        'private_po_box',
        'private_marital_status',
        'private_spouses_name',
        'private_number_of_children',
        'private_employer_name',
        'private_bank_statement_rib',
        'private_emergency_contact_name',
        'private_emergency_contact',
        'private_emergency_contact_relation',
        'private_photo',
        'private_documents',

        // Business owner fields
        'business_company_name',
        'business_taxpayer_identification_number',
        'business_business_registration_number',
        'business_industry_sector',
        'business_office_phone_number',
        'business_whatsapp_contact',
        'business_email',
        'business_head_office',
        'business_po_box',
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
        'is_business_owner',
        'status'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'private_documents' => 'array',
        'business_documents' => 'array',
        'is_business_owner' => 'boolean',
    ];

    /**
     * Accessor for private full name.
     *
     * @return string|null
     */
    public function getPrivateFullNameAttribute(): ?string
    {
        return $this->private_name ? $this->private_pronouns . ' ' . $this->private_name : null;
    }

    /**
     * Accessor for business manager full name.
     *
     * @return string|null
     */
    public function getBusinessManagerFullNameAttribute(): ?string
    {
        return $this->business_manager_name ? $this->business_manager_pronouns_title . ' ' . $this->business_manager_name : null;
    }

    /**
     * Mutator for private email to ensure lowercase.
     *
     * @param string $value
     * @return void
     */
    public function setPrivateEmailAttribute($value): void
    {
        $this->attributes['private_email'] = strtolower($value);
    }

    /**
     * Mutator for business email to ensure lowercase.
     *
     * @param string $value
     * @return void
     */
    public function setBusinessEmailAttribute($value): void
    {
        $this->attributes['business_email'] = strtolower($value);
    }

    /**
     * Determine if the owner is a private individual.
     *
     * @return bool
     */
    public function isPrivateOwner(): bool
    {
        return !$this->is_business_owner;
    }

    /**
     * Determine if the owner is a business entity.
     *
     * @return bool
     */
    public function isBusinessOwner(): bool
    {
        return $this->is_business_owner;
    }
}