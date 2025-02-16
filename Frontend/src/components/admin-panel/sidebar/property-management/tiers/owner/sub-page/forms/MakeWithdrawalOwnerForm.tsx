import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Button component
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define form schema using Zod for validation
const FormSchema = z.object({
  owner_name: z.string().optional(),
  date_of_operation: z.string().optional(),
  amount: z.number().optional(),
  property: z.string().optional(),
  treasury: z.string().optional(),
  payment_method: z.string().optional(),
  done_by: z.string().optional(),
  additional_documents: z.string().optional(),
});

interface MakeWithdrawalOwnerFormProps {
  open: boolean; // Controlled by parent to show/hide dialog
  onClose: () => void; // Function to close the dialog
}

const MakeWithdrawalOwnerForm: React.FC<MakeWithdrawalOwnerFormProps> = ({
  open,
  onClose,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      owner_name: "",
      date_of_operation: "",
      amount: 0,
      property: "",
      treasury: "",
      payment_method: "",
      done_by: "",
      additional_documents: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("Form Data: ", data);
    // Here you can make your API request to submit the form
  };

  return (
    <div>
      {/* Dialog Component */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[800px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">Make a Withdrawal</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Withdrawal Information Section */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                WITHDRAWAL INFORMATION
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Owner Name */}
                <FormField
                  control={form.control}
                  name="owner_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Owner Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Operation */}
                <FormField
                  control={form.control}
                  name="date_of_operation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Operation</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Amount */}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Enter Amount" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Property */}
                <FormField
                  control={form.control}
                  name="property"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Property" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Treasury */}
                <FormField
                  control={form.control}
                  name="treasury"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Treasury</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Treasury" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Payment Method Section */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                PAYMENT METHOD
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Payment Method */}
                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Payment Method" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Done By */}
                <FormField
                  control={form.control}
                  name="done_by"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Done By</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Done By" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Additional Documents Section */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                SOME ADDITIONAL DOCUMENTS
              </h2>
              <FormField
                control={form.control}
                name="additional_documents"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parts and documents to be attached</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Add files" type="file" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full my-2 bg-primary">
                Save
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MakeWithdrawalOwnerForm;
