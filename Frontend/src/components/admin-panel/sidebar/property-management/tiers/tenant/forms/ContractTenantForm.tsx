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
  import { useEffect, useState } from "react";
  import { Separator } from "@/components/ui/separator";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
import { OwnerSalePropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerSalePropertyCombobox";
import { OwnerRentPropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerRentPropertyCombobox";
import { Contract, Locative, RentLocative } from "@/types/DataProps";
import { useFormUpdate } from "@/hooks/useFormUpdate";
import { LocativeCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerRentLocatives";
import useFetchData from "@/hooks/useFetchData";
import Stepper from "@/components/admin-panel/UI-components/Stepper";
import { Trash } from "lucide-react";
const invoiceSchema = z.object({
  designation: z.string().optional(),
  unit_price: z.number().optional(),
  qty: z.number().optional(),
  vat: z.number().optional(),
  discount: z.number().optional(),
  total: z.number().optional(),
});
const previousInvoiceSchema = z.object({
  month: z.string().optional(),
  type: z.string().optional(),
  rent: z.number().optional(),
  charge: z.number().optional(),
  total: z.number().optional(),
  verse: z.number().optional(),
  remaining: z.number().optional(),
});
// Define the validation schema using Zod with additional validation rules
const FormSchema = z.object({
    owner_id: z.number().min(1, { message: "Owner ID must be greater than 0" }),
    tenant_id: z.number().min(1, { message: "Tenant ID must be greater than 0" }),
    concerned: z.number().optional(),
  location: z.number().optional(),
    cost_of_rent: z.number().optional(),
    contract_type: z.string(),
    date_of_signature: z.string().optional(),
    entry_date: z.string().optional(),
    end_date: z.string().optional(),
    Number_of_months_of_deposit: z.number().optional(),
    deposit_amount: z.number().optional(),
    caution_to_be_paid: z.string().optional(),
    number_of_months_in_advance: z.number().optional(),
    advance_amount: z.number().optional(),
    penalty_for_delay: z.number().optional(),
    payment_limit: z.string().optional(),
    tacit_renewal: z.boolean().optional(),
    Frequency: z.string().optional(),
    digital_signature_of_the_contract: z.boolean().optional(),
    due_date: z.string().optional(),
    id: z.number().optional(),
    previouse_invoices: z.array(previousInvoiceSchema).optional(),
     invoices: z.array(invoiceSchema).optional(),
  });
  interface BusinessTenantFormProps {
    contract?: Contract;
    customBtn?:React.ReactNode
  }
  // Functional component for business tenant form
  const ContractTenantForm: React.FC<BusinessTenantFormProps> = ({ contract,customBtn }) => {
    const [open, setOpen] = useState(false);
  // Initialize the form with default values
const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
   defaultValues:{
    id:contract?.id ,
    owner_id:  contract?.owner_id ,
    tenant_id:  contract?.tenant_id ,
      concerned: contract?.concerned ,  // Keep empty if concerned is undefined
      location: contract?.location  ,  // Keep empty if location is undefined
      cost_of_rent: contract?.cost_of_rent || 0,  // Keep empty if cost_of_rent is undefined
      contract_type: contract?.contract_type || "",  // Keep empty if contract_type is undefined
      date_of_signature: contract?.date_of_signature || "",  // Keep empty if date_of_signature is undefined
      entry_date: contract?.entry_date || "",  // Keep empty if entry_date is undefined
      end_date: contract?.end_date || "",  // Keep empty if end_date is undefined
      Number_of_months_of_deposit: contract?.Number_of_months_of_deposit || 2,  // Keep empty if number_of_months_of_deposit is undefined
      deposit_amount: contract?.deposit_amount || 0,  // Keep empty if deposit_amount is undefined
      caution_to_be_paid: contract?.caution_to_be_paid || "",  // Keep empty if caution_to_be_paid is undefined
      number_of_months_in_advance: contract?.number_of_months_in_advance || 2,  // Keep empty if number_of_months_in_advance is undefined
      advance_amount: contract?.advance_amount || 0,  // Keep empty if advance_amount is undefined
      penalty_for_delay: contract?.penalty_for_delay ||10,  // Keep empty if penalty_for_delay is undefined
      payment_limit: contract?.payment_limit || "",  // Keep empty if payment_limit is undefined
      tacit_renewal: contract?.tacit_renewal === '1' ? true : false|| false,      // Keep empty if tacit_renewal is undefined
      Frequency: contract?.Frequency || "",  // Keep empty if frequency is undefined
      digital_signature_of_the_contract: contract?.digital_signature_of_the_contract === '1' ? true : false|| false,  // Keep empty if digital_signature_of_the_contract is undefined
      due_date: contract?.due_date || "",  // Keep empty if due_date is undefined
 
   }
  });
  const OwnerId = form.watch("owner_id")
  const RentPropertyId = form.watch("concerned")
  const LocativeId = form.watch("location")
  const depositMonths = form.watch("Number_of_months_of_deposit")

  const { data: rentLocative, loading, error } = useFetchData<Locative>(
    `${import.meta.env.VITE_API_URL}/api/owner-rent-locative/${LocativeId?LocativeId:-1}`
  )
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  const [invoiceState, setInvoice] = useState([
      { 
        designation: '', 
        unit_price: 0, 
        qty: 1, 
        vat: 0, 
        discount: 0, 
        total: 0 
      }
    ]); // Initial state for invoices
    const [previousInvoiceState, setPreviousInvoiceState] = useState([
      {
        month: '',
        type: '',
        rent: 0,
        charge: 0,
        total: 0,
        verse: 0,
        remaining: 0,
      },
    ]);
    const handleRemovePreviousInvoice = (index: number) => {
      const updatedPreviousInvoice = previousInvoiceState.filter((_, i) => i !== index);
      setPreviousInvoiceState(updatedPreviousInvoice);
    };
    const handleAddPreviousInvoice = () => {
      setPreviousInvoiceState([
        ...previousInvoiceState,
        {
          month: '',
          type: '',
          rent: 0,
          charge: 0,
          total: 0,
          verse: 0,
          remaining: 0,
        },
      ]);
    };
    const handleAddInvoice = () => {
      setInvoice([
        ...invoiceState,
        { designation: '', unit_price: 0, qty: 1, vat: 0, discount: 0, total: 0 }
      ]);
    };
    
    const handleRemoveInvoice = (index: number) => {
      const updatedInvoice = invoiceState.filter((_, i) => i !== index);
      setInvoice(updatedInvoice);
    };

  
  const apiUrl = import.meta.env.VITE_API_URL + '/api/tenant-contract';
        const onSubmit = !contract? useFormSubmit<typeof FormSchema>(apiUrl)  // Use custom hook
        : useFormUpdate<typeof FormSchema>(apiUrl);  // Use custom hook
   


        useEffect(() => {
          if (rentLocative !== null && rentLocative !== undefined) {
            form.setValue('cost_of_rent', rentLocative?.rent);
           
          } else {
            form.setValue('cost_of_rent', 0); // Set default value to 0 if cost is null or undefined
          }
        
        }, [rentLocative, form]);
        useEffect(() => {
          form.setValue('deposit_amount', ((rentLocative?.charges ||0) * (depositMonths ||0)));
          form.setValue('advance_amount', rentLocative?.charges);
        }, [depositMonths]);
        
  console.log(" this is tactit" + form.watch("tacit_renewal"))
  
    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>{customBtn?customBtn:'Add a Contract'}</DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[1100px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle>Add a Contract</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 <Stepper
                                activeStep={activeStep}
                                onStepChange={handleStepChange}
                                stepsTitle={["CONTRACT", "Bill","Previous RENTS"]}
                              > 
                             <div className="space-y-6"> 
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  TENANT AND OWNER DETAILS
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Tenant Field */}

  <TenantCombobox name="tenant_id" control={form.control} formState={form.formState}/>
 <OwnerCombobox name="owner_id" control={form.control}/>


<OwnerRentPropertyCombobox name="concerned" control={form.control} id={OwnerId} formState={form.formState}/>
<LocativeCombobox name="location" control={form.control} rentPropertyId={RentPropertyId} formState={form.formState}/>



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
    name="Number_of_months_of_deposit"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Number of Months of Deposit *</FormLabel>
        <FormControl>
          <Input type="number" {...field} onChange={(e)=>{field.onChange(parseInt(e.target.value))

          }} min={0}/>
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
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} min={0} />
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
          <Input type="number" {...field} onChange={(e)=>field.onChange(e.target.value)} min={0} placeholder="0"/>
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
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} min={0}/>
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
          <Input type="number" {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} min={0}/>
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
        <Select value={form.watch("tacit_renewal") ===true ? 'Yes' : 'No'} onValueChange={(value) => form.setValue('tacit_renewal', value === 'Yes')}>
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
    name="Frequency"
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
        <Select value={form.watch("digital_signature_of_the_contract") ===true ? 'Yes' : 'No'} onValueChange={(value) => form.setValue('digital_signature_of_the_contract', value === 'Yes')}>
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


</div>

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
          TOTAL : <span className="text-green-500">{0}</span>
        </h2>
      </div> 
      
       </div>



       <div className="space-y-5">
  <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
    ADD OPTIONS TO THIS INVOICE
  </h2>
  <div className="flex flex-col space-y-5">
    {previousInvoiceState.map((_, index) => (
      <div key={index} className="grid grid-cols-8 gap-5">
        {/* Month Field */}
        <FormField control={form.control} name={`previouse_invoices.${index}.month`} render={({ field }) => (
          <FormItem>
            <FormLabel>Month</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g. Loyer de mars 2025" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Type Field */}
        <FormField control={form.control} name={`previouse_invoices.${index}.type`} render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g. AVANCE" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Rent Field */}
        <FormField control={form.control} name={`previouse_invoices.${index}.rent`} render={({ field }) => (
          <FormItem>
            <FormLabel>Rent</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Charge Field */}
        <FormField control={form.control} name={`previouse_invoices.${index}.charge`} render={({ field }) => (
          <FormItem>
            <FormLabel>Charge</FormLabel>
            <FormControl>
              <Input {...field} type="number" placeholder="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Total Field */}
        <FormField control={form.control} name={`previouse_invoices.${index}.total`} render={({ field }) => (
          <FormItem>
            <FormLabel>Total</FormLabel>
            <FormControl>
              <Input {...field} type="number" disabled placeholder="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Verse Field */}
        <FormField control={form.control} name={`previouse_invoices.${index}.verse`} render={({ field }) => (
          <FormItem>
            <FormLabel>Verse</FormLabel>
            <FormControl>
              <Input {...field} type="number" disabled placeholder="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Remaining Field */}
        <FormField control={form.control} name={`previouse_invoices.${index}.remaining`} render={({ field }) => (
          <FormItem>
            <FormLabel>Remaining</FormLabel>
            <FormControl>
              <Input {...field} type="number" disabled placeholder="0" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/* Remove Button */}
        <button type="button" className="bg-red-500 text-white w-fit self-end px-4 py-2 rounded-md" onClick={() => handleRemovePreviousInvoice(index)}>
          <Trash/>
        </button>
      </div>
    ))}

    {/* Button to Add New Invoice Item */}
    <button type="button" className="bg-secondary text-white w-fit self-end px-4 py-2 rounded-md" onClick={handleAddPreviousInvoice}>
      Add
    </button>
  </div>

  {/* Summary Section */}
  <div className="bg-gray-100 p-4 mt-6 rounded-md">
    <div className="text-right text-gray-600 text-sm">
      <p>TOTAL HT : 0</p>
      <p>TOTAL DISCOUNT : 0</p>
      <p>TOTAL VAT : 0</p>
    </div>
    <h2 className="text-blue-600 text-lg font-bold text-right mt-2">
      TOTAL : <span className="text-green-500">0 XOF</span>
    </h2>
  </div>
</div>

       </Stepper> 
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
  