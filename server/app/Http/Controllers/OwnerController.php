<?php

namespace App\Http\Controllers;

use App\Models\BusinessOwner;
use App\Models\PrivateOwner;
use Illuminate\Http\Request;
use App\Models\Owner;


class OwnerController extends Controller
{
    public function index()
    {
        try {
            $owners = Owner::all()
                ->map(function ($owner) {
                    return collect($owner->toArray())->filter(fn($value) => $value !== null);
                });
    
            return response()->json($owners, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching owners: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching owners.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function store(Request $request)
    {
        try {
            $data = $request->all();

            $owner = Owner::create($data);

            if (!$owner) {
                return response()->json(['message' => 'Failed to create owner.'], 400);
            }

            return response()->json($owner, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating owner: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating owner.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function show($id)
    {
        try {
            $owner = Owner::find($id);

            if (!$owner) {
                return response()->json(['message' => 'Owner not found.'], 404);
            }

            // Remove null fields before returning
            $filteredOwner = collect($owner->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredOwner, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching owner: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching owner.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $owner = Owner::find($id);

            if (!$owner) {
                return response()->json(['message' => 'Owner not found.'], 404);
            }

            $data = $request->all();
            $owner->update($data);

            $filteredOwner = collect($owner->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredOwner, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating owner: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating owner.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function destroy($id)
    {
        $Owner = Owner::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' owner deleted successfully.']);
    }


}
