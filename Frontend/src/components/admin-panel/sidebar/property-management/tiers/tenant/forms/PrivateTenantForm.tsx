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

const FormSchema = z.object({
  private_pronouns: z.string().nonempty({ message: "Pronouns is required" }),
  private_name: z.string().nonempty({ message: "Name is required" }),
  private_gender: z.string().nonempty({ message: "Gender is required" }),
  private_birth_date: z.string().nonempty({ message: "Birth date is required" }),
  private_place_of_birth: z.string().nonempty({ message: "Place of birth is required" }),
  private_address: z.string().nonempty({ message: "Address is required" }),
  private_nationality: z.string().nonempty({ message: "Nationality is required" }),
  private_document_type: z.string().nonempty({ message: "Document type is required" }),
  private_document_number: z.string().nonempty({ message: "Document number is required" }),
  private_date_of_issue: z.string().nonempty({ message: "Date of issue is required" }),
  private_expiry_date: z.string().nonempty({ message: "Expiry date is required" }),
  private_taxpayer_account_number: z.string().nonempty({ message: "Taxpayer identification number is required" }),
  private_occupation: z.string().nonempty({ message: "Occupation is required" }),
  private_contact: z.string().nonempty({ message: "Contact is required" }),
  private_whatsapp_contact: z.string().nonempty({ message: "Whatsapp contact is required" }),
  private_email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
  private_signatory_authority: z.string().nonempty({ message: "PO box is required" }),
  private_marital_status: z.string().nonempty({ message: "Marital status is required" }),
  private_number_of_children: z.number().min(0, { message: "Number of children is required" }),
  private_emergency_contact_name: z.string().nonempty({ message: "Emergency contact name is required" }),
  private_emergency_contact: z.string().nonempty({ message: "Emergency contact is required" }),
  private_emergency_contact_relation: z.string().nonempty({ message: "Emergency contact relation is required" }),
  private_photo: z.string().optional(),
  private_documents: z.array(z.string()).optional(),
  private_mail_box: z.string().nonempty({ message: "mail box is required" }),

});

const PrivateTenantForm = () => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: 'onTouched',
    defaultValues: {
      private_name: "",
      private_gender: "",
      private_birth_date: "",
      private_place_of_birth: "",
      private_address: "",
      private_nationality: "",
      private_document_type: "",
      private_document_number: "",
      private_date_of_issue: "",
      private_expiry_date: "",
      private_taxpayer_account_number: "",
      private_occupation: "",
      private_contact: "",
      private_whatsapp_contact: "",
      private_email: "",
      private_signatory_authority: "",
      private_marital_status: "",
      private_number_of_children: 0,
      private_emergency_contact_name: "",
      private_emergency_contact: "",
      private_emergency_contact_relation: "",
      private_photo: "",
      private_pronouns:"",
      private_mail_box: "",
      private_documents: [],
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (values) => {
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger>Private Tenant</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
          Add a private Tenant
        </DialogTitle>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
   
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

    {/* Gender Field */}
    <FormField
      control={form.control}
      name="private_gender"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Gender *</FormLabel>
          <Select onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Masculin">Masculin</SelectItem>
              <SelectItem value="Feminin">Feminin</SelectItem>
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
      <Input type="number" {...field} placeholder="Enter Number of Children" />
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
    <Button type="submit" className="w-full mt-4 bg-primary">Submit</Button>
  </form>
</Form>


      </DialogContent>
    </Dialog>
  );
};

export default PrivateTenantForm;
