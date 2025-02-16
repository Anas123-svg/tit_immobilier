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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import InvoiceOptionsForm from "./InvoiceOptionsForm";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
import { OwnerSalePropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerSalePropertyCombobox";
import { OwnerRentPropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerRentPropertyCombobox";

// Define validation schema
const FormSchema = z.object({
  owner_id: z.number().min(1, "Owner ID is required"),
  tenant_id: z.number().min(1, "Tenant ID is required"),
  concerned: z.number().optional(),
  location: z.number().optional(),
  billing_type: z.string().optional(),
  booking_date: z.string().optional(),
  entry_date: z.string().optional(),
  end_date: z.string().optional(),
  due_date: z.string().optional(),
  number_of_hours: z.number().optional(),
  rental_amount: z.number().optional(),
});

const ShortTermContractTenantForm = () => {
  const [open, setOpen] = useState(false);

  // Initialize Form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {

    },
  });

const apiUrl = import.meta.env.VITE_API_URL + "/api/tenant-short-term-contract ";
  const onSubmit =  useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
  const Ownerid = form.watch("owner_id")

  

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add a Short Contract</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add a Contract</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Contract Details Section */}
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              SHORT-TERM CONTRACT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           
             <TenantCombobox name="tenant_id" control={form.control}/>
            <OwnerCombobox name="owner_id" control={form.control}/>
           
           

              <OwnerSalePropertyCombobox name="concerned" control={form.control} id={Ownerid} formState={form.formState}/>
              <OwnerRentPropertyCombobox name="location" control={form.control} id={Ownerid} formState={form.formState}/>
              
              

              {/* Billing Type Field */}
              <FormField
                control={form.control}
                name="billing_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Type *</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Hourly">HOURLY</SelectItem>
                        <SelectItem value="Daily">DAILY</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Booking Date Field */}
              <FormField
                control={form.control}
                name="booking_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Entry Date Field */}
              <FormField
                control={form.control}
                name="entry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Date Field */}
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Due Date Field */}
              <FormField
                control={form.control}
                name="due_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Number of Hours Field */}
              <FormField
                control={form.control}
                name="number_of_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Hours</FormLabel>
                    <FormControl>
                      <Input type="number"  {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rental Amount Field */}
              <FormField
                control={form.control}
                name="rental_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rental Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <InvoiceOptionsForm/>
            <Button type="submit" className="w-full mt-4 bg-primary">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ShortTermContractTenantForm;
