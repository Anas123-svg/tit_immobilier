<?php

namespace App\Http\Controllers;

use App\Models\OwnerPortfolioManagement;
use Illuminate\Http\Request;

class OwnerPortfolioManagementController extends Controller
{
    public function index()
    {
        return OwnerPortfolioManagement::orderBy('created_at', 'desc')->get();
    }

    public function show($id)
    {
        return OwnerPortfolioManagement::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'owner_id' => 'required|exists:owners,id',
                'owner_name' => 'nullab|string|max:255',
                'property_concerned' => 'required|string|max:255',
                'users' => 'nullable|array',
            ]);
    
            $portfolio = OwnerPortfolioManagement::create($validatedData);
    
            return response()->json([
                'message' => 'Owner portfolio management created successfully.',
                'data' => $portfolio,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the owner portfolio management.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    

    public function update(Request $request, $id)
    {
        $portfolio = OwnerPortfolioManagement::findOrFail($id);
        $validatedData = $request->validate([
            'owner_name' => 'sometimes|string',
            'property_concerned' => 'sometimes|string',
            'users' => 'sometimes|json',
        ]);

        $portfolio->update($validatedData);
        return $portfolio;
    }

    public function destroy($id)
    {
        $portfolio = OwnerPortfolioManagement::findOrFail($id);
        $portfolio->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
