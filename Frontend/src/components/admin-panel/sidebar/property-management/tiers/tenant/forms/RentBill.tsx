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

// Define validation schema
const RentFormSchema = z.object({
  tenant_id: z.number().min(1, "Tenant ID is required"),
  contract_id: z.number().min(1, "Contract ID is required"),
  rent: z.number().min(0, "Rent must be non-negative"),
  charge: z.number().min(0, "Charge must be non-negative"),
  total: z.number().min(0, "Total must be non-negative"),
  month: z.string().nonempty("Month is required"),
});

type RentFormData = z.infer<typeof RentFormSchema>;

const RentBill = () => {
  const [open, setOpen] = useState(false);
  const [contracts, setContracts] = useState<any[]>([{id:1,name:"contract1"},{id:2,name:"contract2"}]);

  const form = useForm<RentFormData>({
    resolver: zodResolver(RentFormSchema),
  });


  
      const apiUrl = import.meta.env.VITE_API_URL + '/api/tenant-bill';
            const onSubmit = useFormSubmit<typeof RentFormSchema>(apiUrl);  // Use custom hook
          
const Contract = form.watch("contract_id")
console.log(Contract)
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add Rent Bill</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add Rent Bill</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
          SELECT CONTRACT
</h2>
<div className="grid grid-cols-2 gap-5">
            {/* Tenant Field */}

            <TenantCombobox name="tenant_id" control={form.control}/>
      
     <ContractCombobox name="contract_id" control={form.control} formState={form.formState}/>
                  
   
</div>
  {  Contract !==undefined
 &&
  <div className="">        {/* Rent Field */}
            <FormField control={form.control} name="rent" render={({ field }) => (
              <FormItem>
                <FormLabel>Rent</FormLabel>
                <FormControl>
                  <Input  {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} type="number" placeholder="Enter Rent" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Charge Field */}
            <FormField control={form.control} name="charge" render={({ field }) => (
              <FormItem>
                <FormLabel>Charge</FormLabel>
                <FormControl>
                  <Input {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))}  type="number" placeholder="Enter Charge" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Total Field */}
            <FormField control={form.control} name="total" render={({ field }) => (
              <FormItem>
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input  {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} type="number" placeholder="Enter Total" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Month Field */}
            <FormField control={form.control} name="month" render={({ field }) => (
              <FormItem>
                <FormLabel>Month</FormLabel>
                <FormControl>
                  <Input {...field} type="month" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
</div>
              }      {/* Submit Button */}
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RentBill;
