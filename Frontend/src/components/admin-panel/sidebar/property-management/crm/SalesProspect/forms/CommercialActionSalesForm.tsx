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

// Zod Schema for validation
const FormSchema = z.object({
  prospect_sales_type_of_commercial_action: z.string().nonempty("Type of Commercial Action is required"),
  prospect_sales_prospect: z.string().nonempty("Prospect is required"),
  prospect_sales_object: z.string().nonempty("Object is required"), prospect_sales_comment: z.string().optional(),  prospect_sales_documents: z.array(z.string()).optional(),
});

export function CommercialActionSalesForm() {
  // Initialize the form using react-hook-form and Zod validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      prospect_sales_type_of_commercial_action: "",
      prospect_sales_prospect: "",
      prospect_sales_object: "",  prospect_sales_comment:"",
        prospect_sales_documents: [],
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

                    {/* Pre-booking Field */}
                    <FormField
                      control={form.control}
                      name="prospect_sales_prospect"
                      render={({ field }) => (
                        <FormItem className=" col-span-2">
                          <FormLabel>Pre-booking *</FormLabel>
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
            <textarea
          {...field}
          placeholder="Enter Comments"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
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
