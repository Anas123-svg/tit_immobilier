<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Treasury extends Model
{
    use HasFactory;

    protected $table = 'treasury';

    protected $fillable = [
        'manager_id',
        'cash_type',
        'label',
        'comment',
        'account_no',
        'minimum_threshold',
        'maximum_threshold',
        'validator_assignment',
    ];
    protected $casts = [
        'validator_assignment' => 'array',
    ];

    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }
}
