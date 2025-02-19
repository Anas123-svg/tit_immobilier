import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import MapComponent from "@/components/admin-panel/sidebar/extra/extra/GeolocationGoods/MapComponent";
import Selection from "@/components/common";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { OwnerCombobox } from "../../../../../UI-components/Combobox/OwnerCombobox";
import useFetchData from "@/hooks/useFetchData";
import { Owner, User } from "@/types/DataProps";
import Stepper from "@/components/admin-panel/UI-components/Stepper";
import useFetchAuthData from "@/hooks/useFetchAuthData";
const locativeSchema = z.object({
  door_number: z.string().optional(),
  rental_type: z.string().optional(),
  rent: z.number().optional(),
  charges: z.number().optional(),
  room: z.number().optional(),
  area: z.number().optional(),
});
// **Define validation schema**
const FormSchema = z.object({
  owner_id: z.number().min(1, "Owner ID is required"),
  owner: z.string().optional(),
  property_name: z.string(),
  type_of_property: z.string().optional(),
  number_of_floors: z.number().optional(),
  number_of_rentals: z.number().optional(),
  type_of_numbering: z.string().optional(),
  area_m2: z.number().optional(),
  market_value: z.number().optional(),
  other_type: z.string().optional(),
  island: z.string().optional(),
  batch: z.string().optional(),
  block: z.string().optional(),
  cie_identifier_number: z.string().optional(),
  sodeci_identifier_number: z.string().optional(),
  description: z.string().optional(),
  city: z.string().optional(),
  municipality: z.string().optional(),
  neighborhood: z.string().optional(),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  height: z.number().optional(),
  altitude: z.number().optional(),
  on_the_corner: z.string().optional(),
  near_water: z.string().optional(),
  feet_in_water: z.boolean().optional(),
  distance_from_water: z.string().optional(),
  on_main_road: z.boolean().optional(),
  distance_from_road: z.string().optional(),
  dry_land: z.string().optional(),
  low_depth: z.string().optional(),
  school_nearby: z.string().optional(),
  market_nearby: z.string().optional(),
  assigned_agents: z.array(z.string()).optional(),
  photo: z.string().optional(),
  documents: z.array(
   z.string()
  ).optional(),
  details: z.array(locativeSchema).optional(), // Array of details
});

const PropertyForRentOwnerForm = () => {
  const [locativesstate, setLocatives] = useState([{ door_number: '', rental_type: '', rent: 0, charges: 0, room: 1, area: 0 }]); // Initial state for details
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // owner_id:1,
    
      // property_name: "Oceanview Apartments",
      // type_of_property: "Commercial",
      // number_of_floors: 5,
      // number_of_rentals: 10,
      // type_of_numbering: "Unit",
      // area_m2: 2000,
      // market_value: 3500000,
      // island: "Island B",
      // batch: "Batch 42",
      // block: "Block A",
      // cie_identifier_number: "CIE67890",
      // sodeci_identifier_number: "SODECI98765",
      // description: "Modern commercial apartments overlooking the ocean, ideal for businesses.",
      // city: "Brighton",
      // municipality: "Brighton City",
      // neighborhood: "Coastal Park",
      // longitude: "-73.9876",
      // latitude: "40.6587",
      // height: 15,
      // altitude: 30,
      // on_the_corner: "Yes",
      // near_water: "Yes",
      // feet_in_water: false,
      // distance_from_water: "100 meters",
      // on_main_road: true,
      // distance_from_road: "30 meters",
      // dry_land: "yes",
      // low_depth: "No",
      // school_nearby:  "No",
      // market_nearby:  "No",
      // assigned_agents: [],
      // photo: "",
      // documents: [
  
      // ],

  
      // owner_id:0,
      owner: "",
      // property_name: "",
      // type_of_property: "",
      // number_of_floors: 0,
      // number_of_rentals: 0,
      // type_of_numbering: "",
      // area_m2: 0,
      // market_value: 0,
      // island: "",
      // batch: "",
      // block: "",
      // cie_identifier_number: "",
      // sodeci_identifier_number: "",
      // description: "",
      // city: "",
      // municipality: "",
      // neighborhood: "",
      // longitude: "",
      // latitude: "",
      height: 0,
      altitude: 0,
      on_the_corner: "",
      near_water: "",
      feet_in_water: false,
      distance_from_water: "",
      on_main_road: false,
      distance_from_road: "",
      dry_land: "",
      low_depth: "",
      school_nearby: "",
      market_nearby: "",
      // assigned_agents: [],
      // photo: "",
      // documents: [],
      // level: 0,
      // door_number: "",
      // rental_type: "",
      // rent: 0,
      // charges: 0,
      // room: 0,
      // area: 0
    },
  });
       
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  
  const { data: data, loading, error } = useFetchAuthData<User[]>(
    `${import.meta.env.VITE_API_URL}/api/users`
  )
  const agents: string[] = data?.map((user) => {
    return user.name 
    
  }) || ["", ""];  // Default array in case data is empty or undefined
   // Default array in case data is empty or undefined
   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  
    // Function to handle location change from the map
    const handleLocationChange = (lat: number, lng: number) => {
      setLocation({ lat, lng });
    };
  const TypeofProperty = form.watch("type_of_property")
  const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-rent-properties';
  const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl,form.reset);  // Use custom hook
 const nearWater = form.watch("near_water")
 const nearRoad = form.watch("on_main_road")
 const handleAddLocative = () => {
  setLocatives([...locativesstate, { door_number: '', rental_type: '', rent: 0, charges: 0, room: 1, area: 0 }]);
};

const handleRemoveLocative = (index: number) => {
  const updatedLocatives = locativesstate.filter((_, i) => i !== index);
  setLocatives(updatedLocatives);
};

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add a Property for Rent</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">Add a Property for Rent</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Stepper
                  activeStep={activeStep}
                  onStepChange={handleStepChange}
                  stepsTitle={["Property For Rent", "Locative"]}
                > 
                
                <div className="space-y-6"> 
                  
                  
                  <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  PROPERTY DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Owner Field */}
    <OwnerCombobox name="owner_id" control={form.control}/>
    

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
        <SelectItem value="BUILDING">BUILDING</SelectItem>
        <SelectItem value="RESIDENCE">RESIDENCE</SelectItem>
        <SelectItem value="VILLA BASSE">VILLA BASSE</SelectItem>
        <SelectItem value="APARTMENT">APARTMENT</SelectItem>
        <SelectItem value="COMMON COURSE">COMMON COURSE</SelectItem>
        <SelectItem value="TERRAIN">TERRAIN</SelectItem>
        <SelectItem value="VILLA">VILLA</SelectItem>
        <SelectItem value="VIRTUAL DOMICILATION">VIRTUAL DOMICILATION</SelectItem>
        <SelectItem value="ENTREPRENEUR">ENTREPRENEUR</SelectItem>
        <SelectItem value="COMMERCIAL SPACE">COMMERCIAL SPACE</SelectItem>
        <SelectItem value="OTHERS">OTHERS</SelectItem>
      </SelectContent>
    </Select>
    <FormMessage />
  </FormItem>
)} />
 {/* Property Name Field */} 
 {TypeofProperty === "OTHERS" && <FormField control={form.control} name="other_type" render={({ field }) => (
    <FormItem>
      <FormLabel>Other Type *</FormLabel>
      <FormControl><Input {...field} placeholder="Name of the Other Type " /></FormControl>
      <FormMessage />
    </FormItem>
  )} />}
  {/* Number of Floors Field */}
 {TypeofProperty === "BUILDING" && <FormField control={form.control} name="number_of_floors" render={({ field }) => (
    <FormItem>
      <FormLabel>Number of Floors *</FormLabel>
      <FormControl><Input type="number" placeholder="0" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))} 
                     /></FormControl>
      <FormMessage />
    </FormItem>
  )} />
}
  {/* Number of Rentals Field */}
  <FormField control={form.control} name="number_of_rentals" render={({ field }) => (
    <FormItem>
      <FormLabel>Number of Rentals *</FormLabel>
      <FormControl><Input type="number" placeholder="0" {...field}       onChange={e => field.onChange(parseInt(e.target.value, 10))} 
                    /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Type of Numbering Field */}
  <FormField control={form.control} name="type_of_numbering" render={({ field }) => (
    <FormItem>
      <FormLabel>Numbering Type *</FormLabel>
      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select numbering type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="Unit">Unit</SelectItem>
          <SelectItem value="Digital">Digital</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )} />

  {/* Surface Area Field */}
  <FormField control={form.control} name="area_m2" render={({ field }) => (
    <FormItem>
      <FormLabel>Surface (m²)</FormLabel>
      <FormControl><Input  {...field}  onChange={e => field.onChange(parseInt(e.target.value, 10))}  type="number"  placeholder="0" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Market Value Field */}
  <FormField control={form.control} name="market_value" render={({ field }) => (
    <FormItem>
      <FormLabel>Market Value</FormLabel>
      <FormControl><Input      
                      type="number" {...field}  placeholder="0"  onChange={e => field.onChange(parseInt(e.target.value, 10))} 
                      /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Island Field */}
  <FormField control={form.control} name="island" render={({ field }) => (
    <FormItem>
      <FormLabel>Island</FormLabel>
      <FormControl><Input {...field} placeholder="Enter Island Name" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Batch Field */}
  <FormField control={form.control} name="batch" render={({ field }) => (
    <FormItem>
      <FormLabel>Batch</FormLabel>
      <FormControl><Input {...field} placeholder="Enter Batch Number" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  {/* Block Field */}
  <FormField control={form.control} name="block" render={({ field }) => (
    <FormItem>
      <FormLabel>Block</FormLabel>
      <FormControl><Input {...field} placeholder="Enter Block Name" /></FormControl>
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
      <FormControl><Input type="number"  {...field} value={location?.lng} onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="Longitude" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="latitude" render={({ field }) => (
    <FormItem>
      <FormLabel>Latitude</FormLabel>
      <FormControl><Input type="number" placeholder="0" {...field}  value={location?.lat} onChange={e => field.onChange(parseFloat(e.target.value))} /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="height" render={({ field }) => (
    <FormItem>
      <FormLabel>Height</FormLabel>
      <FormControl><Input  type="number" {...field} placeholder="0"   onChange={e => field.onChange(parseInt(e.target.value, 10))} 
                    /></FormControl>
      <FormMessage />
    </FormItem>
  )} />

  <FormField control={form.control} name="altitude" render={({ field }) => (
    <FormItem>
      <FormLabel>Altitude</FormLabel>
      <FormControl><Input type="number" placeholder="0"  {...field}  onChange={e => field.onChange(parseInt(e.target.value, 10))} 
                    /></FormControl>
      <FormMessage />
    </FormItem>
  )} />
  <div className="col-span-4 ">   <MapComponent onLocationChange={handleLocationChange} /></div>
</div>

<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  ADDITIONAL DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* On the Corner Field */}
  <FormField control={form.control} name="on_the_corner" render={({ field }) => (
    <FormItem>
      <FormLabel>A l'angle ?</FormLabel>
      <Select   {...field} onValueChange={field.onChange}>
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

  {/* Near Water Field */}
  <FormField control={form.control} name="near_water" render={({ field }) => (
    <FormItem>
      <FormLabel>Near the water?</FormLabel>
      <Select  {...field} onValueChange={field.onChange}>
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
  {/* Surface Area Field */}
 {nearWater == "yes" && <FormField control={form.control} name="distance_from_water" render={({ field }) => (
    <FormItem>
      <FormLabel>Distance from water (m) ?</FormLabel>
      <FormControl><Input  {...field}/></FormControl>
      <FormMessage />
    </FormItem>
  )} />}
  {/* Feet in the Water Field */}
  <FormField control={form.control} name="feet_in_water" render={({ field }) => (
    <FormItem>
      <FormLabel>Feet in the water?</FormLabel>
      <Select onValueChange={(value) => form.setValue('feet_in_water', value === 'yes')}>
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

  {/* On the Main Road Field */}
 <FormField control={form.control} name="on_main_road" render={({ field }) => (
    <FormItem>
      <FormLabel>Edge of a main road?</FormLabel>
      <Select onValueChange={(value) => form.setValue('on_main_road', value === 'yes')}>
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
   {nearRoad && <FormField control={form.control} name="distance_from_road" render={({ field }) => (
    <FormItem>
      <FormLabel>Distance from road (m) ?</FormLabel>
      <FormControl><Input  {...field}  placeholder="0" /></FormControl>
      <FormMessage />
    </FormItem>
  )} />}
  {/* Dry Land Field */}
  <FormField control={form.control} name="dry_land" render={({ field }) => (
    <FormItem>
      <FormLabel>Dry land?</FormLabel>
      <Select {...field} onValueChange={field.onChange}>
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

  {/* Low Depth Field */}
  <FormField control={form.control} name="low_depth" render={({ field }) => (
    <FormItem>
      <FormLabel>Low depth?</FormLabel>
      <Select {...field} onValueChange={field.onChange}>
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

  {/* School Nearby Field */}
  <FormField control={form.control} name="school_nearby" render={({ field }) => (
    <FormItem>
      <FormLabel>School nearby?</FormLabel>
      <Select {...field} onValueChange={field.onChange}>
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

  {/* Market Nearby Field */}
  <FormField control={form.control} name="market_nearby" render={({ field }) => (
    <FormItem>
      <FormLabel>Market nearby?</FormLabel>
      <Select {...field} onValueChange={field.onChange}>
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
                           onChange={(files:any) => form.setValue("documents", files)}
                           maxFiles={5}
                           addedFiles={form.watch("documents") || []}
                         />
                       </div>
                       </div> 
                       <div className="space-y-6">       <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                       DETAILS CONCERNING THE RENTAL OF THE PROPERTY
</h2>

<div className="flex flex-col space-y-5 ">
{locativesstate.map((_, index) => (
  <div key={index} className="grid-cols-7 gap-5 grid">
    {/* Door Number Field */}
    <FormField control={form.control} name={`details.${index}.door_number`} render={({ field }) => (
      <FormItem>
        <FormLabel>Door No *</FormLabel>
        <FormControl><Input {...field} placeholder="e.g. 213" /></FormControl>
        <FormMessage />
      </FormItem>
    )} />

    {/* Rental Type Field */}
    <FormField control={form.control} name={`details.${index}.rental_type`} render={({ field }) => (
      <FormItem>
        <FormLabel>Rental Type *</FormLabel>
        <Select {...field} onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select property type" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="APARTMENT">APARTMENT</SelectItem>
            <SelectItem value="STUDIO">STUDIO</SelectItem>
            <SelectItem value="VILLA">VILLA</SelectItem>
            <SelectItem value="HOUSE">HOUSE</SelectItem>
            <SelectItem value="COMMERCIAL">COMMERCIAL</SelectItem>
            <SelectItem value="OTHERS">OTHERS</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )} />

    {/* Rent Field */}
    <FormField control={form.control} name={`details.${index}.rent`} render={({ field }) => (
      <FormItem>
        <FormLabel>Rent *</FormLabel>
        <FormControl>
          <Input type="number" {...field} placeholder="0" onChange={e => field.onChange(parseInt(e.target.value, 10))} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />

    {/* Charges Field */}
    <FormField control={form.control} name={`details.${index}.charges`} render={({ field }) => (
      <FormItem>
        <FormLabel>Charges *</FormLabel>
        <FormControl>
          <Input type="number" {...field} placeholder="0" onChange={e => field.onChange(parseInt(e.target.value, 10))} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />

    {/* Number of Rooms Field */}
    <FormField control={form.control} name={`details.${index}.room`} render={({ field }) => (
      <FormItem>
        <FormLabel>No. Rooms *</FormLabel>
        <FormControl>
          <Input type="number" {...field} placeholder="0" onChange={e => field.onChange(parseInt(e.target.value, 10))} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />

    {/* Area Field */}
    <FormField control={form.control} name={`details.${index}.area`} render={({ field }) => (
      <FormItem>
        <FormLabel>Area *</FormLabel>
        <FormControl>
          <Input type="number" {...field} placeholder="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />

    {/* Remove Button */}
    <button type="button" className="bg-red-500 w-fit self-end text-white px-4 py-2 rounded-md" onClick={() => handleRemoveLocative(index)}>
      Remove
    </button>
  </div>
))}

      {/* Button to Add New Locative */}
      <button type="button" className="bg-secondary w-fit self-end text-white px-4 py-2 rounded-md" onClick={handleAddLocative}>
        Add
      </button>

        
        
        </div>
        
        </div>
                       </Stepper>
            <Button type="submit" className="w-full my-2 bg-primary">
              Submit
            </Button>
          
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyForRentOwnerForm;
