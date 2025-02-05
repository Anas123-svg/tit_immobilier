<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TenantPayment;
use Illuminate\Support\Facades\Log;

class TenantPaymentController extends Controller
{
    public function index()
    {
        return response()->json(TenantPayment::orderBy('created_at', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'tenant_id' => 'required|integer',
                'contract_id' => 'required|integer'
            ]);
            $data=$request->all();
            $contract = TenantPayment::create($data);
            return response()->json([
                'message' => 'payment created successfully!',
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
                'message' => 'An error occurred while creating the payment',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $contract = TenantPayment::findOrFail($id);
        return response()->json($contract, 200);
    }

    public function update(Request $request, $id)
    {
        $contract = TenantPayment::findOrFail($id);
        $contract->update($request->all());
        return response()->json($contract, 200);
    }

    public function destroy($id)
    {
        $contract = TenantPayment::findOrFail($id);
        $contract->delete();
        return response()->json(null, 204);
    }


    public function getByContractId($contract_id)
    {
        $tenantBills = TenantPayment::where('contract_id', $contract_id)->get();
        
        if ($tenantBills->isEmpty()) {
            return response()->json([
                'message' => 'No payment found for the given contract ID',
            ], 404);
        }

        return response()->json($tenantBills, 200);
    }

    // Function to get TenantPayment by tenant_id
    public function getByTenantId($tenant_id)
    {
        $tenantBills = TenantPayment::where('tenant_id', $tenant_id)->get();
        
        if ($tenantBills->isEmpty()) {
            return response()->json([
                'message' => 'No invioce found for the given tenant ID',
            ], 404);
        }

        return response()->json($tenantBills, 200);
    }

}
