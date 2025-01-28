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
import Uploader from "@/components/common/uploader";
import ProfilePicUploader from "@/components/common/profilePicUploader";
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
import { Separator } from "@/components/ui/separator";

// Define validation schema
const FormSchema = z.object({
  owner_name: z.string().nonempty("Owner Name is required"),
  very_concerned: z.boolean(),
  type_of_property: z.string().nonempty("Type of Property is required"),
  numerotation: z.number().min(1, "Numerotation is required"),
  total: z.number().min(1, "Total is required"),
  door_no: z.string().nonempty("Door Number is required"),
  type_of_rental: z.string().nonempty("Type of Rental is required"),
  floor: z.number().min(0, "Floor must be a valid number"),
  number_of_rooms: z.number().min(1, "Number of Rooms is required"),
  surface: z.number().min(1, "Surface area is required"),
  rent_amount: z.number().min(1, "Rent Amount is required"),
  amount_of_charges: z.number().min(0, "Amount of Charges is required"),
  profile_photo: z.string().optional(),
  documents: z.array(z.string()).optional(),
});

const RentalPropertyOwnerForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      owner_name: "",
      very_concerned: false,
      type_of_property: "",
      numerotation: 0,
      total: 1,
      door_no: "",
      type_of_rental: "",
      floor: 0,
      number_of_rooms: 1,
      surface: 0,
      rent_amount: 0,
      amount_of_charges: 0,
      profile_photo: "",
      documents: [],
    },
  });

   const onSubmit = (values: z.infer<typeof FormSchema>) => {
     console.log(values);
   };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add a Rental Property</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">Rental Property Form</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Property Details */}
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  DETAILS ON THE PROPERTY CONCERNED
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  
  {/* Owner Field */}
  <FormField 
    control={form.control} 
    name="owner_name" 
    render={({ field }) => (
      <FormItem>
        <FormLabel>Owner *</FormLabel>
        <FormControl>
          <Input {...field} placeholder="Select an Owner" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} 
  />

  {/* Very Concerned Field */}
  <FormField 
    control={form.control} 
    name="very_concerned" 
    render={({ field }) => (
      <FormItem>
        <FormLabel>Very Concerned *</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )} 
  />

  {/* Type of Property Field */}
  <FormField 
    control={form.control} 
    name="type_of_property" 
    render={({ field }) => (
      <FormItem>
        <FormLabel>Type of Property</FormLabel>
        <FormControl>
          <Input {...field} placeholder="Enter Property Type" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} 
  />

  {/* Numerotation Field */}
  <FormField 
    control={form.control} 
    name="numerotation" 
    render={({ field }) => (
      <FormItem>
        <FormLabel>Numerotation</FormLabel>
        <FormControl>
          <Input type="number" {...field} placeholder="Numerotation" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} 
  />

</div>

          {/* Rental Details */}
<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  DETAILS CONCERNING THE RENTAL
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  
  {/* Total */}
  <FormField control={form.control} name="total" render={({ field }) => (
    <FormItem>
      <FormLabel>TOTAL *</FormLabel>
      <FormControl>
        <Input type="number" {...field} placeholder="Total" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Door Number */}
  <FormField control={form.control} name="door_no" render={({ field }) => (
    <FormItem>
      <FormLabel>Door No. *</FormLabel>
      <FormControl>
        <Input {...field} placeholder="Door No." />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Type of Rental */}
  <FormField control={form.control} name="type_of_rental" render={({ field }) => (
    <FormItem>
      <FormLabel>Type of Rental? *</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Which Floor */}
  <FormField control={form.control} name="floor" render={({ field }) => (
    <FormItem>
      <FormLabel>Which Floor? *</FormLabel>
      <FormControl>
        <Input type="number" {...field} placeholder="Floor" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Number of Rooms */}
  <FormField control={form.control} name="number_of_rooms" render={({ field }) => (
    <FormItem>
      <FormLabel>Number of Rooms *</FormLabel>
      <FormControl>
        <Input type="number" {...field} placeholder="Rooms" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Surface */}
  <FormField control={form.control} name="surface" render={({ field }) => (
    <FormItem>
      <FormLabel>Surface</FormLabel>
      <FormControl>
        <Input type="number" {...field} placeholder="Surface in sqm" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Rent Amount */}
  <FormField control={form.control} name="rent_amount" render={({ field }) => (
    <FormItem>
      <FormLabel>Rent Amount *</FormLabel>
      <FormControl>
        <Input type="number" {...field} placeholder="Rent Amount" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Amount of Charges */}
  <FormField control={form.control} name="amount_of_charges" render={({ field }) => (
    <FormItem>
      <FormLabel>Amount of Charges *</FormLabel>
      <FormControl>
        <Input type="number" {...field} placeholder="Charges" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

</div>

{/* Upload Section */}
<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  UPLOAD DOCUMENTS
</h2>
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/3">
    <ProfilePicUploader
      profilePic={form.watch("profile_photo") || ""}
      onChange={(url) => form.setValue("profile_photo", url)}
    />
  </div>
  <Separator orientation="vertical" className="hidden md:block h-50" />
  <Uploader
    onChange={(files: any) => form.setValue("documents", files)}
    maxFiles={5}
    addedFiles={form.watch("documents") || []}
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

export default RentalPropertyOwnerForm;
