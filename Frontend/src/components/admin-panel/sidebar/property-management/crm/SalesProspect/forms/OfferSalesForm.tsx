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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Zod Schema with prospect_sales_ prefix
const FormSchema = z.object({

  // New fields for the additional sections
  prospect_sales_type_of_offer: z.string().nonempty("Type of Need is required"),
});

export function OfferSalesForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        prospect_sales_type_of_offer: "Tenant",

    }
  });
   // Handle form submission
   const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600">Offer</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="mb-5 pb-5 border-b-2">Add an Offer</DialogTitle>
          <DialogDescription>
           
        
            <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               
            
             <div className="space-y-5">    {/* Prospect Identification */}
                <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                TYPE OF OFFER
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                <FormField
  control={form.control}
  name="prospect_sales_type_of_offer"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Offer Type</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Offer Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FREE_OFFER">Free Offer</SelectItem>
            <SelectItem value="REAL_ESTATE_DEVELOPMENT_HOUSE">Real Estate Development House</SelectItem>
            <SelectItem value="SUBDIVISION_PROJECT_LOT">Subdivision Project Lot</SelectItem>
            <SelectItem value="HOUSE_FOR_SALE">House for Sale</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


               
                </div></div>  
           
        
                <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                  Submit
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
         
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
