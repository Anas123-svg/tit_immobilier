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

// Zod Schema for validation
const FormSchema = z.object({
  prospect_id: z.string().nonempty("Prospect is required"),
  prebooking: z.string().nonempty("Pre-booking is required"),
  status: z.string().nonempty("Status is required"),
  availability: z.string().nonempty("Availability is required"),
  assessment: z.string().nonempty("Assessment is required"),
  assessment_from_us: z.string().nonempty("Assessment from US is required"),

  
  object: z.string().nonempty("Object is required"), comment: z.string().optional(),  documents: z.array(z.string()).optional(),
});

export function OfficialResponseLocationForm() {
  // Initialize the form using react-hook-form and Zod validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prospect_id: "",
      prebooking: "",
      assessment_from_us:"",
      status: "",
      availability: "",
      assessment: "",
      object: "",  comment:"",
        documents: [],
    }
  });

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };
  const Assessment = form.watch("assessment")
    return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary-dark">Add an Official Response</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="mb-5 pb-5 border-b-2">Add an Official Response</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Official Response Section */}
                <div className="space-y-5">
                  <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                    OFFICIAL RESPONSE
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Prospect Field */}
                    <FormField
                      control={form.control}
                      name="prospect_id"
                      render={({ field }) => (
                        <FormItem className=" col-span-2">
                          <FormLabel>Prospect *</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a prospect" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="prospect_1">Prospect 1</SelectItem>
                                <SelectItem value="prospect_2">Prospect 2</SelectItem>
                                <SelectItem value="prospect_3">Prospect 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Pre-booking Field */}
                    <FormField
                      control={form.control}
                      name="prebooking"
                      render={({ field }) => (
                        <FormItem className=" col-span-2">
                          <FormLabel>Pre-booking *</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Pre-booking" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pre-booking 1">Pre-booking 1</SelectItem>
                                <SelectItem value="Pre-booking 2">Pre-booking 2</SelectItem>
                                <SelectItem value="Pre-booking 3">Pre-booking 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Status Field */}
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status *</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Availability Field */}
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Availability *</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Availability" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Available">Available</SelectItem>
                                <SelectItem value="Not Available">Not Available</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

<FormField
  control={form.control}
  name="assessment"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Assessment *</FormLabel>
      <FormControl>
        <Select {...field} onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Assessment" />
          </SelectTrigger>
          <SelectContent>
            {/* Modify values to match "Favorable" and "Non Favorable" */}
            <SelectItem value="Favorable">Favorable</SelectItem>
            <SelectItem value="Non Favorable">Non Favorable</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
{
  Assessment === "Favorable" &&(
<FormField
  control={form.control}
  name="assessment_from_us"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Does the good come from us? *</FormLabel>
      <FormControl>
        <Select {...field}>
          <SelectTrigger>
            <SelectValue placeholder="Select Yes or No" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


  )
}
                    {/* Object Field */}
                    <FormField
                      control={form.control}
                      name="object"
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
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
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
                      onChange={(files) => form.setValue("documents", files)}
                      maxFiles={5}
                      addedFiles={form.watch("documents") || []}
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
