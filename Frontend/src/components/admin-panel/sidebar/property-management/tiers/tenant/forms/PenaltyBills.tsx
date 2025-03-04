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

// Define validation schema
const PenaltyFormSchema = z.object({
  tenant_id: z.number().min(1, "Tenant ID is required"),
  contract_id: z.number().min(1, "Contract ID is required"),
  rent: z.number().optional(),
  charge: z.number().optional(),
  total: z.number().optional(),
  month: z.string().optional(),
});

type PenaltyFormData = z.infer<typeof PenaltyFormSchema>;

const PenaltyBills = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<PenaltyFormData>({
    resolver: zodResolver(PenaltyFormSchema),
  });


    const apiUrl = import.meta.env.VITE_API_URL + '/api/tenant-penalty';
          const onSubmit = useFormSubmit<typeof PenaltyFormSchema>(apiUrl);  // Use custom hook
          
const Contract = form.watch("contract_id")
const TenantId = form.watch("tenant_id")

console.log(Contract)
const { data:contract, loading, error } = useFetchData<Contract>(
`${import.meta.env.VITE_API_URL}/api/tenant-contract/${Contract?Contract:'0'}`
)
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add Penalty Bill</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add Penalty Bill</DialogTitle>
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
         CONTRACT DETAILS
       </h2>
       
       
       <div className="grid grid-cols-5 gap-4">
         <FormItem>
           <FormLabel>Locative</FormLabel>
           <FormControl>
             <Input type="text" placeholder="Locative Not Found" disabled />
           </FormControl>
           <FormMessage />
         </FormItem>
       
         <FormItem>
           <FormLabel>Cost of Rent</FormLabel>
           <FormControl>
             <Input type="number" placeholder="Rent Amount Not Found" disabled />
           </FormControl>
           <FormMessage />
         </FormItem>
       
         <FormItem>
           <FormLabel>Payment Deadline</FormLabel>
           <FormControl>
             <Input type="number" defaultValue={contract?.payment_limit} placeholder="Payment Deadline Not Found" disabled />
           </FormControl>
           <FormMessage />
         </FormItem>
       
         <FormItem>
           <FormLabel>Penalty for Late Payment %</FormLabel>
           <FormControl>
             <Input type="number" defaultValue={contract?.penalty_for_delay} placeholder="Penalty Percentage Not Found" disabled />
           </FormControl>
           <FormMessage />
         </FormItem>
       
         <FormItem>
           <FormLabel>Periodicity</FormLabel>
           <FormControl>
             <Input type="text" defaultValue={contract?.Frequency} placeholder="Periodicity Not Found" disabled />
           </FormControl>
           <FormMessage />
         </FormItem>
       </div>
       
       
         <div className="grid grid-cols-4 gap-4">        {/* Rent Field */}
       
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
                   <FormField control={form.control} name="rent" render={({ field }) => (
                     <FormItem>
                       <FormLabel>Rent</FormLabel>
                       <FormControl>
                         <Input  {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} disabled type="number" placeholder=" Rent" />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )} />
       
                   {/* Charge Field */}
                   <FormField control={form.control} name="charge" render={({ field }) => (
                     <FormItem>
                       <FormLabel>Charge</FormLabel>
                       <FormControl>
                         <Input {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} disabled type="number" placeholder=" Charge" />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )} />
       
               
       
                 
       
                       {/* Total Field */}
                       <FormField control={form.control} name="total" render={({ field }) => (
                     <FormItem>
                       <FormLabel>Total</FormLabel>
                       <FormControl>
                         <Input  {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} disabled type="number" placeholder=" Total" />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )} />
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

export default PenaltyBills;
