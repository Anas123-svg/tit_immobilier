<?php

namespace App\Http\Controllers;

use App\Models\OwnerRentProperty;
use Illuminate\Http\Request;

class OwnerRentPropertyController extends Controller
{
    public function index()
    {
        return response()->json(OwnerRentProperty::orderBy('created_at', 'desc')->get());
    }

    public function show($id)
    {
        return response()->json(OwnerRentProperty::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'owner_id' => 'nullable|integer',
            'owner' => 'required|string',
            'property_name' => 'required|string',
            'type_of_property' => 'required|string',
            'number_of_floors' => 'required|integer',
            'number_of_rentals' => 'required|integer',
            'type_of_numbering' => 'required|string',
            'area_m2' => 'required|numeric',
            'market_value' => 'required|numeric',
            'island' => 'required|string',
            'batch' => 'required|string',
            'block' => 'required|string',
            'cie_identifier_number' => 'nullable|string',
            'sodeci_identifier_number' => 'nullable|string',
            'description' => 'nullable|string',
            'city' => 'required|string',
            'municipality' => 'required|string',
            'neighborhood' => 'required|string',
            'longitude' => 'nullable|numeric',
            'latitude' => 'nullable|numeric',
            'height' => 'nullable|integer',
            'altitude' => 'nullable|integer',
            'on_the_corner' => 'nullable|string',
            'near_water' => 'nullable|string',
            'feet_in_the_water' => 'nullable|string',
            'distance_from_water' => 'nullable|string',
            'on_the_main_road' => 'nullable|string',
            'distance_from_road' => 'nullable|string',
            'dry_land' => 'nullable|string',
            'low_depth' => 'nullable|string',
            'school_nearby' => 'nullable|string',
            'market_nearby' => 'nullable|string',
            'assigned_agents' => 'nullable|array',
            'photo' => 'nullable|string',
            'documents' => 'nullable|array',
            'level' => 'nullable|integer',
            'door_number' => 'nullable|string',
            'rental_type' => 'required|string',
            'rent' => 'required|integer',
            'charges' => 'nullable|integer',
            'room' => 'nullable|integer',
            'area' => 'nullable|numeric',
        ]);
        $property = OwnerRentProperty::create($data);

        return response()->json($property, 201);
    }

    public function update(Request $request, $id)
    {
        $property = OwnerRentProperty::findOrFail($id);

        $data = $request->validate([
            'owner' => 'sometimes|string',
            'property_name' => 'sometimes|string',
            'type_of_property' => 'sometimes|string',
            'number_of_floors' => 'sometimes|integer',
            'number_of_rentals' => 'sometimes|integer',
            'type_of_numbering' => 'sometimes|string',
            'area_m2' => 'sometimes|numeric',
            'market_value' => 'sometimes|numeric',
            'island' => 'sometimes|string',
            'batch' => 'sometimes|string',
            'block' => 'sometimes|string',
            'cie_identifier_number' => 'sometimes|string',
            'sodeci_identifier_number' => 'sometimes|string',
            'description' => 'sometimes|string',
            'city' => 'sometimes|string',
            'municipality' => 'sometimes|string',
            'neighborhood' => 'sometimes|string',
            'longitude' => 'sometimes|numeric',
            'latitude' => 'sometimes|numeric',
            'height' => 'sometimes|integer',
            'altitude' => 'sometimes|integer',
            'on_the_corner' => 'sometimes|string',
            'near_water' => 'sometimes|string',
            'feet_in_the_water' => 'sometimes|string',
            'distance_from_water' => 'sometimes|string',
            'on_the_main_road' => 'sometimes|string',
            'distance_from_road' => 'sometimes|string',
            'dry_land' => 'sometimes|string',
            'low_depth' => 'sometimes|string',
            'school_nearby' => 'sometimes|string',
            'market_nearby' => 'sometimes|string',
            'assigned_agents' => 'sometimes|array',
            'photo' => 'sometimes|string',
            'documents' => 'sometimes|array',
            'level' => 'sometimes|integer',
            'door_number' => 'sometimes|string',
            'rental_type' => 'sometimes|string',
            'rent' => 'sometimes|integer',
            'charges' => 'sometimes|integer',
            'room' => 'sometimes|integer',
            'area' => 'sometimes|numeric',

        ]);

        $property->update($data);

        return response()->json($property);
    }

    public function destroy($id)
    {
        OwnerRentProperty::destroy($id);

        return response()->json(['message' => 'Property deleted successfully']);
    }
}
