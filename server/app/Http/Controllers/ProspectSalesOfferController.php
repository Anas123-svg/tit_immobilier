<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProspectSalesOffer;

class ProspectSalesOfferController extends Controller
{
    public function index()
    {
        return ProspectSalesOffer::orderBy('created_at', 'desc')->get();
    }

    public function show($id)
    {
        return ProspectSalesOffer::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $data = $request->all();

            $prospect = ProspectSalesOffer::create($data);

            if (!$prospect) {
                return response()->json(['message' => 'Failed to create prospect offer.'], 400);
            }

            return response()->json($prospect, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating prospect offer: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating prospect offer.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $prospect = ProspectSalesOffer::find($id);

            if (!$prospect) {
                return response()->json(['message' => 'prospect offer not found.'], 404);
            }

            $data = $request->all();
            $prospect->update($data);

            $filteredprospect = collect($prospect->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredprospect, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating prospect offer: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating prospect offer.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $Owner = ProspectSalesOffer::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' prospect offer deleted successfully.']);
    }

}
