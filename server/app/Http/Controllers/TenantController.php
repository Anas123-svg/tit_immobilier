<?php

namespace App\Http\Controllers;

use App\Models\BusinessOwner;
use App\Models\PrivateOwner;
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


    public function destroy($id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenant->delete();
        return response()->json(['message' => ' tenant deleted successfully.']);
    }


}
