<?php

namespace App\Http\Controllers;

use App\Models\OwnerValidatorAssignment;
use Illuminate\Http\Request;

class OwnerValidatorAssignmentController extends Controller
{
    public function index()
    {
        return OwnerValidatorAssignment::all();
    }

    public function show($id)
    {
        return OwnerValidatorAssignment::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'type_of_selection' => 'required|string|max:255',
                'users' => 'required|array',
                'owners' => 'required|array',
            ]);

            $assignment = OwnerValidatorAssignment::create($validatedData);

            return response()->json([
                'message' => 'Validator assignment created successfully.',
                'data' => $assignment,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while creating the validator assignment.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $assignment = OwnerValidatorAssignment::findOrFail($id);

            $validatedData = $request->validate([
                'type_of_selection' => 'sometimes|string|max:255',
                'users' => 'sometimes|array',
                'owners' => 'sometimes|array',
            ]);

            $assignment->update($validatedData);

            return response()->json([
                'message' => 'Validator assignment updated successfully.',
                'data' => $assignment,
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while updating the validator assignment.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $assignment = OwnerValidatorAssignment::findOrFail($id);
            $assignment->delete();

            return response()->json([
                'message' => 'Validator assignment deleted successfully.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while deleting the validator assignment.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
