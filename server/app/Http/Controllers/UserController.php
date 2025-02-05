<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Fetch all users
    public function index()
    {
        $users = User::orderBy('created_at', 'desc')->get();
    
        $usersWithPermissions = $users->map(function($user) {
            $permissionIds = is_array($user->permissions) ? $user->permissions : [];
    
            $permissions = !empty($permissionIds) ? \App\Models\Permission::whereIn('id', $permissionIds)->get() : [];
    
            $user->permissions = $permissions;
    
            return $user;
        });
    
        return response()->json($usersWithPermissions);
    }
    

    // Fetch single user by ID
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        $permissionIds = $user->permissions;

        $permissions = \App\Models\Permission::whereIn('id', $permissionIds)->get();    
        return response()->json([
            'user' => $user->only([
                'id',
                'name',
                'email',
                'Gender',
                'userLogin',
                'service',
                'contact',
                'pronouns',
                'photo',
                //'permissions'=> $permissions,
                'documents'
            ]),
            'permissions' => $permissions
        ]);
    
    }

    // Create a new user
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'Gender' => 'required|string',
            'userLogin' => 'required|string',
            'service' => 'required|string',
            'contact' => 'required|string',
            'pronouns' => 'nullable|string',
            'photo' => 'nullable|url',
            'permissions' => 'nullable|array',
            'documents' => 'nullable|array',
        ]);
    
        // Hash the password before storing
        $validated['password'] = Hash::make($validated['password']);
    
        // Create the user
        $user = User::create($validated);
    
        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }
    

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'string',
            'email' => 'email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:6',
            'Gender' => 'string',
            'userLogin' => 'string',
            'service' => 'string',
            'contact' => 'string',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    // Login function
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'userLogin' => 'required|string',
            'password' => 'required|min:6',
        ]);

        if (!Auth::attempt(['userLogin' => $credentials['userLogin'], 'password' => $credentials['password']])) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        $permissionIds = $user->permissions;

        $permissions = \App\Models\Permission::whereIn('id', $permissionIds)->get();
    

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user->only([
                'id',
                'name',
                'email',
                'Gender',
                'userLogin',
                'service',
                'contact',
                'pronouns',
                'photo',
                'permissions',
                'documents'
            ]),
            'permissions' => $permissions
        ]);
    }


    // Logout function
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout successful']);
    }

    // Fetch user by token
public function getUserByToken(Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }
    $permissionIds = $user->permissions;

    $permissions = \App\Models\Permission::whereIn('id', $permissionIds)->get();

    return response()->json([
        'user' => $user->only([
            'id',
            'name',
            'email',
            'Gender',
            'userLogin',
            'service',
            'contact',
            'pronouns',
            'photo',
            //'permissions'=> $permissions,
            'documents'
        ]),
        'permissions' => $permissions
    ]);
}

}
