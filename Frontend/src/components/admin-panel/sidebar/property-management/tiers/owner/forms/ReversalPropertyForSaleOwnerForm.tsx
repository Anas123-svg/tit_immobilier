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

const FormSchema = z.object({
  owner_id: z.number().min(1, "Owner ID is required"),
  property_type: z.string().nonempty("Property Type is required"),
  owner_name: z.string().nonempty("Owner Name is required"),
  client: z.string().nonempty("Client Name is required"),
  case: z.string().nonempty("Case is required"),
});

const ReversalPropertyForSaleOwnerForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      owner_id: 1,
      property_type: "Commercial",
      owner_name: "John Doe",
      client: "Jane Smith",
      case: "Reversal Case 123",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add a Reversal Property for Sale</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[800px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
        Add a Reversal Property for Sale
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Property Details Section */}
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              PROPERTY DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
              <FormField
                control={form.control}
                name="property_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Property Type" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="owner_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Owner Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Client Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="case"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Case Details" />
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

export default ReversalPropertyForSaleOwnerForm;
