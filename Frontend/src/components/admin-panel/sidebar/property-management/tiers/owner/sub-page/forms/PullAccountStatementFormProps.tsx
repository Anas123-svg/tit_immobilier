import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define schema for form validation using Zod
const FormSchema = z.object({
  very_concerned: z.string().nonempty("Property is required"),
  date_debut: z.string().nonempty("Date debut is required"),
  date_end: z.string().nonempty("End date is required"),
});

interface PullAccountStatementFormProps {
  open: boolean;
  onClose: () => void;
}

const PullAccountStatementForm: React.FC<PullAccountStatementFormProps> = ({
  open,
  onClose,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      very_concerned: "",
      date_debut: "",
      date_end: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Form Data: ", data);
    // You can send the data to the API here or any other logic
  };

  return (
    <div>
      {/* Dialog Component */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[800px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">Pull the Owner's Account Statement</DialogTitle>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Select Property Section */}
              <h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
                SELECT PERIOD
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="very_concerned"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Very Concerned</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Select a property" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date Debut */}
                <FormField
                  control={form.control}
                  name="date_debut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Debut</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" placeholder="MM/DD/YYYY" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Date */}
                <FormField
                  control={form.control}
                  name="date_end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" placeholder="MM/DD/YYYY" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Transactions Section */}
              <h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
                TRANSACTIONS
              </h2>
              <div className="border-b border-gray-300 pb-4">
                {/* Placeholder for transactions data, can be implemented */}
                <p className="text-center text-gray-500">Transactions will appear here</p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center space-x-4">
                <Button type="submit" className="bg-primary w-32">
                  Submit
                </Button>
                <Button type="button" onClick={onClose} className="bg-gray-400 w-32">
                  Close
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PullAccountStatementForm;
