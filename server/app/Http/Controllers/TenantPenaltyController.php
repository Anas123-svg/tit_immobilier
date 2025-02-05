<?php

namespace App\Http\Controllers;
use App\Models\TenantPenalty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TenantPenaltyController extends Controller
{
    public function index()
    {
        return response()->json(TenantPenalty::orderBy('created_at', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'tenant_id' => 'required|integer',
                'contract_id' => 'required|integer'
            ]);
            $data=$request->all();
            $contract = TenantPenalty::create($data);
            return response()->json([
                'message' => 'penalty created successfully!',
                'data' => $contract,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error while creating penalty', [
                'errors' => $e->errors(),
            ]);

            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the penalty',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $contract = TenantPenalty::findOrFail($id);
        return response()->json($contract, 200);
    }

    public function update(Request $request, $id)
    {
        $contract = TenantPenalty::findOrFail($id);
        $contract->update($request->all());
        return response()->json($contract, 200);
    }

    public function destroy($id)
    {
        $contract = TenantPenalty::findOrFail($id);
        $contract->delete();
        return response()->json(null, 204);
    }


    public function getByContractId($contract_id)
    {
        $tenantBills = TenantPenalty::where('contract_id', $contract_id)->get();
        
        if ($tenantBills->isEmpty()) {
            return response()->json([
                'message' => 'No penalty found for the given contract ID',
            ], 404);
        }

        return response()->json($tenantBills, 200);
    }

    // Function to get TenantPenalty by tenant_id
    public function getByTenantId($tenant_id)
    {
        $tenantBills = TenantPenalty::where('tenant_id', $tenant_id)->get();
        
        if ($tenantBills->isEmpty()) {
            return response()->json([
                'message' => 'No penalty found for the given tenant ID',
            ], 404);
        }

        return response()->json($tenantBills, 200);
    }

}
