<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LocationProspectOfficialResponse extends Model
{
    use HasFactory;

    protected $table = 'location_prospect_official_response';


    protected $fillable = [
        'prospect_id',
        'pre_booking',
        'status',
        'availability',
        'assessment',
        'assessment_from_us',
        'object',
        'comments',
        'documents'
    ];

    protected $casts = [
        'pre_booking' => 'boolean',
        'documents' => 'array',
    ];

    public function prospect()
    {
        return $this->belongsTo(SaleProspect::class, 'prospect_id');
    }
}
