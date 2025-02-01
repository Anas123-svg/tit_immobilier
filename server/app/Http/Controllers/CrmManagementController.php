<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CrmManagement;

class CrmManagementController extends Controller
{
    public function index()
    {
        return response()->json(CrmManagement::all(), 200);
    }

    public function store(Request $request) // Ensure correct namespace
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'chef_commerçial' => 'nullable|string',
            'charge_a_fee_for_pre_booking_a_sale' => 'nullable|boolean',
            'charge_a_fee_for_pre_booking_a_rental' => 'nullable|boolean',
            'sale_pre_reservation_fees' => 'nullable|numeric',
            'rental_pre_reservation_fees' => 'nullable|numeric',


        ]);

        $crmManagement = CrmManagement::create($data);

        return response()->json($crmManagement, 201);
    }

    public function show($id)
    {
        $crmManagement = CrmManagement::findOrFail($id);
        return response()->json($crmManagement, 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'chef_commerçial' => 'nullable|string',
            'charge_a_fee_for_pre_booking_a_sale' => 'nullable|boolean',
            'charge_a_fee_for_pre_booking_a_rental' => 'nullable|boolean',
            'sale_pre_reservation_fees' => 'nullable|numeric',
            'rental_pre_reservation_fees' => 'nullable|numeric',

        ]);

        $crmManagement = CrmManagement::findOrFail($id);
        $crmManagement->update($data);

        return response()->json($crmManagement, 200);
    }

    public function destroy($id)
    {
        $crmManagement = CrmManagement::findOrFail($id);
        $crmManagement->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
