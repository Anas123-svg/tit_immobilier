import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,DialogDescription
  } from "@/components/ui/dialog";
import { TreasuryCombobox } from "@/components/admin-panel/UI-components/Combobox/TreasuryCombobox";
const FormSchema = z.object({
  treasury_id: z.number(),
  account_to_be_funded: z.string().nonempty({ message: "Account to be funded is required" }),
  label: z.string().nonempty({ message: "Label is required" }),
  date: z.string().nonempty({ message: "Date is required" }),
  mode: z.string().nonempty({ message: "Mode is required" }),
  external_type_owner: z.string().nonempty({ message: "External type owner is required" }),
  source_of_income: z.string().nonempty({ message: "Source of income is required" }),
  done_by: z.string().nonempty({ message: "Done by is required" }),
  tiers: z.string().nonempty({ message: "Tiers is required" }),
  bank: z.string().optional(),
  cheque: z.string().optional(),
  account_no: z.string().optional(),
  amount: z.number().min(0, { message: "Amount must be greater than 0" }),
  documents: z.array(
    z.object({
      document_name: z.string(),
      document_url: z.string(),
    })
  ).optional(),
});

const SupplyTreasuryForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
 const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      treasury_id: 1,
      account_to_be_funded: "",
      label: "",
      date: "",
      mode: "",
      external_type_owner: "",
      source_of_income: "",
      done_by: "",
      tiers: "",
      amount: 0,
      documents: [],
    },
  });

  const onSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      // Handle form submission logic here, for example API call
      console.log("Submitted Values:", values);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const [open, setOpen] = useState(false);
  return ( <Dialog open={open} onOpenChange={() => setOpen(!open)}>
  <DialogTrigger className="px-4 py-2 text-white rounded-md bg-green-500">Supply</DialogTrigger>

    <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
      <DialogTitle className="text-lg md:text-xl">
        Add a business Client
      </DialogTitle>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Supply Information Section */}
        <h2 className="bg-green-500 text-white text-center p-2">SUPPLY INFORMATION</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Account to be Funded */}
          <FormField
            control={form.control}
            name="account_to_be_funded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account to be funded</FormLabel>
                <FormControl>
                  <Select {...field}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="outer">Outer</SelectItem>
                      <SelectItem value="internal">Internal</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Label */}
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Label" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Cash Information Section */}
        <h2 className="bg-green-500 text-white text-center p-2">RECEIVING CASH INFORMATION</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Treasury */}

          <TreasuryCombobox name="treasury_id" control={form.control}/>
          


          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Amount" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-4 bg-green-500" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form></DialogContent>
    </Dialog>
  );
};

export default SupplyTreasuryForm;
