import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Controller, useForm } from "react-hook-form";
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
  import { useEffect, useState } from "react";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
import { OwnerSalePropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerSalePropertyCombobox";
import useFetchData from "@/hooks/useFetchData";
import { OwnerSaleProperty } from "@/types/DataProps";
import { OwnerRentPropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerRentPropertyCombobox";
  const FormSchema = z.object({
    owner_id: z.number(),
    type_of_mandate: z.string(),
    owner_name: z.string().optional(),
    very_concerned: z.number().optional(),
    type_of_property: z.string().optional(),
    neighborhood: z.string().optional(),
    tax_payable: z.string().optional(),
    billing_type: z.string().optional(),
    commission: z.number().optional(),
    sale_amount: z.number().optional(),
    commission_amount: z.number().optional(),
    commission_percentage: z.number().optional(),
    deduct_commission: z.string().optional(),
    vat_on_commission: z.string().optional(),
    date_of_signature: z.string().optional(),
    debut_date: z.string().optional(),
    end_date: z.string().optional(),
    digital_signature_of_the_mandate: z.boolean().optional(),
    tacit_renewal: z.boolean().optional(),
  });
  
  const MandateOwnerForm = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        // owner_id: 1,
        // type_of_mandate: "Exclusive",
        // owner_name: "John Doe",
        // type_of_property: "",
        // neighborhood: "",
        // tax_payable: "Owner",
        // billing_type: "Monthly",
        // commission: 10,
   
        // date_of_signature: "2025-01-01",
        // debut_date: "2025-01-01",
        // end_date: "2025-12-31",
        // digital_signature_of_the_mandate: false,
        // tacit_renewal: false,


        // owner_name: "",
       
      },
    });
  
   
     const apiUrl = import.meta.env.VITE_API_URL + '/api/owner-mandate';
     const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
    const OwnerId = form.watch("owner_id")
  const RentProperty = form.watch("very_concerned")
    const BillingType = form.watch("billing_type")
    const MandateType = form.watch("type_of_mandate")
    const CommisionAmount = form.watch("commission_amount")
    


  const { data, loading, error } = useFetchData<OwnerSaleProperty>(
    `${import.meta.env.VITE_API_URL}/api/owner-rent-properties/${RentProperty}`
  );
    return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>Add a Mandate</DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">Add a Mandate</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
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
              <SelectItem value="Sale">Sale</SelectItem>
              <SelectItem value="Rental">Rental</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <OwnerCombobox name="owner_id" control={form.control}/>
  {/* <FormField
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
  /> */}
{/* {
MandateType =="Rental"?  <OwnerRentPropertyCombobox name="very_concerned" id={OwnerId} control={form.control} formState={form.formState}/> :



  <OwnerSalePropertyCombobox name="very_concerned" id={OwnerId} control={form.control} formState={form.formState}/>
} */}
<OwnerRentPropertyCombobox name="very_concerned" id={OwnerId} control={form.control} formState={form.formState}/> 
  <FormField
  control={form.control}
  name="type_of_property"
  render={({ field }) => {
    // Update field value when data is fetched
    useEffect(() => {
      if (data?.type_of_property) {
        field.onChange(data.type_of_property); // Update form field with fetched data
      }
    }, [data, field]); // Dependency array ensures effect runs when data changes

    if (loading) return <div>Loading...</div>;
   
    return (
      <FormItem>
        <FormLabel>Type of Property</FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder="Type of property"
            value={field.value || data?.type_of_property } // Ensure correct value is used
            className="bg-gray-200"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>


<FormField
  control={form.control}
  name="neighborhood"
  render={({ field }) => {
    // Sync the fetched data with the form field
    useEffect(() => {
      if (data?.neighborhood) {
        field.onChange(data.neighborhood); // Update the field value with the fetched data
      }
    }, [data, field]); // This will run when 'data' or 'field' changes

    if (loading) return <p>Loading...</p>; // Show loading text or spinner while data is being fetched
  
    return (
      <FormItem>
        <FormLabel>Neighborhood</FormLabel>
        <FormControl>
          <Input
            {...field}
            placeholder="Neighborhood"
            value={field.value || data?.neighborhood } // Use field value, or fetched data, or fallback to empty string
            className="bg-gray-200"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>

</div>


 

  
           {/* Tax and Commission Details */}
<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base ">
  TAX AND COMMISSION DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  
{ MandateType === "Rental" &&
 
 <FormField
    control={form.control}
    name="tax_payable"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Tax Payable *</FormLabel>
        <Select value={field.value} onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Tax Payable" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Owner">Owner</SelectItem>
            <SelectItem value="Agency">Agency</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
  }
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
  {BillingType==="Fixed Amount" ? <FormField
    control={form.control}
    name="commission"
    render={({ field }) => (
      <FormItem>
        <FormLabel>  Commission (XOF) *</FormLabel>
        <FormControl>
       <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} placeholder="Enter Commission (XOF)" />
        
    </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
:
<FormField
    control={form.control}
    name="commission_percentage"
    render={({ field }) => (
      <FormItem>
        <FormLabel>  Commission % *</FormLabel>
        <FormControl>
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseFloat(e.target.value))} placeholder="Enter Commission %" />
    </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  }
{
  MandateType == "Sale" &&

<FormField
    control={form.control}
    name="commission_amount"
    render={({ field }) => (
      <FormItem>
        <FormLabel>  Commission Amount*</FormLabel>
        <FormControl>
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseFloat(e.target.value))} placeholder="Enter Commission %" />
    </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  }{/* Deduct Commission Field */}
  <FormField
    control={form.control}
    name="deduct_commission"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Deduct Commission? *</FormLabel>
        <Select onValueChange={(value) => form.setValue('deduct_commission', value)}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Deduct Option" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
{MandateType =="Sale"?<>
          <SelectItem value="WithdrawOnFirstPayment">COMMISSION WITHDRAWN ON FIRST PAYMENT</SelectItem>
          <SelectItem value="WithdrawInProRata">COMMISSION WITHDRAWN IN PRO RATA OF PAYMENTS</SelectItem>
          </>:

      <>    <SelectItem value="NoOverCommission">NO OVER COMMISSION</SelectItem>
        <SelectItem value="AfterAllTaxes">AFTER ALL TAXES</SelectItem>
        <SelectItem value="OnTotalRents">ON TOTAL RENTS</SelectItem>
        </>}   </SelectContent>
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
      <Select onValueChange={(value) => form.setValue('vat_on_commission', value)}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select VAT on Commission" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
        <SelectItem value="DeductAtAgency">DEDUCT AT AGENCY</SelectItem>
        <SelectItem value="DeductFromOwner">DEDUCT FROM OWNER</SelectItem>
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
{
  MandateType == "Sale" &&

<FormField
    control={form.control}
    name="sale_amount"
    render={({ field }) => (
      <FormItem>
        <FormLabel>  Sale Amount*</FormLabel>
        <FormControl>
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseFloat(e.target.value))} placeholder="Enter Commission %" />
    </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  }
  {/* Digital Signature of the Mandate */}
  <FormField
    control={form.control}
    name="digital_signature_of_the_mandate"
    render={({ field }) => (
      <FormItem className="col-span-2">
        <FormLabel>Digital Signature of the Mandate? *</FormLabel>
        <Select onValueChange={(value) => form.setValue('digital_signature_of_the_mandate', value === 'Yes')}>
      
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
        <Select onValueChange={(value) => form.setValue('tacit_renewal', value === 'Yes')}>
      
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
{MandateType =="Sale"&&

<div className=" font-medium w-1/2 self-end ">
TOTAL AMOUNT OF FEE

 <div className="p-2 py-10 bg-gray-300 hover:text-secondary">
{CommisionAmount}
 </div>
 </div>
             }             <Button type="submit" className="w-full my-2 bg-primary">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default MandateOwnerForm;
  