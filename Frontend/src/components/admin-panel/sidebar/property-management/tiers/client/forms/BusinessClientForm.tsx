import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,DialogDescription
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
import pfp from "@/assets/avatar-default.png"
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { Client } from "@/types/DataProps";
import { useForceUpdate } from "framer-motion";
import { useFormUpdate } from "@/hooks/useFormUpdate";
import { Edit } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const FormSchema = z.object({
  id:z.number().optional(),
  business_company_name: z.string(),
  business_taxpayer_identification_number: z.string().optional(),
  business_business_registration_number: z.string().optional(),
  business_industry_sector: z.string().optional(),
  business_office_phone_number: z.string().optional(),
  business_whatsapp_contact: z.string().optional(),
  business_email: z.string().email({ message: "Invalid email address" }).optional(),
  business_head_office: z.string().optional(),
  business_mail_box: z.string().optional(),
  business_capital: z.number().optional(),
  business_manager_pronouns_title: z.string().optional(),
  business_manager_name: z.string(),
  business_manager_gender: z.string().optional(),
  business_manager_contact: z.string().optional(),
  business_manager_date_of_birth: z.string().optional(),
  business_manager_place_of_birth: z.string().optional(),
  business_manager_address: z.string().optional(),
  business_manager_job_position: z.string().optional(),
  business_manager_type_of_document: z.string().optional(),
  business_manager_document_number: z.string().optional(),
  business_manager_date_of_issue: z.string().optional(),
  business_manager_signatory_authority: z.string().optional(),
  business_manager_expiry_date: z.string().optional(),
  business_photo: z.string().optional(),
  business_documents: z.array(z.string()).optional(),
  is_business_client: z.boolean(),
});
interface BusinessClientFormProps{
  client?: Client
}
const BusinessClientForm:React.FC< BusinessClientFormProps> = ({client}) => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };
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
  setOpenDialog(false); // Close dialog after submission
};


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: client?.id || 0, // number defaults to 0
      business_company_name: client?.business_company_name || "", // string defaults to ""
      business_taxpayer_identification_number: client?.business_taxpayer_identification_number || "", // string defaults to ""
      business_business_registration_number: client?.business_business_registration_number || "", // string defaults to ""
      business_industry_sector: client?.business_industry_sector || "", // string defaults to ""
      business_office_phone_number: client?.business_office_phone_number || "", // string defaults to ""
      business_whatsapp_contact: client?.business_whatsapp_contact || "", // string defaults to ""
      business_email: client?.business_email || "", // string defaults to ""
      business_head_office: client?.business_head_office || "", // string defaults to ""
      business_mail_box: client?.business_mail_box || "", // string defaults to ""
      business_capital: client?.business_capital || 0, // number defaults to 0
      business_manager_pronouns_title: client?.business_manager_pronouns_title || "", // string defaults to ""
      business_manager_name: client?.business_manager_name || "", // string defaults to ""
      business_manager_gender: client?.business_manager_gender || "", // string defaults to ""
      business_manager_contact: client?.business_manager_contact || "", // string defaults to ""
      business_manager_date_of_birth: client?.business_manager_date_of_birth || "", // string defaults to ""
      business_manager_place_of_birth: client?.business_manager_place_of_birth || "", // string defaults to ""
      business_manager_address: client?.business_manager_address || "", // string defaults to ""
      business_manager_job_position: client?.business_manager_job_position || "", // string defaults to ""
      business_manager_type_of_document: client?.business_manager_type_of_document || "", // string defaults to ""
      business_manager_document_number: client?.business_manager_document_number || "", // string defaults to ""
      business_manager_date_of_issue: client?.business_manager_date_of_issue || "", // string defaults to ""
      business_manager_signatory_authority: client?.business_manager_signatory_authority || "", // string defaults to ""
      business_manager_expiry_date: client?.business_manager_expiry_date || "", // string defaults to ""
      business_photo: client?.business_photo ?? pfp , // string defaults to ""
      business_documents: client?.business_documents || [], // array defaults to []
      is_business_client: true, // boolean defaults to true
    }
    
  });
  const apiUrl = import.meta.env.VITE_API_URL + '/api/clients';
  const onSubmit = client
    ? useFormUpdate<typeof FormSchema>(apiUrl)  // Update if client exists
    : useFormSubmit<typeof FormSchema>(apiUrl); // Create if no client

  return (
    <Dialog open={open} onOpenChange={openChange}>
    <DialogTrigger>{ client?    <button className="p-2 bg-blue-100 rounded-full shadow hover:bg-blue-200">
      <Edit size={25} className="text-blue-700" /></button>:`Business Client`}</DialogTrigger>

      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
          Add a business Client
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleOpenDialog)}className="space-y-6">
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
                name="business_mail_box"
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
                    <Input  {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} type="number" placeholder="Capital" />
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
                    <Select {...field} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                      
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
                name="business_manager_signatory_authority"
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
            <Button type="submit" className="w-full mt-4 bg-primary">
        Submit
      </Button>

      {/* Alert Dialog for Confirmation */}
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogTrigger asChild />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
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

export default BusinessClientForm;
