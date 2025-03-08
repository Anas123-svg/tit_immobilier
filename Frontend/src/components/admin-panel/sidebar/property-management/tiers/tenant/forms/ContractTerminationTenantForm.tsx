import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { useFormUpdate } from "@/hooks/useFormUpdate";
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
import { Contract } from "@/types/DataProps";
import Stepper from "@/components/admin-panel/UI-components/Stepper";


// Define the validation schemas using Zod
const previousInvoiceSchema = z.object({
  month: z.string().optional(),
  type: z.string().optional(),
  rent: z.number().optional(),
  charge: z.number().optional(),
  total: z.number().optional(),
  verse: z.number().optional(),
  remaining: z.number().optional(),
});

const invoiceSchema = z.object({
  designation: z.string().optional(),
  unit_price: z.number().optional(),
  qty: z.number().optional(),
  vat: z.number().optional(),
  discount: z.number().optional(),
  total: z.number().optional(),
});

const FormSchema = z.object({
    tenant_id: z.number().min(1, "Tenant ID is required"),
    id: z.number().min(1, "Contract ID is required"),
  concerned: z.number().optional(),
  location: z.number().optional(),
  total_amount_due: z.number().optional(),
  previous_invoices: z.array(previousInvoiceSchema).optional(),
  invoices: z.array(invoiceSchema).optional(),
  deductible_designation:z.string(),
  deductible_amount:z.string(),
  designation:z.string(),
  amount:z.number().optional(),
  entry_date:z.string().optional(),
  due_date:z.string().optional()
  
});

interface ContractTerminationTenantFormProps {
  contract?: Contract;
  customBtn?: React.ReactNode;
}

const ContractTerminationTenantForm: React.FC<ContractTerminationTenantFormProps> = ({ contract, customBtn }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tenant_id: contract?.tenant_id || 0,
      id: contract?.id || 0,
      concerned: contract?.concerned || undefined,
      location: contract?.location || undefined,
      total_amount_due: contract?.total_amount_due || 0,
      previous_invoices: contract?.previous_invoices || [],
      invoices: contract?.invoices || [],
    },
  });

  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => setActiveStep(step);

 // Initialize invoice state with default values
const [invoiceState, setInvoiceState] = useState([
    { designation: "", unit_price: 0, qty: 1, vat: 0, discount: 0, total: 0 }
  ]);
  
  // Handle adding a new invoice (similar to locatives)
  const handleAddInvoice = () => {
    setInvoiceState([
      ...invoiceState,
      { designation: "", unit_price: 0, qty: 1, vat: 0, discount: 0, total: 0 }
    ]);
  };
  
  // Handle removing an invoice by index (similar to locatives)
  const handleRemoveInvoice = (index: number) => {
    const updatedInvoices = invoiceState.filter((_, i) => i !== index);
    setInvoiceState(updatedInvoices);
  };
  
// Initialize previous invoices state with default values
const [previousInvoiceState, setPreviousInvoiceState] = useState([
    { month: "", type: "", rent: 0, charge: 0, total: 0, verse: 0, remaining: 0 }
  ]);
  
  // Handle adding a new previous invoice (similar to locatives)
  const handleAddPreviousInvoice = () => {
    setPreviousInvoiceState([
      ...previousInvoiceState,
      { month: "", type: "", rent: 0, charge: 0, total: 0, verse: 0, remaining: 0 }
    ]);
  };
  
  // Handle removing a previous invoice by index (similar to locatives)
  const handleRemovePreviousInvoice = (index: number) => {
    const updatedPreviousInvoices = previousInvoiceState.filter((_, i) => i !== index);
    setPreviousInvoiceState(updatedPreviousInvoices);
  };
  

  const apiUrl = `${import.meta.env.VITE_API_URL}/api/contract-termination`;

  const onSubmit = contract ? useFormUpdate<typeof FormSchema>(apiUrl) : useFormSubmit<typeof FormSchema>(apiUrl);

  useEffect(() => {
    if (contract) {
      form.setValue("tenant_id", contract.tenant_id || 0);
      form.setValue("id", contract.id || 0);
      form.setValue("total_amount_due", contract.advance_amount || 0);
    }
  }, [contract, form]);
  const Contract = form.watch("id")
  const TenantId = form.watch("tenant_id")



  const entryInvoices = [
    { designation: "Caution (2 months)", amount: 220000 },
    { designation: "Advance (2 months)", amount: 230000 },
    { designation: "Agency fee", amount: 55000 }
  ];
  
  const outstandingInvoices = [
    { designation: "February 2025 Rent Invoice", unpaid: 115000 },
    { designation: "March 2025 Rent Invoice", unpaid: 115000 }
  ];


  const totalEntryAmount = entryInvoices.reduce((total, invoice) => total + invoice.amount, 0);
  const totalPaid = totalEntryAmount; // Assuming paid equals total for now
  const totalOutstanding = outstandingInvoices.reduce((total, invoice) => total + invoice.unpaid, 0);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>{customBtn ? customBtn : "Add a Contract Termination"}</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1100px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add a Contract Termination</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Stepper activeStep={activeStep} onStepChange={handleStepChange} stepsTitle={["Contract Details", "Outstanding Invoices", "Termination Details"]} >

            <div className="space-y-6">
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">Contract Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {/* Tenant and Owner Fields */}
                <TenantCombobox name="tenant_id" control={form.control} formState={form.formState} />
                <OwnerCombobox name="owner_id" control={form.control}  />
          
              </div>

             {  Contract !==undefined
 &&<>  <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">Outstanding Invoices</h2>
              <div className="flex flex-col space-y-5">
           
                </div>

              <div className="p-4 grid grid-cols-2 gap-14">
      {/* Entry Invoices Table */}
      <div className="mb-6 ">

        <h3 className="text-lg font-semibold">Entry Invoices</h3>
        <table className="table-auto w-full mt-2 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Designation</th>
              <th className="border p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {entryInvoices.map((invoice, index) => (
              <tr key={index}>
                <td className="border p-2">{invoice.designation}</td>
                <td className="border p-2">{invoice.amount.toLocaleString()} XOF</td>
              </tr>
            ))}
            <tr>
              <td className="border p-2 font-semibold">TOTAL</td>
              <td className="border p-2 font-semibold">{totalEntryAmount.toLocaleString()} XOF</td>
            </tr>
            <tr>
              <td className="border p-2">TOTAL PAID</td>
              <td className="border p-2">{totalPaid.toLocaleString()} XOF</td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">TOTAL PAYMENT</td>
              <td className="border p-2 font-semibold">0 XOF</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Outstanding Invoices Table */}
      <div>
        <h3 className="text-lg font-semibold">List of Outstanding Invoices</h3>
        <table className="table-auto w-full mt-2 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">Designation</th>
              <th className="border p-2">Unpaid</th>
            </tr>
          </thead>
          <tbody>
            {outstandingInvoices.map((invoice, index) => (
              <tr key={index}>
                <td className="border p-2">{invoice.designation}</td>
                <td className="border p-2">{invoice.unpaid.toLocaleString()} XOF</td>
              </tr>
            ))}
            <tr>
              <td className="border p-2 font-semibold">TOTAL PAYMENT</td>
              <td className="border p-2 font-semibold">{totalOutstanding.toLocaleString()} XOF</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    
    
    </> 
 }
 
  </div>















{/* second */}
  <div className="space-y-6">

              <div className="p-4 grid grid-cols-2 gap-5 ">
      {/* Entry Invoices Table */}

  {/* Column 1 - Left side (Details of Items to be Returned) */}
  <div className="space-y-4">
    <h3 className="font-semibold">DETAILS OF ITEMS TO BE RETURNED TO THE TENANT</h3>
    
    {/* Designation Field */}
    <FormField
      control={form.control}
      name="designation"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Designation</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="bg-gray-100 p-2 rounded-md" // Apply gray background and padding
              placeholder="Enter designation"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Amount Field */}
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="bg-gray-100 p-2 rounded-md" // Apply gray background and padding
              type="number"
              placeholder="Enter amount"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Total to be Returned */}
    <div className="font-semibold mt-4">
      <label>Total to be Returned</label>
      <div className="bg-gray-100 p-2 rounded-md">220,000 XOF</div>
    </div>
  </div>

  {/* Column 2 - Right side (Details of Elements Deductible to the Tenant) */}
  <div className="space-y-4">
    <h3 className="font-semibold">DETAILS OF ELEMENTS DEDUCTIBLE TO THE TENANT</h3>

    {/* Designation Field */}
    <FormField
      control={form.control}
      name="deductible_designation"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Designation</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="bg-gray-100 p-2 rounded-md" // Apply gray background and padding
              placeholder="Enter designation"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Amount Field */}
    <FormField
      control={form.control}
      name="deductible_amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <Input
              {...field}
              className="bg-gray-100 p-2 rounded-md" // Apply gray background and padding
              type="number"
              placeholder="Enter amount"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Total to Deduct */}
    <div className="font-semibold mt-4">
      <label>Total to Deduct</label>
      <div className="bg-gray-100 p-2 rounded-md">230,000 XOF</div>
    </div>
  </div>


    </div>
 

 
    <div className="space-y-6">

    <div className="space-y-5">
<h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
ADD OPTIONS TO THIS INVOICE
</h2>
<div className="flex flex-col space-y-5">
  {invoiceState.map((_, index) => (
    <div key={index} className="grid-cols-7 gap-5 grid">
      {/* Designation Field */}
      <FormField control={form.control} name={`invoices.${index}.designation`} render={({ field }) => (
        <FormItem>
          <FormLabel>Designation *</FormLabel>
          <FormControl>
            <Input {...field} placeholder="e.g. Service Charge" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Unit Price Field */}
      <FormField control={form.control} name={`invoices.${index}.unit_price`} render={({ field }) => (
        <FormItem>
          <FormLabel>Unit Price *</FormLabel>
          <FormControl>
            <Input type="number" {...field} placeholder="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Quantity Field */}
      <FormField control={form.control} name={`invoices.${index}.qty`} render={({ field }) => (
        <FormItem>
          <FormLabel>Quantity *</FormLabel>
          <FormControl>
            <Input type="number" {...field} placeholder="1" onChange={e => field.onChange(parseInt(e.target.value, 10))} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* VAT Field */}
      <FormField control={form.control} name={`invoices.${index}.vat`} render={({ field }) => (
        <FormItem>
          <FormLabel>VAT *</FormLabel>
          <FormControl>
            <Input type="number" {...field} placeholder="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Discount Field */}
      <FormField control={form.control} name={`invoices.${index}.discount`} render={({ field }) => (
        <FormItem>
          <FormLabel>Discount *</FormLabel>
          <FormControl>
            <Input type="number" {...field} placeholder="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Total Field */}
      <FormField control={form.control} name={`invoices.${index}.total`} render={({ field }) => (
        <FormItem>
          <FormLabel>Total *</FormLabel>
          <FormControl>
            <Input type="number" {...field} placeholder="0" disabled />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />

      {/* Remove Button */}
      <button type="button" className="bg-red-500 w-fit self-end text-white px-4 py-2 rounded-md" onClick={() => handleRemoveInvoice(index)}>
        Remove
      </button>
    </div>
  ))}

  {/* Button to Add New Invoice Item */}
  <button type="button" className="bg-secondary w-fit self-end text-white px-4 py-2 rounded-md" onClick={handleAddInvoice}>
    Add
  </button>
</div>
  {/* Summary Section */}
  <div className="bg-gray-100 p-4 mt-6 rounded-md">
        <div className="text-right text-gray-600 text-sm">
      
          <p>TOTAL HT : {0}</p>
          <p>TOTAL DISCOUNT : {0}</p>
          <p>TOTAL VAT : {0}</p>
        </div>
        <h2 className="text-blue-600 text-lg font-bold text-right mt-2">
          TOTAL Deductible: <span className="text-green-500">{0}</span>
        </h2>
      </div> 
      
       </div>
    </div>

  </div>

        
</Stepper>
            <Button type="submit" className="w-full my-2 bg-primary">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContractTerminationTenantForm;
