import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { useFormUpdate } from "@/hooks/useFormUpdate";
import { Owner } from "@/types/DataProps";
import { Edit } from "lucide-react";

const FormSchema = z.object({
  id:z.number(),
  business_company_name: z.string().nonempty({ message: "Company Name is required" }),
  business_taxpayer_identification_number: z.string().nonempty({ message: "Taxpayer Identification Number is required" }),
  business_business_registration_number: z.string().nonempty({ message: "Business Registration Number is required" }),
  business_industry_sector: z.string().nonempty({ message: "Industry Sector is required" }),
  business_office_phone_number: z.string().nonempty({ message: "Office Phone Number is required" }),
  business_whatsapp_contact: z.string().nonempty({ message: "Whatsapp Contact is required" }),
  business_email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
  business_head_office: z.string().nonempty({ message: "Head Office is required" }),
  business_po_box: z.string().nonempty({ message: "PO Box is required" }),
  business_capital: z.number().min(1, { message: "Capital is required" }),
  business_manager_pronouns_title: z.string().nonempty({ message: "Pronouns is required" }),
  business_manager_name: z.string().nonempty({ message: "Manager Name is required" }),
  business_manager_gender: z.string().nonempty({ message: "Manager Gender is required" }),
  business_manager_contact: z.string().nonempty({ message: "Manager Contact is required" }),
  business_manager_date_of_birth: z.string().nonempty({ message: "Date of Birth is required" }),
  business_manager_place_of_birth: z.string().nonempty({ message: "Place of Birth is required" }),
  business_manager_address: z.string().nonempty({ message: "Manager Address is required" }),
  business_manager_job_position: z.string().nonempty({ message: "Manager Job Position is required" }),
  business_manager_type_of_document: z.string().nonempty({ message: "Manager Document Type is required" }),
  business_manager_document_number: z.string().nonempty({ message: "Manager Document Number is required" }),
  business_manager_date_of_issue: z.string().nonempty({ message: "Manager Document Issue Date is required" }),
  business_manager_authorizing_authority: z.string().nonempty({ message: "Manager Authorizing Authority is required" }),
  business_manager_expiry_date: z.string().nonempty({ message: "Manager Document Expiry Date is required" }),
  business_photo: z.string().optional(),
  business_documents: z.array(z.string()).optional(),
  is_business_owner: z.boolean(),
});

interface BusinessOwnerFormProps{
  owner?: Owner
}
const BusinessOwnerForm: React.FC<BusinessOwnerFormProps> = ({owner}) => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
  
      business_company_name: owner?.business_company_name,
      business_taxpayer_identification_number: owner?.business_taxpayer_identification_number,
      business_business_registration_number: owner?.business_business_registration_number,
      business_industry_sector: owner?.business_industry_sector,
      business_office_phone_number: owner?.business_office_phone_number,
      business_whatsapp_contact: owner?.business_whatsapp_contact,
      business_email: owner?.business_email,
      business_head_office: owner?.business_head_office,
      business_po_box: owner?.business_po_box,
      business_capital: owner?.business_capital,
      business_manager_pronouns_title: owner?.business_manager_pronouns_title,
      business_manager_name: owner?.business_manager_name,
      business_manager_gender: owner?.business_manager_gender,
      business_manager_contact: owner?.business_manager_contact,
      business_manager_date_of_birth: owner?.business_manager_date_of_birth,
      business_manager_place_of_birth: owner?.business_manager_place_of_birth,
      business_manager_address: owner?.business_manager_address,
      business_manager_job_position: owner?.business_manager_job_position,
      business_manager_type_of_document: owner?.business_manager_type_of_document,
      business_manager_document_number: owner?.business_manager_document_number,
      business_manager_date_of_issue: owner?.business_manager_date_of_issue,
      business_manager_authorizing_authority: owner?.business_manager_authorizing_authority,
      business_manager_expiry_date: owner?.business_manager_expiry_date,
      business_photo:owner?.business_photo|| "",
      business_documents: owner?.business_documents||[],
      is_business_owner: owner?.is_business_owner,
      id:owner?.id,
 
    },
  });
       const apiUrl = import.meta.env.VITE_API_URL + '/api/owners';
     const onSubmit = owner
       ? useFormUpdate<typeof FormSchema>(apiUrl)  // Update if client exists
       : useFormSubmit<typeof FormSchema>(apiUrl); // Create if no client
   
  return (
    <Dialog open={open} onOpenChange={openChange}>
           <DialogTrigger>{ owner?    <div className="p-2 bg-blue-100 rounded-full shadow hover:bg-blue-200">
      <Edit size={25} className="text-blue-700" /></div>:`Business Owner`}
      </DialogTrigger>

    
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
          Add a business owner
        </DialogTitle>
        <DialogDescription>
      This dialog allows you to add or edit details for a business owner.
    </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              COMPANY DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="business_company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Company Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_taxpayer_identification_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taxpayer Identification Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Taxpayer Identification Number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_business_registration_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Registration Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Business Registration Number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_industry_sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry Sector</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Industry Sector" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_office_phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Office Phone Number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_whatsapp_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp Contact</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Whatsapp Contact" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_head_office"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Head Office</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Head Office" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_po_box"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PO Box</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="PO Box" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_capital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capital</FormLabel>
                    <FormControl>
                      <Input {...field}    value={field.value ?? ""}  onChange={(e) => field.onChange(Number(e.target.value))} type="number" placeholder="Capital" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              MANAGER DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="business_manager_pronouns_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pronouns</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        switch (value) {
                          case "he/him":
                            form.setValue("business_manager_gender", "Male");
                            break;
                          case "she/her":
                            form.setValue("business_manager_gender", "Female");
                            break;
                          case "they/them":
                            form.setValue(
                              "business_manager_gender",
                              "Non-binary"
                            );
                            break;
                          default:
                            form.setValue("business_manager_gender", "");
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Pronouns" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="he/him">He/Him</SelectItem>
                        <SelectItem value="she/her">She/Her</SelectItem>
                        <SelectItem value="they/them">They/Them</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Gender" disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Contact" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        placeholder="Date of Birth"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_place_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place of Birth</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Place of Birth" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_job_position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Position</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Job Position" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_type_of_document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Document Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="passport">Passport</SelectItem>
                        <SelectItem value="id">ID</SelectItem>
                        <SelectItem value="driver_license">
                          Driver License
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_document_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Document Number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_date_of_issue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Issue</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_authorizing_authority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authorizing Authority</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Authorizing Authority" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="business_manager_expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} placeholder="Expiry Date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              PHOTO AND DOCUMENTS
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <ProfilePicUploader
                  profilePic={form.watch("business_photo") || ""}
                  onChange={(url) => form.setValue("business_photo", url)}
                />
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block h-50"
              />
              <Uploader
                onChange={(files) => form.setValue("business_documents", files)}
                maxFiles={5}
                addedFiles={form.watch("business_documents") || []}
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

export default BusinessOwnerForm;
