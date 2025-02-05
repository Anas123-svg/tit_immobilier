<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// app/Http/Controllers/ServiceController.php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // Create a new service
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'department' => 'required|string',
            'description' => 'required|string',
        ]);

        $service = Service::create($request->all());
        return response()->json($service, 201);
    }

    // Get all services
    public function index()
    {
        $services = Service::orderBy('created_at', 'desc')->get();
        return response()->json($services);
    }

    // Get a single service by ID
    public function show($id)
    {
        $service = Service::findOrFail($id);
        return response()->json($service);
    }

    // Update a service
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'nullable|string',
            'department' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $service = Service::findOrFail($id);
        $service->update($request->all());

        return response()->json($service);
    }

    // Delete a service
    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json(null, 204);
    }
}
