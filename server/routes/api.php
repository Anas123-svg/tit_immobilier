<?php

use App\Http\Controllers\CrmManagementController;
use App\Http\Controllers\CrmManagementProspectingfunnelController;
use App\Http\Controllers\CrmManagementProspectingStageController;
use App\Http\Controllers\ProspectSalesOfferController;
use App\Http\Controllers\SaleProspectController;
use App\Http\Controllers\SalesProspectCommercialPlanController;
use App\Http\Controllers\SalesProspectPreBookingController;
use App\Http\Controllers\TenantContractController;
use App\Http\Controllers\TenantController;
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
use App\Http\Controllers\OwnerMandateController;
use App\Http\Controllers\OwnerReversalRentalPropertyController;
use App\Http\Controllers\OwnerReversalSalePropertyController;
use App\Http\Controllers\OwnerPortfolioManagementController;
use App\Http\Controllers\OwnerValidatorAssignmentController;
use App\Http\Controllers\TenantShortTermContractController;
use App\Http\Controllers\LocationProspectOfficialResponseController;

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
Route::get('/dashboard/owners', [OwnerController::class, 'OwnerDashboard']);
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

Route::prefix('owner-mandate')->group(function() {
    Route::get('/', [OwnerMandateController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [OwnerMandateController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [OwnerMandateController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [OwnerMandateController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [OwnerMandateController::class, 'destroy']); // Delete a owner-sale-properties
});



Route::prefix('owner-reversal-rental-property')->group(function() {
    Route::get('/', [OwnerReversalRentalPropertyController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [OwnerReversalRentalPropertyController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [OwnerReversalRentalPropertyController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [OwnerReversalRentalPropertyController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [OwnerReversalRentalPropertyController::class, 'destroy']); // Delete a owner-sale-properties
});


Route::prefix('owner-reversal-sale-property')->group(function() {
    Route::get('/', [OwnerReversalSalePropertyController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [OwnerReversalSalePropertyController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [OwnerReversalSalePropertyController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [OwnerReversalSalePropertyController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [OwnerReversalSalePropertyController::class, 'destroy']); // Delete a owner-sale-properties
});




Route::prefix('owner-portfolio-management')->group(function() {
    Route::get('/', [OwnerPortfolioManagementController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [OwnerPortfolioManagementController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [OwnerPortfolioManagementController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [OwnerPortfolioManagementController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [OwnerPortfolioManagementController::class, 'destroy']); // Delete a owner-sale-properties
});

Route::prefix('owner-validator-assignment')->group(function() {
    Route::get('/', [OwnerValidatorAssignmentController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [OwnerValidatorAssignmentController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [OwnerValidatorAssignmentController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [OwnerValidatorAssignmentController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [OwnerValidatorAssignmentController::class, 'destroy']); // Delete a owner-sale-properties
});



//tenant routes

Route::get('/get-all-tenants', [TenantController::class, 'index']);
Route::post('/tenants', [TenantController::class, 'store']);
Route::put('/tenants/{id}', [TenantController ::class, 'update']);
Route::get('/tenants/{id}', [TenantController::class, 'show']);
Route::delete('/tenants/{id}', [TenantController::class, 'destroy']);


//tenant contract routes
Route::prefix('tenant-contract')->group(function() {
    Route::get('/', action: [TenantContractController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [TenantContractController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [TenantContractController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [TenantContractController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [TenantContractController::class, 'destroy']); // Delete a owner-sale-properties
});

Route::prefix('tenant-short-term-contract')->group(function() {
    Route::get('/', action: [TenantShortTermContractController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [TenantShortTermContractController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [TenantShortTermContractController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [TenantShortTermContractController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [TenantShortTermContractController::class, 'destroy']); // Delete a owner-sale-properties
});











//crm
Route::prefix('sales-prospect')->group(function() {
    Route::get('/', [SaleProspectController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [SaleProspectController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [SaleProspectController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [SaleProspectController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [SaleProspectController::class, 'destroy']); // Delete a owner-sale-properties
});
Route::prefix('sales-prospect/pre-booking')->group(function() {
    Route::get('/', [SalesProspectPreBookingController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [SalesProspectPreBookingController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [SalesProspectPreBookingController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [SalesProspectPreBookingController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [SalesProspectPreBookingController::class, 'destroy']); // Delete a owner-sale-properties
});
Route::prefix('sales-prospect/commercial-plan')->group(function() {
    Route::get('/', [SalesProspectCommercialPlanController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [SalesProspectCommercialPlanController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [SalesProspectCommercialPlanController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [SalesProspectCommercialPlanController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [SalesProspectCommercialPlanController::class, 'destroy']); // Delete a owner-sale-properties
});
Route::prefix('sales-prospect/offer')->group(function() {
    Route::get('/', [ProspectSalesOfferController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [ProspectSalesOfferController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [ProspectSalesOfferController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [ProspectSalesOfferController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [ProspectSalesOfferController::class, 'destroy']); // Delete a owner-sale-properties
});


Route::prefix('sales-prospect/official-response')->group(function() {
    Route::get('/', [LocationProspectOfficialResponseController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [LocationProspectOfficialResponseController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [LocationProspectOfficialResponseController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [LocationProspectOfficialResponseController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [LocationProspectOfficialResponseController::class, 'destroy']); // Delete a owner-sale-properties
});

Route::prefix('crm-management/general-configuration')->group(function() {
    Route::get('/', [CrmManagementController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [CrmManagementController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [CrmManagementController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [CrmManagementController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [CrmManagementController::class, 'destroy']); // Delete a owner-sale-properties
});

Route::prefix('crm-management/prospecting-stage')->group(function() {
    Route::get('/', [CrmManagementProspectingStageController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [CrmManagementProspectingStageController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [CrmManagementProspectingStageController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [CrmManagementProspectingStageController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [CrmManagementProspectingStageController::class, 'destroy']); // Delete a owner-sale-properties
});
Route::prefix('crm-management/sales/prospecting-funnel')->group(function() {
    Route::get('/', [CrmManagementProspectingfunnelController::class, 'index']); // Get all owner-sale-properties
    Route::get('{id}', [CrmManagementProspectingfunnelController::class, 'show']); // Get a single owner-sale-properties
    Route::post('/', [CrmManagementProspectingfunnelController::class, 'store']); // Create a new owner-sale-properties
    Route::put('{id}', [CrmManagementProspectingfunnelController::class, 'update']); // Update a owner-sale-properties
    Route::delete('{id}', [CrmManagementProspectingfunnelController::class, 'destroy']); // Delete a owner-sale-properties
});