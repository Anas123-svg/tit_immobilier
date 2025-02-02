<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ClientFile extends Model
{
    use HasFactory;

    protected $table = 'client_file';

    protected $fillable = [
        'client_id',
        'customer_name',
        'legal_status',
        'contact',
        'email',
        'opening_date',
        'opening_reason',
        'business_manager',
        'digital_signature_of_file',
        'details',
        'additional_options',
        'documents',
        'advance_amount',
        'opening_fee',
        'modality'
    ];

    protected $casts = [
        'details' => 'array',
        'additional_options' => 'array',
        'documents' => 'array'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

}
