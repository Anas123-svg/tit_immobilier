<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    public function index()
    {
        try {
            $owners = Client::all()
                ->map(function ($owner) {
                    return collect($owner->toArray())->filter(fn($value) => $value !== null);
                });
    
            return response()->json($owners, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Client: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching Client.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function store(Request $request)
    {
        try {
            $data = $request->all();

            $owner = Client::create($data);

            if (!$owner) {
                return response()->json(['message' => 'Failed to create Client.'], 400);
            }

            return response()->json($owner, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating Client: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating Client.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function show($id)
    {
        try {
            $owner = Client::find($id);

            if (!$owner) {
                return response()->json(['message' => 'Client not found.'], 404);
            }

            // Remove null fields before returning
            $filteredOwner = collect($owner->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredOwner, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching Client: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching Client.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $owner = Client::find($id);

            if (!$owner) {
                return response()->json(['message' => 'Client not found.'], 404);
            }

            $data = $request->all();
            $owner->update($data);

            $filteredOwner = collect($owner->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredOwner, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating Client: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating Client.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function destroy($id)
    {
        $Owner = Client::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' Client deleted successfully.']);
    }

}
