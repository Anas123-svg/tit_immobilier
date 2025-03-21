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
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { Client } from "@/types/DataProps";
import { Edit } from "lucide-react";
import { useFormUpdate } from "@/hooks/useFormUpdate";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import pfp from "@/assets/avatar-default.png"
const FormSchema = z.object({
  id:z.number().optional(),
  private_pronouns: z.string().optional(),
  surname: z.string(),
  private_name: z.string(),
  private_gender: z.string().optional(),
  private_birth_date: z.string().optional(),
  private_place_of_birth: z.string().optional(),
  private_address: z.string().optional(),
  private_nationality: z.string().optional(),
  private_document_type: z.string().optional(),
  private_document_number: z.string().optional(),
  private_date_of_issue: z.string().optional(),
  private_expiry_date: z.string().optional(),
  private_taxpayer_identification_number: z.string().optional(),
  private_occupation: z.string().optional(),
  private_contact: z.string().optional(),
  private_whatsapp_contact: z.string().optional(),
  private_email: z.string().email({ message: "Invalid email address" }).optional(),
  private_mail_box: z.string().optional(),
  private_marital_status: z.string().optional(),
  private_number_of_children: z.number().optional(),
  private_emergency_contact_name: z.string(),
  private_emergency_contact: z.string().optional(),
  private_emergency_contact_relation: z.string().optional(),
  private_signatory_authority: z.string().optional(),
  private_photo: z.string().optional(),
  private_documents: z.array(z.string()).optional(),
  is_business_client: z.boolean(),
});
interface PrivateClientFormProps{
  client?: Client
}
const PrivateClientForm :React.FC< PrivateClientFormProps> = ({client}) => {
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
  setIsSubmitting(false);
};

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: client?.id, // Default to 0 if client id is missing
      private_pronouns: client?.private_pronouns ?? "", // Default to empty string
      private_name: client?.private_name ?? "", // Default to empty string
      surname: client?.surname ?? "", // Default to empty string
      private_gender: client?.private_gender ?? "", // Default to empty string
      private_birth_date: client?.private_birth_date ?? "", // Default to empty string
      private_place_of_birth: client?.private_place_of_birth ?? "", // Default to empty string
      private_address: client?.private_address ?? "", // Default to empty string
      private_nationality: client?.private_nationality ?? "", // Default to empty string
      private_document_type: client?.private_document_type ?? "", // Default to empty string
      private_document_number: client?.private_document_number ?? "", // Default to empty string
      private_date_of_issue: client?.private_date_of_issue ?? "", // Default to empty string
      private_signatory_authority: client?.private_signatory_authority ?? "", // Default to empty string
      private_expiry_date: client?.private_expiry_date ?? "", // Default to empty string
      private_taxpayer_identification_number: client?.private_taxpayer_identification_number ?? "", // Default to empty string
      private_occupation: client?.private_occupation ?? "", // Default to empty string
      private_contact: client?.private_contact ?? "", // Default to empty string
      private_whatsapp_contact: client?.private_whatsapp_contact ?? "", // Default to empty string
      private_email: client?.private_email ?? "", // Default to empty string
      private_mail_box: client?.private_mail_box ?? "", // Default to empty string
      private_marital_status: client?.private_marital_status ?? "", // Default to empty string
      private_number_of_children: client?.private_number_of_children ?? 0, // Default to 0 if missing
      private_emergency_contact_name: client?.private_emergency_contact_name ?? "", // Default to empty string
      private_emergency_contact: client?.private_emergency_contact ?? "", // Default to empty string
      private_emergency_contact_relation: client?.private_emergency_contact_relation ?? "", // Default to empty string
      private_photo: client?.private_photo ??pfp, // Default to empty string or default photo URL
      private_documents: client?.private_documents ?? [], // Default to empty array
      is_business_client:  false, 
      // id: 0, // Dummy ID
      // private_pronouns: "He/Him", // Dummy pronouns
      // private_name: "John", // Dummy name
      // surname: "Doe", // Dummy surname
      // private_gender: "Male", // Dummy gender
      // private_birth_date: "1990-01-01", // Dummy birth date
      // private_place_of_birth: "New York", // Dummy place of birth
      // private_address: "1234 Elm Street, NY", // Dummy address
      // private_nationality: "American", // Dummy nationality
      // private_document_type: "Passport", // Dummy document type
      // private_document_number: "P123456789", // Dummy document number
      // private_date_of_issue: "2015-06-01", // Dummy date of issue
      // private_signatory_authority: "Government", // Dummy authority
      // private_expiry_date: "2025-06-01", // Dummy expiry date
      // private_taxpayer_identification_number: "123-45-6789", // Dummy TIN
      // private_occupation: "Software Engineer", // Dummy occupation
      // private_contact: "555-1234", // Dummy contact number
      // private_whatsapp_contact: "+1-555-1234", // Dummy WhatsApp contact
      // private_email: "john.doe@example.com", // Dummy email
      // private_mail_box: "PO Box 1234", // Dummy mail box
      // private_marital_status: "Single", // Dummy marital status
      // private_number_of_children: 2, // Dummy number of children
      // private_emergency_contact_name: "Jane Doe", // Dummy emergency contact name
      // private_emergency_contact: "555-5678", // Dummy emergency contact number
      // private_emergency_contact_relation: "Sister", // Dummy relationship
      // private_photo: "https://example.com/photo.jpg", // Dummy photo URL
      // private_documents: ["https://example.com/document1.pdf", "https://example.com/document2.pdf"], // Dummy documents
      // is_business_client: false, // Dummy status for business client
    },
  });

  const apiUrl = import.meta.env.VITE_API_URL + '/api/clients';
   const onSubmit = client
     ? useFormUpdate<typeof FormSchema>(apiUrl)  // Update if client exists
     : useFormSubmit<typeof FormSchema>(apiUrl); // Create if no client
 
  return (
    <Dialog open={open} onOpenChange={openChange}>
 
      <DialogTrigger>{ client?    <button className="p-2 bg-blue-100 rounded-full shadow hover:bg-blue-200">
      <Edit size={25} className="text-blue-700" /></button>:`Private Client`}</DialogTrigger>

      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
          Add a private Client
        </DialogTitle>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOpenDialog)}className="space-y-6">
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              PRIVATE Client DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="private_pronouns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pronouns</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        switch (value) {
                          case "he/him":
                            form.setValue("private_gender", "Male");
                            break;
                          case "she/her":
                            form.setValue("private_gender", "Female");
                            break;
                          case "they/them":
                            form.setValue("private_gender", "Non-binary");
                            break;
                          default:
                            form.setValue("private_gender", "");
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
                name="private_gender"
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
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />  <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Surname</FormLabel>
                  <FormControl>
                    <Input placeholder="Surname" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="private_birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Birth Date" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_place_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Place of Birth</FormLabel>
                    <FormControl>
                      <Input placeholder="Place of Birth" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <FormControl>
                      <Input placeholder="Nationality" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_document_type"
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
                name="private_document_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Document Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Document Number" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_date_of_issue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Issue</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Date of Issue"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              /> {/* Signatory Authority Field */}
              <FormField
                  control={form.control}
                  name="private_signatory_authority"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Signatory Authority</FormLabel>
                          <Input {...field} placeholder="Enter Signatory Authority" />
                          <FormMessage className="text-xs" />
                      </FormItem>
                  )}
              />
              <FormField
                control={form.control}
                name="private_expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="Expiry Date" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_taxpayer_identification_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taxpayer Identification Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Taxpayer Identification Number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Occupation</FormLabel>
                    <FormControl>
                      <Input placeholder="Occupation" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_whatsapp_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Whatsapp Contact" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_mail_box"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PO Box</FormLabel>
                    <FormControl>
                      <Input placeholder="PO Box" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_marital_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Marital Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            
              <FormField
                control={form.control}
                name="private_number_of_children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Children</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Number of Children"
                        {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
    
            </div>
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              EMERGENCY CONTACT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="private_emergency_contact_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Emergency Contact Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_emergency_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Emergency Contact" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_emergency_contact_relation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact Relation</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Relation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                  profilePic={form.watch("private_photo") || ""}
                  onChange={(url) => form.setValue("private_photo", url)}
                />
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block h-50"
              />
              <Uploader
                onChange={(files) => form.setValue("private_documents", files)}
                maxFiles={5}
                addedFiles={form.watch("private_documents") || []}
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

export default PrivateClientForm;
