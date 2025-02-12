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
import useFetchData from "@/hooks/useFetchData";
import { useFormUpdate } from "@/hooks/useFormUpdate";
import { Mandate } from "@/types/DataProps";
import { OwnerMandatesCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerMandatesCombobox";
import { useDeleteData } from "@/hooks/useDeleteData";
  const FormSchema = z.object({
    owner_id: z.number().min(1, "Owner ID is required"), // Ensure that owner_id is a positive number
    type_of_mandate: z.string().optional(), // Ensure type_of_mandate is not empty
   
  get_commission: z.number().optional(), // Ensure commission is a positive number
   
    mandate_for_property:z.number(),
    created_at:z.string().optional(),
    termination_date:z.string().optional(),
    neighborhood: z.string().optional(),
  });
  
  const TerminateMandateOwnerForm = () => {
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
    const { onDelete, loading: deleteLoading } = useDeleteData();
     const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-mandate';
     const onSubmit = async () => {
      await onDelete(apiUrl, MandateType);
    
    };  // Use custom hook
    const OwnerId = form.watch("owner_id")
  
  
    return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>Terminate a Mandate</DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">Terminate a Mandate</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           {/* Property Details Section */}
<h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
DETAILS ABOUT THE PROPERTY
</h2>
<div className="grid grid-cols-2 gap-5">
  <OwnerCombobox name="owner_id" control={form.control}/>

  
    <OwnerMandatesCombobox name="mandate_for_property" control={form.control} id={OwnerId} formState={form.formState} />
</div>
{MandateType&&
<div className="">
<h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
  DETAILS ABOUT THE PROPERTY
</h2>

<div className="grid grid-cols-3 gap-5">
<FormField control={form.control} name="termination_date" render={({ field }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600">Termination Date</label>
    <FormControl>
      <Input 
        type="date" 
        {...field} 
        value={field.value || "2025-02-14"} // Fallback to a default date value if no value is set
 
      />
    </FormControl>
    <FormMessage />
  </div>
)} />

<FormField control={form.control} name="created_at" render={({ field }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600">Mandate Date</label>
    <FormControl>
      <Input 
        type="date" 
        {...field} 
        value={field.value || mandate?.date_of_signature} 
        disabled 
        className="bg-gray-200 p-2 rounded"
      />
    </FormControl>
    <FormMessage />
  </div>
)} />

<FormField control={form.control} name="type_of_mandate" render={({ field }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600">Type of Mandate</label>
    <FormControl>
      <Input 
        type="text" 
        {...field} 
        value={field.value || mandate?.type_of_mandate} 
        disabled 
        className="bg-gray-200 p-2 rounded"
      />
    </FormControl>
    <FormMessage />
  </div>
)} />

<FormField control={form.control} name="get_commission" render={({ field }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600">Commission (%)</label>
    <FormControl>
      <Input 
        type="number" 
        {...field} 
        value={field.value || mandate?.commission} 
        disabled 
        className="bg-gray-200 p-2 rounded"
      />
    </FormControl>
    <FormMessage />
  </div>
)} />

{/* <FormField control={form.control} name="get_commission" render={({ field }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600">Commission Amount</label>
    <FormControl>
      <Input 
        type="number" 
        {...field} 
        value={field.value || "180120"} // Default commission amount
        disabled 
        className="bg-gray-200 p-2 rounded"
      />
    </FormControl>
    <FormMessage />
  </div>
)} /> */}

<FormField control={form.control} name="neighborhood" render={({ field }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-600">Name of Property</label>
    <FormControl>
      <Input 
        type="text" 
        {...field} 
        value={field.value || mandate?.neighborhood} 
        disabled 
        className="bg-gray-200 p-2 rounded"
      />
    </FormControl>
    <FormMessage />
  </div>
)} />

</div></div>
}
              <Button type="submit" className="w-full my-2 bg-primary">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default TerminateMandateOwnerForm;
  