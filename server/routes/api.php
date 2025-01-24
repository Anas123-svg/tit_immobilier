<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ServiceController;

Route::post('/users/login', [UserController::class, 'login']);
Route::post('/users', [UserController::class, 'store']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/token/user', [UserController::class, 'getUserByToken']);
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::post('/users/logout', [UserController::class, 'logout']);
});


Route::prefix('permissions')->group(function() {
    Route::get('/', [PermissionController::class, 'index']); // Get all permissions
    Route::get('{id}', [PermissionController::class, 'show']); // Get a single permission
    Route::post('/', [PermissionController::class, 'store']); // Create a new permission
    Route::put('{id}', [PermissionController::class, 'update']); // Update a permission
    Route::delete('{id}', [PermissionController::class, 'destroy']); // Delete a permission
});

Route::prefix('services')->group(function() {
    Route::get('/', [ServiceController::class, 'index']); // Get all services
    Route::get('{id}', [ServiceController::class, 'show']); // Get a single service
    Route::post('/', [ServiceController::class, 'store']); // Create a new service
    Route::put('{id}', [ServiceController::class, 'update']); // Update a service
    Route::delete('{id}', [ServiceController::class, 'destroy']); // Delete a service
});
