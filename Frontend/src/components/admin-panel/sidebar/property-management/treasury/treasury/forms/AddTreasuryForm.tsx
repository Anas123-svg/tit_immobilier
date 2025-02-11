import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,DialogDescription
} from "@/components/ui/dialog";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import useFetchData from "@/hooks/useFetchData";
import { Owner } from "@/types/DataProps";
import Selection from "@/components/common";
const FormSchema = z.object({
  manager_id: z.number(),
  cash_type: z.string().nonempty({ message: "Cash Type is required" }),
  label: z.string().nonempty({ message: "Label is required" }),
  account_no: z.string().optional(),
  minimum_threshold: z.number().min(1, { message: "Minimum Threshold is required" }),
  maximum_threshold: z.number().min(1, { message: "Maximum Threshold is required" }),
  comment: z.string().optional(),
  validator_assignment:  z.array(z.string()).min(1, "At least one owner must be selected"),
});

const AddTreasuryForm: React.FC = () => {
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
   
  });   
  
  
  
  const { data, loading, error } = useFetchData<Owner[]>(
    `${import.meta.env.VITE_API_URL}/api/get-all-owners`
  )
  const validators: string[] = data?.map((owner) => {
    return owner.is_business_owner 
      ? owner.business_company_name || ""  // Default to empty string if undefined
      : owner.private_name || "";           // Default to empty string if undefined
  }) || ["", ""];  // Default array in case data is empty or undefined
  
 const apiUrl = import.meta.env.VITE_API_URL + '/api/treasury/add';
     const onSubmit =  useFormSubmit<typeof FormSchema>(apiUrl); // Create if no client
 
  const [open, setOpen] = useState(false);

    const CashType = form.watch("cash_type")
  return (   <Dialog open={open} onOpenChange={() => setOpen(!open)}>
    <DialogTrigger className="px-4 py-2 text-white rounded-md bg-red-500"> Add Treasry</DialogTrigger>

      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
          Add a business Client
        </DialogTitle>
        <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">CASH INFORMATION</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cash Type */}
        <FormField control={form.control} name="cash_type" render={({ field }) => (
          <FormItem>
            <FormLabel>Cash Type</FormLabel>
            <Select {...field}  onValueChange={field.onChange}>   
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select Cash Type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="BOX">BOX</SelectItem>
                <SelectItem value="BANK">BANK</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        {/* Label */}
        <FormField control={form.control} name="label" render={({ field }) => (
          <FormItem>
            <FormLabel>Label</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Label" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Account Number */}
    { CashType ==="BANK" &&  <FormField control={form.control} name="account_no" render={({ field }) => (
          <FormItem>
            <FormLabel>Account No.</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Account Number" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
      }
        {/* Minimum Threshold */}
        <FormField control={form.control} name="minimum_threshold" render={({ field }) => (
          <FormItem>
            <FormLabel>Minimum Threshold</FormLabel>
            <FormControl>
              <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))}   placeholder="Minimum Threshold" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Maximum Threshold */}
        <FormField control={form.control} name="maximum_threshold" render={({ field }) => (
          <FormItem>
            <FormLabel>Maximum Threshold</FormLabel>
            <FormControl>
              <Input  type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))}  placeholder="Maximum Threshold" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

      <OwnerCombobox control={form.control} name="manager_id" />
      </div>
  {/* Comment */}
  <FormField control={form.control} name="comment" render={({ field }) => (
          <FormItem
          >
            <FormLabel>Comment</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Comment" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

           {/* Validators Selection */}
           <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                ASSIGN VALIDATORS
              </h2>
              <Selection
                list={validators}
                selectedList={form.watch("validator_assignment") || []}
                onChange={(selected) => {
                  form.setValue("validator_assignment", selected);
                }}
              />
      <Button type="submit" className="w-full mt-4 bg-primary" >
    Submit
      </Button>
    </form>     </Form>  </DialogContent>
    </Dialog>
  );
};

export default AddTreasuryForm;
