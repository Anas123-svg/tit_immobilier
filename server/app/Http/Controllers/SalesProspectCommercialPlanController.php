<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SalesProspectCommercialPlan;

class SalesProspectCommercialPlanController extends Controller
{
    public function index()
    {
        return SalesProspectCommercialPlan::all();
    }

    public function show($id)
    {
        return SalesProspectCommercialPlan::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();

            $prospect = SalesProspectCommercialPlan::create($data);

            if (!$prospect) {
                return response()->json(['message' => 'Failed to create prospect commercial plan.'], 400);
            }

            return response()->json($prospect, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating prospect commercial plan: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating prospect commercial plan.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $prospect = SalesProspectCommercialPlan::find($id);

            if (!$prospect) {
                return response()->json(['message' => 'prospect commercial plan not found.'], 404);
            }

            $data = $request->all();
            $prospect->update($data);

            $filteredprospect = collect($prospect->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredprospect, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating prospect commercial plan: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating prospect commercial plan.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $Owner = SalesProspectCommercialPlan::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' prospect commercial plan deleted successfully.']);
    }

}
