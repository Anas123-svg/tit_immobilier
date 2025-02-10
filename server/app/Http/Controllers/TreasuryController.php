<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Treasury;

class TreasuryController extends Controller
{
    public function index()
    {
        return Treasury::orderBy('created_at', 'desc')->get();
    }

    public function show($id)
    {
        return Treasury::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $validate = $request->validate([
                'label' => 'required|string', 
            ]);
            $data = $request->all();

            $prospect = Treasury::create($data);

            if (!$prospect) {
                return response()->json(['message' => 'Failed to create Treasury.'], 400);
            }

            return response()->json($prospect, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating Treasury: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating Treasury.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $prospect = Treasury::find($id);

            if (!$prospect) {
                return response()->json(['message' => 'Treasury not found.'], 404);
            }

            $data = $request->all();
            $prospect->update($data);

            $filteredprospect = collect($prospect->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredprospect, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating Treasury: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating Treasury.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $Owner = Treasury::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' Treasury deleted successfully.']);
    }


}
