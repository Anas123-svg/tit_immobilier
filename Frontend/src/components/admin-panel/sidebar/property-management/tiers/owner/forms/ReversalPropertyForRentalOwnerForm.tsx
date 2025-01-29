import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
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
import { useFormSubmit } from "@/hooks/useFormSubmit";

// Define validation schema
const FormSchema = z.object({
  owner_id: z.number().min(1, "Owner ID is required"),
  good: z.string().nonempty("Property Name is required"),
  filter_by: z.string().nonempty("Filter By is required"),
  date_debut: z.string().nonempty("Start Date is required"),
  end_date: z.string().nonempty("End Date is required"),
  comments: z.string().nonempty("Comments are required"),
});

const ReversalPropertyForRentalOwnerForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      owner_id: 1,
      good: "Apartment 101",
      filter_by: "City",
      date_debut: "2025-01-01",
      end_date: "2025-12-31",
      comments: "Rental reversal initiated.",
    },
  });
  
const apiUrl = import.meta.env.VITE_API_URL + "/api/owner-reversal-rental-property ";
  const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add a Reversal Rental Property</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[800px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
          Reversal Rental Property
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Property Details Section */}
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              PROPERTY DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="owner_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner ID</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} placeholder="Enter Owner ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="good"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Property Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="filter_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filter By</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Filter Type" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date_debut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} placeholder="Select Start Date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} placeholder="Select End Date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem className="col-span-4">
                    <FormLabel>Comments</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Comments" />
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

export default ReversalPropertyForRentalOwnerForm;
