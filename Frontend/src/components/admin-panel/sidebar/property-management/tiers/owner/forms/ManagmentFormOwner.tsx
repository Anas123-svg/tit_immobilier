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
  import Selection from "@/components/common";
  
  // Define validation schema
  const FormSchema = z.object({
    owner_id: z.number().min(1, "Owner ID is required"),
    owner_name: z.string().nonempty("Owner Name is required"),
    property_concerned: z.string().nonempty("Property Concerned is required"),
    users: z.array(z.string()).optional(),
  });
  
  const availableUsers = ["User1", "User2", "User3", "User4"]; // Example user list
  
  const ManagmentFormOwner = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        owner_id: 1,
        owner_name: "John Doe",
        property_concerned: "Luxury Villa",
        users: ["User1", "User2"], // Pre-selected users
      },
    });
  
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
      console.log(values);
    };
  
    return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>Manage Owner Portfolio</DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[800px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">
            Portfolio Management
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Owner & Property Details Section */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                PROPERTY DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             
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
                  name="property_concerned"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Property Concerned</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Property Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              {/* Assign Users Section */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                ASSIGN USERS
              </h2>
              <Selection
                list={availableUsers}
                selectedList={form.watch("users") || []}
                onChange={(selected) => {
                  form.setValue("users", selected);
                }}
              />
  
              <Button type="submit" className="w-full my-2 bg-primary">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ManagmentFormOwner;
  