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
import { useFormUpdate } from "@/hooks/useFormUpdate";
import { Owner } from "@/types/DataProps";
import { Edit } from "lucide-react";

const FormSchema = z.object({
  id:z.number(),
  private_pronouns: z.string().nonempty({ message: "Pronouns is required" }),
  private_name: z.string().nonempty({ message: "Name is required" }),
  private_gender: z.string().nonempty({ message: "Gender is required" }),
  private_birth_date: z
    .string()
    .nonempty({ message: "Birth date is required" }),
  private_place_of_birth: z
    .string()
    .nonempty({ message: "Place of birth is required" }),
  private_address: z.string().nonempty({ message: "Address is required" }),
  private_nationality: z
    .string()
    .nonempty({ message: "Nationality is required" }),
  private_document_type: z
    .string()
    .nonempty({ message: "Document type is required" }),
  private_document_number: z
    .string()
    .nonempty({ message: "Document number is required" }),
  private_date_of_issue: z
    .string()
    .nonempty({ message: "Date of issue is required" }),
  private_expiry_date: z
    .string()
    .nonempty({ message: "Expiry date is required" }),
  private_taxpayer_identification_number: z
    .string()
    .nonempty({ message: "Taxpayer identification number is required" }),
  private_occupation: z
    .string()
    .nonempty({ message: "Occupation is required" }),
  private_contact: z.string().nonempty({ message: "Contact is required" }),
  private_whatsapp_contact: z
    .string()
    .nonempty({ message: "Whatsapp contact is required" }),
  private_email: z.string().email({ message: "Invalid email address" }),
  private_po_box: z.string().nonempty({ message: "PO box is required" }),
  private_marital_status: z
    .string()
    .nonempty({ message: "Marital status is required" }),
  private_spouses_name: z
    .string()
    .nonempty({ message: "Spouses name is required" }),
  private_number_of_children: z
    .number()
    .min(0, { message: "Number of children is required" }),
  private_employer_name: z
    .string()
    .nonempty({ message: "Employer name is required" }),
  private_bank_statement_rib: z
    .string()
    .nonempty({ message: "Bank statement RIB is required" }),
  private_emergency_contact_name: z
    .string()
    .nonempty({ message: "Emergency contact name is required" }),
  private_emergency_contact: z
    .string()
    .nonempty({ message: "Emergency contact is required" }),
  private_emergency_contact_relation: z
    .string()
    .nonempty({ message: "Emergency contact relation is required" }),
  private_photo: z.string().optional(),
  private_documents: z.array(z.string()).optional(),
  is_business_owner: z.boolean(),
});
interface PrivateOwnerFormProps{
  owner?: Owner
}
const PrivateOwnerForm: React.FC<PrivateOwnerFormProps> = ({owner}) => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id:owner?.id,
      private_pronouns: owner?.private_pronouns,
      private_name: owner?.private_name,
      private_gender: owner?.private_gender,
      private_birth_date: owner?.private_birth_date,
      private_place_of_birth: owner?.private_place_of_birth,
      private_address: owner?.private_address,
      private_nationality: owner?.private_nationality,
      private_document_type: owner?.private_document_type,
      private_document_number: owner?.private_document_number,
      private_date_of_issue: owner?.private_date_of_issue,
      private_expiry_date: owner?.private_expiry_date,
      private_taxpayer_identification_number: owner?.private_taxpayer_identification_number,
      private_occupation: owner?.private_occupation,
      private_contact: owner?.private_contact,
      private_whatsapp_contact: owner?.private_whatsapp_contact,
      private_email: owner?.private_email,
      private_po_box: owner?.private_po_box,
      private_marital_status: owner?.private_marital_status,
      private_spouses_name: owner?.private_spouses_name,
      private_number_of_children: owner?.private_number_of_children,
      private_employer_name: owner?.private_employer_name,
      private_bank_statement_rib: owner?.private_bank_statement_rib,
      private_emergency_contact_name: owner?.private_emergency_contact_name,
      private_emergency_contact: owner?.private_emergency_contact,
      private_emergency_contact_relation: owner?.private_emergency_contact_relation,
      private_photo: owner?.private_photo??"",
      private_documents: owner?.private_documents,
      is_business_owner: false,
      
    },
  });

  const apiUrl = import.meta.env.VITE_API_URL + '/api/owners';
  const onSubmit = owner
       ? useFormUpdate<typeof FormSchema>(apiUrl)  // Update if client exists
       : useFormSubmit<typeof FormSchema>(apiUrl); // Create if no client
   

  return (
    <Dialog open={open} onOpenChange={openChange}>
         <DialogTrigger>{ owner?    <div className="p-2 bg-blue-100 rounded-full shadow hover:bg-blue-200">
      <Edit size={25} className="text-blue-700" /></div>:`Private Owner`}</DialogTrigger>

    
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
          Add a private owner
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              PRIVATE OWNER DETAILS
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
                      <Input placeholder="Gender" {...field} disabled />
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
                name="private_po_box"
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
                name="private_spouses_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spouses Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Spouses Name" {...field} />
                    </FormControl>
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_employer_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employer Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Employer Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="private_bank_statement_rib"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Statement RIB</FormLabel>
                    <FormControl>
                      <Input placeholder="Bank Statement RIB" {...field} />
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
            <Button type="submit" className="w-full my-2 bg-primary">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PrivateOwnerForm;
