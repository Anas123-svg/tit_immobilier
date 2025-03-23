import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import useFetchData from "@/hooks/useFetchData";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { ContractCombobox } from "@/components/admin-panel/UI-components/Combobox/ContractCombobox";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { Contract, InvoiceItem } from "@/types/DataProps";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoiceItemSchema = z.object({
  designation: z.string(),
  price: z.number(),
  qty: z.number(),
  vat: z.number(),
  discount: z.number(),
  total: z.number().optional(),
});

  
// Main form schema
const PenaltyFormSchema = z.object({
  tenant_id: z.number().min(1, "Tenant ID is required"),
  contract_id: z.number().min(1, "Contract ID is required"),
  end_date: z.string().optional(),
  date: z.string().optional(),
  rent: z.number().optional(),
  charge: z.number().optional(),
  penalty_for_late_payment: z.number().min(0, "Penalty must be a positive number").optional(),
  payment_limit: z.string().optional(),

  // Invoices array containing multiple invoice items
  tenant_renew_contract_invoices: z.array(invoiceItemSchema).optional(),
});

type PenaltyFormData = z.infer<typeof PenaltyFormSchema>;

const RenewalContract = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<PenaltyFormData>({
    resolver: zodResolver(PenaltyFormSchema),
    
  });


    const apiUrl = import.meta.env.VITE_API_URL + '/api/tenant-renew-contract';
          const onSubmit = useFormSubmit<typeof PenaltyFormSchema>(apiUrl);  // Use custom hook
          
const Contract = form.watch("contract_id")
const TenantId = form.watch("tenant_id")




const { data:contract, loading, error } = useFetchData<Contract>(
`${import.meta.env.VITE_API_URL}/api/tenant-contract/${Contract?Contract:'0'}`
)

const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tenant_renew_contract_invoices",
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      designation: "",
      price: 0,
      qty: 1,
      vat: 0,
      discount: 0,
      total: 0,
    },
  ]);

  // Handle change in form fields

  // Function to add a new row dynamically
  const addRow = () => {
    setItems([
      ...items,
      { designation: "", price: 0, qty: 1, vat: 0, discount: 0, total: 0 },
    ]);
  };
 

// Function to calculate total
const calculateTotal = (price: number, qty: number, vat: number, discount: number): number => {
  return (price || 0) * (qty || 1) + (vat || 0) - (discount || 0);
};




useEffect(() => {
  if (contract?.rent_locative) {
    // Get rent and charge values from contract data
    const rent = contract.rent_locative.rent || 0;
    const charge = contract.rent_locative.charges || 0;
    form.setValue(`end_date`, contract?.end_date);
    form.setValue(`date`, contract?.end_date);
    form.setValue(`rent`, rent);
    form.setValue(`charge`, charge);
    form.setValue(`penalty_for_late_payment`, contract?.penalty_for_delay); 
    form.setValue(`payment_limit`, contract?.payment_limit);
    
    
  }

  items.forEach((_, index) => {
    const price = form.getValues(`tenant_renew_contract_invoices.${index}.price`) || 0;
    const qty = form.getValues(`tenant_renew_contract_invoices.${index}.qty`) || 1;
    const vat = form.getValues(`tenant_renew_contract_invoices.${index}.vat`) || 0;
    const discount = form.getValues(`tenant_renew_contract_invoices.${index}.discount`) || 0;

    // Calculate the total for the current row
    const total = calculateTotal(price, qty, vat, discount);

    // Set the total in the form
    form.setValue(`tenant_renew_contract_invoices.${index}.total`, 0);
  });
 

}, [contract, form,items]);

  // Function to delete a row
  const deleteRow = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Compute summary totals
  const totalHT = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
  const totalVAT = items.reduce((sum, item) => sum + item.vat, 0);
  const grandTotal = totalHT + totalVAT - totalDiscount;
  
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Renew a Contract</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1200px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add a renewal</DialogTitle>
        <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                 SELECT CONTRACT
       </h2>
       <div className="grid grid-cols-2 gap-5">
                   {/* Tenant Field */}
       
                   <TenantCombobox name="tenant_id" control={form.control}/>
             
            <ContractCombobox name="contract_id" control={form.control}  tenantId={TenantId}/>
                         
          
       </div>
         {  Contract !==undefined
        &&<>
         <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
         DETAILS ON RENEWAL TERMS
       </h2>
       
       
       <div className="grid grid-cols-4 gap-4">
  {/* Previous End Date */}
  <FormItem>
    <FormLabel>Previous End Date</FormLabel>
    <FormControl>
      <Input type="text" defaultValue={contract?.end_date} placeholder="End Date Not Found" disabled />
    </FormControl>
    <FormMessage />
  </FormItem>

  {/* End Date */}
  <FormItem>
    <FormLabel>End Date</FormLabel>
    <FormControl>
      <Input type="text" defaultValue={contract?.end_date} placeholder="End Date Not Found" disabled />
    </FormControl>
    <FormMessage />
  </FormItem>

  {/* Rent */}
  <FormItem>
    <FormLabel>Rent</FormLabel>
    <FormControl>
      <Input type="number" defaultValue={contract?.cost_of_rent} placeholder="Rent Amount Not Found" disabled />
    </FormControl>
    <FormMessage />
  </FormItem>

  {/* Penalty for Late Payment (%) */}
  <FormItem>
    <FormLabel>Penalty for Late Payment (%)</FormLabel>
    <FormControl>
      <Input type="number" defaultValue={contract?.penalty_for_delay} placeholder="Penalty Percentage Not Found" disabled />
    </FormControl>
    <FormMessage />
  </FormItem>

  {/* Payment Limit */}
  <FormItem>
    <FormLabel>Payment Limit</FormLabel>
    <FormControl>
      <Input type="text" defaultValue={contract?.payment_limit} placeholder="Payment Limit Not Found" disabled />
    </FormControl>
    <FormMessage />
  </FormItem>
</div>

<div className="p-4 border rounded-md shadow-md">
        <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
          ADD OPTIONS TO THIS INVOICE
        </h2>
        <Table className="w-full mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Designation *</TableHead>
              <TableHead>Unit Price *</TableHead>
              <TableHead>Qty *</TableHead>
              <TableHead>VAT</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <FormField control={form.control} name={`tenant_renew_contract_invoices.${index}.designation`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Service Charge" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                  <FormField control={form.control} name={`tenant_renew_contract_invoices.${index}.price`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Price *</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0" min="0" onChange={e => field.onChange(parseFloat(e.target.value))}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                  <FormField control={form.control} name={`tenant_renew_contract_invoices.${index}.qty`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity *</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="1" min="1" onChange={e => field.onChange(parseFloat(e.target.value))}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                  <FormField control={form.control} name={`tenant_renew_contract_invoices.${index}.vat`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>VAT</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0" min="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                  <FormField control={form.control} name={`tenant_renew_contract_invoices.${index}.discount`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0" min="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                <FormField control={form.control} name={`tenant_renew_contract_invoices.${index}.total`} render={({ field }) => (
  <FormItem>
    <FormLabel>Total</FormLabel>
    <FormControl>
      <Input
        {...field}
        type="number"
        disabled
        placeholder="0"
        min="0"
        value={form.getValues(`tenant_renew_contract_invoices.${index}.total`) || ""} // Ensure value is never undefined
      />
    </FormControl>
    <FormMessage />
  </FormItem>
)} />


                </TableCell>

                <TableCell>
                  <Button
                    onClick={() => deleteRow(index)}
                    className="bg-red-500 text-white px-2 py-1"
                    disabled={items.length === 1}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Add Button */}
        <div className="flex justify-end mt-4">
          <Button onClick={addRow} className="bg-secondary text-white">
            Add+
          </Button>
        </div>
          {/* Summary Section */}
      {/* <div className="bg-gray-100 p-4 mt-6 rounded-md">
        <div className="text-right text-gray-600 text-sm">
          <p>NUMBER OF HOURS : {items.length}</p>
          <p>TOTAL HT : {totalHT.toFixed(2)}</p>
          <p>TOTAL DISCOUNT : {totalDiscount.toFixed(2)}</p>
          <p>TOTAL VAT : {totalVAT.toFixed(2)}</p>
        </div>
        <h2 className="text-blue-600 text-lg font-bold text-right mt-2">
          TOTAL : <span className="text-green-500">{grandTotal.toFixed(2)}</span>
        </h2>
      </div> */}
      </div>
        
       </>        }      {/* Submit Button */}
                   <DialogFooter>
                     <Button type="submit">Save</Button>
                   </DialogFooter>
                 </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RenewalContract;
