import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import useFetchData from "@/hooks/useFetchData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { ContractCombobox } from "@/components/admin-panel/UI-components/Combobox/ContractCombobox";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { Contract } from "@/types/DataProps";
import SelectionDetails, { TableRow } from "../UI/SelectionDetails";
import Treasury from "@/components/admin-panel/sidebar/profile/Settings/accounting/Treasury";
import FileUploader from "@/components/common/uploader";
const data: TableRow[] = [
  { designation: 'Facture du loyer de janvier 2025', total: 93000, paid: 0, unpaid: 93000 },
  { designation: 'Facture du loyer de février 2025', total: 93000, paid: 0, unpaid: 93000 },
  { designation: 'Facture du loyer de mars 2025', total: 93000, paid: 0, unpaid: 93000 },
];
// Define validation schema
const PaymentFormSchema = z.object({
  tenant_id: z.number().min(1, "Tenant ID is required"),
  contract_id: z.number().min(1, "Contract ID is required"),
  payment_method: z.string().min(1, "Payment method is required"),
  payment_date: z.string().min(1, "Payment date is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  designation: z.string().min(1, "Designation is required"),
  invoice_type:z.string(),
  total: z.number().optional(),
  treasury_type:z.string(),
  documents: z.array(z.string()).optional(),
  done_by: z.string().optional(),
  cheque: z.string().optional(),
  bank: z.string().optional(),
  phone_no: z.string().regex(/^\+\d{10,15}$/, "Invalid phone number format").optional(),
  transaction: z.string().optional(),
  tiers: z.string().optional()
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

  const apiUrl = import.meta.env.VITE_API_URL + "/api/payment";
  const onSubmit = useFormSubmit<typeof PaymentFormSchema>(apiUrl);

  const Contract = form.watch("contract_id");
  const TenantId = form.watch("tenant_id");

  const { data: contract, loading, error } = useFetchData<Contract>(
    `${import.meta.env.VITE_API_URL}/api/tenant-contract/${Contract ? Contract : "0"}`
  );

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleCheckboxChange = (index: number, unpaid: number) => {
    const updatedSelectedRows = new Set(selectedRows);
    if (updatedSelectedRows.has(index)) {
      updatedSelectedRows.delete(index);
      setTotalAmount(prev => prev - unpaid);
    } else {
      updatedSelectedRows.add(index);
      setTotalAmount(prev => prev + unpaid);
    }
    setSelectedRows(updatedSelectedRows);
  };

  const paymentMethod = form.watch("payment_method")
   const doneBy = form.watch("done_by")
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger>Add Payment</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1200px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add Payment</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">SELECTION OF INVOICE TYPE</h2>
            <div className="grid grid-cols-2 gap-5">
              {/* Tenant Field */}
              <TenantCombobox name="tenant_id" control={form.control} />

  <FormField control={form.control} name="invoice_type" render={({ field }) => (
  <FormItem>
    <FormLabel>Selection of Invoice Type *</FormLabel>
    <FormControl>
      <Select {...field}>
        <SelectTrigger>
          <SelectValue placeholder="Select a contract" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="RENT">RENT</SelectItem>
          <SelectItem value="ENTREE">ENTREE</SelectItem>
          <SelectItem value="COURT_TERME">COURT TERME</SelectItem>
          <SelectItem value="OTHER_INVOICES">OTHER INVOICES</SelectItem>
          <SelectItem value="PENALTY">PENALTY</SelectItem>
          <SelectItem value="TERMINATION">TERMINATION</SelectItem>
          <SelectItem value="RENEWAL">RENEWAL</SelectItem>
        </SelectContent>
      </Select>
    </FormControl>
    <FormMessage />
  </FormItem>
)} />

              {/* Contract Field */}
              <ContractCombobox name="contract_id" control={form.control} tenantId={TenantId} />
            </div>

            {Contract !== undefined && (
              <>
          <div className='space-y-6'>
      <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">SELECTION DETAILS</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Total */}
        <div className="bg-blue-500 text-white p-4 text-center rounded-md">
        <h3 className="text-lg font-semibold">TOTAL: 0 XOF</h3>
        </div>

        {/* Payment */}
        <div className="bg-green-500 text-white p-4 text-center rounded-md">
          <h3 className="text-lg font-semibold">PAYMENT: 0 XOF</h3>
        </div>

        {/* Impact */}
        <div className="bg-red-500 text-white p-4 text-center rounded-md">
          <h3 className="text-lg font-semibold">IMPACT: 0 XOF</h3>
        </div>
      </div>

      {/* Table for Designations */}
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Designation</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Paid</th>
            <th className="border border-gray-300 p-2">Unpaid</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
              <input
                  type="checkbox"
                  checked={selectedRows.has(index)}
                  onChange={() => handleCheckboxChange(index, row.unpaid)}
                />{' '}
              </td>
              <td className="border border-gray-300 p-2">{row.total}</td>
              <td className="border border-gray-300 p-2">{row.paid}</td>
              <td className="border border-gray-300 p-2 text-red-500">{row.unpaid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

                <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">DETAILS OF THE RULES</h2>
                <div className="grid grid-cols-3 gap-5">
             

                
                  <FormField control={form.control} name="treasury_type" render={({ field }) => (
  <FormItem>
    <FormLabel>Treasury Method</FormLabel>
    <FormControl>
      <Select {...field}>
        <SelectTrigger>
          <SelectValue placeholder="Select method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CHECK_CASH">CHECK CASH</SelectItem>
          <SelectItem value="MOBILE_MONEY">MOBILE MONEY</SelectItem>
          <SelectItem value="TRANSFER_CASH">TRANSFER CASH</SelectItem>
          <SelectItem value="DEPOT_OF_WARRANTY">DEPOT OF WARRANTY</SelectItem>
          <SelectItem value="CASH_BOX">CASH BOX</SelectItem>
        </SelectContent>
      </Select>
    </FormControl>
    <FormMessage />
  </FormItem>
)} />

     {/* Payment Date */}
     <FormField control={form.control} name="payment_date" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                   
                  
                           
                  
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
                            <SelectItem value="MOBILE MONEY">MOBILE MONEY</SelectItem>
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
                  
                  
                  
                                  {
                                    (paymentMethod =="MOBILE MONEY" 
                                    
                    || paymentMethod =="WAVE" 
                  
                    || paymentMethod =="PAYMENT" 
                                             )         &&<>  <FormField
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
                                          <Input {...field} placeholder="Enter Transaction no" />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  /> 
                                  </>
                                  }
                                  {
                                    paymentMethod =="CHEQUE"
                                    &&<>  <FormField
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
                                  }
                  
                                     {
                                                    doneBy =="OTHER" && 
                                                    <FormField
                                                    control={form.control}
                                                    name="tiers"
                                                    render={({ field }) => (
                                                      <FormItem>
                                                        <FormLabel>Tiers</FormLabel>
                                                        <FormControl>
                                                          <Input {...field} placeholder="Name of the third paryy" />
                                                        </FormControl>
                                                        <FormMessage />
                                                      </FormItem>
                                                    )}
                                                  /> 
                                                  }
                              
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

                <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">ATTACHMENTS</h2>
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
