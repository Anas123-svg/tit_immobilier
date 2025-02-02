import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PlusCircleIcon } from "lucide-react";

// Define schema with Zod for validation
const schema = z.object({
  pays: z.string().nonempty("Pays is required"),
  city: z.string().nonempty("City is required"),
  municipality: z.string().nonempty("Municipality is required"),
  neighborhood: z.string().nonempty("Neighborhood is required"),
});

type FormData = z.infer<typeof schema>;

const AddNeighborhoodForm = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission logic (e.g., send data to server)
    setOpen(false);  // Close the dialog after form submission
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <PlusCircleIcon size={30} className="cursor-pointer hover:text-secondary" />
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Add a Neighborhood</DialogTitle>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Pays Field */}
            <FormField
              control={control}
              name="pays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Pays" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                        <SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
                        <SelectItem value="Bulgaria">Bulgaria</SelectItem>
                        <SelectItem value="Barbados">Barbados</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.pays?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* City Field */}
            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dhaka">Dhaka</SelectItem>
                        <SelectItem value="Ouagadougou">Ouagadougou</SelectItem>
                        <SelectItem value="Sofia">Sofia</SelectItem>
                        <SelectItem value="Bridgetown">Bridgetown</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.city?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Municipality Field */}
            <FormField
              control={control}
              name="municipality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Municipality</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a municipality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Municipality 1">Municipality 1</SelectItem>
                        <SelectItem value="Municipality 2">Municipality 2</SelectItem>
                        <SelectItem value="Municipality 3">Municipality 3</SelectItem>
                        <SelectItem value="Municipality 4">Municipality 4</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.municipality?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Neighborhood Field */}
            <FormField
              control={control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neighborhood</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="neighborhood"
                      placeholder="Enter Neighborhood"
                    />
                  </FormControl>
                  <FormMessage>{errors.neighborhood?.message}</FormMessage>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" onClick={() => setOpen(false)} variant="outline">
                Close
              </Button>
              <Button type="submit" className="ml-2">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNeighborhoodForm;
