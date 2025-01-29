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

const FormSchema = z.object({
  pronouns: z.string().nonempty({ message: "Pronouns is required" }),
  name: z.string().nonempty({ message: "Name is required" }),
  gender: z.string().nonempty({ message: "Gender is required" }),
  birth_date: z
    .string()
    .nonempty({ message: "Birth date is required" }),
  place_of_birth: z
    .string()
    .nonempty({ message: "Place of birth is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  nationality: z
    .string()
    .nonempty({ message: "Nationality is required" }),
  document_type: z
    .string()
    .nonempty({ message: "Document type is required" }),
  document_number: z
    .string()
    .nonempty({ message: "Document number is required" }),
  date_of_issue: z
    .string()
    .nonempty({ message: "Date of issue is required" }),
  expiry_date: z
    .string()
    .nonempty({ message: "Expiry date is required" }),
  taxpayer_identification_number: z
    .string()
    .nonempty({ message: "Taxpayer identification number is required" }),
  occupation: z
    .string()
    .nonempty({ message: "Occupation is required" }),
  contact: z.string().nonempty({ message: "Contact is required" }),
  whatsapp_contact: z
    .string()
    .nonempty({ message: "Whatsapp contact is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  po_box: z.string().nonempty({ message: "PO box is required" }),
  marital_status: z
    .string()
    .nonempty({ message: "Marital status is required" }),
  spouses_name: z
    .string()
    .nonempty({ message: "Spouses name is required" }),
  number_of_children: z
    .number()
    .min(0, { message: "Number of children is required" }),
  employer_name: z
    .string()
    .nonempty({ message: "Employer name is required" }),
  bank_statement_rib: z
    .string()
    .nonempty({ message: "Bank statement RIB is required" }),
  emergency_contact_name: z
    .string()
    .nonempty({ message: "Emergency contact name is required" }),
  emergency_contact: z
    .string()
    .nonempty({ message: "Emergency contact is required" }),
  emergency_contact_relation: z
    .string()
    .nonempty({ message: "Emergency contact relation is required" }),
  photo: z.string().optional(),
  documents: z.array(z.string()).optional(),
});

const PrivateOwnerForm = () => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pronouns: "he/him",
  name: "John Doe",
  gender: "Male",
  birth_date: "1980-01-01",
  place_of_birth: "New York, USA",
  address: "1234 Main St, New York, NY 10001",
  nationality: "American",
  document_type: "Passport",
  document_number: "A12345678",
  date_of_issue: "2015-01-01",
  expiry_date: "2025-01-01",
  taxpayer_identification_number: "123-45-6789",
  occupation: "Software Engineer",
  contact: "+1234567890",
  whatsapp_contact: "+1234567890",
  email: "johndoe@example.com",
  po_box: "PO Box 10001",
  marital_status: "Married",
  spouses_name: "Jane Doe",
  number_of_children: 2,
  employer_name: "Tech Innovations Ltd",
  bank_statement_rib: "12345678901234567890",
  emergency_contact_name: "Mary Doe",
  emergency_contact: "+10987654321",
  emergency_contact_relation: "Sister",
  photo: "",
  documents: [],
    },
  });

  const apiUrl = import.meta.env.VITE_API_URL + '/api/private-owners';
  const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook


  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger>Private Owner</DialogTrigger>
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
                name="pronouns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pronouns</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        switch (value) {
                          case "he/him":
                            form.setValue("gender", "Male");
                            break;
                          case "she/her":
                            form.setValue("gender", "Female");
                            break;
                          case "they/them":
                            form.setValue("gender", "Non-binary");
                            break;
                          default:
                            form.setValue("gender", "");
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
                name="gender"
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
                name="name"
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
                name="birth_date"
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
                name="place_of_birth"
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
                name="address"
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
                name="nationality"
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
                name="document_type"
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
                name="document_number"
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
                name="date_of_issue"
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
                name="expiry_date"
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
                name="taxpayer_identification_number"
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
                name="occupation"
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
                name="contact"
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
                name="whatsapp_contact"
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
                name="email"
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
                name="po_box"
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
                name="marital_status"
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
                name="spouses_name"
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
                name="number_of_children"
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
                name="employer_name"
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
                name="bank_statement_rib"
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
                name="emergency_contact_name"
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
                name="emergency_contact"
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
                name="emergency_contact_relation"
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
                  profilePic={form.watch("photo") || ""}
                  onChange={(url) => form.setValue("photo", url)}
                />
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block h-50"
              />
              <Uploader
                onChange={(files) => form.setValue("documents", files)}
                maxFiles={5}
                addedFiles={form.watch("documents") || []}
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
