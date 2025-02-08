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
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
import { OwnerSalePropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerSalePropertyCombobox";

// Define the validation schema using Zod with additional validation rules
const FormSchema = z.object({
    owner_id: z.number().min(1, { message: "Owner ID must be greater than 0" }),
    tenant_id: z.number().min(1, { message: "Tenant ID must be greater than 0" }),
    concerned: z.string().min(1, { message: "Concerned field cannot be empty" }),
    location: z.string().min(1, { message: "Location cannot be empty" }),
    cost_of_rent: z.number().min(0.01, { message: "Cost of rent must be a positive number" }),
    contract_type: z.string().min(1, { message: "Contract type is required" }),
    date_of_signature: z.string().min(1, { message: "Date of signature is required" }).regex(/^\d{4}-\d{2}-\d{2}$/, "Date format is invalid (YYYY-MM-DD)"),
    entry_date: z.string().min(1, { message: "Entry date is required" }).regex(/^\d{4}-\d{2}-\d{2}$/, "Date format is invalid (YYYY-MM-DD)"),
    end_date: z.string().min(1, { message: "End date is required" }).regex(/^\d{4}-\d{2}-\d{2}$/, "Date format is invalid (YYYY-MM-DD)"),
    number_of_months_of_deposit: z.number().min(0, { message: "Number of months of deposit cannot be negative" }),
    deposit_amount: z.number().min(0, { message: "Deposit amount must be non-negative" }),
    caution_to_be_paid: z.string().min(1, { message: "Field 'caution to be paid' is required" }),
    number_of_months_in_advance: z.number().min(0, { message: "Number of months in advance cannot be negative" }),
    advance_amount: z.number().min(0, { message: "Advance amount must be non-negative" }),
    penalty_for_delay: z.number().min(0, { message: "Penalty for delay must be non-negative" }),
    payment_limit: z.string().min(1, { message: "Payment limit is required" }),
    tacit_renewal: z.string().min(1, { message: "Tacit renewal field is required" }),
    frequency: z.string().min(1, { message: "Frequency of payments is required" }),
    digital_signature_of_the_contract: z.string().min(1, { message: "Digital signature is required" }),
    due_date: z.string().min(1, { message: "Due date is required" }).regex(/^\d{4}-\d{2}-\d{2}$/, "Date format is invalid (YYYY-MM-DD)"),
  });
  
  // Functional component for business tenant form
  const ContractTenantForm = () => {
    const [open, setOpen] = useState(false);
  // Initialize the form with default values
const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {

      // concerned: 'Property Lease Agreement',  // Example for concerned field
      // location: '1234 Main St, Anytown, USA',  // Example location
      // cost_of_rent: 1200.00,  // Example rent cost per month
      // contract_type: 'Lease',  // Example contract type
      // date_of_signature: '2025-01-01',  // Example date of signature
      // entry_date: '2025-01-15',  // Example entry date
      // end_date: '2030-01-15',  // Example end date
      // number_of_months_of_deposit: 2,  // Example for months of deposit
      // deposit_amount: 2400.00,  // Example deposit amount
      // caution_to_be_paid: 'Yes',  // Example caution to be paid
      // number_of_months_in_advance: 1,  // Example months in advance
      // advance_amount: 1200.00,  // Example advance payment amount
      // penalty_for_delay: 50.00,  // Example penalty for delay in payment
      // payment_limit: '5th of each month',  // Example payment limit
      // tacit_renewal: 'Yes',  // Example for tacit renewal
      // frequency: 'Monthly',  // Payment frequency
      // digital_signature_of_the_contract: 'Signed by digital certificate',  // Example digital signature status
      // due_date: '2025-02-05',  // Example due date for the next payment
    }
  });
  const apiUrl = import.meta.env.VITE_API_URL + '/api/tenant-contract';
        const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
   const Ownerid = form.watch("owner_id")

  
  
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>Add a Contract</DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle>Add a Contract</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  TENANT AND OWNER DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Tenant Field */}

  <TenantCombobox name="tenant_id" control={form.control} formState={form.formState}/>
 <OwnerCombobox name="owner_id" control={form.control}/>

<OwnerSalePropertyCombobox name="concerned" control={form.control} id={Ownerid} formState={form.formState}/>
  {/* Concerned Property Field */}
  <FormField
    control={form.control}
    name="concerned"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Very concerned *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a property" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="property_1">Property 1</SelectItem>
            <SelectItem value="property_2">Property 2</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Locative Field */}
  <FormField
    control={form.control}
    name="location"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Locative *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select the rental" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="rental_1">Rental 1</SelectItem>
            <SelectItem value="rental_2">Rental 2</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Cost of Rent Field */}
  <FormField
    control={form.control}
    name="cost_of_rent"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Cost of Rent</FormLabel>
        <FormControl>
          <Input {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} type="number" placeholder="Enter Rent Amount" />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
</div>

      
<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  DETAILS ON CONTRACT TERMS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Contract Type Field */}
  <FormField
    control={form.control}
    name="contract_type"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Contract Type *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Contract Type" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Residential Lease Contract">Residential Lease Contract</SelectItem>
            <SelectItem value="Commercial Lease Contract">Commercial Lease Contract</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Date of Signature Field */}
  <FormField
    control={form.control}
    name="date_of_signature"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Date of Signature *</FormLabel>
        <FormControl>
          <Input type="date" {...field} />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Entry Date Field */}
  <FormField
    control={form.control}
    name="entry_date"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Entry Date *</FormLabel>
        <FormControl>
          <Input type="date" {...field} />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* End Date Field */}
  <FormField
    control={form.control}
    name="end_date"
    render={({ field }) => (
      <FormItem>
        <FormLabel>End Date *</FormLabel>
        <FormControl>
          <Input type="date" {...field} />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Number of Months of Deposit Field */}
  <FormField
    control={form.control}
    name="number_of_months_of_deposit"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Number of Months of Deposit *</FormLabel>
        <FormControl>
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))}/>
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Deposit Amount Field */}
  <FormField
    control={form.control}
    name="deposit_amount"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Deposit Amount *</FormLabel>
        <FormControl>
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Caution to be Paid Field */}
  <FormField
    control={form.control}
    name="caution_to_be_paid"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Caution to be Paid *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Caution" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Agency">Agency</SelectItem>
            <SelectItem value="Owner">Owner</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Number of Months in Advance Field */}
  <FormField
    control={form.control}
    name="number_of_months_in_advance"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Number of Months in Advance *</FormLabel>
        <FormControl>
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Advance Amount Field */}
  <FormField
    control={form.control}
    name="advance_amount"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Advance Amount *</FormLabel>
        <FormControl>
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Penalty for Delay Field */}
  <FormField
    control={form.control}
    name="penalty_for_delay"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Penalty for Delay % *</FormLabel>
        <FormControl>
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Payment Limit Field */}
  <FormField
    control={form.control}
    name="payment_limit"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Payment Limit *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Payment Limit" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="5th of the month">5th of the month</SelectItem>
            <SelectItem value="10th of the month">10th of the month</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Tacit Renewal Field */}
  <FormField
    control={form.control}
    name="tacit_renewal"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Tacit Renewal? *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Option" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Yes">YES</SelectItem>
            <SelectItem value="No">NO</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Frequency Field */}
  <FormField
    control={form.control}
    name="frequency"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Frequency *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Frequency" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Monthly">MONTHLY</SelectItem>
            <SelectItem value="Quarterly">QUARTERLY</SelectItem>
            <SelectItem value="Yearly">YEARLY</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Digital Signature of the Contract Field */}
  <FormField
    control={form.control}
    name="digital_signature_of_the_contract"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Digital Signature of the Contract? *</FormLabel>
        <FormControl>
          <Input {...field} placeholder="Upload File" />
        </FormControl>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />

  {/* Due Date Field */}
  <FormField
    control={form.control}
    name="due_date"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Due Date *</FormLabel>
        <FormControl>
          <Input type="date" {...field} />
        </FormControl>
        <FormMessage className="text-xs" />
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
  
  export default ContractTenantForm;
  