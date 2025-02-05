<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ClientFile;
class ClientFileController extends Controller
{
    public function index()
    {
        return ClientFile::orderBy('created_at', 'desc')->get();
    }

    public function show($id)
    {
        return ClientFile::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $validate = $request->validate([
                'client_id' => 'required|exists:clients,id', 
            ]);
            $data = $request->all();

            $prospect = ClientFile::create($data);

            if (!$prospect) {
                return response()->json(['message' => 'Failed to create client file.'], 400);
            }

            return response()->json($prospect, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating client file: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating client file.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $prospect = ClientFile::find($id);

            if (!$prospect) {
                return response()->json(['message' => 'client file not found.'], 404);
            }

            $data = $request->all();
            $prospect->update($data);

            $filteredprospect = collect($prospect->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredprospect, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating client file: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating client file.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $Owner = ClientFile::findOrFail($id);
        $Owner->delete();
        return response()->json(['message' => ' client file deleted successfully.']);
    }


}
