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
} from "@/components/ui/select";  import axios from 'axios';

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
import MapComponent from "@/components/admin-panel/sidebar/extra/extra/GeolocationGoods/MapComponent";
import Selection from "@/components/common";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import { useFormSubmit } from "@/hooks/useFormSubmit";
// Define validation schema
const FormSchema = z.object({
  owner_id: z.number().min(1, "Owner ID is required"),
  owner: z.string().nonempty("Owner name is required"),
  property_name: z.string().nonempty("Property Name is required"),
  type_of_property: z.string().nonempty("Type of Property is required"),
  number_of_floors: z.number().min(1, "Number of Floors is required"),
  area: z.number().min(1, "Area is required"),
  market_value: z.number().min(1, "Market Value is required"),
  island: z.string().nonempty("Island name is required"),
  batch: z.string().nonempty("Batch is required"),
  cie_identifier_number: z.string().optional(),
  sodeci_identifier_number: z.string().optional(),
  boundary_marking_done: z.boolean(),
  domain_type: z.string().nonempty("Domain Type is required"),
  has_title_deed: z.boolean(),
  serviced: z.boolean(),
  approved: z.boolean(),
  description: z.string().nonempty("Description is required"),
  city: z.string().nonempty("City is required"),
  municipality: z.string().nonempty("Municipality is required"),
  neighborhood: z.string().nonempty("Neighborhood is required"),
  longitude: z.number(),
  latitude: z.number(),
  height: z.number(),
  altitude: z.number(),
  number_of_parking_spaces: z.number().min(0),
  number_of_levels: z.number().min(0),
  garden: z.boolean(),
  pool: z.boolean(),
  on_the_corner: z.boolean(),
  near_water: z.boolean(),
  feet_in_water: z.boolean(),
  distance_from_water: z.number().min(0),
  on_main_road: z.boolean(),
  distance_from_road: z.number().min(0),
  dry_land: z.boolean(),
  low_depth: z.boolean(),
  school_nearby: z.boolean(),
  market_nearby: z.boolean(),
  assigned_agents: z.array(z.string()).optional(),
  photo: z.string().optional(),
  documents: z.array(z.string()).optional(),
});

const PropertyForSaleOwnerForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      owner_id: 1,
      owner: "John Doe",
      property_name: "Seaside Villa",
      type_of_property: "Residential",
      number_of_floors: 3,
      area: 450.75,
      market_value: 1250000,
      island: "Island A",
      batch: "Batch 23",
      cie_identifier_number: "CIE12345",
      sodeci_identifier_number: "SODECI54321",
      boundary_marking_done: true,
      domain_type: "Private",
      has_title_deed: true,
      serviced: true,
      approved: true,
      description: "A luxurious seaside villa with a beautiful view of the ocean.",
      city: "Portsmouth",
      municipality: "Portsmouth Municipality",
      neighborhood: "Seaside Heights",
      longitude: -73.5673,
      latitude: 40.7128,
      height: 10.5,
      altitude: 25.3,
      number_of_parking_spaces: 4,
      number_of_levels: 2,
      garden: true,
      pool: true,
      on_the_corner: true,
      near_water: true,
      feet_in_water: false,
      distance_from_water: 20,
      on_main_road: true,
      distance_from_road: 50,
      dry_land: true,
      low_depth: false,
      school_nearby: true,
      market_nearby: true,
      assigned_agents: ["Agent A", "Agent B"],
      photo: "",
      documents: [
  
      ],
    },
  });
  const agents = [
    "BOHUI BRICE",
    "KOUADIO KOFFI SYLVESTER...",
    "MY VOUCHERS",
    "New IT Company...",
  ];

  const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-sale-properties';
  const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook

   
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add a Property for Sale</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">Property for Sale</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
       {/* Property Details */}
<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  PROPERTY DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Owner Field */}
  <FormField control={form.control} name="owner" render={({ field }) => (
    <FormItem>
      <FormLabel>Owner *</FormLabel>
      <FormControl><Input {...field} placeholder="Select an owner" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Property Name Field */}
  <FormField control={form.control} name="property_name" render={({ field }) => (
    <FormItem>
      <FormLabel>Property Name *</FormLabel>
      <FormControl><Input {...field} placeholder="Name of the property" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Type of Property Field */}
  <FormField control={form.control} name="type_of_property" render={({ field }) => (
    <FormItem>
      <FormLabel>Type of Property *</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select property type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Building">BUILDING</SelectItem>
          <SelectItem value="Lot">Lot</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />

  {/* Number of Floors Field */}
  <FormField control={form.control} name="number_of_floors" render={({ field }) => (
    <FormItem>
      <FormLabel>Number of Floors *</FormLabel>
      <FormControl><Input type="number" {...field} placeholder="0" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Surface Area Field */}
  <FormField control={form.control} name="area" render={({ field }) => (
    <FormItem>
      <FormLabel>Surface (m²)</FormLabel>
      <FormControl><Input type="number" {...field} placeholder="0" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Market Value Field */}
  <FormField control={form.control} name="market_value" render={({ field }) => (
    <FormItem>
      <FormLabel>Market Value</FormLabel>
      <FormControl><Input type="number" {...field} placeholder="0" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* CIE Identifier Number Field */}
  <FormField control={form.control} name="cie_identifier_number" render={({ field }) => (
    <FormItem>
      <FormLabel>CIE Identifier Number</FormLabel>
      <FormControl><Input {...field} placeholder="CIE identifier number" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* SODECI Identifier Number Field */}
  <FormField control={form.control} name="sodeci_identifier_number" render={({ field }) => (
    <FormItem>
      <FormLabel>SODECI ID Number</FormLabel>
      <FormControl><Input {...field} placeholder="SODECI ID number" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Boundary Marking Done Field */}
  <FormField control={form.control} name="boundary_marking_done" render={({ field }) => (
    <FormItem>
      <FormLabel>Boundary Marking Done?</FormLabel>
      <Select  onValueChange={(value) => form.setValue('boundary_marking_done', value === 'yes')}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="yes">YES</SelectItem>
          <SelectItem value="no">NO</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />

  {/* Serviced Field */}
  <FormField control={form.control} name="serviced" render={({ field }) => (
    <FormItem>
      <FormLabel>Serviced?</FormLabel>
      <Select  onValueChange={(value) => form.setValue('serviced', value === 'yes')}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="yes">YES</SelectItem>
          <SelectItem value="no">NO</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />

  {/* Domain Type Field */}
  <FormField control={form.control} name="domain_type" render={({ field }) => (
    <FormItem>
      <FormLabel>Domain Type *</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select domain type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Urban">URBAN</SelectItem>
          <SelectItem value="Private">PRIVATE</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />

  {/* Approved Field */}
  <FormField control={form.control} name="approved" render={({ field }) => (
    <FormItem>
      <FormLabel>Approved?</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="yes">YES</SelectItem>
          <SelectItem value="no">NO</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />

  {/* Title Deed Field */}
  <FormField control={form.control} name="has_title_deed" render={({ field }) => (
    <FormItem>
      <FormLabel>Does he have a title deed? *</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="yes">YES</SelectItem>
          <SelectItem value="no">NO</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />

  {/* Description Field */}
  <FormField control={form.control} name="description" render={({ field }) => (
    <FormItem className="col-span-4">
      <FormLabel>Description *</FormLabel>
      <FormControl><Input {...field} placeholder="Enter property description" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />
</div>

<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  LOCATION DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
<FormField control={form.control} name="city" render={({ field }) => (
    <FormItem>
      <FormLabel>City *</FormLabel>
      <FormControl><Input {...field} placeholder="City" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="municipality" render={({ field }) => (
    <FormItem>
      <FormLabel>Municipality *</FormLabel>
      <FormControl><Input {...field} placeholder="Commune" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="neighborhood" render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>Neighborhood *</FormLabel>
      <FormControl><Input {...field} placeholder="Neighborhood" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField  control={form.control} name="longitude" render={({ field }) => (
    <FormItem>
      <FormLabel>Longitude</FormLabel>
      <FormControl><Input {...field} placeholder="Longitude" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="latitude" render={({ field }) => (
    <FormItem>
      <FormLabel>Latitude</FormLabel>
      <FormControl><Input {...field} placeholder="Latitude" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="height" render={({ field }) => (
    <FormItem>
      <FormLabel>Height</FormLabel>
      <FormControl><Input type="number" {...field} placeholder="0" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="altitude" render={({ field }) => (
    <FormItem>
      <FormLabel>Altitude</FormLabel>
      <FormControl><Input type="number" {...field} placeholder="0" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />
  <div className="col-span-4 "><MapComponent/></div>
</div>
<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  ADDITIONAL DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <FormField control={form.control} name="number_of_parking_spaces" render={({ field }) => (
    <FormItem>
      <FormLabel>Name of Parking Lot</FormLabel>
      <FormControl>
        <Input {...field} placeholder="Name of parking lot" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="number_of_levels" render={({ field }) => (
    <FormItem>
      <FormLabel>Number of Levels</FormLabel>
      <FormControl><Input type="number" {...field} placeholder="Number of levels" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="garden" render={({ field }) => (
    <FormItem>
      <FormLabel>Garden?</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="NON" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">YES</SelectItem>
            <SelectItem value="no">NON</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="pool" render={({ field }) => (
    <FormItem>
      <FormLabel>Pool?</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="NON" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">YES</SelectItem>
            <SelectItem value="no">NON</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="on_the_corner" render={({ field }) => (
    <FormItem>
      <FormLabel>A l'angle?</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="NON" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">YES</SelectItem>
            <SelectItem value="no">NON</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="near_water" render={({ field }) => (
    <FormItem>
      <FormLabel>Near the Water?</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="NON" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">YES</SelectItem>
            <SelectItem value="no">NON</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="feet_in_water" render={({ field }) => (
    <FormItem>
      <FormLabel>Feet in the Water?</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="NON" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">YES</SelectItem>
            <SelectItem value="no">NON</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="on_main_road" render={({ field }) => (
    <FormItem>
      <FormLabel>Edge of a Main Road?</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="NON" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">YES</SelectItem>
            <SelectItem value="no">NON</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="dry_land" render={({ field }) => (
    <FormItem>
      <FormLabel>Dry Land?</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="NON" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">YES</SelectItem>
            <SelectItem value="no">NON</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="low_depth" render={({ field }) => (
    <FormItem>
      <FormLabel>Low Depth?</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="NON" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">YES</SelectItem>
            <SelectItem value="no">NON</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="school_nearby" render={({ field }) => (
    <FormItem>
      <FormLabel>School Nearby?</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="NON" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">YES</SelectItem>
            <SelectItem value="no">NON</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="market_nearby" render={({ field }) => (
    <FormItem>
      <FormLabel>Market Nearby?</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="NON" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">YES</SelectItem>
            <SelectItem value="no">NON</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )} />
</div>
<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  ASSIGN PROPERTY TO AGENTS
</h2>

  <Selection
    list={agents}
    selectedList={form.watch("assigned_agents") || []}
    onChange={(selected) => {
      form.setValue("assigned_agents", selected);
    }}
  />

                  <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                  ADDING FILES
                       </h2>
                       <div className="flex flex-col md:flex-row gap-4">
                         <div className="w-full md:w-1/3">
                           <ProfilePicUploader
                             profilePic={form.watch("photo") || ""}
                             onChange={(url) => form.setValue("photo", url)}
                           />
                         </div>
                         <Separator
                           orientation="vertical"
                           className="hidden md:block h-50"
                         />
                         <Uploader
                           onChange={(files) => form.setValue("documents", files)}
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

export default PropertyForSaleOwnerForm;
