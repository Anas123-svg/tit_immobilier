<?php

namespace App\Http\Controllers;

use App\Models\OwnerReversalSaleProperty;
use Illuminate\Http\Request;

class OwnerReversalSalePropertyController extends Controller
{
    public function index()
    {
        return OwnerReversalSaleProperty::all();
    }

    public function show($id)
    {
        return OwnerReversalSaleProperty::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'owner_id' => 'required|exists:owners,id',
            'property_type' => 'required|string',
            'owner_name' => 'required|string',
            'client' => 'required|string',
            'case' => 'required|string',
        ]);

        return OwnerReversalSaleProperty::create($validatedData);
    }

    public function update(Request $request, $id)
    {
        $reversalSaleProperty = OwnerReversalSaleProperty::findOrFail($id);
        $validatedData = $request->validate([
            'property_type' => 'sometimes|string',
            'owner_name' => 'sometimes|string',
            'client' => 'sometimes|string',
            'case' => 'sometimes|string',
        ]);

        $reversalSaleProperty->update($validatedData);
        return $reversalSaleProperty;
    }

    public function destroy($id)
    {
        $reversalSaleProperty = OwnerReversalSaleProperty::findOrFail($id);
        $reversalSaleProperty->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
