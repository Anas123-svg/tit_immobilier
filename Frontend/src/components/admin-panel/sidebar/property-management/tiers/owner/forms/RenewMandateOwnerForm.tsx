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
  import { useEffect, useState } from "react";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
import { OwnerMandatesCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerMandatesCombobox";
import { Mandate } from "@/types/DataProps";
import useFetchData from "@/hooks/useFetchData";
import { useFormUpdate } from "@/hooks/useFormUpdate";
const FormSchema = z.object({
  owner_id: z.number().min(1, "Owner ID is required"), // Ensure that owner_id is a positive number
  type_of_mandate: z.string().optional(), // Ensure type_of_mandate is not empty
  debut_dates: z.string().optional(), // Ensure debut dates are provided
  end_date: z.string().optional(), // Ensure end date is provided
  commission: z.number().optional(), // Ensure commission is a positive number
  tax_on_charge: z.number().optional(), // Ensure tax is a positive number
  deduct_commission: z.string().optional(), // Ensure type_of_mandate is not empty
  get_debut_dates: z.string().optional(),
  get_end_date: z.string().optional(), // Ensure end date is provided
  get_commission: z.number().optional(), // Ensure commission is a positive number
  get_tax_on_charge: z.number().optional(), // Ensure tax is a positive number
  get_deduct_commission: z.string().optional(), // Ensure deduct commission is selected
  date_of_operation: z.string().optional(), // Ensure date_of_operation is provided
  mandate_for_property: z.number().optional(), // Ensure mandate_for_property is provided
  billing_type: z.string().optional(), // Ensure billing_type is provided
});
  
  const RenewMandateOwnerForm = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues:{

        type_of_mandate:"Location"
      }
    });  const MandateType = form.watch("mandate_for_property")
    const { data:mandate, loading, error } = useFetchData<Mandate>(
      `${import.meta.env.VITE_API_URL}/api/owner-mandate/${MandateType}`
    );
   
     const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-mandate';
     const onSubmit = useFormUpdate<typeof FormSchema>(apiUrl,mandate?.id);  // Use custom hook
    const OwnerId = form.watch("owner_id")
  
   
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
  
<OwnerMandatesCombobox name="mandate_for_property" control={form.control} formState={form.formState} id={OwnerId}/>
</div>
{MandateType &&
<div className="space-y-6">
<h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
DETAILS ABOUT THE PROPERTY
</h2>
<div className="grid grid-cols-3 gap-5">
  {/* Type of Mandate Field */}
  <FormField
  control={form.control}
  name="type_of_mandate"
  render={({ field }) => {
    // Use useEffect to update the field value when mandate data changes
    useEffect(() => {
      if (mandate?.type_of_mandate) {
        field.onChange(mandate.type_of_mandate); // Update the form field value with the fetched mandate data
      }
    }, [mandate, field]); // Dependencies: effect runs when mandate or field changes

    return (
      <FormItem>
        <FormLabel>Type of Mandate</FormLabel>
        <Input
          type="text"
          disabled // Keep the input disabled as per your requirement
          {...field} // Spread the React Hook Form field props
          value={field.value || mandate?.type_of_mandate || ''} // Use form value or fetched mandate value
          className="bg-gray-200"
        />
        <FormMessage />
      </FormItem>
    );
  }}
/>


{/* Debut Dates Field */}
<FormField
  control={form.control}
  name="get_debut_dates"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Debut Dates</FormLabel>
      <FormControl>
        <Input
          {...field}
          disabled
            className="bg-gray-200"
          type="date"
          placeholder="Select debut date"
          defaultValue={mandate?.debut_date || ''} // Default to fetched debut date or empty string
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* End Date Field */}
<FormField
  control={form.control}
  name="get_end_date"
  render={({ field }) => (
    <FormItem>
      <FormLabel>End Date</FormLabel>
      <FormControl>
        <Input
          {...field}
          type="date"
          disabled  className="bg-gray-200"
          placeholder="Select end date"
          defaultValue={mandate?.end_date || ''} // Default to fetched end date or empty string
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Commission Field */}
<FormField
  control={form.control}
  name="get_commission"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Commission (%)</FormLabel>
      <FormControl>
      <Input
          {...field}
          disabled  className="bg-gray-200"
          placeholder="Enter tax charge"
          defaultValue={mandate?.commission || ''} // Default to fetched tax or empty string
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Tax on Charge Field */}
<FormField
  control={form.control}
  name="get_tax_on_charge"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Tax on Charge</FormLabel>
      <FormControl>
        <Input
          {...field}
          disabled  className="bg-gray-200"
          placeholder="Enter tax charge"
          defaultValue={mandate?.commission || ''} // Default to fetched tax or empty string
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

{/* Deduct Commission Field */}
<FormField
  control={form.control}
  name="get_deduct_commission"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Deduct Commission</FormLabel>
      <Input
          {...field}
          disabled  className="bg-gray-200"
          placeholder="Enter tax charge"
          value={mandate?.deduct_commission &&"LOYERS" || field.value || ''} // Default to fetched tax or empty string
        />
      <FormMessage />
    </FormItem>
  )}
/>

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
</div>
        }      <Button type="submit" className="w-full my-2 bg-primary">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default RenewMandateOwnerForm;
  