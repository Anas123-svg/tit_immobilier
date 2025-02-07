import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import axios from 'axios';
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
import { ClientCombobox } from "@/components/admin-panel/UI-components/Combobox/ClientCombobox";
const FormSchema = z.object({
  owner_id: z.number().optional(),
  property_type: z.string().optional(),
  owner_name: z.string().optional(),
  client: z.string().optional(),
  client_id: z.number().optional(),
  case: z.string().optional(),
});

const ReversalPropertyForSaleOwnerForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
  
      property_type: "Property for Sale",
      owner_name: "asd",
      client: "4",
      case: " ",
    },
  });


  const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-reversal-sale-property';  // Adjust URL as necessary
  const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl,form.reset);  // Use custom hook

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add a Reversal Property for Sale</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
        Add a Reversal Property for Sale
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Property Details Section */}
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              PROPERTY DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

              <FormField
                control={form.control}
                name="property_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <FormControl>
                      <Input {...field}  placeholder="Enter Property Type" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <OwnerCombobox name="owner_id" control={form.control}/>

          <ClientCombobox name="client_id" control={form.control}/>
             
              <FormField
                control={form.control}
                name="case"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case</FormLabel>
                    <FormControl>
                      <Input {...field}  placeholder="" />
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

export default ReversalPropertyForSaleOwnerForm;
