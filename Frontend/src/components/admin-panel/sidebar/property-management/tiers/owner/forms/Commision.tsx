import * as React from "react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
const FormSchema = z.object({
  commission_type: z.string().min(1, "Commission type is required"),
  owner: z.string().optional(),
  goods: z.string().min(1, "Goods is required"),
  start_date: z.date(),
  end_date: z.date(),
  commission_percentage: z.number().min(0, "Commission percentage is required"),
  tax_on_charge: z.number().min(0, "Tax on charge is required"),
});

export function CommissionForm() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const [commissionType, setCommissionType] = useState("ALL"); // Default to All
  const [ownerRequired, setOwnerRequired] = useState(false);

  const handleTypeChange = (value: string) => {
    setCommissionType(value);
    setOwnerRequired(value === "INDIVIDUAL");
  };

  const onSubmit = (data: any) => {
    console.log("Form Submitted: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-5">
        {/* Commission Type */}
        <FormField control={control} name="commission_type" render={({ field }) => (
          <FormItem>
            <FormLabel>Type of Commission</FormLabel>
            <Select onValueChange={(value) => { field.onChange(value); handleTypeChange(value); }}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select commission type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="ALL">All commissions</SelectItem>
                <SelectItem value="INDIVIDUAL">Individual</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        {/* Owner */}
        {ownerRequired && (
          <FormField control={control} name="owner" render={({ field }) => (
            <FormItem>
              <FormLabel>Owner *</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an owner" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="owner1">Owner 1</SelectItem>
                  <SelectItem value="owner2">Owner 2</SelectItem>
                  {/* Add more owner options */}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        )}

        {/* Goods */}
        <FormField control={control} name="goods" render={({ field }) => (
          <FormItem>
            <FormLabel>Goods *</FormLabel>
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select goods" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="ALL_GOODS">All goods</SelectItem>
                <SelectItem value="SPECIFIC_GOODS">Specific goods</SelectItem>
                {/* Add more goods options */}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )} />

        {/* Start Date */}
        <FormField control={control} name="start_date" render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} placeholder="mm/dd/yyyy" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* End Date */}
        <FormField control={control} name="end_date" render={({ field }) => (
          <FormItem>
            <FormLabel>End Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} placeholder="mm/dd/yyyy" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Commission Percentage */}
        <FormField control={control} name="commission_percentage" render={({ field }) => (
          <FormItem>
            <FormLabel>Commission (%)</FormLabel>
            <FormControl>
              <Input {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))}  type="number" placeholder="Enter commission" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Tax on Charge */}
        <FormField control={control} name="tax_on_charge" render={({ field }) => (
          <FormItem>
            <FormLabel>Tax on charge</FormLabel>
            <FormControl>
              <Input {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))}  type="number" placeholder="Enter tax on charge" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Filter Button */}
        <div className="col-span-2">
          <Button type="submit" className="w-full">Filter</Button>
        </div>
      </div>
    </form>
  );
}
