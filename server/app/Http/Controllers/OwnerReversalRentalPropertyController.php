<?php

namespace App\Http\Controllers;

use App\Models\OwnerReversalRentalProperty;
use Illuminate\Http\Request;

class OwnerReversalRentalPropertyController extends Controller
{
    public function index()
    {
        return OwnerReversalRentalProperty::all();
    }

    public function show($id)
    {
        return OwnerReversalRentalProperty::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'owner_id' => 'required|exists:owners,id',
            'good' => 'required|string',
            'filter_by' => 'required|string',
            'date_debut' => 'nullable|string',
            'end_date' => 'nullable|string',
            'comments' => 'nullable|string',
        ]);

        return OwnerReversalRentalProperty::create($validatedData);
    }

    public function update(Request $request, $id)
    {
        $reversalRentalProperty = OwnerReversalRentalProperty::findOrFail($id);
        $validatedData = $request->validate([
            'good' => 'sometimes|string',
            'filter_by' => 'sometimes|string',
            'date_debut' => 'sometimes|string',
            'end_date' => 'sometimes|string',
            'comments' => 'nullable|string',
        ]);

        $reversalRentalProperty->update($validatedData);
        return $reversalRentalProperty;
    }

    public function destroy($id)
    {
        $reversalRentalProperty = OwnerReversalRentalProperty::findOrFail($id);
        $reversalRentalProperty->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
