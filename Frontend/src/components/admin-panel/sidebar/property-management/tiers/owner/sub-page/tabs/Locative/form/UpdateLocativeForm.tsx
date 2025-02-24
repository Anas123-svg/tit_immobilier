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
  import axios from 'axios';
import { Edit } from "lucide-react";
import { Good, Locative } from "@/types/DataProps";
import { useFormSubmit } from "@/hooks/useFormSubmit";
  
  const FormSchema = z.object({
    door_number: z.string().optional(),
    rental_type: z.string().optional(),
    rent: z.number().optional(),
    charges: z.number().optional(),
    room: z.number().optional(),
    area: z.number().optional(),
  });
  interface UpdateLocativeProps {
    locative: Locative;
    locativeId:number
    good:Good
  }
  const UpdateLocativeForm :React.FC<UpdateLocativeProps> = ({locative,good,locativeId}) => {
    const [open, setOpen] = useState(false);
  
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        door_number: locative?.door_number,
        rental_type: locative?.rental_type,
        rent:locative?.rent,
        charges: locative?.charges,
        room: locative?.room,
        area: locative?.area,
      },
    });
  
    const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-rent-property/'+good?.id;  // Adjust API URL
  
     const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
       
     
  
    return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>  <button className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
                        <Edit size={18} />
                      </button></DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">
            Update Locative Details
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                LOCATIVE DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="door_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Door Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Door Number" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="rental_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rental Type</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Rental Type" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="rent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rent Amount</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Enter Rent" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="charges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Charges</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Enter Charges" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="room"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Rooms</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Number of Rooms" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area (m²)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Enter Area" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              <Button type="submit" className="w-full my-2 bg-primary">
                Update
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default UpdateLocativeForm;
  