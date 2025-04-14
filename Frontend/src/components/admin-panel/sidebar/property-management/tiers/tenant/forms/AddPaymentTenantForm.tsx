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
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { ContractCombobox } from "@/components/admin-panel/UI-components/Combobox/ContractCombobox";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import FileUploader from "@/components/common/uploader";

// Define validation schema
const PaymentFormSchema = z.object({
  tenant_id: z.number().min(1, "Tenant ID is required"),
  contract_id: z.number().min(1, "Contract ID is required"),
  payment_method: z.string().optional(),
  payment_date: z.string().optional(),
  amount: z.number().optional(),
  invoice_type: z.string().optional(),
  treasury_type: z.string().optional(),
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
  selected_invoices: z.array(z.number()).optional(),
});

type PaymentFormData = z.infer<typeof PaymentFormSchema>;

// Define type for rent bill from API
interface TenantBill {
  id: number;
  tenant_id: number;
  contract_id: number;
  month: string;
  rent: string;
  charge: string;
  total: string;
  created_at: string;
  updated_at: string;
  state: string;
}

// Type for penalty bill
interface PenaltyBill {
  id: number;
  tenant_id: number;
  contract_id: number;
  month: string;
  total: string;
  created_at: string;
  updated_at: string;
  state: string;
}

// Type for invoice row in table
interface InvoiceRow {
  id: number;
  designation: string;
  total: number;
  paid: number;
  unpaid: number;
  isSelected?: boolean;
}

const AddPayment = () => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
    setSelectedInvoices([]);
    setTotalAmount(0);
    setTotalPaid(0);
    setTotalUnpaid(0);
  };

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      amount: 0,
      selected_invoices: [],
    },
  });

  const apiUrl = import.meta.env.VITE_API_URL + "/api/tenant-payment";
  const onSubmit = useFormSubmit<typeof PaymentFormSchema>(apiUrl);

  const contractId = form.watch("contract_id");
  const tenantId = form.watch("tenant_id");
  const invoiceType = form.watch("invoice_type");
  const paymentMethod = form.watch("payment_method");
  const doneBy = form.watch("done_by");

  // Fetch rent bills when tenant ID is available
  const { data: tenantRentBills } = useFetchData<TenantBill[]>(
    `${import.meta.env.VITE_API_URL}/api/tenant-bill/tenant/${tenantId || ""}`
  );

  // Fetch penalty bills when tenant ID is available
  const { data: tenantPenaltyBills } = useFetchData<PenaltyBill[]>(
    `${import.meta.env.VITE_API_URL}/api/tenant-penalty/tenant/${
      tenantId || ""
    }`
  );

  // State for selected invoices and totals
  const [selectedInvoices, setSelectedInvoices] = useState<number[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [totalUnpaid, setTotalUnpaid] = useState(0);

  // Convert API data to invoice rows
  const getInvoiceRows = (): InvoiceRow[] => {
    if (invoiceType === "RENT" && tenantRentBills) {
      return tenantRentBills.map((bill) => ({
        id: bill.id,
        designation: `${bill.month} ${new Date().getFullYear()} rent invoice`,
        total: parseFloat(bill.total),
        paid: 0,
        unpaid: parseFloat(bill.total),
        isSelected: selectedInvoices.includes(bill.id),
      }));
    } else if (invoiceType === "PENALTY" && tenantPenaltyBills) {
      return tenantPenaltyBills.map((bill) => ({
        id: bill.id,
        designation: `Penalty Bill for the month ${bill.month}`,
        total: parseFloat(bill.total),
        paid: 0,
        unpaid: parseFloat(bill.total),
        isSelected: selectedInvoices.includes(bill.id),
      }));
    }
    return [];
  };

  const invoiceRows = getInvoiceRows();

  // Handle checkbox change
  const handleInvoiceSelection = (invoice: InvoiceRow) => {
    let newSelectedInvoices = [...selectedInvoices];
    let newTotalAmount = totalAmount;
    let newTotalUnpaid = totalUnpaid;

    if (newSelectedInvoices.includes(invoice.id)) {
      // Deselect invoice
      newSelectedInvoices = newSelectedInvoices.filter(
        (id) => id !== invoice.id
      );
      newTotalAmount -= invoice.unpaid;
      newTotalUnpaid -= invoice.unpaid;
    } else {
      // Select invoice
      newSelectedInvoices.push(invoice.id);
      newTotalAmount += invoice.unpaid;
      newTotalUnpaid += invoice.unpaid;
    }

    setSelectedInvoices(newSelectedInvoices);
    setTotalAmount(newTotalAmount);
    setTotalUnpaid(newTotalUnpaid);

    // Update form values
    form.setValue("amount", newTotalAmount);
    form.setValue("selected_invoices", newSelectedInvoices);
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger>Add Payment</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1200px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add Payment</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* SELECTION OF INVOICE TYPE section */}
            <div className="bg-green-200 text-center p-3 font-semibold rounded-md">
              SELECTION OF INVOICE TYPE
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Tenant Field */}
              <TenantCombobox name="tenant_id" control={form.control} />

              {/* Invoice Type Field */}
              <FormField
                control={form.control}
                name="invoice_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex mb-4">
                      Invoice Type <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select invoice type" />
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
                tenantId={tenantId}
              />
            </div>

            {/* Show SELECTION DETAILS section when contract is selected */}
            {contractId && invoiceType && (
              <>
                <div className="space-y-6">
                  <div className="bg-green-200 text-center p-3 font-semibold rounded-md">
                    SELECTION DETAILS
                  </div>

                  {/* Status boxes */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-500 text-white p-4 text-center rounded-md">
                      <h3 className="text-lg font-semibold">
                        TOTAL: {totalAmount.toLocaleString()} XOF
                      </h3>
                    </div>
                    <div className="bg-green-400 text-white p-4 text-center rounded-md">
                      <h3 className="text-lg font-semibold">
                        PAY: {totalPaid.toLocaleString()} XOF
                      </h3>
                    </div>
                    <div className="bg-red-500 text-white p-4 text-center rounded-md">
                      <h3 className="text-lg font-semibold">
                        UNPAID: {totalUnpaid.toLocaleString()} XOF
                      </h3>
                    </div>
                  </div>

                  {/* Invoice selection table */}
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="w-12 border p-2"></th>
                          <th className="border p-2 text-left">DESIGNATION</th>
                          <th className="border p-2 text-right">TOTAL</th>
                          <th className="border p-2 text-right">PAID</th>
                          <th className="border p-2 text-right">UNPAID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoiceRows.length > 0 ? (
                          invoiceRows.map((invoice) => (
                            <tr key={invoice.id} className="hover:bg-gray-50">
                              <td className="border p-2 text-center">
                                <input
                                  type="checkbox"
                                  checked={selectedInvoices.includes(
                                    invoice.id
                                  )}
                                  onChange={() =>
                                    handleInvoiceSelection(invoice)
                                  }
                                  className="h-4 w-4"
                                />
                              </td>
                              <td className="border p-2">
                                {invoice.designation}
                              </td>
                              <td className="border p-2 text-right">
                                {invoice.total.toLocaleString()}
                              </td>
                              <td className="border p-2 text-right">
                                {invoice.paid.toLocaleString()}
                              </td>
                              <td className="border p-2 text-right text-red-500 font-medium">
                                {invoice.unpaid.toLocaleString()}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={5}
                              className="border p-4 text-center text-gray-500"
                            >
                              No invoices available for this selection
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* DETAILS OF THE RULES section */}
                <div className="bg-green-200 text-center p-3 font-semibold rounded-md">
                  DETAILS OF THE RULES
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Treasury Method */}
                  <FormField
                    control={form.control}
                    name="treasury_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Treasury Method</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
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

                  {/* Payment Method */}
                  <FormField
                    control={form.control}
                    name="payment_method"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Method</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
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
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
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

                  {/* Conditional fields based on payment method */}
                  {(paymentMethod === "MOBILE MONEY" ||
                    paymentMethod === "WAVE" ||
                    paymentMethod === "PAYMENT") && (
                    <>
                      <FormField
                        control={form.control}
                        name="phone_no"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Example: +1234567890"
                              />
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
                            <FormLabel>Transaction Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter Transaction number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {/* Conditional fields for CHEQUE payment method */}
                  {paymentMethod === "CHEQUE" && (
                    <>
                      <FormField
                        control={form.control}
                        name="bank"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter Bank name" />
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
                            <FormLabel>Cheque Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter Cheque number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {/* Show Tiers field when Done By is OTHER */}
                  {doneBy === "OTHER" && (
                    <FormField
                      control={form.control}
                      name="tiers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Third Party</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Name of the third party"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Amount field */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 font-bold text-green-700"
                            {...field}
                            value={totalAmount}
                            type="number"
                            readOnly
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* ATTACHMENTS section */}
                <div className="bg-green-200 text-center p-3 font-semibold rounded-md">
                  ATTACHMENTS
                </div>
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
              <Button
                type="submit"
                disabled={selectedInvoices.length === 0}
                className="bg-primary hover:bg-primary/90"
              >
                Save Payment
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPayment;
