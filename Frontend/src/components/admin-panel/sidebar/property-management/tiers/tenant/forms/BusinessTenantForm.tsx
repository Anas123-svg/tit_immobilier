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
import { Tenant } from "@/types/DataProps";
import { useFormUpdate } from "@/hooks/useFormUpdate";
import { Edit } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import pfp from "@/assets/avatar-default.png"
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
  is_business_tenant:z.boolean(),
  id:z.number().optional(),
});
interface BusinessTenantFormProps {
  tenant?: Tenant;
}

// Functional component for business tenant form
const BusinessTenantForm: React.FC<BusinessTenantFormProps> = ({ tenant }) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

 // Open confirmation dialog
 const handleOpenDialog = () => {
  setOpenDialog(true);
};

// Close confirmation dialog
const handleCloseDialog = () => {
  setOpenDialog(false);
};

// Handle confirm submit
const handleConfirmSubmit = () => {
  setIsSubmitting(true);
  form.handleSubmit(onSubmit)(); // Submit the form
  setOpen(false); // Close dialog after submission

  setIsSubmitting(false);
};
  
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // id: tenant?.id ?? 1,
      // business_company_name: tenant?.business_company_name || "ABC Enterprises",  // Default if tenant's company name is undefined
      // business_taxpayer_account_number: tenant?.business_taxpayer_account_number || "TAX12345678",  // Default if tenant's taxpayer account number is undefined
      // business_business_registration_number: tenant?.business_business_registration_number || "REG987654",  // Default if tenant's registration number is undefined
      // business_industry_sector: tenant?.business_industry_sector || "Technology",  // Default if tenant's industry sector is undefined
      // business_office_phone_number: tenant?.business_office_phone_number || "+1234567890",  // Default if tenant's office phone number is undefined
      // business_whatsapp_contact: tenant?.business_whatsapp_contact || "+1987654321",  // Default if tenant's WhatsApp contact is undefined
      // business_email: tenant?.business_email || "info@abc-enterprises.com",  // Default if tenant's email is undefined
      // business_head_office: tenant?.business_head_office || "123 Business Street, City, Country",  // Default if tenant's head office is undefined
      // business_mail_box: tenant?.business_mail_box || "PO Box 456",  // Default if tenant's mail box is undefined
      // business_capital: tenant?.business_capital ?? 500000,  // Default if tenant's capital is undefined
      // business_manager_pronouns_title: tenant?.business_manager_pronouns_title || "Mr.",  // Default if tenant's manager pronouns title is undefined
      // business_manager_name: tenant?.business_manager_name || "John Doe",  // Default if tenant's manager name is undefined
      // business_manager_gender: tenant?.business_manager_gender || "Male",  // Default if tenant's manager gender is undefined
      // business_manager_contact: tenant?.business_manager_contact || "+1122334455",  // Default if tenant's manager contact is undefined
      // business_manager_date_of_birth: tenant?.business_manager_date_of_birth || "1985-06-15",  // Default if tenant's manager DOB is undefined
      // business_manager_place_of_birth: tenant?.business_manager_place_of_birth || "City, Country",  // Default if tenant's manager place of birth is undefined
      // business_manager_address: tenant?.business_manager_address || "789 Manager Avenue, City, Country",  // Default if tenant's manager address is undefined
      // business_manager_job_position: tenant?.business_manager_job_position || "CEO",  // Default if tenant's manager job position is undefined
      // business_manager_type_of_document: tenant?.business_manager_type_of_document || "Passport",  // Default if tenant's manager document type is undefined
      // business_manager_document_number: tenant?.business_manager_document_number || "P123456789",  // Default if tenant's manager document number is undefined
      // business_manager_date_of_issue: tenant?.business_manager_date_of_issue || "2015-08-20",  // Default if tenant's manager document issue date is undefined
      // business_manager_authorizing_authority: tenant?.business_manager_authorizing_authority || "Govt. Agency",  // Default if tenant's manager authorizing authority is undefined
      // business_manager_expiry_date: tenant?.business_manager_expiry_date || "2030-08-20",  // Default if tenant's manager document expiry date is undefined
      // business_photo: tenant?.business_photo || "https://example.com/photo.jpg",  // Default if tenant's photo is undefined
      // business_documents: tenant?.business_documents || ["https://example.com/doc1.pdf", "https://example.com/doc2.pdf"],  // Default if tenant's documents are undefined
      // is_business_tenant: tenant?.is_business_tenant ?? true,  // Default if tenant's tenant status is undefined


        id: tenant?.id ,
      business_company_name: tenant?.business_company_name || "",  // Default if tenant's company name is undefined
      business_taxpayer_account_number: tenant?.business_taxpayer_account_number || "",  // Default if tenant's taxpayer account number is undefined
      business_business_registration_number: tenant?.business_business_registration_number || "",  // Default if tenant's registration number is undefined
      business_industry_sector: tenant?.business_industry_sector || "",  // Default if tenant's industry sector is undefined
      business_office_phone_number: tenant?.business_office_phone_number || "",  // Default if tenant's office phone number is undefined
      business_whatsapp_contact: tenant?.business_whatsapp_contact || "",  // Default if tenant's WhatsApp contact is undefined
      business_email: tenant?.business_email || "",  // Default if tenant's email is undefined
      business_head_office: tenant?.business_head_office || "",  // Default if tenant's head office is undefined
      business_mail_box: tenant?.business_mail_box || "",  // Default if tenant's mail box is undefined
      business_capital: tenant?.business_capital ?? 0,  // Default if tenant's capital is undefined
      business_manager_pronouns_title: tenant?.business_manager_pronouns_title || "",  // Default if tenant's manager pronouns title is undefined
      business_manager_name: tenant?.business_manager_name || "",  // Default if tenant's manager name is undefined
      business_manager_gender: tenant?.business_manager_gender || "",  // Default if tenant's manager gender is undefined
      business_manager_contact: tenant?.business_manager_contact || "",  // Default if tenant's manager contact is undefined
      business_manager_date_of_birth: tenant?.business_manager_date_of_birth || "",  // Default if tenant's manager DOB is undefined
      business_manager_place_of_birth: tenant?.business_manager_place_of_birth || "",  // Default if tenant's manager place of birth is undefined
      business_manager_address: tenant?.business_manager_address || "",  // Default if tenant's manager address is undefined
      business_manager_job_position: tenant?.business_manager_job_position || "",  // Default if tenant's manager job position is undefined
      business_manager_type_of_document: tenant?.business_manager_type_of_document || "",  // Default if tenant's manager document type is undefined
      business_manager_document_number: tenant?.business_manager_document_number || "",  // Default if tenant's manager document number is undefined
      business_manager_date_of_issue: tenant?.business_manager_date_of_issue || "",  // Default if tenant's manager document issue date is undefined
      business_manager_authorizing_authority: tenant?.business_manager_authorizing_authority || "",  // Default if tenant's manager authorizing authority is undefined
      business_manager_expiry_date: tenant?.business_manager_expiry_date || "",  // Default if tenant's manager document expiry date is undefined
      business_photo: tenant?.business_photo || pfp,  // Default if tenant's photo is undefined
      business_documents: tenant?.business_documents || [],  // Default if tenant's documents are undefined
      is_business_tenant:  true,  // Default if tenant's tenant status is undefined
      
      
    }
  });
  
  const apiUrl = import.meta.env.VITE_API_URL + '/api/tenants';
       const onSubmit = tenant
         ? useFormUpdate<typeof FormSchema>(apiUrl)  // Update if client exists
         : useFormSubmit<typeof FormSchema>(apiUrl); // Create if no client
     

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
       <DialogTrigger>{ tenant?    <div className="p-2 bg-blue-100 rounded-full shadow hover:bg-blue-200">
      <Edit size={25} className="text-blue-700" /></div>:`Business Tenant`}</DialogTrigger>

    
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add or Edit Business Tenant</DialogTitle>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOpenDialog)}className="space-y-6">

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

            <Button type="submit" className="w-full mt-4 bg-primary">
        Submit
      </Button>

      {/* Alert Dialog for Confirmation */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogTrigger asChild />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-primary">Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit the form? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit} disabled={isSubmitting}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessTenantForm;
