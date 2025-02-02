import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FileUploader from "@/components/common/uploader";
import { Save } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

const FormSchema = z.object({
  // Type of Commercial Action: Required string field
  prospect_sales_type_of_commercial_action: z.string().nonempty("Type of Commercial Action is required"),

  // Prospect ID: Required number field
  prospect_id: z.string().min(0,"Prospect is required"),

  // Object: Required string field
  prospect_sales_object: z.string().nonempty("Object is required"),

  // Comment: Optional string field for additional comments
  prospect_sales_comment: z.string().optional(),

  // Documents: Optional array of strings for document URLs or paths
  prospect_sales_documents: z.array(z.string()).optional(),
});

export function CommercialActionSalesForm() {
  // Initialize the form using react-hook-form and Zod validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prospect_sales_type_of_commercial_action: "", // Default value for commercial action (empty string as placeholder)
      prospect_id: "", // Default value for prospect_id (should be a number, defaulting to 0 as placeholder)
      prospect_sales_object: "", // Default value for object (empty string)
      prospect_sales_comment: "", // Default value for comment (empty string, optional)
      prospect_sales_documents: [], // Default value for documents (empty array)
    }
  });
  
  // Handle form submission
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary-dark">Commercial Action</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="mb-5 pb-5 border-b-2">Perform a commercial action</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Official Response Section */}
                <div className="space-y-5">
                  <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                  INFORMATION ON THE COMMERCIAL ACTION
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Prospect Field */}
                    <FormField
                      control={form.control}
                      name="prospect_sales_type_of_commercial_action"
                      render={({ field }) => (
                        <FormItem className=" col-span-2">
                          <FormLabel>Type of Commercial Action *</FormLabel>
                          <FormControl>
                          <Select {...field}>
      <SelectTrigger>
        <SelectValue placeholder="Select Type of Commercial Action" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="SEND_EMAIL">Send Email</SelectItem>
        <SelectItem value="PHONE_CALL">Phone Call</SelectItem>
        <SelectItem value="PHYSICAL_MEETING">Physical Meeting</SelectItem>
        <SelectItem value="SENDING_CONTRACT">Sending Contract</SelectItem>
        <SelectItem value="WAITING_FOR_RECEIPT_OF_CONTRACT">Waiting for Receipt of Contract</SelectItem>
        <SelectItem value="WAITING_FOR_CONTRIBUTION_PAYMENT">Waiting for Contribution Payment</SelectItem>
        <SelectItem value="INCOMPLETE_CONTRACT">Incomplete Contract</SelectItem>
        <SelectItem value="CONTRACT_TO_RESIGN">Contract to Resign</SelectItem>
      </SelectContent>
    </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
<FormField
  control={form.control}
  name="prospect_id"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>Pre-booking *</FormLabel>
      <FormControl>
        <Select
          {...field}
          onValueChange={field.onChange} // Ensure the value is a number
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a prospect" />
          </SelectTrigger>
          <SelectContent>
            {/* Set numeric values directly */}
            <SelectItem value={"1"}>Prospect 1</SelectItem>
            <SelectItem value={"2"}>Prospect 2</SelectItem>
            <SelectItem value={"3"}>Prospect 3</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>




                    {/* Object Field */}
                    <FormField
                      control={form.control}
                      name="prospect_sales_object"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel>Object *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter the object of the need" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>
                </div>
                     <FormField
                  control={form.control}
                  name="prospect_sales_comment"
                  render={({ field }) => (
                    <FormItem>
                        <FormLabel>Comment </FormLabel>
                      <FormControl>
                        <div>
                          <label
                            htmlFor="content"
                            className="block text-sm font-medium text-white dark:text-white"
                          >
                            Content
                          </label>
                          <Editor
                            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                            init={{
                              plugins:
                                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
                              toolbar:
                                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                            }}
                            value={field.value || ""}
                            onEditorChange={(content) => {
                              field.onChange(content); // Use field.onChange to update React Hook Form state
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
           
            <FileUploader
                      onChange={(files) => form.setValue("prospect_sales_documents", files)}
                      maxFiles={5}
                      addedFiles={form.watch("prospect_sales_documents") || []}
                    />
                {/* Submit Button */}
                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                  <Save />
                  Save
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* Add any footer content if needed */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
