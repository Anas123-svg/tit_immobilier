<?php

namespace App\Http\Controllers;

use App\Models\BusinessOwner;
use Illuminate\Http\Request;

class BusinessOwnerController extends Controller
{
    public function index()
    {
        return response()->json(BusinessOwner::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'taxpayer_identification_number' => 'required|string',
            'business_registration_number' => 'required|string',
            'email' => 'required|email|unique:business_owners,email',
            'photo' => 'nullable|string|max:2048',
        ]);

        $data = $request->all();
        $businessOwner = BusinessOwner::create($data);
        return response()->json($businessOwner, 201);
    }

    public function show($id)
    {
        $businessOwner = BusinessOwner::findOrFail($id);
        return response()->json($businessOwner);
    }

    public function update(Request $request, $id)
    {
        $businessOwner = BusinessOwner::findOrFail($id);

        $validated = $request->validate([
            'email' => "nullable|email|email,{$businessOwner->id}",
            'photo' => 'nullable|image|max:2048',
        ]);

        $data = $request->all();
        $businessOwner->update($data);
        return response()->json($businessOwner);
    }

    public function destroy($id)
    {
        $businessOwner = BusinessOwner::findOrFail($id);
        $businessOwner->delete();
        return response()->json(['message' => 'Business owner deleted successfully.']);
    }
}
