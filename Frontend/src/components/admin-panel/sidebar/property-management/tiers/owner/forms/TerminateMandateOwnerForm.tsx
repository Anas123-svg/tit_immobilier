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
    owner_id: z.number().optional(),
    type_of_mandate: z.string().nonempty("Type of Mandate is required"),
  });
  
  const TerminateMandateOwnerForm = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),

    });
  
   
     const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-mandate';
     const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
   
  
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
  