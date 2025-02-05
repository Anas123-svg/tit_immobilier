<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SalesProspectPreBooking;

class SalesProspectPreBookingController extends Controller
{
    public function index()
    {
        return SalesProspectPreBooking::orderBy('created_at', 'desc')->get();
    }

    public function show($id)
    {
        return SalesProspectPreBooking::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $validate = $request->validate([
                'prospect_id' => 'required|exists:sale_prospects,id', 
            ]);
            $data = $request->all();

            $prospect = SalesProspectPreBooking::create($data);

            if (!$prospect) {
                return response()->json(['message' => 'Failed to create prospect pre-booking.'], 400);
            }

            return response()->json($prospect, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating prospect pre-booking: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating prospect pre-booking.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $prospect = SalesProspectPreBooking::find($id);

            if (!$prospect) {
                return response()->json(['message' => 'prospect pre-booking not found.'], 404);
            }

            $data = $request->all();
            $prospect->update($data);

            $filteredprospect = collect($prospect->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredprospect, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating prospect pre-booking: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating prospect pre-booking.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $Owner = SalesProspectPreBooking::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' prospect pre-booking deleted successfully.']);
    }

}
