import React, { useState } from "react";
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
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { Separator } from "@/components/ui/separator";
import useFetchData from "@/hooks/useFetchData";
import { Client } from "@/types/DataProps";
// Define the schema for File Client form validation using Zod
const FormSchema = z.object({
  client_id: z.string().nonempty({ message: "Client ID is required" }),
  legal_status: z.string().nonempty({ message: "Legal Status is required" }),
  contact: z.string().nonempty({ message: "Contact is required" }),
  email: z.string().email({ message: "Invalid email address" }).nonempty({ message: "Email is required" }),
  opening_date: z.string().nonempty({ message: "Opening Date is required" }),
  opening_reason: z.string().nonempty({ message: "Opening Reason is required" }),
  modality: z.string().nonempty({ message: "Modality is required" }),
  opening_fee: z.number().min(0, { message: "Opening Fee is required" }),
  advance_amount: z.number().min(0, { message: "Advance Amount is required" }),
  business_manager: z.string().nonempty({ message: "Business Manager is required" }),
  digital_signature_of_file: z.string().nonempty({ message: "Digital signature is required" }),
  documents: z.array(z.string()).optional(),
  // Include any additional fields as needed
});

const FileClientForm = () => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        client_id: "1", // Sample Client ID (can be dynamically loaded based on your data)
        legal_status: "Registered", // Example Legal Status
        contact: "+1234567890", // Example contact number
        email: "john.doe@example.com", // Example email address
        opening_date: "2024-02-01", // Example opening date (you can adjust as per requirement)
        opening_reason: "Purchase from an owner", // Example reason
        modality: "CASH", // Default Modality (can be dynamically adjusted based on your options)
        opening_fee: 100, // Example Opening Fee
        advance_amount: 500, // Example Advance Amount
        business_manager: "Jane Smith", // Example Business Manager name
        digital_signature_of_file: "NON", // Default Digital Signature status
        documents: [
          "https://example.com/docs/contract.pdf", // Example document URL
          "https://example.com/docs/passport.pdf", // Example document URL
        ], // Sample documents array
      }
      

  });

  const apiUrl = import.meta.env.VITE_API_URL + "/api/clients/file";
  const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl); // Custom hook for form submission
  const { data: clients, loading, error } = useFetchData<Client[]>(
    `${import.meta.env.VITE_API_URL}/api/clients`
  );
  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger>File Client</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">Add a File Client</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              CLIENT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="client_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client ID</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Client ID" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="legal_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legal Status</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Legal Status" />
                    </FormControl>
                    <FormMessage />
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
                      <Input {...field} placeholder="Contact" />
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
              /></div>
                <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                DETAILS RESERVED FOR PROPERTY
            </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
   
              <FormField
                control={form.control}
                name="opening_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opening Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} placeholder="Opening Date" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="opening_reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opening Reason</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Opening Reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="purchase">Purchase</SelectItem>
                          <SelectItem value="lease">Lease</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="modality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modality</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Modality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="credit">Credit</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              BUSINESS DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="business_manager"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Manager</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Business Manager" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="digital_signature_of_file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Digital Signature of File</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="YES">Yes</SelectItem>
                          <SelectItem value="NO">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              DOCUMENTS
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <Separator orientation="vertical" className="hidden md:block h-50" />
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

export default FileClientForm;
