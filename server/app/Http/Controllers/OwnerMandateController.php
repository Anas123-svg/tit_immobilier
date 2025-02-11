<?php

namespace App\Http\Controllers;

use App\Models\OwnerMandate;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class OwnerMandateController extends Controller
{
    public function index()
    {
        return OwnerMandate::orderBy('created_at', 'desc')->get();
    }

    public function show($id)
    {
        return OwnerMandate::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'owner_id' => 'required|exists:owners,id'
            ]);
            $data=$request->all();
            $property = OwnerMandate::create($data);
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
        $ownerMandate = OwnerMandate::findOrFail($id);
        $validatedData = $request->validate([
            'type_of_mandate' => 'sometimes|string',
            'owner_name' => 'sometimes|string',
            'very_concerned' => 'sometimes|string',
            'type_of_property' => 'sometimes|string',
            'neighborhood' => 'sometimes|string',
            'tax_payable' => 'sometimes|string',
            'billing_type' => 'sometimes|string',
            'commission' => 'sometimes|numeric',
            'deduct_commission' => 'sometimes|string',
            'vat_on_commission' => 'sometimes|string',
            'date_of_signature' => 'sometimes|string',
            'debut_date' => 'sometimes|string',
            'end_date' => 'sometimes|string',
            'digital_signature_of_the_mandate' => 'sometimes|string',
            'tacit_renewal' => 'sometimes|string',
        ]);

        $ownerMandate->update($validatedData);
        return $ownerMandate;
    }

    public function destroy($id)
    {
        $ownerMandate = OwnerMandate::findOrFail($id);
        $ownerMandate->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }


    public function getMandatesByOwner($owner_id)
{
    $mandates = OwnerMandate::where('owner_id', $owner_id)->orderBy('created_at', 'desc')->get();

    if ($mandates->isEmpty()) {
        return response()->json([
            'message' => 'No mandates found for this owner.'
        ], 404);
    }

    return response()->json([
        'message' => 'Mandates retrieved successfully.',
        'data' => $mandates
    ], 200);
}

}
