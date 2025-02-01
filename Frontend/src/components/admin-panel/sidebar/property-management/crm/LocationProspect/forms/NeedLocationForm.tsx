import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Zod Schema for validation
const FormSchema = z.object({
  prospect_location_prospect: z.string().nonempty("Prospect is required"),
  prospect_location_email: z.string().email("Invalid email format"),
  prospect_location_telephone: z.string().min(10, "Telephone number is required"),
});

export function NeedLocationForm() {
  // Initialize the form using react-hook-form and Zod validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prospect_location_prospect: "",
      prospect_location_email: "",
      prospect_location_telephone: "",
    }
  });

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600">Add a Pre-Booking</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="mb-5 pb-5 border-b-2">Add a Pre-Booking</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Prospect Information Section */}
                <div className="space-y-5">
                  <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                    PROSPECT INFORMATION
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Prospect Field */}
                    <FormField
                      control={form.control}
                      name="prospect_location_prospect"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prospect *</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a prospect" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="prospect_1">Prospect 1</SelectItem>
                                <SelectItem value="prospect_2">Prospect 2</SelectItem>
                                <SelectItem value="prospect_3">Prospect 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="prospect_location_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter your email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Telephone Field */}
                    <FormField
                      control={form.control}
                      name="prospect_location_telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telephone</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter your telephone" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                  Save
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* Add any footer content if needed */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
