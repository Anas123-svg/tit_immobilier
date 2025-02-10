<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TreasurySupply;

class TreasurySupplyController extends Controller
{
    public function index()
    {
        return TreasurySupply::orderBy('created_at', 'desc')->get();
    }

    public function show($id)
    {
        return TreasurySupply::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $validate = $request->validate([
                'label' => 'required|string', 
            ]);
            $data = $request->all();

            $prospect = TreasurySupply::create($data);

            if (!$prospect) {
                return response()->json(['message' => 'Failed to create Treasure Supply.'], 400);
            }

            return response()->json($prospect, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating Treasure Supply: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating Treasure Supply.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $prospect = TreasurySupply::find($id);

            if (!$prospect) {
                return response()->json(['message' => 'Treasure Supply not found.'], 404);
            }

            $data = $request->all();
            $prospect->update($data);

            $filteredprospect = collect($prospect->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredprospect, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating Treasure Supply: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating Treasure Supply.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $Owner = TreasurySupply::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' Treasure Supply deleted successfully.']);
    }

}
