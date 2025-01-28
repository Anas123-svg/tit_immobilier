import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { boolean, z } from "zod";
  import { Button } from "@/components/ui/button";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { useState } from "react";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  const FormSchema = z.object({
    owner_id: z.number().min(1, "Owner ID is required"),
    type_of_mandate: z.string().nonempty("Type of Mandate is required"),
    owner_name: z.string().nonempty("Owner Name is required"),
    very_concerned: z.boolean(),
    type_of_property: z.string().nonempty("Type of Property is required"),
    neighborhood: z.string().nonempty("Neighborhood is required"),
    tax_payable: z.number().min(0, "Tax Payable is required"),
    billing_type: z.string().nonempty("Billing Type is required"),
    commission: z.number().min(0, "Commission is required"),
    deduct_commission: z.boolean(),
    vat_on_commission: z.boolean(),
    date_of_signature: z.string().nonempty("Date of Signature is required"),
    debut_date: z.string().nonempty("Start Date is required"),
    end_date: z.string().nonempty("End Date is required"),
    digital_signature_of_the_mandate: z.string().optional(),
    tacit_renewal: z.boolean(),
  });
  
  const MandateOwnerForm = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        owner_id: 1,
        type_of_mandate: "Exclusive",
        owner_name: "John Doe",
        very_concerned: true,
        type_of_property: "Apartment",
        neighborhood: "Downtown",
        tax_payable: 150,
        billing_type: "Monthly",
        commission: 10,
        deduct_commission: true,
        vat_on_commission: true,
        date_of_signature: "2025-01-01",
        debut_date: "2025-01-01",
        end_date: "2025-12-31",
        digital_signature_of_the_mandate: "digital_signature.jpg",
        tacit_renewal: true,
      },
    });
  
    const onSubmit = (values: z.infer<typeof FormSchema>) => {
      console.log(values);
    };
  
    return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>Add a Mandate</DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">Add a Mandate</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           {/* Property Details Section */}
<h2 className="bg-orange-500 text-white text-center p-2 text-sm md:text-base">
  DETAILS ON THE PROPERTY CONCERNED
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <FormField
    control={form.control}
    name="type_of_mandate"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Type of Mandate *</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Mandate Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Exclusive">Exclusive</SelectItem>
              <SelectItem value="Non-Exclusive">Non-Exclusive</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="owner_name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Owner *</FormLabel>
        <FormControl>
          <Input {...field} placeholder="Select an Owner" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <FormField
    control={form.control}
    name="very_concerned"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Very Concerned *</FormLabel>
        <FormControl>
          <Select onValueChange={field.onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  /> 
  
  
    <FormItem>
    <FormLabel>Type of Property</FormLabel>
    <FormControl>
      <Input placeholder="Type of property" disabled className="bg-gray-200" />
    </FormControl>
  </FormItem>
  <FormItem>
    <FormLabel>Neighborhood</FormLabel>
    <FormControl>
      <Input placeholder="Neighborhood" disabled className="bg-gray-200" />
    </FormControl>
  </FormItem>
</div>


 

  
           {/* Tax and Commission Details */}
<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base ">
  TAX AND COMMISSION DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  
  {/* Tax Payable Field */}
  <FormField
    control={form.control}
    name="tax_payable"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Tax Payable *</FormLabel>
        <Select
        value={field.value ? String(field.value) : ""}
        onValueChange={field.onChange}
      >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Tax Payable" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Owner">Owner</SelectItem>
            <SelectItem value="Tenant">Tenant</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Billing Type Field */}
  <FormField
    control={form.control}
    name="billing_type"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Billing Type *</FormLabel>
        <Select value={field.value} onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Billing Type" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Fixed Amount">FIXED AMOUNT</SelectItem>
            <SelectItem value="Payment Percentage">PAYMENT PERCENTAGE</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Commission Field */}
  <FormField
    control={form.control}
    name="commission"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Commission (%) *</FormLabel>
        <FormControl>
          <Input type="number" {...field} placeholder="Enter Commission %" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Deduct Commission Field */}
  <FormField
    control={form.control}
    name="deduct_commission"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Deduct Commission? *</FormLabel>
        <Select
        value={field.value ? String(field.value) : ""}
        onValueChange={field.onChange}
      >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Deduct Option" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
 {/* VAT on Commission Field (Missing Field - Now Added) */}
 <FormField
  control={form.control}
  name="vat_on_commission"
  render={({ field }) => (
    <FormItem className="col-span-2">
      <FormLabel>VAT on Commission? *</FormLabel>
      <Select
        value={field.value ? String(field.value) : ""}
        onValueChange={field.onChange}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select VAT on Commission" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="No Over Commission">NO OVER COMMISSION</SelectItem>
          <SelectItem value="Deduct at Agency">DEDUCT AT AGENCY</SelectItem>
          <SelectItem value="Deduct from Owner">DEDUCT FROM OWNER</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>

</div>

              {/* Date Fields */}
          {/* Mandate Terms Section */}
<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  DETAILS ON THE TERMS OF THE MANDATE
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  
  {/* Date of Signature */}
  <FormField
    control={form.control}
    name="date_of_signature"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Date of Signature *</FormLabel>
        <FormControl>
          <Input type="date" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Debut Date */}
  <FormField
    control={form.control}
    name="debut_date"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Debut Date *</FormLabel>
        <FormControl>
          <Input type="date" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* End Date */}
  <FormField
    control={form.control}
    name="end_date"
    render={({ field }) => (
      <FormItem>
        <FormLabel>End Date *</FormLabel>
        <FormControl>
          <Input type="date" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Digital Signature of the Mandate */}
  <FormField
    control={form.control}
    name="digital_signature_of_the_mandate"
    render={({ field }) => (
      <FormItem className="col-span-2">
        <FormLabel>Digital Signature of the Mandate? *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Yes">YES</SelectItem>
            <SelectItem value="No">NON</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

  {/* Tacit Renewal */}
  <FormField
    control={form.control}
    name="tacit_renewal"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Tacit Renewal? *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Yes">YES</SelectItem>
            <SelectItem value="No">NON</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
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
  
  export default MandateOwnerForm;
  