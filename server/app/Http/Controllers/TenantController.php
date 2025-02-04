<?php

namespace App\Http\Controllers;

use App\Models\BusinessOwner;
use App\Models\PrivateOwner;
use App\Models\TenantBill;
use App\Models\TenantContract;
use App\Models\TenantInvoice;
use App\Models\TenantPayment;
use Illuminate\Http\Request;
use App\Models\Tenant;
use Illuminate\Support\Facades\Log;
use Exception;


class TenantController extends Controller
{
    public function index()
    {
        try {
            $tenant = Tenant::all()
                ->map(function ($tenant) {
                    return collect($tenant->toArray())->filter(fn($value) => $value !== null);
                });
    
            return response()->json($tenant, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching tenants: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching tenants.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function store(Request $request)
    {
        try {
            $data = $request->all();

            $tenant = Tenant::create($data);

            if (!$tenant) {
                return response()->json(['message' => 'Failed to create tenant.'], 400);
            }

            return response()->json($tenant, 201);
        } catch (\Exception $e) {
            \Log::error('Error creating tenant: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error creating tenant.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function show($id)
    {
        try {
            $tenant = Tenant::find($id);

            if (!$tenant) {
                return response()->json(['message' => 'tenant not found.'], 404);
            }

            // Remove null fields before returning
            $filteredtenant = collect($tenant->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredtenant, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching tenant: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error fetching tenant.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $tenant = Tenant::find($id);

            if (!$tenant) {
                return response()->json(['message' => 'tenant not found.'], 404);
            }

            $data = $request->all();
            $tenant->update($data);

            $filteredtenant = collect($tenant->toArray())->filter(fn($value) => $value !== null);

            return response()->json($filteredtenant, 200);
        } catch (\Exception $e) {
            \Log::error('Error updating tenant: ' . $e->getMessage());
            return response()->json([///dd
                'message' => 'Error updating tenant.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function TenantDashboard()
    {
        try {
            Log::info('Fetching property counts for Owner Dashboard.');

                
           // $totalCount = OwnerSaleProperty::count() + OwnerRentProperty::count();

            // Fetch last 10 active owners
            $lasttenants = Tenant::where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($owner) {
                return array_filter($owner->toArray(), function ($value) {
                    return !is_null($value);
                });
            });

            $lastUnpaidtenants = Tenant::where('payment_status', 'unpaid')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($owner) {
                return array_filter($owner->toArray(), function ($value) {
                    return !is_null($value);
                });
            });
            Log::info('Fetching last 10 validated mandates.');
            $lastContractToBeRenewed = TenantContract::where('status', 'to_be_renewed')
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get();
            $listActiveContracts = TenantContract::where('status', 'active')
                ->orderBy('created_at', 'desc')
                ->get();
            $tenantsBills = TenantBill::orderBy('created_at', 'desc')->get();
            $tenantsPayments = TenantPayment::orderBy('created_at', 'desc')->get();
            $tenantInvioce = TenantInvoice::orderBy('created_at', 'desc')->get();
            $totalTenants = Tenant::count();
            $activeContracts = TenantContract::where('status', 'active')->count();
            $terminatedContracts = TenantContract::where('status', 'terminated')->count();
            $totalContracts = TenantContract::count();
            $totalBills = TenantBill::count();
            $totalInvoice = TenantInvoice::count();
            $pendingInvoice = TenantInvoice::whereIn('status', ['waiting', 'pending', 'unpaid', 'in-progress'])->count();
            $waitingInvoice = TenantInvoice::where('status', 'waiting')->count();
            $sales = TenantInvoice::where('status', 'paid')->count();
            $unpaidInvoice = TenantInvoice::where('status', 'unpaid')->count();
            $inProgressInvoice = TenantInvoice::where('status', 'in-progress')->count();
            $totalPayment= TenantPayment::count();
            Log::info('Owner Dashboard data fetched successfully.');

            return response()->json([
                'total_tenants' => $totalTenants,
                'total_contracts' => $totalContracts,
                'active_contracts' => $activeContracts,
                'terminated_contracts' => $terminatedContracts,
                'total_bills' => $totalBills,
                'total_payments' => $totalPayment,
                'total_invoice' => $totalInvoice,
                'waiting_invoice' => $waitingInvoice,
                'sales' => $sales,
                'unpaid_invoice' => $unpaidInvoice,
                'in_progress_invoice' => $inProgressInvoice,
                'pending_invoice' => $pendingInvoice,
                'last_tenants' => $lasttenants,
                'last_unpaid_tenants' => $lastUnpaidtenants,
                'list_to_be_renewed_contracts' => $lastContractToBeRenewed,
                'list_active_contracts' => $listActiveContracts,
                'tenants_bills' => $tenantsBills,
                'tenants_payments' => $tenantsPayments,
                'tenant_invoice' => $tenantInvioce,
                'pie_chart_data' => [
                    $totalInvoice,
                    $pendingInvoice,
                    $totalPayment,
                ]
            ]);
        } catch (Exception $e) {
            Log::error('Error in OwnerDashboard: ' . $e->getMessage());

            return response()->json([
                'error' => 'Something went wrong!',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function destroy($id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenant->delete();
        return response()->json(['message' => ' tenant deleted successfully.']);
    }


}
