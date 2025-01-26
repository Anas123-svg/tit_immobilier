<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\PrivateOwnerController;
use App\Http\Controllers\OwnerRentPropertyController;
use App\Http\Controllers\OwnerSalePropertyController;
use App\Http\Controllers\BusinessOwnerController;
use App\Http\Controllers\OwnerController;
use App\Http\Controllers\OwnerARentalPropertyController;

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

// Owner routes
Route::get('/get-all-owners', [OwnerController::class, 'index']);
Route::post('/owners', [OwnerController::class, 'store']);
Route::put('/owners/{id}', [OwnerController::class, 'update']);
Route::get('/owners/{id}', [OwnerController::class, 'show']);
Route::delete('/owners/{id}', [OwnerController::class, 'destroy']);


//


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

Route::prefix('private-owners')->group(function() {
    Route::get('/', [PrivateOwnerController::class, 'index']); // Get all private-owners
    Route::get('{id}', [PrivateOwnerController::class, 'show']); // Get a single private-owners
    Route::post('/', [PrivateOwnerController::class, 'store']); // Create a new private-owners
    Route::put('{id}', [PrivateOwnerController::class, 'update']); // Update a private-owners
    Route::delete('{id}', [PrivateOwnerController::class, 'destroy']); // Delete a private-owners
});



Route::prefix('business-owners')->group(function() {
    Route::get('/', [BusinessOwnerController::class, 'index']); // Get all business-owners
    Route::get('{id}', [BusinessOwnerController::class, 'show']); // Get a single business-owners
    Route::post('/', [BusinessOwnerController::class, 'store']); // Create a new business-owners
    Route::put('{id}', [BusinessOwnerController::class, 'update']); // Update a business-owners
    Route::delete('{id}', [BusinessOwnerController::class, 'destroy']); // Delete a business-owners
});

Route::prefix('owner-rent-properties')->group(function() {
    Route::get('/', [OwnerRentPropertyController::class, 'index']); // Get all owner-rent-properties
    Route::get('{id}', [OwnerRentPropertyController::class, 'show']); // Get a single owner-rent-properties
    Route::post('/', [OwnerRentPropertyController::class, 'store']); // Create a new owner-rent-properties
    Route::put('{id}', [OwnerRentPropertyController::class, 'update']); // Update a owner-rent-properties
    Route::delete('{id}', [OwnerRentPropertyController::class, 'destroy']); // Delete a owner-rent-properties
});

Route::prefix('owner-sale-properties')->group(function() {
    Route::get('/', [OwnerSalePropertyController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [OwnerSalePropertyController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [OwnerSalePropertyController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [OwnerSalePropertyController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [OwnerSalePropertyController::class, 'destroy']); // Delete a owner-sale-properties
});



Route::prefix('owner-a-rental-property')->group(function() {
    Route::get('/', [OwnerARentalPropertyController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [OwnerARentalPropertyController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [OwnerARentalPropertyController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [OwnerARentalPropertyController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [OwnerARentalPropertyController::class, 'destroy']); // Delete a owner-sale-properties
});
