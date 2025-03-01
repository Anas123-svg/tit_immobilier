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
  
  const FormSchema = z.object({
    client_id: z.number().min(1, "Client ID is required"), // Ensure client_id is provided
    invoice_type: z.string().min(1, "Invoice type is required"), // Ensure invoice_type is provided
    case_id: z.number().min(1, "Case ID is required"), // Ensure case_id is provided
  });
  
  const RecordAPaymentClientForm = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        invoice_type: "",
      },
    });
  
    const { data: cases, error } = useFetchData("/api/cases"); // Sample API for case data
    const onSubmit = useFormSubmit<typeof FormSchema>("/api/payments");
  
    return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>Record a payment</DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">Record a Payment</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Customer Selection Section */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                CUSTOMER SELECTION
              </h2>
              <div className="grid grid-cols-3 gap-5">
                <ClientCombobox name="client_id" control={form.control} />
  
                <FormField
                  control={form.control}
                  name="invoice_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type facture *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Select an invoice type" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="case_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Case *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          placeholder="Select a folder"
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
  
  export default RecordAPaymentClientForm;
  