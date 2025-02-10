import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { boolean, z } from "zod";
  import { Button } from "@/components/ui/button";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { useState } from "react";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
const FormSchema = z.object({
  owner_id: z.number().min(1, "Owner ID is required"), // Ensure that owner_id is a positive number
  type_of_mandate: z.string().min(1, "Type of Mandate is required"), // Ensure type_of_mandate is not empty
  debut_dates: z.string().min(1, "Debut Dates are required"), // Ensure debut dates are provided
  end_date: z.string().min(1, "End Date is required"), // Ensure end date is provided
  commission: z.number().min(0, "Commission must be a positive number"), // Ensure commission is a positive number
  tax_on_charge: z.number().min(0, "Tax on charge must be a positive number"), // Ensure tax is a positive number
  deduct_commission: z.string().min(1, "Deduct commission option is required"), // Ensure deduct commission is selected
  date_of_operation:z.string().min(1, "Deduct commission option is required"), // Ensure deduct commission is selected
  billing_type:z.string().min(1, "Deduct commission option is required"),
});
  
  const RenewMandateOwnerForm = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
   
    });
  
   
     const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-mandate';
     const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
   
  
    return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>Renew a Mandate</DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">Renew a Mandate</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           {/* Property Details Section */}
<h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
DETAILS ABOUT THE PROPERTY
</h2>
<div className="grid grid-cols-2 gap-5">
  <OwnerCombobox name="owner_id" control={form.control}/>

  <FormField
    control={form.control}
    name="type_of_mandate"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Type of Mandate *</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Mandate Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Exclusive">Exclusive</SelectItem>
              <SelectItem value="Non-Exclusive">Non-Exclusive</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>
<h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
DETAILS ABOUT THE PROPERTY
</h2>
<div className="grid grid-cols-3 gap-5">
  {/* Type of Mandate Field */}
  <FormField control={form.control} name="type_of_mandate" render={({ field }) => (
    <FormItem>
      <FormLabel>Type of Mandate</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select mandate type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="LOCATION">LOCATION</SelectItem>
          <SelectItem value="SALE">SALE</SelectItem>
          {/* Add other mandate types as needed */}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />

  {/* Debut Dates Field */}
  <FormField control={form.control} name="debut_dates" render={({ field }) => (
    <FormItem>
      <FormLabel>Debut Dates</FormLabel>
      <FormControl>
        <Input {...field} type="date" placeholder="Select debut date" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* End Date Field */}
  <FormField control={form.control} name="end_date" render={({ field }) => (
    <FormItem>
      <FormLabel>End Date</FormLabel>
      <FormControl>
        <Input {...field} type="date" placeholder="Select end date" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />


  <FormField control={form.control} name="commission" render={({ field }) => (
    <FormItem>
      <FormLabel>Commission (%)</FormLabel>
      <FormControl>
        <Input {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))}  type="number" placeholder="Enter commission" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Tax on Charge Field */}
  <FormField control={form.control} name="tax_on_charge" render={({ field }) => (
    <FormItem>
      <FormLabel>Tax on Charge</FormLabel>
      <FormControl>
        <Input {...field} placeholder="Enter tax charge" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Deduct Commission Field */}
  <FormField control={form.control} name="deduct_commission" render={({ field }) => (
    <FormItem>
      <FormLabel>Deduct Commission</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select deduction" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="LOYERS">LOYERS</SelectItem>
          <SelectItem value="OTHERS">OTHERS</SelectItem>
          {/* Add more deduction options as needed */}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />
</div>
<h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
RENEWAL DETAILS
</h2>

<div className="grid grid-cols-3 gap-5">
  {/* Date of operation */}
  <FormField control={form.control} name="date_of_operation" render={({ field }) => (
    <FormItem>
      <FormLabel>Date of operation *</FormLabel>
      <FormControl>
        <Input {...field} type="date" placeholder="mm/dd/yyyy" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Debut Dates */}
  <FormField control={form.control} name="debut_dates" render={({ field }) => (
    <FormItem>
      <FormLabel>Debut dates *</FormLabel>
      <FormControl>
        <Input {...field} type="date" placeholder="mm/dd/yyyy" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* End Date */}
  <FormField control={form.control} name="end_date" render={({ field }) => (
    <FormItem>
      <FormLabel>End date *</FormLabel>
      <FormControl>
        <Input {...field} type="date" placeholder="mm/dd/yyyy" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />
</div>

<div className="grid grid-cols-3 gap-5">
  {/* Commission (%) */}
  <FormField control={form.control} name="commission" render={({ field }) => (
    <FormItem>
      <FormLabel>Commission (%) *</FormLabel>
      <FormControl>
        <Input { ...field} onChange={(e)=>field.onChange(parseInt(e.target.value))}  type="number" placeholder="0" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Tax on charge */}
  <FormField control={form.control} name="tax_on_charge" render={({ field }) => (
    <FormItem>
      <FormLabel>Tax on charge *</FormLabel>
      <FormControl>
        <Input {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))}  type="number" placeholder="0" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Billing Type */}
  <FormField control={form.control} name="billing_type" render={({ field }) => (
    <FormItem>
      <FormLabel>Billing Type *</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select Billing Type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="PAYMENT PERCENTAGE">PAYMENT PERCENTAGE</SelectItem>
          <SelectItem value="FLAT RATE">FLAT RATE</SelectItem>
          {/* Add other billing types as needed */}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />
</div>

<div className="grid grid-cols-3 gap-5">
  {/* Deduct Commission */}
  <FormField control={form.control} name="deduct_commission" render={({ field }) => (
    <FormItem>
      <FormLabel>Deduct commission</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select Deduct Commission" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="LOYERS">LOYERS</SelectItem>
          <SelectItem value="OTHERS">OTHERS</SelectItem>
          {/* Add other options as needed */}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />
</div>

              <Button type="submit" className="w-full my-2 bg-primary">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default RenewMandateOwnerForm;
  