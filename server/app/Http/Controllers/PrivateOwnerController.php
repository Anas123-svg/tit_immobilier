<?php

namespace App\Http\Controllers;

use App\Models\PrivateOwner;
use Illuminate\Http\Request;

class PrivateOwnerController extends Controller
{
    public function index()
    {
        return response()->json(PrivateOwner::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:private_owners,email',
            'photo' => 'nullable|string|max:2048',
        ]);

        $data = $request->all();

        $owner = PrivateOwner::create($data);
        return response()->json($owner, 201);
    }

    public function show($id)
    {
        $owner = PrivateOwner::findOrFail($id);
        return response()->json($owner);
    }

    public function update(Request $request, $id)
    {
        $owner = PrivateOwner::findOrFail($id);

        $validated = $request->validate([
            'email' => "nullable|email|unique:private_owners,email,{$owner->id}",
            'photo' => 'nullable|image|max:2048',
        ]);
        $data = $request->all();
        $owner->update($data);
        return response()->json($owner);
    }

    public function destroy($id)
    {
        $owner = PrivateOwner::findOrFail($id);
        $owner->delete();
        return response()->json(['message' => 'Private owner deleted successfully.']);
    }
}
