import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
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
const FormSchema = z.object({
  business_company_name: z.string().min(1, "Company Name is required"),
  business_taxpayer_account_number: z.string().min(1, "Taxpayer Account Number is required"),
  business_business_registration_number: z.string().min(1, "Business Registration Number is required"),
  business_industry_sector: z.string().min(1, "Industry Sector is required"),
  business_office_phone_number: z.string().min(1, "Office Phone Number is required"),
  business_whatsapp_contact: z.string().min(1, "WhatsApp Contact is required"),
  business_email: z.string().email("Valid Email is required"),
  business_head_office: z.string().min(1, "Head Office is required"),
  business_mail_box: z.string().min(1, "Mail Box is required"),
  business_capital: z.number().min(1, "Capital is required"),
  business_manager_pronouns_title: z.string().min(1, "Manager's Pronouns Title is required"),
  business_manager_name: z.string().min(1, "Manager's Name is required"),
  business_manager_gender: z.string().min(1, "Manager's Gender is required"),
  business_manager_contact: z.string().min(1, "Manager's Contact is required"),
  business_manager_date_of_birth: z.string().min(1, "Manager's Date of Birth is required"),
  business_manager_place_of_birth: z.string().min(1, "Manager's Place of Birth is required"),
  business_manager_address: z.string().min(1, "Manager's Address is required"),
  business_manager_job_position: z.string().min(1, "Manager's Job Position is required"),
  business_manager_type_of_document: z.string().min(1, "Manager's Document Type is required"),
  business_manager_document_number: z.string().min(1, "Manager's Document Number is required"),
  business_manager_date_of_issue: z.string().min(1, "Manager's Date of Issue is required"),
  business_manager_authorizing_authority: z.string().min(1, "Manager's Authorizing Authority is required"),
  business_manager_expiry_date: z.string().min(1, "Manager's Expiry Date is required"),
  business_photo: z.string().optional(),
  business_documents: z.array(z.string()).optional(),
  is_business_tenant:z.boolean()
});

// Functional component for business tenant form
const BusinessTenantForm = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      business_company_name: "ABC Enterprises",  // Example company name
      business_taxpayer_account_number: "TAX12345678",  // Example taxpayer number
      business_business_registration_number: "REG987654",  // Example business registration
      business_industry_sector: "Technology",  // Example industry sector
      business_office_phone_number: "+1234567890",  // Example office phone
      business_whatsapp_contact: "+1987654321",  // Example WhatsApp number
      business_email: "info@abc-enterprises.com",  // Example business email
      business_head_office: "123 Business Street, City, Country",  // Example head office address
      business_mail_box: "PO Box 456",  // Example mail box
      business_capital: 500000,  // Example capital amount
      business_manager_pronouns_title: "Mr.",  // Example pronoun title
      business_manager_name: "John Doe",  // Example manager name
      business_manager_gender: "Male",  // Example manager gender
      business_manager_contact: "+1122334455",  // Example manager contact
      business_manager_date_of_birth: "1985-06-15",  // Example DOB
      business_manager_place_of_birth: "City, Country",  // Example place of birth
      business_manager_address: "789 Manager Avenue, City, Country",  // Example manager address
      business_manager_job_position: "CEO",  // Example job position
      business_manager_type_of_document: "Passport",  // Example document type
      business_manager_document_number: "P123456789",  // Example document number
      business_manager_date_of_issue: "2015-08-20",  // Example date of issue
      business_manager_authorizing_authority: "Govt. Agency",  // Example authorizing authority
      business_manager_expiry_date: "2030-08-20",  // Example expiry date
      business_photo: "https://example.com/photo.jpg",  // Example photo URL
      business_documents: [
        "https://example.com/doc1.pdf",
        "https://example.com/doc2.pdf",
      ],  
      is_business_tenant:true
    },
  });
  
  const apiUrl = import.meta.env.VITE_API_URL + '/api/tenants';
        const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
      

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Business Form</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add or Edit Business Tenant</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  COMPANY DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
    name="business_taxpayer_account_number"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Taxpayer Account Number</FormLabel>
        <FormControl>
          <Input {...field} placeholder="Taxpayer Account Number" />
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
          <Input {...field} placeholder="Business Registration Number" />
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
    name="business_mail_box"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Mail Box</FormLabel>
        <FormControl>
          <Input {...field} placeholder="Mail Box" />
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
          <Input type="number" {...field} placeholder="Capital" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>   <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
MANAGER DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Pronouns Field */}
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
  {/* Name Field */}
  <FormField
    control={form.control}
    name="business_manager_name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Name</FormLabel>
        <Input {...field} placeholder="Enter Manager's Full Name" />
        <FormMessage className="text-xs" />
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
  {/* Contact Field */}
  <FormField
    control={form.control}
    name="business_manager_contact"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Contact</FormLabel>
        <Input {...field} placeholder="Enter Contact Number" />
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
  {/* Date of Birth Field */}
  <FormField
    control={form.control}
    name="business_manager_date_of_birth"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Date of Birth</FormLabel>
        <Input type="date" {...field} />
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
  {/* Place of Birth Field */}
  <FormField
    control={form.control}
    name="business_manager_place_of_birth"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Place of Birth</FormLabel>
        <Input {...field} placeholder="Enter Place of Birth" />
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
  {/* Address Field */}
  <FormField
    control={form.control}
    name="business_manager_address"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Address</FormLabel>
        <Input {...field} placeholder="Enter Address" />
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
  {/* Job Position Field */}
  <FormField
    control={form.control}
    name="business_manager_job_position"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Job Position</FormLabel>
        <Input {...field} placeholder="Enter Job Position" />
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
  {/* Document Type Field */}
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
  {/* Document Number Field */}
  <FormField
    control={form.control}
    name="business_manager_document_number"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Document Number</FormLabel>
        <Input {...field} placeholder="Enter Document Number" />
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
  {/* Date of Issue Field */}
  <FormField
    control={form.control}
    name="business_manager_date_of_issue"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Date of Issue</FormLabel>
        <Input type="date" {...field} />
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
  {/* Authorizing Authority Field */}
  <FormField
    control={form.control}
    name="business_manager_authorizing_authority"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Authorizing Authority</FormLabel>
        <Input {...field} placeholder="Enter Authorizing Authority" />
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
  {/* Expiry Date Field */}
  <FormField
    control={form.control}
    name="business_manager_expiry_date"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Expiry Date</FormLabel>
        <Input type="date" {...field} />
        <FormMessage className="text-xs" />
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
                onChange={(files:any) => form.setValue("business_documents", files)}
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

export default BusinessTenantForm;
