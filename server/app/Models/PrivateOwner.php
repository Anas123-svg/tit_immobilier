<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PrivateOwner extends Model
{
    use HasFactory;

    protected $fillable = [
        'pronouns',
        'name',
        'gender',
        'birth_date',
        'place_of_birth',
        'address',
        'nationality',
        'document_type',
        'document_number',
        'date_of_issue',
        'expiry_date',
        'taxpayer_identification_number',
        'occupation',
        'contact',
        'whatsapp_contact',
        'email',
        'po_box',
        'marital_status',
        'spouses_name',
        'number_of_children',
        'employer_name',
        'bank_statement_rib',
        'emergency_contact_name',
        'emergency_contact',
        'emergency_contact_relation',
        'photo',
        'documents',
    ];

    protected $casts = [
        'documents' => 'array',
    ];
}
