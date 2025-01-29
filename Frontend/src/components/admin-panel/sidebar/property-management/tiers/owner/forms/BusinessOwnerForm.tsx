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
  company_name: z
    .string()
    .nonempty({ message: "Company Name is required" }),
  taxpayer_identification_number: z
    .string()
    .nonempty({ message: "Taxpayer Identification Number is required" }),
  business_registration_number: z
    .string()
    .nonempty({ message: "Business Registration Number is required" }),
  industry_sector: z
    .string()
    .nonempty({ message: "Industry Sector is required" }),
  office_phone_number: z
    .string()
    .nonempty({ message: "Office Phone Number is required" }),
  whatsapp_contact: z
    .string()
    .nonempty({ message: "Whatsapp Contact is required" }),
  email: z.string().nonempty({ message: "Email is required" }),
  head_office: z
    .string()
    .nonempty({ message: "Head Office is required" }),
  po_box: z.string().nonempty({ message: "PO Box is required" }),
  capital: z.number().min(1, { message: "Capital is required" }),
  manager_pronouns_title: z
    .string()
    .nonempty({ message: "Pronouns is required" }),
  manager_name: z
    .string()
    .nonempty({ message: "Manager Name is required" }),
  manager_gender: z
    .string()
    .nonempty({ message: "Manager Gender is required" }),
  manager_contact: z
    .string()
    .nonempty({ message: "Manager Contact is required" }),
  manager_date_of_birth: z
    .string()
    .nonempty({ message: "Date of Birth is required" }),
  manager_place_of_birth: z
    .string()
    .nonempty({ message: "Place of Birth is required" }),
  manager_address: z
    .string()
    .nonempty({ message: "Address is required" }),
  manager_job_position: z
    .string()
    .nonempty({ message: "Job Position is required" }),
  manager_type_of_document: z
    .string()
    .nonempty({ message: "Type of Document is required" }),
  manager_document_number: z
    .string()
    .nonempty({ message: "Document Number is required" }),
  manager_date_of_issue: z
    .string()
    .nonempty({ message: "Date of Issue is required" }),
  manager_authorizing_authority: z
    .string()
    .nonempty({ message: "Authorizing Authority is required" }),
  manager_expiry_date: z
    .string()
    .nonempty({ message: "Expiry Date is required" }),
  photo: z.string().optional(),
  documents: z.array(z.string()).optional(),
});

const BusinessOwnerForm = () => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues:{ company_name: "Doe Industries",
    taxpayer_identification_number: "TIN123456789",
    business_registration_number: "BRN987654321",
    industry_sector: "Manufacturing",
    office_phone_number: "+1234567890",
    whatsapp_contact: "+1987654321",
    email: "info@doeindustries.com",
    head_office: "101 Industrial Way, Techville",
    po_box: "PO Box 1010",
    capital: 500000, // Example capital amount
    manager_pronouns_title: "Ms.",
    manager_name: "Jane Doe",
    manager_gender: "Female",
    manager_contact: "+1234567890",
    manager_date_of_birth: "1975-08-25", // Example date of birth
    manager_place_of_birth: "Techtown",
    manager_address: "200 Executive Drive, Techville",
    manager_job_position: "Chief Operating Officer",
    manager_type_of_document: "Driver's License",
    manager_document_number: "D123456789012",
    manager_date_of_issue: "2015-03-01",
    manager_authorizing_authority: "DMV Techville",
    manager_expiry_date: "2025-03-01",
    photo: "", // Path to a placeholder image if needed
    documents: [], // List of document paths or identifiers
  },
  });

       const apiUrl = import.meta.env.VITE_API_URL + '/api/business-owners';
        const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
      
    
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger>Business Owner</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">
          Add a business owner
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              COMPANY DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="company_name"
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
                name="taxpayer_identification_number"
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
                name="business_registration_number"
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
                name="industry_sector"
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
                name="office_phone_number"
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
                name="whatsapp_contact"
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
                name="email"
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
                name="head_office"
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
                name="po_box"
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
                name="capital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Capital</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Capital" />
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
                name="manager_pronouns_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pronouns</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        switch (value) {
                          case "he/him":
                            form.setValue("manager_gender", "Male");
                            break;
                          case "she/her":
                            form.setValue("manager_gender", "Female");
                            break;
                          case "they/them":
                            form.setValue(
                              "manager_gender",
                              "Non-binary"
                            );
                            break;
                          default:
                            form.setValue("manager_gender", "");
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
                name="manager_name"
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
                name="manager_gender"
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
                name="manager_contact"
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
                name="manager_date_of_birth"
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
                name="manager_place_of_birth"
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
                name="manager_address"
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
                name="manager_job_position"
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
                name="manager_type_of_document"
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
                name="manager_document_number"
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
                name="manager_date_of_issue"
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
                name="manager_authorizing_authority"
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
                name="manager_expiry_date"
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

export default BusinessOwnerForm;
