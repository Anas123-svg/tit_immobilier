<?php

namespace App\Http\Controllers;

use App\Models\CrmManagementProspectingfunnel;
use Illuminate\Http\Request;

class CrmManagementProspectingfunnelController extends Controller
{
    public function index()
    {
        return response()->json(CrmManagementProspectingfunnel::all(), 200);
    }

    public function store(Request $request) // Ensure correct namespace
    {
        $data = $request->validate([
            'stage' => 'nullable|string',
            'is_rental' => 'nullable|boolean',
            'duration_of_treatment' => 'nullable|integer',
            'commercial_actions' => 'nullable|array',
        ]);

        $crmManagement = CrmManagementProspectingfunnel::create($data);

        return response()->json($crmManagement, 201);
    }

    public function show($id)
    {
        $crmManagement = CrmManagementProspectingfunnel::findOrFail($id);
        return response()->json($crmManagement, 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'stage' => 'nullable|string',
            'is_rental' => 'nullable|boolean',
            'duration_of_treatment' => 'nullable|integer',
            'commercial_actions' => 'nullable|array',
        ]);

        $crmManagement = CrmManagementProspectingfunnel::findOrFail($id);
        $crmManagement->update($data);

        return response()->json($crmManagement, 200);
    }

    public function destroy($id)
    {
        $crmManagement = CrmManagementProspectingfunnel::findOrFail($id);
        $crmManagement->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }

}
