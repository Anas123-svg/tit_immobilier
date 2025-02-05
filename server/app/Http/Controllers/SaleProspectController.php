<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SaleProspect;
class SaleProspectController extends Controller
{
    public function index()
    {
        return SaleProspect::orderBy('created_at', 'desc')->get();
    }

    public function show($id)
    {
        return SaleProspect::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {

            $data = $request->all();

            $prospect = SaleProspect::create($data);

            if (!$prospect) {
                return response()->json(['message' => 'Failed to create prospect.'], 400);
            }

            return response()->json($prospect, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating prospect: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating prospect.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $prospect = SaleProspect::find($id);

            if (!$prospect) {
                return response()->json(['message' => 'prospect not found.'], 404);
            }

            $data = $request->all();
            $prospect->update($data);

            $filteredprospect = collect($prospect->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredprospect, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating prospect: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating prospect.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $Owner = SaleProspect::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' owner deleted successfully.']);
    }

}
