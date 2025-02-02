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
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Stepper from "@/components/admin-panel/UI-components/Stepper";
import { useState } from "react";
import ProfilePicUploader from "@/components/common/profilePicUploader";
import { Separator } from "@/components/ui/separator";
import FileUploader from "@/components/common/uploader";
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import AddCityForm from "./sub-forms/AddCityForm";
import AddMunicipalityForm from "./sub-forms/AddMunicipalityForm";
import AddNeighborhoodForm from "./sub-forms/AddNeighborhoodForm";
import { useFormSubmit } from "@/hooks/useFormSubmit";

// Zod Schema with prospect_sales_ prefix
const FormSchema = z.object({
  prospect_sales_prospect_type: z.string().nonempty("Prospect Type is required"),
  prospect_sales_source_of_prospect: z.string().nonempty("Source of Prospect is required"),
  prospect_sales_phone: z.string().min(10, "Phone number is required"),
  prospect_sales_contact_whatsapp: z.string().min(10, "Whatsapp number is required"),
  prospect_sales_civility: z.string().nonempty("Civility is required"),
  prospect_sales_name_surname: z.string().nonempty("Name and Surname is required"),
  prospect_sales_email: z.string().email("Invalid email format"),
  prospect_sales_marital_status: z.string().nonempty("Marital Status is required"),
  prospect_sales_children: z.string().nonempty("Children status is required"),
  prospect_sales_profession: z.string().nonempty("Profession is required"),
  prospect_sales_number_of_children: z.number().int().min(0, "Number of children must be a non-negative integer"),
  prospect_sales_type_of_need: z.string().nonempty("Type of Need is required"),
  prospect_sales_type_of_property: z.string().nonempty("Type of Property is required"),
  prospect_sales_management_rentals: z.number().min(0, "Management rentals must be a non-negative number"),
  prospect_sales_management_rentals_income: z.number().min(0, "Management rentals income must be a non-negative number"),
  prospect_sales_management_percentage: z.number().min(0, "Management percentage must be a non-negative number"),
  prospect_sales_purchase_budget_min: z.number().min(0, "Minimum purchase budget must be a non-negative number"),
  prospect_sales_purchase_budget_max: z.number().min(0, "Maximum purchase budget must be a non-negative number"),
  prospect_sales_description: z.string().optional(),
  prospect_sales_would: z.string().nonempty("Would is required"),
  prospect_sales_municipality: z.string().nonempty("Municipality is required"),
  prospect_sales_neighborhood: z.string().nonempty("Neighborhood is required"),
  prospect_sales_photo: z.string().optional(),
  prospect_sales_documents: z.array(z.string()).optional(),
  is_prospect_location: z.boolean(),
});


export function ProspectSalesForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prospect_sales_prospect_type: "Individual",
      prospect_sales_source_of_prospect: "Referral",
      prospect_sales_phone: "+1234567890",
      prospect_sales_contact_whatsapp: "+1234567890",
      prospect_sales_civility: "Mr.",
      prospect_sales_name_surname: "John Doe",
      prospect_sales_email: "johndoe@example.com",
      prospect_sales_marital_status: "Single",
      prospect_sales_children: "No",
      prospect_sales_profession: "Software Engineer",
      prospect_sales_number_of_children: 0,
      prospect_sales_type_of_need: "Purchase",
      prospect_sales_type_of_property: "Apartment",
      prospect_sales_management_rentals: 3,
      prospect_sales_management_rentals_income: 2000.00,
      prospect_sales_management_percentage: 10.5,
      prospect_sales_purchase_budget_min: 100000.00,
      prospect_sales_purchase_budget_max: 500000.00,
      prospect_sales_description: "Looking for a 2-bedroom apartment in a central location.",
      prospect_sales_would: "Yes",
      prospect_sales_municipality: "Central City",
      prospect_sales_neighborhood: "Downtown",
      prospect_sales_photo: "https://img.freepik.com/free-photo/abstract-dark-background-with-flowing-colouful-waves_1048-13124.jpg",
      prospect_sales_documents: [
      ],
      is_prospect_location: false,
    }
  });
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const selectedProspectType = form.watch("prospect_sales_prospect_type");
  
  // Set default value for 'prospect_sales_type_of_need' based on the selected prospect type
  let defaultNeedValue="";
  let disabledNeedField = false;

  if (selectedProspectType === "Tenant") {
    defaultNeedValue = "Location";
    disabledNeedField = true;
  } else if (selectedProspectType === "Owner") {
    defaultNeedValue = "Management";
    disabledNeedField = true;
  } else if (selectedProspectType === "Client") {
    defaultNeedValue = "Purchase";
    disabledNeedField = true;
  }
   const apiUrl = import.meta.env.VITE_API_URL + '/api/sales-prospect';
        const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
      
    
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">Prospect</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="mb-5 pb-5 border-b-2">Add a Prospect</DialogTitle>
          <DialogDescription>
           
        
            <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               
                <Stepper activeStep={activeStep} onStepChange={handleStepChange} stepsTitle={["Prospect Identification","Collection of Needs","Additional Documents"]}>
             <div className="space-y-5">    {/* Prospect Identification */}
                <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                  PROSPECT IDENTIFICATION
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Prospect Type */}
                  <FormField
                    control={form.control}
                    name="prospect_sales_prospect_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prospect Type</FormLabel>
                        <FormControl>
                          <Select  onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Prospect Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tenant">Tenant</SelectItem>
                              <SelectItem value="Owner">Owner</SelectItem>
                              <SelectItem value="Client">Client</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Source of Prospect */}
                  <FormField
                    control={form.control}
                    name="prospect_sales_source_of_prospect"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source of Prospect</FormLabel>
                        <FormControl>
                            <Select  onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Source" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Billboard">Billboard</SelectItem>
                              <SelectItem value="Facebook Lead">Facebook Lead</SelectItem>
                              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                              <SelectItem value="Call">Call</SelectItem>
                              <SelectItem value="Email">Email</SelectItem>
                              <SelectItem value="Recommendation">Recommendation</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="prospect_sales_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter phone number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Contact Whatsapp */}
                  <FormField
                    control={form.control}
                    name="prospect_sales_contact_whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Whatsapp</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter WhatsApp number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Civility */}
                  <FormField
                    control={form.control}
                    name="prospect_sales_civility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Civility</FormLabel>
                        <FormControl>
                            <Select  onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Civility" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mr">Mr</SelectItem>
                              <SelectItem value="Mrs">Mrs</SelectItem>
                              <SelectItem value="Miss">Miss</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Name and Surname */}
                  <FormField
                    control={form.control}
                    name="prospect_sales_name_surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name and Surname</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter Name and Surname" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="prospect_sales_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Marital Status */}
                  <FormField
                    control={form.control}
                    name="prospect_sales_marital_status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marital Status</FormLabel>
                        <FormControl>
                            <Select  onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Marital Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Single">Single</SelectItem>
                              <SelectItem value="Married">Married</SelectItem>
                              <SelectItem value="Divorced">Divorced</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Do you have children? */}
                  <FormField
                    control={form.control}
                    name="prospect_sales_children"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you have children?</FormLabel>
                        <FormControl>
                            <Select  onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
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

                  {/* Profession */}
                  <FormField
                    control={form.control}
                    name="prospect_sales_profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter Profession" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                </div></div>  
              <div className="space-y-5">   
                 <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                 Information on the need
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
                 {/* Type of Need */}
      <FormField
        control={form.control}
        name="prospect_sales_type_of_need"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type of Need</FormLabel>
            <FormControl>
              <Select
             {...field}
                onValueChange={field.onChange}
                value={field.value ||defaultNeedValue}
                disabled={disabledNeedField}  // Set value here
              >
                <SelectTrigger >
                  <SelectValue placeholder="Select Type of Need" />
                </SelectTrigger>
                <SelectContent >
               
                
                      <SelectItem value="Location">Location</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="Purchase">Purchase</SelectItem>
              


                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />


<FormField
  control={form.control}
  name="prospect_sales_type_of_property"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Type of Property</FormLabel>
      <FormControl>
          <Select  onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type of Property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Building">Building</SelectItem>
            <SelectItem value="Studio">Studio</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
            <SelectItem value="Bureau">Bureau</SelectItem>
            <SelectItem value="Terrain">Terrain</SelectItem>
            <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
            <SelectItem value="Villa Triplex">Villa Triplex</SelectItem>
            <SelectItem value="Villa Duplex">Villa Duplex</SelectItem>
            <SelectItem value="Villa Basse">Villa Basse</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
{defaultNeedValue === "Management" && (
  <>
   
    <FormField
      control={form.control}
      name="prospect_sales_management_rentals"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Number of Rentals</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="Enter Number of Rentals"
              min="0"
              onChange={(e) => field.onChange(Number(e.target.value))} // Convert string to number
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Rental Income */}
    <FormField
      control={form.control}
      name="prospect_sales_management_rentals_income"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Rental Income</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="Enter Rental Income"
              min="0"
              onChange={(e) => field.onChange(Number(e.target.value))} // Convert string to number
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

  

    {/* Management Percentage */}
    <FormField
      control={form.control}
      name="prospect_sales_management_percentage"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Management Percentage (%)</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="Enter Management Percentage"
              min="0"
              max="100"
              onChange={(e) => field.onChange(Number(e.target.value))} // Convert string to number
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
)}
{defaultNeedValue === "Purchase" && (
  <>
    {/* Budget Minimum */}
    <FormField
      control={form.control}
      name="prospect_sales_purchase_budget_min"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Budget Minimum</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="Enter Budget Minimum"
              min="0"
              onChange={(e) => field.onChange(Number(e.target.value))} // Convert string to number
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Budget Maximum */}
    <FormField
      control={form.control}
      name="prospect_sales_purchase_budget_max"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Budget Maximum</FormLabel>
          <FormControl>
            <Input
              {...field}
              type="number"
              placeholder="Enter Budget Maximum"
              min="0"  onChange={(e) => field.onChange(Number(e.target.value))} // Convert string to number
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
)}

                </div>


               
                <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
    Location of the Property
  </h2>

  {/* Form Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

    {/* Would */}
  <div className="grid grid-cols-5 gap-2 items-center">
    <FormField
      control={form.control}
      name="prospect_sales_would"
      render={({ field }) => (
        <FormItem className="col-span-4 ">
          <FormLabel>Would</FormLabel>
          <FormControl>
              <Select  onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
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
<div className="pt-5">
    <AddCityForm /></div>
</div>
    {/* Municipality */}
    <div className="grid grid-cols-5 gap-2 items-center">
    <FormField
      control={form.control}
      name="prospect_sales_municipality"
      render={({ field }) => (
        <FormItem className="col-span-4 ">
          <FormLabel>Municipality</FormLabel>
          <FormControl>
              <Select  onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Municipality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Downtown">Downtown</SelectItem>
                <SelectItem value="Uptown">Uptown</SelectItem>
                <SelectItem value="Suburban">Suburban</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
<div className="pt-5">
    <AddMunicipalityForm /></div>
</div>
    {/* Neighborhood */}

    <div className="grid grid-cols-5 gap-2 items-center">
    <FormField
      control={form.control}
      name="prospect_sales_neighborhood"
      render={({ field }) => (
        <FormItem className="col-span-4 ">
          <FormLabel>Neighborhood</FormLabel>
          <FormControl>
              <Select  onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Neighborhood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Central">Central</SelectItem>
                <SelectItem value="Eastside">Eastside</SelectItem>
                <SelectItem value="Westside">Westside</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <div className="pt-5">
    <AddNeighborhoodForm /></div>
</div>

                </div>
                <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
        Description (Additional description of the property)
      </h2>

   
    
      <FormField
  control={form.control}
  name="prospect_sales_description"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Description</FormLabel>
      <FormControl>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-white dark:text-white"
          >
            Content
          </label>
          <TinyMCEEditor
            apiKey="g0zqs3p6v9zx7zhnrzgdphkxjcz3dvgt6kl7bxln19etxto6"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
            value={field.value || ""}
            onEditorChange={(content) => {
              field.onChange(content); // Use field.onChange to update React Hook Form state
            }}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

                </div>
                <div className="space-y-5">   
                <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              PHOTO AND DOCUMENTS
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <ProfilePicUploader
                  profilePic={form.watch("prospect_sales_photo") || ""}
                  onChange={(url) => form.setValue("prospect_sales_photo", url)}
                />
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block h-50"
              />
              <FileUploader
                onChange={(files) => form.setValue("prospect_sales_documents", files)}
                maxFiles={5}
                addedFiles={form.watch("prospect_sales_documents") || []}
              />
            </div>
                </div>
                </Stepper>
                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
