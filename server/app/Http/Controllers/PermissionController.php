<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Permission;

class PermissionController extends Controller
{
    // Create a new permission
    public function store(Request $request)
    {
        $request->validate([
            'label' => 'required|string',
            'description' => 'required|string',
            'assigned_permissions' => 'nullable|array',
        ]);

        $permission = Permission::create($request->all());
        return response()->json($permission, 201);
    }

    // Get all permissions
    public function index()
    {
        $permissions = Permission::orderBy('created_at', 'desc')->get();
        return response()->json($permissions);
    }

    // Get a single permission by ID
    public function show($id)
    {
        $permission = Permission::findOrFail($id);
        return response()->json($permission);
    }

    // Update a permission
    public function update(Request $request, $id)
    {
        $request->validate([
            'label' => 'required|string',
            'description' => 'required|string',
            'assigned_permissions' => 'nullable|array',
        ]);

        $permission = Permission::findOrFail($id);
        $permission->update($request->all());

        return response()->json($permission);
    }

    // Delete a permission
    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        $permission->delete();

        return response()->json(null, 204);
    }
}
