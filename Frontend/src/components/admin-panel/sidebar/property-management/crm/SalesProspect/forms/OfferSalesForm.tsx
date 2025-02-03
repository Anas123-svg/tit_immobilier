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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Stepper from "@/components/admin-panel/UI-components/Stepper";
import { Input } from "@/components/ui/input";
import FileUploader from "@/components/common/uploader";
import { Checkbox } from "@/components/ui/checkbox";
import { watch } from "fs";
import MapComponent from "@/components/admin-panel/sidebar/extra/extra/GeolocationGoods/MapComponent";

import ProfilePicUploader from "@/components/common/profilePicUploader";
import { Separator } from "@/components/ui/separator";
import { useFormSubmit } from "@/hooks/useFormSubmit";

// Zod Schema for validation
const FormSchema = z.object({
  // Prospect fields
  prospect_sales_type_of_offer: z
    .string()
    .nonempty("Type of Offer is required"),
  free_offer_area: z.number().min(1, "Area must be greater than 0"),
  free_offer_bathroom: z.number().min(1, "At least 1 bathroom is required"),
  free_offer_quantity: z.number().min(1, "Quantity must be greater than 0"),
  free_offer_featured_offer: z.enum(["Yes", "No"]).default("No"), // Assuming "Yes" or "No"
  free_offer_description: z.string().nonempty("Description is required"),
  free_offer_longitude: z.number().optional(),
  free_offer_latitude: z.number().optional(),
  free_offer_photo: z.string().url("Invalid URL for photo").optional(),
  free_offer_documents: z
    .array(z.string().url("Invalid URL for document"))
    .optional(),

  // Room and amenities fields
  rooms: z.number().min(1, "At least 1 room is required"),
  showers: z.number().min(1, "At least 1 shower is required"),
  living_rooms: z.number().min(1, "At least 1 living room is required"),
  garages: z.number().min(0, "Garages cannot be negative"),
  cuisine: z.number().min(1, "At least 1 cuisine is required"),
  wifi: z.boolean().default(false),
  air_conditioner: z.boolean().default(false),
  parking: z.boolean().default(false),
  pool: z.boolean().default(false),
  emergency_exit: z.boolean().default(false),
  security_guard: z.boolean().default(false),
  fire_hydrant: z.boolean().default(false),

  // Gallery and media
  gallery: z.array(z.string().url("Invalid URL for gallery image")).optional(),
  video: z.string().url("Invalid URL for video").optional(),
  plan: z.array(z.string().url("Invalid URL for plan")).optional(),

  // Real estate and subdivision info
  real_estate_dev_programme: z
    .string()
    .nonempty("Development real_estate_dev_programme is required"),
  real_estate_dev_home: z.string().nonempty("Home type is required"),
  sub_div_project: z.string().nonempty("Subdivision project is required"),
  subdivision: z.string().nonempty("Subdivision name is required"),
  subdivision_island: z.enum(["Yes", "No"]).default("No"),
  subdivision_lot: z.string().nonempty("Subdivision lot number is required"),

  // House for sale flag
  house_for_sale: z.enum(["Yes", "No"]).default("Yes"),

  // Prospect location flag
  is_prospect_location: z.boolean().default(true),
});
export function OfferSalesForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // Prospect Offer Field
      prospect_sales_type_of_offer: "Discounted Property Sale", // Example default value

      // Free Offer Fields
      free_offer_area: 1500, // Example area in square feet
      free_offer_bathroom: 2, // Example number of bathrooms
      free_offer_quantity: 5, // Example quantity of properties
      free_offer_featured_offer: "Yes", // Example featured offer
      free_offer_description:
        "A beautiful 2-bedroom apartment with a scenic view and modern amenities.", // Default description
      free_offer_longitude: -74.006, // Example longitude
      free_offer_latitude: 40.7128, // Example latitude
      free_offer_photo: "https://img.freepik.com/free-vector/rainbow-wave-background_1048-12822.jpg", // Example photo URL
      free_offer_documents: [

      ], // Example documents URLs

      // Room and amenities fields
      rooms: 2, // Example room count
      showers: 2, // Example number of showers
      living_rooms: 1, // Example number of living rooms
      garages: 1, // Example number of garages
      cuisine: 2, // Example number of cuisines
      wifi: true, // Example WiFi availability
      air_conditioner: true, // Example air conditioner availability
      parking: true, // Example parking availability
      pool: true, // Example pool availability
      emergency_exit: true, // Example emergency exit availability
      security_guard: true, // Example security guard availability
      fire_hydrant: true, // Example fire hydrant availability

      // Gallery and media
      gallery: [],
      video: "http://example.com/videos/property_tour.mp4", // Example video URL
      plan: ["http://example.com/plans/floor_plan.pdf"], // Example plan URL

      // Real estate and subdivision info
      real_estate_dev_programme: "Luxury Development", // Example development program
      real_estate_dev_home: "High-End Apartments", // Example real_estate_dev_home type
      sub_div_project: "Island Subdivision", // Example subdivision project
      subdivision: "Downtown Area", // Example subdivision area
      subdivision_island: "Yes", // Example subdivision subdivision_island status
      subdivision_lot: "Lot 12", // Example subdivision lot number

      // House for sale flag
      house_for_sale: "Yes", // Example house for sale status

      // Prospect location flag
      is_prospect_location: false, // Default value set to true
    },
  });

   const apiUrl = import.meta.env.VITE_API_URL + '/api/sales-prospect/offer ';
          const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
        
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const TypeofOffer = form.watch("prospect_sales_type_of_offer");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600">Offer</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="mb-5 pb-5 border-b-2">
            Add an Offer
          </DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <Stepper
                  activeStep={activeStep}
                  onStepChange={handleStepChange}
                  stepsTitle={["General", "Offer"]}
                >
                  <div className="space-y-5">
                    {" "}
                    {/* Prospect Identification */}
                    <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                      TYPE OF OFFER
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="prospect_sales_type_of_offer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Offer Type</FormLabel>
                            <FormControl>
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select Offer Type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="FREE_OFFER">
                                    Free Offer
                                  </SelectItem>
                                  <SelectItem value="REAL_ESTATE_DEVELOPMENT_HOUSE">
                                    Real Estate Development House
                                  </SelectItem>
                                  <SelectItem value="SUBDIVISION_PROJECT_LOT">
                                    Subdivision Project Lot
                                  </SelectItem>
                                  <SelectItem value="HOUSE_FOR_SALE">
                                    House for Sale
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {TypeofOffer === "REAL_ESTATE_DEVELOPMENT_HOUSE" && (
                        <>
                          {/* Programme Field */}
                          <FormField
                            control={form.control}
                            name="real_estate_dev_programme"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Programme *</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a Promotion" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Promotion 1">
                                        Promotion 1
                                      </SelectItem>
                                      <SelectItem value="Promotion 2">
                                        Promotion 2
                                      </SelectItem>
                                      <SelectItem value="Promotion 3">
                                        Promotion 3
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Home Field */}
                          <FormField
                            control={form.control}
                            name="real_estate_dev_home"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Home *</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a Home" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Home 1">
                                        Home 1
                                      </SelectItem>
                                      <SelectItem value="Home 2">
                                        Home 2
                                      </SelectItem>
                                      <SelectItem value="Home 3">
                                        Home 3
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      {TypeofOffer === "HOUSE_FOR_SALE" && (
                        <>
                          {/* Programme Field */}
                          <FormField
                            control={form.control}
                            name="house_for_sale"
                            render={({ field }) => (
                              <FormItem className="col-span-2">
                                <FormLabel>House for Sale *</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a House" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Yes">Yes</SelectItem>
                                      <SelectItem value="No">No</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      {TypeofOffer === "SUBDIVISION_PROJECT_LOT" && (
                        <>
                          {/* Subdivision Field */}
                          <FormField
                            control={form.control}
                            name="subdivision"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subdivision *</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a Subdivision" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Subdivision 1">
                                        Subdivision 1
                                      </SelectItem>
                                      <SelectItem value="Subdivision 2">
                                        Subdivision 2
                                      </SelectItem>
                                      <SelectItem value="Subdivision 3">
                                        Subdivision 3
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Island Field */}
                          <FormField
                            control={form.control}
                            name="subdivision_island"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Island *</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Island" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Island 1">
                                        Island 1
                                      </SelectItem>
                                      <SelectItem value="Island 2">
                                        Island 2
                                      </SelectItem>
                                      <SelectItem value="Island 3">
                                        Island 3
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Lot Field */}
                          <FormField
                            control={form.control}
                            name="subdivision_lot"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Lot *</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select Lot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Lot 1">
                                        Lot 1
                                      </SelectItem>
                                      <SelectItem value="Lot 2">
                                        Lot 2
                                      </SelectItem>
                                      <SelectItem value="Lot 3">
                                        Lot 3
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>
                    {TypeofOffer === "FREE_OFFER" && (
                      <div className="space-y-5">
                        <div className="space-y-5">
                          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                            OFFER DETAILS
                          </h2>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Built Area (m²) */}
                            <FormField
                              control={form.control}
                              name="free_offer_area"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Built Area (m²) *</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      placeholder="Built area"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Main Bathroom (m²) */}
                            <FormField
                              control={form.control}
                              name="free_offer_bathroom"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Main Bathroom (m²) *</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      placeholder="Main bathroom"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Quantity */}
                            <FormField
                              control={form.control}
                              name="free_offer_quantity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Quantity *</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      placeholder="Quantity"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Featured Offer */}
                            <FormField
                              control={form.control}
                              name="free_offer_featured_offer"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Set as Featured Offer?</FormLabel>
                                  <FormControl>
                                    <Select
                                      {...field}
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Featured Offer" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Yes">Yes</SelectItem>
                                        <SelectItem value="No">No</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Description */}
                            <FormField
                              control={form.control}
                              name="free_offer_description"
                              render={({ field }) => (
                                <FormItem className="col-span-4">
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Offer description"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <div className="space-y-5">
                          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                            LOCATION DETAILS
                          </h2>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Longitude */}
                            <FormField
                              control={form.control}
                              name="free_offer_longitude"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Longitude</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      placeholder="Longitude"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Latitude */}
                            <FormField
                              control={form.control}
                              name="free_offer_latitude"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Latitude</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      placeholder="Latitude"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                        <MapComponent />
                        <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              PHOTO AND DOCUMENTS
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <ProfilePicUploader
                  profilePic={form.watch("free_offer_photo") || ""}
                  onChange={(url) => form.setValue("free_offer_photo", url)}
                />
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block h-50"
              />
              <FileUploader
                onChange={(files) => form.setValue("free_offer_documents", files)}
                maxFiles={5}
                addedFiles={form.watch("free_offer_documents") || []}
              />
                  </div>
                      </div>
                    )}
           
                  </div>
                  <div className="space-y-9">
                    <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                      Additional Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Rooms */}
                      <FormField
                        control={form.control}
                        name="rooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rooms</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Rooms"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Showers */}
                      <FormField
                        control={form.control}
                        name="showers"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Showers</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Showers"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Cuisine */}
                      <FormField
                        control={form.control}
                        name="cuisine"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cuisine</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Cuisine"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Living Rooms */}
                      <FormField
                        control={form.control}
                        name="living_rooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Living Rooms</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Living Rooms"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Garages */}
                      <FormField
                        control={form.control}
                        name="garages"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Garages</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                placeholder="Garages"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Information Relating to the Property's Equipment */}
                    <div className="space-y-5">
                      <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                        Information Relating to the Property's Equipment
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 ">
                        {/* WiFi */}
                        <FormField
                          control={form.control}
                          name="wifi"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>WiFi</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        {/* Air Conditioner */}
                        <FormField
                          control={form.control}
                          name="air_conditioner"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Air Conditioner</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        {/* Parking */}
                        <FormField
                          control={form.control}
                          name="parking"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Parking</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        {/* Pool */}
                        <FormField
                          control={form.control}
                          name="pool"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Pool</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        {/* Emergency Exit */}
                        <FormField
                          control={form.control}
                          name="emergency_exit"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Emergency Exit</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        {/* Security Guard */}
                        <FormField
                          control={form.control}
                          name="security_guard"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Security Guard</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />

                        {/* Fire Hydrant */}
                        <FormField
                          control={form.control}
                          name="fire_hydrant"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Fire Hydrant</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Gallery */}
                    <div className="space-y-5">
                      <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                        The Gallery of Goods
                      </h2>
                      <FileUploader
                        onChange={(files) => form.setValue("gallery", files)}
                        maxFiles={5}
                        addedFiles={form.watch("gallery") || []}
                      />
                    </div>

                    {/* Video */}
                    <div className="space-y-5">
                      <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                        Presentation Video
                      </h2>
                      <FormField
                        control={form.control}
                        name="video"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video Link</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Enter Video URL" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Plan */}
                    <div className="space-y-5">
                      <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                        Plan
                      </h2>
                      <FileUploader
                        onChange={(files) => form.setValue("plan", files)}
                        maxFiles={5}
                        addedFiles={form.watch("plan") || []}
                      />
                    </div>
                  </div>
                </Stepper>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
