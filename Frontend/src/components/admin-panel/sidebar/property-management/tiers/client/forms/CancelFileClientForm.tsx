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
import { ClientCombobox } from "@/components/admin-panel/UI-components/Combobox/ClientCombobox";
import useFetchData from "@/hooks/useFetchData";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { useDeleteData } from "@/hooks/useDeleteData";

const FormSchema = z.object({
  client_id: z.number().min(1, "Client ID is required"), // Ensure client_id is provided
  case_id: z.number().min(1, "Case ID is required"), // Ensure case_id is provided
  date: z.string().min(1, "Date is required"), // Ensure date is provided
  penalty: z.number().min(0, "Penalty must be a valid percentage").optional(),
});

const CancelFileClientForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      penalty: 0,
    },
  });

  const apiUrl = import.meta.env.VITE_API_URL + "/api/clients";
  const { data: cases, error } = useFetchData("/api/cases"); // Sample API for case data
  const onSubmit= useFormSubmit<typeof FormSchema>(apiUrl);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Cancel a file</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">Add a New Termination</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Client and Case Section */}
            <h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
              FILE DETAILS
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
                      <Input {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} placeholder="Select Case" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" placeholder="MM/DD/YYYY" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="penalty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penalty to be deducted (%)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter penalty"
                        min="0"
                        onChange={(e)=>field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="outline"
                className="text-gray-600"
              >
                Close
              </Button>
              <Button
                type="submit"
                className="bg-primary"
              disabled={form.formState.isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CancelFileClientForm;
