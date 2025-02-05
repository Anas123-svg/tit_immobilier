<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CrmManagementProspectingStage;

class CrmManagementProspectingStageController extends Controller
{
    public function index()
    {
        return response()->json(CrmManagementProspectingStage::orderBy('created_at', 'desc')->get(), 200);
    }

    public function store(Request $request) // Ensure correct namespace
    {
        $data = $request->validate([
            'label' => 'nullable|string',
        ]);

        $crmManagement = CrmManagementProspectingStage::create($data);

        return response()->json($crmManagement, 201);
    }

    public function show($id)
    {
        $crmManagement = CrmManagementProspectingStage::findOrFail($id);
        return response()->json($crmManagement, 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'label' => 'nullable|string',
        ]);

        $crmManagement = CrmManagementProspectingStage::findOrFail($id);
        $crmManagement->update($data);

        return response()->json($crmManagement, 200);
    }

    public function destroy($id)
    {
        $crmManagement = CrmManagementProspectingStage::findOrFail($id);
        $crmManagement->delete();

        return response()->json(['message' => 'Deleted successfully'], 200);
    }

}
