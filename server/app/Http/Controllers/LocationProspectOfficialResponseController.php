<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LocationProspectOfficialResponse;

class LocationProspectOfficialResponseController extends Controller
{
    public function index()
    {
        return LocationProspectOfficialResponse::all();
    }

    public function show($id)
    {
        return LocationProspectOfficialResponse::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $validate = $request->validate([
                'prospect_id' => 'required|exists:sale_prospects,id', 
            ]);
            $data = $request->all();

            $prospect = LocationProspectOfficialResponse::create($data);

            if (!$prospect) {
                return response()->json(['message' => 'Failed to create prospect official-response.'], 400);
            }

            return response()->json($prospect, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating prospect official-response: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating prospect official-response.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $prospect = LocationProspectOfficialResponse::find($id);

            if (!$prospect) {
                return response()->json(['message' => 'prospect official-response not found.'], 404);
            }

            $data = $request->all();
            $prospect->update($data);

            $filteredprospect = collect($prospect->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredprospect, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating prospect official-response: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating prospect official-response.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $Owner = LocationProspectOfficialResponse::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' prospect official-response deleted successfully.']);
    }

}
