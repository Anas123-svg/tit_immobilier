import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

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
import ProfilePicUploader from "@/components/common/profilePicUploader";
import FileUploader from "@/components/common/uploader";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { Tenant } from "@/types/DataProps";
import { useFormUpdate } from "@/hooks/useFormUpdate";
import { Edit } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import pfp from "@/assets/avatar-default.png"
const FormSchema = z.object({
  private_pronouns: z.string().optional(),
  private_name: z.string(),
  surname: z.string(),
  private_gender: z.string().optional(),
  private_birth_date: z.string().optional(),
  private_place_of_birth: z.string().optional(),
  private_address: z.string().optional(),
  private_nationality: z.string().optional(),
  private_document_type: z.string().optional(),
  private_document_number: z.string().optional(),
  private_date_of_issue: z.string().optional(),
  private_expiry_date: z.string().optional(),
  private_taxpayer_account_number: z.string().optional(),
  private_occupation: z.string().optional(),
  private_contact: z.string().optional(),
  private_whatsapp_contact: z.string().optional(),
  private_email: z.string().email({ message: "Invalid email address" }).optional(),
  private_signatory_authority: z.string().optional(),
  private_marital_status: z.string().optional(),
  private_number_of_children: z.number().optional(),
  private_emergency_contact_name: z.string(),
  private_emergency_contact: z.string().optional(),
  private_emergency_contact_relation: z.string().optional(),
  private_photo: z.string().optional(),
  private_documents: z.array(z.string()).optional(),
  private_mail_box: z.string().optional(),
  is_business_tenant:z.boolean(),
  id:z.number().optional(),
});
interface PrivateTenantFormProps {
  tenant?: Tenant;
}

const PrivateTenantForm: React.FC<PrivateTenantFormProps> = ({ tenant }) => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues:   {
      // id: tenant?.id ?? 1,
      // private_name: tenant?.private_name || "Jane Doe",  // Default full name if tenant's private name is undefined
      // private_gender: tenant?.private_gender || "Female",  // Default gender if tenant's private gender is undefined
      // private_birth_date: tenant?.private_birth_date || "1990-05-15",  // Default birth date if tenant's private birth date is undefined
      // private_place_of_birth: tenant?.private_place_of_birth || "New York, USA",  // Default place of birth if tenant's place of birth is undefined
      // private_address: tenant?.private_address || "123 Main Street, New York, USA",  // Default address if tenant's private address is undefined
      // private_nationality: tenant?.private_nationality || "American",  // Default nationality if tenant's nationality is undefined
      // private_document_type: tenant?.private_document_type || "Passport",  // Default document type if tenant's document type is undefined
      // private_document_number: tenant?.private_document_number || "A12345678",  // Default document number if tenant's document number is undefined
      // private_date_of_issue: tenant?.private_date_of_issue || "2015-06-20",  // Default date of issue if tenant's document issue date is undefined
      // private_expiry_date: tenant?.private_expiry_date || "2030-06-20",  // Default expiry date if tenant's document expiry date is undefined
      // private_taxpayer_account_number: tenant?.private_taxpayer_account_number || "TAX987654321",  // Default taxpayer account number if tenant's account number is undefined
      // private_occupation: tenant?.private_occupation || "Software Engineer",  // Default occupation if tenant's occupation is undefined
      // private_contact: tenant?.private_contact || "+11234567890",  // Default phone number if tenant's contact is undefined
      // private_whatsapp_contact: tenant?.private_whatsapp_contact || "+11234567890",  // Default WhatsApp contact if tenant's contact is undefined
      // private_email: tenant?.private_email || "jane.doe@example.com",  // Default email if tenant's email is undefined
      // private_signatory_authority: tenant?.private_signatory_authority || "Self",  // Default signatory authority if tenant's authority is undefined
      // private_marital_status: tenant?.private_marital_status || "Married",  // Default marital status if tenant's marital status is undefined
      // private_number_of_children: tenant?.private_number_of_children ?? 2,  // Default number of children if tenant's number of children is undefined
      // private_emergency_contact_name: tenant?.private_emergency_contact_name || "John Doe",  // Default emergency contact name if tenant's name is undefined
      // private_emergency_contact: tenant?.private_emergency_contact || "+19876543210",  // Default emergency contact number if tenant's number is undefined
      // private_emergency_contact_relation: tenant?.private_emergency_contact_relation || "Spouse",  // Default emergency contact relation if tenant's relation is undefined
      // private_photo: tenant?.private_photo || "https://example.com/jane-doe.jpg",  // Default photo URL if tenant's photo is undefined
      // private_pronouns: tenant?.private_pronouns || "She/Her",  // Default pronouns if tenant's pronouns are undefined
      // private_mail_box: tenant?.private_mail_box || "PO Box 789",  // Default mail box if tenant's mail box is undefined
      // private_documents: tenant?.private_documents || [  // Default documents if tenant's documents are undefined
      //   "https://example.com/document1.pdf",
      //   "https://example.com/document2.pdf"
      // ],
      // is_business_tenant: tenant?.is_business_tenant ?? false,  // Default business tenant status if tenant's status is undefined
    
    id: tenant?.id ,
    private_name: tenant?.private_name || "",
    surname: tenant?.surname || "",  // Default full name if tenant's private name is undefined
    private_gender: tenant?.private_gender || "",  // Default gender if tenant's private gender is undefined
    private_birth_date: tenant?.private_birth_date || "",  // Default birth date if tenant's private birth date is undefined
    private_place_of_birth: tenant?.private_place_of_birth || "",  // Default place of birth if tenant's place of birth is undefined
    private_address: tenant?.private_address || "",  // Default address if tenant's private address is undefined
    private_nationality: tenant?.private_nationality || "",  // Default nationality if tenant's nationality is undefined
    private_document_type: tenant?.private_document_type || "",  // Default document type if tenant's document type is undefined
    private_document_number: tenant?.private_document_number || "",  // Default document number if tenant's document number is undefined
    private_date_of_issue: tenant?.private_date_of_issue|| "",  // Default date of issue if tenant's document issue date is undefined
    private_expiry_date: tenant?.private_expiry_date || "",  // Default expiry date if tenant's document expiry date is undefined
    private_taxpayer_account_number: tenant?.private_taxpayer_account_number || "",  // Default taxpayer account number if tenant's account number is undefined
    private_occupation: tenant?.private_occupation || "",  // Default occupation if tenant's occupation is undefined
    private_contact: tenant?.private_contact || "",  // Default phone number if tenant's contact is undefined
    private_whatsapp_contact: tenant?.private_whatsapp_contact || "",  // Default WhatsApp contact if tenant's contact is undefined
    private_email: tenant?.private_email || "",  // Default email if tenant's email is undefined
    private_signatory_authority: tenant?.private_signatory_authority || "",  // Default signatory authority if tenant's authority is undefined
    private_marital_status: tenant?.private_marital_status || "",  // Default marital status if tenant's marital status is undefined
    private_number_of_children: tenant?.private_number_of_children ?? 0,  // Default number of children if tenant's number of children is undefined
    private_emergency_contact_name: tenant?.private_emergency_contact_name || "",  // Default emergency contact name if tenant's name is undefined
    private_emergency_contact: tenant?.private_emergency_contact || "",  // Default emergency contact number if tenant's number is undefined
    private_emergency_contact_relation: tenant?.private_emergency_contact_relation || "",  // Default emergency contact relation if tenant's relation is undefined
    private_photo: tenant?.private_photo || pfp,  // Default photo URL if tenant's photo is undefined
    private_pronouns: tenant?.private_pronouns || "",  // Default pronouns if tenant's pronouns are undefined
    private_mail_box: tenant?.private_mail_box || "",  // Default mail box if tenant's mail box is undefined
    private_documents: tenant?.private_documents || [ ],
    is_business_tenant: false,  // Default business tenant status if tenant's status is undefined
  }

    
  });

  const apiUrl = import.meta.env.VITE_API_URL + '/api/tenants';
          const onSubmit = tenant
             ? useFormUpdate<typeof FormSchema>(apiUrl)  // Update if client exists
             : useFormSubmit<typeof FormSchema>(apiUrl); // Create if no client
         
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
             
  return (
    <Dialog open={open} onOpenChange={openChange}>
         <DialogTrigger>{ tenant?    <div className="p-2 bg-blue-100 rounded-full shadow hover:bg-blue-200">
      <Edit size={25} className="text-blue-700" /></div>:`Private Tenant`}</DialogTrigger>

      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
          Add a private Tenant
        </DialogTitle>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOpenDialog)}className="space-y-6">
   
  <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
    DETAILS ON THE INDIVIDUAL
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {/* Civility Field */}
 
    <FormField
      control={form.control}
      name="private_pronouns"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Civility *</FormLabel>
          <Select onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Civility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sir">Sir</SelectItem>
              <SelectItem value="Madam">Madam</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />

    {/* Name and Surname Field */}
    <FormField
      control={form.control}
      name="private_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name and Surname *</FormLabel>
          <Input {...field} placeholder="Enter Full Name" />
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
    <FormField
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
    {/* Gender Field */}
    <FormField
      control={form.control}
      name="private_gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Gender *</FormLabel>
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
                      
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />

    {/* Born On Field */}
    <FormField
      control={form.control}
      name="private_birth_date"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Born On</FormLabel>
          <Input type="date" {...field} />
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
               {/* Residence Field */}
    <FormField
        control={form.control}
        name="private_address"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Residence</FormLabel>
                <Input {...field} placeholder="Enter Residence" />
                <FormMessage className="text-xs" />
            </FormItem>
        )}
    />
    {/* Nationality Field */}
    <FormField
      control={form.control}
      name="private_nationality"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nationality</FormLabel>
          <Input {...field} placeholder="Nationality" />
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />

    {/* Document Type Field */}
    <FormField
      control={form.control}
      name="private_document_type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Type</FormLabel>
          <Select onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Document Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CNI">CNI</SelectItem>
              <SelectItem value="Passport">Passport</SelectItem>
              <SelectItem value="Driver License">Driver's License</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
 {/* Contact Field */}
 <FormField
      control={form.control}
      name="private_document_number"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Number *</FormLabel>
          
          <Input type="input" {...field} placeholder="Enter Document Number" />
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
 

    {/* Issue Date Field */}
    <FormField
        control={form.control}
        name="private_date_of_issue"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Issue Date</FormLabel>
                <Input type="date" {...field} />
                <FormMessage className="text-xs" />
            </FormItem>
        )}
    />

    {/* Signatory Authority Field */}
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

     {/* Expiry Date Field */}
     <FormField
        control={form.control}
        name="private_expiry_date"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Expiry Date</FormLabel>
                <Input type="date" {...field} />
                <FormMessage className="text-xs" />
            </FormItem>
        )}
    />
    {/* Taxpayer Account Number Field */}
<FormField
  control={form.control}
  name="private_taxpayer_account_number"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Taxpayer Account Number</FormLabel>
      <Input {...field} placeholder="Enter Taxpayer Account Number" />
      <FormMessage className="text-xs" />
    </FormItem>
  )}
/>

    {/* Profession Field */}
    <FormField
        control={form.control}
        name="private_occupation"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Profession</FormLabel>
                <Input {...field} placeholder="Enter Profession" />
                <FormMessage className="text-xs" />
            </FormItem>
        )}
    />
   {/* Contact Field */}
   <FormField
      control={form.control}
      name="private_contact"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Contact *</FormLabel>
          
          <Input type="input" {...field} placeholder="Enter Contact Number" />
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />

   

    {/* Contact WhatsApp Field */}
    <FormField
        control={form.control}
        name="private_whatsapp_contact"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Contact WhatsApp</FormLabel>
                <Input type="tel" {...field} placeholder="Enter WhatsApp Number" />
                <FormMessage className="text-xs" />
            </FormItem>
        )}
    />

   {/* E-mail Field */}
<FormField
  control={form.control}
  name="private_email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>E-mail</FormLabel>
      <Input {...field} placeholder="Enter Email Address" />
      <FormMessage className="text-xs" />
    </FormItem>
  )}
/>

{/* Mailbox Field */}
<FormField
  control={form.control}
  name="private_mail_box"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Mailbox</FormLabel>
      <Input {...field} placeholder="Enter Mailbox" />
      <FormMessage className="text-xs" />
    </FormItem>
  )}
/>

{/* Marital Status Field */}
<FormField
  control={form.control}
  name="private_marital_status"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Situation Matrimoniale</FormLabel>
      <Select onValueChange={field.onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Marital Status" />
        </SelectTrigger>
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

{/* Number of Children Field */}
<FormField
  control={form.control}
  name="private_number_of_children"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Number of Children</FormLabel>
      <Input  {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} placeholder="Enter Number of Children" />
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
              <FileUploader
                onChange={(files : any) => form.setValue("private_documents", files)}
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

export default PrivateTenantForm;
