import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import useFetchData from "@/hooks/useFetchData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { ContractCombobox } from "@/components/admin-panel/UI-components/Combobox/ContractCombobox";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import {
  Contract,
  Invoice,
  TenantBill,
  TenantOtherInvoice,
  TenantRenewInvoice,
  TenantRentBill,
} from "@/types/DataProps";
import SelectionDetails, { TableRow } from "../UI/SelectionDetails";
import Treasury from "@/components/admin-panel/sidebar/profile/Settings/accounting/Treasury";
import FileUploader from "@/components/common/uploader";

// Define validation schema
const PaymentFormSchema = z.object({
  tenant_id: z.number().min(1, "Tenant ID is required"),
  contract_id: z.number().min(1, "Contract ID is required"),
  payment_method: z.string().optional(),
  payment_date: z.string().optional(),
  amount: z.number().optional(),

  invoice_type: z.string().optional(),
  total: z.number().optional(),
  treasury_type: z.string().optional(),
  treasury_id: z.number().optional(), // Added treasury_id field
  documents: z.array(z.string()).optional(),
  done_by: z.string().optional(),
  cheque: z.string().optional(),
  bank: z.string().optional(),
  phone_no: z
    .string()
    .regex(/^\+\d{10,15}$/, "Invalid phone number format")
    .optional(),
  transaction: z.string().optional(),
  tiers: z.string().optional(),
  rent_bills: z.array(z.number()).optional(),
  penalty_bills: z.array(z.number()).optional(),
  other_invoices: z.array(z.number()).optional(),
  renewal_contracts: z.array(z.number()).optional(),
  short_contracts: z.array(z.number()).optional(),
  termination_invoices: z.array(z.number()).optional(),
});

type PaymentFormData = z.infer<typeof PaymentFormSchema>;

const AddPayment = () => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchema),
  });

  const apiUrl = import.meta.env.VITE_API_URL + "/api/tenant-payment";
  const onSubmit = useFormSubmit<typeof PaymentFormSchema>(apiUrl);

  const ContractId = form.watch("contract_id");
  const TenantId = form.watch("tenant_id");

  const { data: TenantPenaltyBill } = useFetchData<TenantBill[]>(
    `${import.meta.env.VITE_API_URL}/api/tenant-penalty/details/tenant/${
      TenantId ? TenantId : ""
    }`
  );
  const { data: TenantRentBill } = useFetchData<TenantBill[]>(
    `${import.meta.env.VITE_API_URL}/api/tenant-bill/tenant/${
      TenantId ? TenantId : ""
    }`
  );
  const { data: tenantOtherInvoice } = useFetchData<TenantOtherInvoice[]>(
    `${import.meta.env.VITE_API_URL}/api/tenant-other/details/tenant/${
      TenantId ? TenantId : ""
    }`
  );

  const { data: tenantRenewInvoice } = useFetchData<TenantRenewInvoice[]>(
    `${import.meta.env.VITE_API_URL}/api/tenant-renew-contract/details/tenant/${
      TenantId ? TenantId : ""
    }`
  );

  const { data: tenantShortTerm } = useFetchData<Invoice[]>(
    `${
      import.meta.env.VITE_API_URL
    }/api/tenant-short-term-contract/details/tenant/${TenantId ? TenantId : ""}`
  );

  // Fetch treasury data for treasury_id selection
  const { data: treasuries } = useFetchData<any[]>(
    `${import.meta.env.VITE_API_URL}/api/treasury/add`
  );

  const rentBillData: any[] | undefined = TenantRentBill?.map((bill) => {
    return {
      id: bill.id,
      designation: `${new Date(bill.created_at).toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}`,
      total: parseInt(bill.total || "0"),
      paid: parseInt(bill.paid),
      unpaid: parseInt(bill.Unpaid || "0"),
    };
  });

  const tenantShortTermInvoices: any[] | undefined = tenantShortTerm?.map(
    (bill) => {
      return {
        id: bill.id,
        designation: bill.designation,
        total: parseInt(bill.total ?? "0"),
        paid: bill.paid,
        unpaid: parseInt(bill.Unpaid || "0"),
      };
    }
  );

  const penaltyBillData: any[] | undefined = TenantPenaltyBill?.map((bill) => {
    return {
      id: bill.id,
      designation: `Penalty Bill for the month ${bill.created_at}`,
      total: parseInt(bill.total),
      paid: parseInt(bill.paid),
      unpaid: parseInt(bill.Unpaid),
    };
  });

  const tenantOther: any[] | undefined = tenantOtherInvoice?.map((bill) => {
    return {
      id: bill.id,
      designation: bill.designation,
      total: parseInt(bill.total),
      paid: parseInt(bill.paid),
      unpaid: parseInt(bill.Unpaid),
    };
  });

  const tenantRenew: any[] | undefined = tenantRenewInvoice?.map((bill) => {
    return {
      id: bill.id,
      designation: bill.designation,
      total: parseInt(bill.total),
      paid: parseInt(bill.paid),
      unpaid: parseInt(bill.Unpaid),
    };
  });

  // Changed to store actual IDs instead of indices
  const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // New state variables for summary calculations
  const [summaryTotal, setSummaryTotal] = useState<number>(0);
  const [summaryPaid, setSummaryPaid] = useState<number>(0);
  const [summaryUnpaid, setSummaryUnpaid] = useState<number>(0);

  // Get current active data based on invoice type
  const getCurrentData = () => {
    const InvoiceType = form.watch("invoice_type");

    if (InvoiceType === "RENT") return rentBillData;
    if (InvoiceType === "PENALTY") return penaltyBillData;
    if (InvoiceType === "OTHER_INVOICES") return tenantOther;
    if (InvoiceType === "RENEWAL") return tenantRenew;
    if (InvoiceType === "COURT_TERME") return tenantShortTermInvoices;
    return [];
  };

  // Updated to handle IDs instead of indices
  const handleCheckboxChange = (id: number, unpaid: number) => {
    const updatedSelectedRows = new Set(selectedRowIds);

    // Find the current row data
    const currentData = getCurrentData();
    const rowData = currentData?.find((row) => row.id === id);

    if (!rowData) return;

    if (updatedSelectedRows.has(id)) {
      // Remove from selection
      updatedSelectedRows.delete(id);
      setTotalAmount((prev) => prev - unpaid);

      // Update summaries
      setSummaryTotal((prev) => prev - rowData.total);
      setSummaryPaid((prev) => prev - rowData.paid);
      setSummaryUnpaid((prev) => prev - rowData.unpaid);
    } else {
      // Add to selection
      updatedSelectedRows.add(id);
      setTotalAmount((prev) => prev + unpaid);

      // Update summaries
      setSummaryTotal((prev) => prev + rowData.total);
      setSummaryPaid((prev) => prev + rowData.paid);
      setSummaryUnpaid((prev) => prev + rowData.unpaid);
    }

    setSelectedRowIds(updatedSelectedRows);
  };

  // Reset summary and selected rows when invoice type changes
  useEffect(() => {
    setSelectedRowIds(new Set());
    setTotalAmount(0);
    setSummaryTotal(0);
    setSummaryPaid(0);
    setSummaryUnpaid(0);
  }, [form.watch("invoice_type")]);

  useEffect(() => {
    // Set amount value
    form.setValue("amount", totalAmount);

    // Convert Set to Array for submission
    const selectedIdsArray = Array.from(selectedRowIds);

    // Update the corresponding form field based on invoice type
    if (form.watch("invoice_type") === "RENT") {
      form.setValue("rent_bills", selectedIdsArray);
    } else if (form.watch("invoice_type") === "PENALTY") {
      form.setValue("penalty_bills", selectedIdsArray);
    } else if (form.watch("invoice_type") === "OTHER_INVOICES") {
      form.setValue("other_invoices", selectedIdsArray);
    } else if (form.watch("invoice_type") === "RENEWAL") {
      form.setValue("renewal_contracts", selectedIdsArray);
    } else if (form.watch("invoice_type") === "COURT_TERME") {
      form.setValue("short_contracts", selectedIdsArray);
    } else if (form.watch("invoice_type") === "TERMINATION") {
      form.setValue("termination_invoices", selectedIdsArray);
    }
  }, [form, totalAmount, selectedRowIds]);

  const InvoiceType = form.watch("invoice_type");
  const paymentMethod = form.watch("payment_method");
  const doneBy = form.watch("done_by");
  const treasuryType = form.watch("treasury_type");

  // Format number for display
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fr-FR").format(num);
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger>Add Payment</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1200px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add Payment</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              SELECTION OF INVOICE TYPE
            </h2>
            <div className="grid grid-cols-2 gap-5">
              {/* Tenant Field */}
              <TenantCombobox name="tenant_id" control={form.control} />

              <FormField
                control={form.control}
                name="invoice_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selection of Invoice Type *</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a contract" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RENT">RENT</SelectItem>
                          <SelectItem value="ENTREE">ENTREE</SelectItem>
                          <SelectItem value="COURT_TERME">
                            COURT TERME
                          </SelectItem>
                          <SelectItem value="OTHER_INVOICES">
                            OTHER INVOICES
                          </SelectItem>
                          <SelectItem value="PENALTY">PENALTY</SelectItem>
                          <SelectItem value="TERMINATION">
                            TERMINATION
                          </SelectItem>
                          <SelectItem value="RENEWAL">RENEWAL</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contract Field */}
              <ContractCombobox
                name="contract_id"
                control={form.control}
                tenantId={TenantId}
              />
            </div>

            {ContractId !== undefined && (
              <>
                <div className="space-y-6">
                  <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                    SELECTION DETAILS
                  </h2>
                  <div className="grid grid-cols-3 gap-4">
                    {/* Total */}
                    <div className="bg-blue-500 text-white p-4 text-center rounded-md">
                      <h3 className="text-lg font-semibold">
                        TOTAL: {formatNumber(summaryTotal)} XOF
                      </h3>
                    </div>

                    {/* Payment */}
                    <div className="bg-green-500 text-white p-4 text-center rounded-md">
                      <h3 className="text-lg font-semibold">
                        PAYMENT: {formatNumber(summaryPaid)} XOF
                      </h3>
                    </div>

                    {/* Impact */}
                    <div className="bg-red-500 text-white p-4 text-center rounded-md">
                      <h3 className="text-lg font-semibold">
                        IMPACT: {formatNumber(summaryUnpaid)} XOF
                      </h3>
                    </div>
                  </div>

                  {/* Table for Designations */}
                  <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2">
                          Designation
                        </th>
                        <th className="border border-gray-300 p-2">Total</th>
                        <th className="border border-gray-300 p-2">Paid</th>
                        <th className="border border-gray-300 p-2">Unpaid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(InvoiceType == "RENT"
                        ? rentBillData
                        : InvoiceType == "PENALTY"
                        ? penaltyBillData
                        : InvoiceType == "OTHER_INVOICES"
                        ? tenantOther
                        : InvoiceType == "RENEWAL"
                        ? tenantRenew
                        : InvoiceType == "COURT_TERME"
                        ? tenantShortTermInvoices
                        : []
                      )?.map((row) => (
                        <tr key={row.id}>
                          <td className="border border-gray-300 p-2">
                            <input
                              type="checkbox"
                              checked={selectedRowIds.has(row.id)}
                              onChange={() =>
                                handleCheckboxChange(row.id, row.unpaid ?? 0)
                              }
                            />{" "}
                            {row.designation}
                          </td>

                          <td className="border border-gray-300 p-2">
                            {row.total}
                          </td>
                          <td className="border border-gray-300 p-2">
                            {row.paid}
                          </td>
                          <td className="border border-gray-300 p-2 text-red-500">
                            {row.unpaid}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                  DETAILS OF THE RULES
                </h2>
                <div className="grid grid-cols-3 gap-5">
                  <FormField
                    control={form.control}
                    name="treasury_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Treasury Method</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CHECK_CASH">
                                CHECK CASH
                              </SelectItem>
                              <SelectItem value="MOBILE_MONEY">
                                MOBILE MONEY
                              </SelectItem>
                              <SelectItem value="TRANSFER_CASH">
                                TRANSFER CASH
                              </SelectItem>
                              <SelectItem value="DEPOT_OF_WARRANTY">
                                DEPOT OF WARRANTY
                              </SelectItem>
                              <SelectItem value="CASH_BOX">CASH BOX</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Treasury ID field - shows only when treasury_type is selected */}
                  {treasuryType && (
                    <FormField
                      control={form.control}
                      name="treasury_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Treasury</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(parseInt(value))
                              }
                              value={field.value?.toString()}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select treasury" />
                              </SelectTrigger>
                              <SelectContent>
                                {treasuries?.map((treasury) => (
                                  <SelectItem
                                    key={treasury.id}
                                    value={treasury.id.toString()}
                                  >
                                    {treasury.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Payment Date */}
                  <FormField
                    control={form.control}
                    name="payment_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Payment Method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SPECIES">SPECIES</SelectItem>
                            <SelectItem value="CHEQUE">CHEQUE</SelectItem>
                            <SelectItem value="MOBILE MONEY">
                              MOBILE MONEY
                            </SelectItem>
                            <SelectItem value="WAVE">WAVE</SelectItem>
                            <SelectItem value="PAYMENT">PAYMENT</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Done By */}
                  <FormField
                    control={form.control}
                    name="done_by"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Done By</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Done By" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="HIMSELF">HIMSELF</SelectItem>
                              <SelectItem value="OTHER">OTHER</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(paymentMethod == "MOBILE MONEY" ||
                    paymentMethod == "WAVE" ||
                    paymentMethod == "PAYMENT") && (
                    <>
                      {" "}
                      <FormField
                        control={form.control}
                        name="phone_no"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone no</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter Phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="transaction"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transaction no</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter Transaction no"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  {paymentMethod == "CHEQUE" && (
                    <>
                      {" "}
                      <FormField
                        control={form.control}
                        name="bank"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank no</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter Bank" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cheque"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cheque no</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter Cheque no" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {doneBy == "OTHER" && (
                    <FormField
                      control={form.control}
                      name="tiers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tiers</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Name of the third paryy"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl className=" p-5 bg-gray-200  hover:text-green-700">
                          <Input
                            className=" disabled:text-black"
                            {...field}
                            value={totalAmount} // Bind input value to the totalAmount state
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              field.onChange(value); // Update the form field
                              setTotalAmount(value); // Update the totalAmount state
                            }}
                            type="number"
                            placeholder="Enter Amount"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                  ATTACHMENTS
                </h2>
                <div className="grid grid-cols-1 gap-5">
                  <FileUploader
                    onChange={(files) => form.setValue("documents", files)}
                    maxFiles={5}
                    addedFiles={form.watch("documents") || []}
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPayment;
