<?php

namespace App\Http\Controllers;

use App\Models\BusinessOwner;
use App\Models\OwnerARentalProperty;
use App\Models\PrivateOwner;
use Illuminate\Http\Request;
use App\Models\Owner;
use App\Models\OwnerSaleProperty;
use App\Models\OwnerRentProperty;
use App\Models\OwnerMandate;
use App\Models\OwnerReversalSaleProperty;

use App\Models\OwnerReversalRentalProperty;
use Illuminate\Support\Facades\Log;
use Exception;

class OwnerController extends Controller
{
    public function index()
    {
        try {
            $owners = Owner::orderBy('created_at', 'desc')
                ->get()
                ->map(function ($owner) {
                    return collect($owner->toArray())->filter(fn($value) => $value !== null);
                });
    
            return response()->json($owners, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching owners: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching owners.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function store(Request $request)
    {
        try {
            $data = $request->all();

            $owner = Owner::create($data);

            if (!$owner) {
                return response()->json(['message' => 'Failed to create owner.'], 400);
            }

            return response()->json($owner, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating owner: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating owner.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function show($id)
    {
        try {
            $owner = Owner::find($id);

            if (!$owner) {
                return response()->json(['message' => 'Owner not found.'], 404);
            }

            // Remove null fields before returning
            $filteredOwner = collect($owner->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredOwner, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching owner: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching owner.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $owner = Owner::find($id);

            if (!$owner) {
                return response()->json(['message' => 'Owner not found.'], 404);
            }

            $data = $request->all();
            $owner->update($data);

            $filteredOwner = collect($owner->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredOwner, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating owner: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating owner.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function destroy($id)
    {
        $Owner = Owner::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' owner deleted successfully.']);
    }


    public function OwnerDashboard()
    {
        try {
            Log::info('Fetching property counts for Owner Dashboard.');

            $occupiedCount = OwnerSaleProperty::whereNotNull('owner_id')
                ->where('status', 'occupied')
                ->count()
                + OwnerRentProperty::whereNotNull('owner_id')
                ->where('status', 'occupied')
                ->count();

            $reservedCount = OwnerSaleProperty::whereNotNull('owner_id')
                ->where('status', 'reserved')
                ->count()
                + OwnerRentProperty::whereNotNull('owner_id')
                ->where('status', 'reserved')
                ->count();

            $availableCount = OwnerSaleProperty::whereNull('owner_id')
                ->where('status', 'available')
                ->count()
                + OwnerRentProperty::whereNull('owner_id')
                ->where('status', 'available')
                ->count();
                
            $totalCount = OwnerSaleProperty::count() + OwnerRentProperty::count();
            Log::info('Total properties counted: ' . $totalCount);

            Log::info('Fetching last 10 active owners.');
            $lastOwners = Owner::where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($owner) {
                return array_filter($owner->toArray(), function ($value) {
                    return !is_null($value);
                });
            });
            Log::info('Fetching last 10 validated mandates.');
            $lastMandates = OwnerMandate::where('status', 'validated')
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get();

            $totalOwners = Owner::count();
            $totalMandates = OwnerMandate::count();
            $totalReversals = OwnerReversalSaleProperty::count() + OwnerReversalRentalProperty::count();
            $totalLocative = OwnerRentProperty::count() + OwnerARentalProperty::count();
            $totalVente = OwnerSaleProperty::count();

            $locative = OwnerRentProperty::limit(10)->get();

            $reversals = OwnerReversalSaleProperty::limit(10)->get();
            $vente = OwnerSaleProperty::limit(10)->get();

            Log::info('Owner Dashboard data fetched successfully.');

            return response()->json([
                'total_owners' => $totalOwners,
                'total_mandates' => $totalMandates,
                'total_reversals' => $totalReversals,
                'total_locative' => $totalLocative,
                'total_vente' => $totalVente,
                'occupied' => $occupiedCount,
                'reserved' => $reservedCount,
                'available' => $availableCount,
                'last_owners' => $lastOwners,
                'last_mandates' => $lastMandates,
                'locative' => $locative,
                'reversals' => $reversals,
                'vente' => $vente
            ]);
        } catch (Exception $e) {
            Log::error('Error in OwnerDashboard: ' . $e->getMessage());

            return response()->json([
                'error' => 'Something went wrong!',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function getOwnerProperties($ownerId)
{
    try {
        $owner = Owner::find($ownerId);
        $saleProperties = OwnerSaleProperty::where('owner_id', $ownerId)->get();
        $rentProperties = OwnerRentProperty::where('owner_id', $ownerId)->get();
        $mandate = OwnerMandate::where('owner_id', $ownerId)->get();

        return response()->json([
            'profile' => $owner,
            'Good' => $saleProperties,
            'Locative' => $rentProperties,
            'Mandate' => $mandate,
        ], 200);
    } catch (\Exception $e) {
        Log::error('Error fetching owner properties: ' . $e->getMessage());

        return response()->json([
            'message' => 'Error fetching owner properties.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function getOwnerSaleProperties($ownerId)
{
    try {
        $saleProperties = OwnerSaleProperty::where('owner_id', $ownerId)->get();

        return response()->json([
            'sale_properties' => $saleProperties,
        ], 200);
    } catch (\Exception $e) {
        Log::error('Error fetching owner sale properties: ' . $e->getMessage());

        return response()->json([
            'message' => 'Error fetching owner sale properties.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function getOwnerRentProperties($ownerId)
{
    try {
        $saleProperties = OwnerRentProperty::where('owner_id', $ownerId)->get();

        return response()->json([
            'sale_properties' => $saleProperties,
        ], 200);
    } catch (\Exception $e) {
        Log::error('Error fetching owner sale properties: ' . $e->getMessage());

        return response()->json([
            'message' => 'Error fetching owner sale properties.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    



}
