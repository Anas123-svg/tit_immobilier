<?php

namespace App\Http\Controllers;

use App\Models\OwnerSaleProperty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
class OwnerSalePropertyController extends Controller
{
    public function index()
    {
        return response()->json(OwnerSaleProperty::orderBy('created_at', 'desc')->get(), 200);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'owner_id' => 'nullable|integer',
                'owner' => 'required|string',
                'property_name' => 'required|string',
                'type_of_property' => 'required|string',
                'market_value' => 'required|numeric',
                'photo' => 'nullable|string',
                'documents' => 'nullable|array',
            ]);
            $data=$request->all();
            $property = OwnerSaleProperty::create($data);
            return response()->json([
                'message' => 'Property created successfully!',
                'data' => $property,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error while creating property', [
                'errors' => $e->errors(),
            ]);

            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the property',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        $property = OwnerSaleProperty::findOrFail($id);
        return response()->json($property, 200);
    }

    public function update(Request $request, $id)
    {
        $property = OwnerSaleProperty::findOrFail($id);
        $property->update($request->all());
        return response()->json($property, 200);
    }

    public function destroy($id)
    {
        $property = OwnerSaleProperty::findOrFail($id);
        $property->delete();
        return response()->json(null, 204);
    }
}
