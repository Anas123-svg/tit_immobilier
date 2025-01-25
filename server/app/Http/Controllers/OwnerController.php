<?php

namespace App\Http\Controllers;

use App\Models\BusinessOwner;
use App\Models\PrivateOwner;
use Illuminate\Http\Request;

class OwnerController extends Controller
{
    public function getAllOwners()
    {
        try {
            $businessOwners = BusinessOwner::all();

            $privateOwners = PrivateOwner::all();
            return response()->json(['business_owners' => $businessOwners, 'private_owners' => $privateOwners], 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching owners: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching owners.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
