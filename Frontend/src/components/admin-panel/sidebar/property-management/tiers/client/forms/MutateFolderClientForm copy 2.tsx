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
import { OwnerMandatesCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerMandatesCombobox";
import { useDeleteData } from "@/hooks/useDeleteData";
import { ClientCombobox } from "@/components/admin-panel/UI-components/Combobox/ClientCombobox";

const FormSchema = z.object({
  client_id: z.number().min(1, "Client ID is required"), // Ensure client_id is provided
  case_id: z.number().min(1, "Case ID is required"), // Ensure case_id is provided
  amount: z.number().min(0, "Amount must be a positive number").optional(),
  modality: z.string().optional(),
  file_details: z.string().optional(),
});

const MutateFolderClientForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      modality: "",
    },
  });
  const apiUrl = import.meta.env.VITE_API_URL + '/api/clients';

  const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);
  const { data: cases, error } = useFetchData("/api/cases"); // Sample API for case data
  const { onDelete, loading: deleteLoading } = useDeleteData();

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add a new mutation</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">Add a New Mutation</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Client and Case Section */}
            <h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
            FILES DETAILS
            </h2>
            <div className="grid grid-cols-4 gap-5">
            <ClientCombobox name="client_id" control={form.control} />
           
                 <FormField
                control={form.control}
                name="case_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Case " />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                 <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="modality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modality</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Modality" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          
            <div className="flex justify-end">
              {/* <Button type="button" onClick={() => setOpen(false)} variant="outline">
                Close
              </Button> */}
              <Button type="submit" className="bg-primary">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MutateFolderClientForm;
