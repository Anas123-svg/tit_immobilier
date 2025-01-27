<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TenantShortTermContract;
use Illuminate\Support\Facades\Log;
class TenantShortTermContractController extends Controller
{
    public function index()
    {
        return response()->json(TenantShortTermContract::all(), 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'owner_id' => 'required|integer',
                'tenant_id' => 'required|integer'
            ]);
            $data=$request->all();
            $contract = TenantShortTermContract::create($data);
            return response()->json([
                'message' => 'contract created successfully!',
                'data' => $contract,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error while creating contract', [
                'errors' => $e->errors(),
            ]);

            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the contract',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $contract = TenantShortTermContract::findOrFail($id);
        return response()->json($contract, 200);
    }

    public function update(Request $request, $id)
    {
        $contract = TenantShortTermContract::findOrFail($id);
        $contract->update($request->all());
        return response()->json($contract, 200);
    }

    public function destroy($id)
    {
        $contract = TenantShortTermContract::findOrFail($id);
        $contract->delete();
        return response()->json(null, 204);
    }
}
