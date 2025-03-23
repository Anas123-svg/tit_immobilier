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

const invoiceSchema = z.object({
    designation: z.string().optional(),
    unit_price: z.number().optional(),
    qty: z.number().optional(),
    vat: z.number().optional(),
    discount: z.number().optional(),
    total: z.number().optional(),
  });
  
// Define validation schema
const PenaltyFormSchema = z.object({
  tenant_id: z.number().min(1, "Tenant ID is required"),
  contract_id: z.number().min(1, "Contract ID is required"),
  label:z.string().optional(),
  due_date:z.string().optional(),
  date:z.string().optional(),
   tenant_other_details: z.array(invoiceSchema).optional(),
});

type PenaltyFormData = z.infer<typeof PenaltyFormSchema>;

const OthersForm = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<PenaltyFormData>({
    resolver: zodResolver(PenaltyFormSchema),
  });


    const apiUrl = import.meta.env.VITE_API_URL + '/api/tenant-other';
          const onSubmit = useFormSubmit<typeof PenaltyFormSchema>(apiUrl);  // Use custom hook
          
const Contract = form.watch("contract_id")
const TenantId = form.watch("tenant_id")


const { data:contract, loading, error } = useFetchData<Contract>(
`${import.meta.env.VITE_API_URL}/api/tenant-contract/${Contract?Contract:'0'}`
)
const [invoiceState, setInvoice] = useState([
    { 
      designation: '', 
      unit_price: 0, 
      qty: 1, 
      vat: 0, 
      discount: 0, 
      total: 0 
    }
  ]); // Initial state for tenant_other_details
  const handleAddInvoice = () => {
    setInvoice([
      ...invoiceState,
      { designation: '', unit_price: 0, qty: 1, vat: 0, discount: 0, total: 0 }
    ]);
  };
  
  const handleRemoveInvoice = (index: number) => {
    const updatedInvoice = invoiceState.filter((_, i) => i !== index);
    setInvoice(updatedInvoice);
  };
  
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Others</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1200px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add to an invoice</DialogTitle>
        <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                 CONTRACT DETAILS
       </h2>
       <div className="grid grid-cols-2 gap-5">
                   {/* Tenant Field */}
       
                   <TenantCombobox name="tenant_id" control={form.control}/>
             
            <ContractCombobox name="contract_id" control={form.control}  tenantId={TenantId}/>
                         
          
       </div>
         {  Contract !==undefined
        &&<>
         <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
         EDIT INVOICE
       </h2>
       
       
       <div className="grid grid-cols-4 gap-4"> {/* Payment Limit */}
  {/* label */}
  <FormField control={form.control} name="label" render={({ field }) => (
        <FormItem className="col-span-2">
          <FormLabel>label</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Designation" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Date */}
      <FormField control={form.control} name="date" render={({ field }) => (
        <FormItem>
          <FormLabel>Date</FormLabel>
          <FormControl>
            <Input type="date" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* due_date */}
      <FormField control={form.control} name="due_date" render={({ field }) => (
        <FormItem>
          <FormLabel>Due Date</FormLabel>
          <FormControl>
            <Input type="date" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
 
</div>

       
<div className="flex flex-col space-y-5">
  {invoiceState.map((_, index) => (
    <div key={index} className="grid-cols-7 gap-5 grid">
      {/* Designation Field */}
      <FormField control={form.control} name={`tenant_other_details.${index}.designation`} render={({ field }) => (
        <FormItem>
          <FormLabel>Designation *</FormLabel>
          <FormControl>
            <Input {...field} placeholder="e.g. Service Charge" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Unit Price Field */}
      <FormField control={form.control} name={`tenant_other_details.${index}.unit_price`} render={({ field }) => (
        <FormItem>
          <FormLabel>Unit Price *</FormLabel>
          <FormControl>
            <Input type="number" {...field} placeholder="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Quantity Field */}
      <FormField control={form.control} name={`tenant_other_details.${index}.qty`} render={({ field }) => (
        <FormItem>
          <FormLabel>Quantity *</FormLabel>
          <FormControl>
            <Input type="number" {...field} placeholder="1" onChange={e => field.onChange(parseInt(e.target.value, 10))} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* VAT Field */}
      <FormField control={form.control} name={`tenant_other_details.${index}.vat`} render={({ field }) => (
        <FormItem>
          <FormLabel>VAT *</FormLabel>
          <FormControl>
            <Input type="number" {...field} placeholder="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Discount Field */}
      <FormField control={form.control} name={`tenant_other_details.${index}.discount`} render={({ field }) => (
        <FormItem>
          <FormLabel>Discount *</FormLabel>
          <FormControl>
            <Input type="number" {...field} placeholder="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Total Field */}
      <FormField control={form.control} name={`tenant_other_details.${index}.total`} render={({ field }) => (
        <FormItem>
          <FormLabel>Total *</FormLabel>
          <FormControl>
            <Input type="number" {...field} placeholder="0" disabled />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Remove Button */}
      <button type="button" className="bg-red-500 w-fit self-end text-white px-4 py-2 rounded-md" onClick={() => handleRemoveInvoice(index)}>
        Remove
      </button>
    </div>
  ))}

  {/* Button to Add New Invoice Item */}
  <button type="button" className="bg-secondary w-fit self-end text-white px-4 py-2 rounded-md" onClick={handleAddInvoice}>
    Add
  </button>
</div>
  {/* Summary Section */}
  <div className="bg-gray-100 p-4 mt-6 rounded-md">
        <div className="text-right text-gray-600 text-sm">
      
          <p>TOTAL HT : {0}</p>
          <p>TOTAL DISCOUNT : {0}</p>
          <p>TOTAL VAT : {0}</p>
        </div>
        <h2 className="text-blue-600 text-lg font-bold text-right mt-2">
          TOTAL : <span className="text-green-500">{0}</span>
        </h2>
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

export default OthersForm;
