<?php

namespace App\Http\Controllers;

use App\Models\BusinessOwner;
use App\Models\PrivateOwner;
use App\Models\TenantContract;
use Illuminate\Http\Request;
use App\Models\Tenant;


class TenantController extends Controller
{
    public function index()
    {
        try {
            $tenant = Tenant::all()
                ->map(function ($tenant) {
                    return collect($tenant->toArray())->filter(fn($value) => $value !== null);
                });
    
            return response()->json($tenant, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching tenants: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching tenants.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function store(Request $request)
    {
        try {
            $data = $request->all();

            $tenant = Tenant::create($data);

            if (!$tenant) {
                return response()->json(['message' => 'Failed to create tenant.'], 400);
            }

            return response()->json($tenant, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating tenant: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating tenant.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function show($id)
    {
        try {
            $tenant = Tenant::find($id);

            if (!$tenant) {
                return response()->json(['message' => 'tenant not found.'], 404);
            }

            // Remove null fields before returning
            $filteredtenant = collect($tenant->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredtenant, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching tenant: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching tenant.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $tenant = Tenant::find($id);

            if (!$tenant) {
                return response()->json(['message' => 'tenant not found.'], 404);
            }

            $data = $request->all();
            $tenant->update($data);

            $filteredtenant = collect($tenant->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredtenant, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating tenant: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating tenant.',
                'error' => $e->getMessage(),
            ], 500);
        }
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

            // Fetch last 10 active owners
            $lasttenants = Tenant::where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($owner) {
                return array_filter($owner->toArray(), function ($value) {
                    return !is_null($value);
                });
            });

            $lastUnpaidtenants = Tenant::where('payment_status', 'unpaid')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($owner) {
                return array_filter($owner->toArray(), function ($value) {
                    return !is_null($value);
                });
            });
            Log::info('Fetching last 10 validated mandates.');
            $lastContract = TenantContract::where('status', 'to_be_renewed')
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get();

            $totalTenants = Tenant::count();
            $totalContracts = TenantContract::count();
            $totalReversals = OwnerReversalSaleProperty::count() + OwnerReversalRentalProperty::count();
            $totalLocative = OwnerRentProperty::count() + OwnerARentalProperty::count();
            $totalVente = OwnerSaleProperty::count();

            Log::info('Owner Dashboard data fetched successfully.');

            return response()->json([
                'total_tenants' => $totalTenants,
                'total_contracts' => $totalContracts,
                'total_reversals' => $totalReversals,
                'total_locative' => $totalLocative,
                'vente' => $totalVente,
                'occupied' => $occupiedCount,
                'reserved' => $reservedCount,
                'available' => $availableCount,
                'last_tenants' => $lasttenants,
                'last_unpaid_tenants' => $lastUnpaidtenants,
                'last_to_be_renewed_contracts' => $lastContract,
            ]);
        } catch (Exception $e) {
            Log::error('Error in OwnerDashboard: ' . $e->getMessage());

            return response()->json([
                'error' => 'Something went wrong!',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function destroy($id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenant->delete();
        return response()->json(['message' => ' tenant deleted successfully.']);
    }


}
