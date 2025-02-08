<?php

namespace App\Http\Controllers;

use App\Models\OwnerARentalProperty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OwnerARentalPropertyController extends Controller
{
    public function index()
    {
        return OwnerARentalProperty::orderBy('created_at', 'desc')->get();
    }

    public function show($id)
    {
        return OwnerARentalProperty::findOrFail($id);
    }



    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'owner_id' => 'required|exists:owners,id'
            ]);
            $data=$request->all();
            $property = OwnerARentalProperty::create($data);
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
    public function update(Request $request, $id)
    {
        $property = OwnerARentalProperty::findOrFail($id);

        $validatedData = $request->validate([
            'owner_id' => 'sometimes|exists:owners,id',
            'owner_name' => 'sometimes|string|max:255',
            'very_concerned' => 'sometimes|boolean',
            'type_of_property' => 'sometimes|string|max:255',
            'numerotation' => 'sometimes|integer',
            'total' => 'sometimes|numeric',
            'door_no' => 'sometimes|string|max:50',
            'type_of_rental' => 'sometimes|string|max:255',
            'floor' => 'sometimes|integer',
            'number_of_rooms' => 'sometimes|integer',
            'surface' => 'sometimes|numeric',
            'rent_amount' => 'sometimes|numeric',
            'amount_of_charges' => 'sometimes|numeric',
            'profile_photo' => 'sometimes|string|max:255',
            'documents' => 'nullable|json',
        ]);

        $property->update($validatedData);

        return $property;
    }

    public function destroy($id)
    {
        $property = OwnerARentalProperty::findOrFail($id);
        $property->delete();

        return response()->json(['message' => 'Property deleted successfully']);
    }
}
