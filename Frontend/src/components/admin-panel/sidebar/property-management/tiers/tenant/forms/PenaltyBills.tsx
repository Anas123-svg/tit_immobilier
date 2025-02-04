import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import useFetchData from "@/hooks/useFetchData";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

// Define validation schema
const PenaltyFormSchema = z.object({
  tenant_id: z.number().min(1, "Tenant ID is required"),
  contract_id: z.number().min(1, "Contract ID is required"),
  rent: z.number().min(0, "Penalty must be non-negative"),
  charge: z.number().min(0, "Charge must be non-negative"),
  total: z.number().min(0, "Total must be non-negative"),
  month: z.string().nonempty("Month is required"),
});

type PenaltyFormData = z.infer<typeof PenaltyFormSchema>;

const PenaltyBills = () => {
  const [open, setOpen] = useState(false);
  const [contracts, setContracts] = useState<any[]>([{id:1,name:"contract1"},{id:2,name:"contract2"}]);

  const form = useForm<PenaltyFormData>({
    resolver: zodResolver(PenaltyFormSchema),
  });

  const onSubmit = async (data: PenaltyFormData) => {
    const rentData = {
      tenant_id: data.tenant_id,
      contract_id: data.contract_id,
      rent: data.rent,
      charge: data.charge,
      total: data.total,
      month: data.month,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/tenant-penalty", rentData);
      console.log("Penalty Bill Added: ", response.data);
    } catch (err) {
      console.error("Error submitting rent bill:", err);
    }
  };
const Contract = form.watch("contract_id")
console.log(Contract)
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add Penalty Bill</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add Penalty Bill</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
          SELECT CONTRACT
</h2>
<div className="grid grid-cols-2 gap-5">
            {/* Tenant Field */}
            <FormField control={form.control} name="tenant_id" render={({ field }) => (
              <FormItem>
                <FormLabel>Tenant *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Tenant" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Tenant1">Tenant1</SelectItem>
                        <SelectItem value="Tenant2">Tenant2</SelectItem>
                        <SelectItem value="Tenant3">Tenant3</SelectItem>
                      </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Contract Field */}
            <FormField control={form.control} name="contract_id" render={({ field }) => (
              <FormItem>
                <FormLabel>Contract *</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Contract" />
                    </SelectTrigger>
                    <SelectContent>
                      {contracts.map((contract) => (
                        <SelectItem key={contract.id} value={contract.name}>
                          {contract.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
</div>
  {  Contract !==undefined
 &&
  <div className="">        {/* Penalty Field */}
            <FormField control={form.control} name="rent" render={({ field }) => (
              <FormItem>
                <FormLabel>Penalty</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Enter Penalty" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Charge Field */}
            <FormField control={form.control} name="charge" render={({ field }) => (
              <FormItem>
                <FormLabel>Charge</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Enter Charge" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Total Field */}
            <FormField control={form.control} name="total" render={({ field }) => (
              <FormItem>
                <FormLabel>Total</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="Enter Total" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Month Field */}
            <FormField control={form.control} name="month" render={({ field }) => (
              <FormItem>
                <FormLabel>Month</FormLabel>
                <FormControl>
                  <Input {...field} type="month" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
</div>
              }      {/* Submit Button */}
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PenaltyBills;
