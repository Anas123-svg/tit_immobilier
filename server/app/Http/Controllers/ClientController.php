<?php

namespace App\Http\Controllers;

use App\Models\ClientFile;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Log;

class ClientController extends Controller
{
    public function index()
    {
        try {
            $owners = Client::orderBy('created_at', 'desc')
                ->get()
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


    public function getClientProperties($ownerId)
    {
        try {
            $owner = Client::find($ownerId);
            $saleProperties = ClientFile::where('client_id', $ownerId)->get();    
            return response()->json([
                'profile' => $owner,
                'case' => $saleProperties
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching owner properties: ' . $e->getMessage());
    
            return response()->json([
                'message' => 'Error fetching owner properties.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    

}
