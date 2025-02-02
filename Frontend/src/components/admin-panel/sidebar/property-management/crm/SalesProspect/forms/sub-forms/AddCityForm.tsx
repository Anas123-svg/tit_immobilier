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
  would: z.string().nonempty("Would is required"),
});

type FormData = z.infer<typeof schema>;

const AddCityForm = () => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit,control, formState: { errors } } = useForm<FormData>({
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
   <PlusCircleIcon size={30} className=" cursor-pointer hover:text-secondary "/>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Add a City</DialogTitle>

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

            {/* Would Field */}
            <FormField
              control={control}
              name="would"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Would</FormLabel>
                  <FormControl>
                    <Input
                      id="would"
                      {...register("would")}
                      placeholder="Enter Would"
                    />
                  </FormControl>
                  <FormMessage>{errors.would?.message}</FormMessage>
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

export default AddCityForm;
