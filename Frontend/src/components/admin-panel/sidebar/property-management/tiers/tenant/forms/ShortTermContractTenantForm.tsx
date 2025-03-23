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
import InvoiceOptionsForm from "../UI/InvoiceOptionsForm";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
import { OwnerSalePropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerSalePropertyCombobox";
import { OwnerRentPropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerRentPropertyCombobox";
import { LocativeCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerRentLocatives";
import useFetchData from "@/hooks/useFetchData";
import { InvoiceItem, Locative, RentLocative } from "@/types/DataProps";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Type definition for an Invoice Item

// Invoice Item Schema (with optional fields)
const invoiceItemSchema = z.object({
  designation: z.string(),
  price: z.number(),
  qty: z.number(),
  vat: z.number(),
  discount: z.number(),
  total: z.number(),
});

// Define validation schema
const FormSchema = z.object({
  owner_id: z.number().min(1, "Owner ID is required"),
  tenant_id: z.number().min(1, "Tenant ID is required"),
  concerned: z.number().optional(),
  location: z.number().optional(),
  billing_type: z.string().optional(),
  booking_date: z.string().optional(),
  entry_date: z.string().optional(),
  end_date: z.string().optional(),
  due_date: z.string().optional(),
  number_of_hours: z.number().optional(),
  rental_amount: z.number().optional(),
  details: z.array(invoiceItemSchema).optional(),
});

const ShortTermContractTenantForm = () => {
  const [open, setOpen] = useState(false);

  // Initialize Form
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {

    },
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      designation: "",
      price: 0,
      qty: 1,
      vat: 0,
      discount: 0,
      total: 0,
    },
  ]);

  // Function to calculate totals for each row


  // Handle change in form fields

  // Function to add a new row dynamically
  const addRow = () => {
    setItems([
      ...items,
      { designation: "", price: 0, qty: 1, vat: 0, discount: 0, total: 0 },
    ]);
  };
 // Watch changes in price, qty, vat, and discount for each invoice item
const watchedDetails = form.watch('details');

// Function to calculate total
const calculateTotal = (price: number, qty: number, vat: number, discount: number): number => {
  return (price || 0) * (qty || 1) + (vat || 0) - (discount || 0);
};

// UseEffect to update the total whenever the watched values change
useEffect(() => {
  if (watchedDetails) {
    watchedDetails.forEach((item, index) => {
      const total = calculateTotal(item.price, item.qty, item.vat, item.discount);
      form.setValue(`details.${index}.total`, total);
    });
  }
}, [watchedDetails, form.setValue]);

  // Function to delete a row
  const deleteRow = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Compute summary totals
  const totalHT = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalDiscount = items.reduce((sum, item) => sum + item.discount, 0);
  const totalVAT = items.reduce((sum, item) => sum + item.vat, 0);
  const grandTotal = totalHT + totalVAT - totalDiscount;


const apiUrl = import.meta.env.VITE_API_URL + "/api/tenant-short-term-contract ";
  const onSubmit =  useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
  const OwnerId = form.watch("owner_id")
  const RentPropertyId = form.watch("concerned")
  const LocativeId = form.watch("location")
  const { data: rentLocative, loading, error } = useFetchData<Locative>(
    `${import.meta.env.VITE_API_URL}/api/owner-rent-locative/${LocativeId?LocativeId:'0'}`
  )


          useEffect(() => {
            if (rentLocative !== null && rentLocative !== undefined) {
              form.setValue('rental_amount', rentLocative?.rent);
             
            } else {
              form.setValue('rental_amount', 0); // Set default value to 0 if cost is null or undefined
            }
          
          }, [rentLocative, form]);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Add a Short Contract</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add a Contract</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Contract Details Section */}
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              SHORT-TERM CONTRACT DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           
             <TenantCombobox name="tenant_id" control={form.control}/>
            <OwnerCombobox name="owner_id" control={form.control}/>
           
           
<OwnerRentPropertyCombobox name="concerned" control={form.control} id={OwnerId} formState={form.formState}/>
<LocativeCombobox name="location" control={form.control} rentPropertyId={RentPropertyId} formState={form.formState}/>

              

              {/* Billing Type Field */}
              <FormField
                control={form.control}
                name="billing_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Type *</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select billing type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Hourly">HOURLY</SelectItem>
                        <SelectItem value="Daily">DAILY</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Booking Date Field */}
              <FormField
                control={form.control}
                name="booking_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Date *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Number of Hours Field */}
              <FormField
                control={form.control}
                name="number_of_hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Hours</FormLabel>
                    <FormControl>
                      <Input type="number"  {...field} onChange={(e)=>field.onChange(parseInt(e.target.value))} placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rental Amount Field */}
              <FormField
                control={form.control}
                name="rental_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rental Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field}  onChange={(e)=>field.onChange(parseInt(e.target.value))} placeholder="0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="p-4 border rounded-md shadow-md">
        <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
          ADD OPTIONS TO THIS INVOICE
        </h2>
        <Table className="w-full mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Designation *</TableHead>
              <TableHead>Unit Price *</TableHead>
              <TableHead>Qty *</TableHead>
              <TableHead>VAT</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <FormField control={form.control} name={`details.${index}.designation`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g. Service Charge" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                  <FormField control={form.control} name={`details.${index}.price`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Price *</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0" min="0" onChange={e => field.onChange(parseFloat(e.target.value))}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                  <FormField control={form.control} name={`details.${index}.qty`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity *</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="1" min="1" onChange={e => field.onChange(parseFloat(e.target.value))}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                  <FormField control={form.control} name={`details.${index}.vat`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>VAT</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0" min="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                  <FormField control={form.control} name={`details.${index}.discount`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0" min="0" onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                <FormField control={form.control} name={`details.${index}.total`} render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" disabled placeholder="0" min="0" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </TableCell>

                <TableCell>
                  <Button
                    onClick={() => deleteRow(index)}
                    className="bg-red-500 text-white px-2 py-1"
                    disabled={items.length === 1}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Add Button */}
        <div className="flex justify-end mt-4">
          <Button onClick={addRow} className="bg-secondary text-white">
            Add+
          </Button>
        </div>
          {/* Summary Section */}
      {/* <div className="bg-gray-100 p-4 mt-6 rounded-md">
        <div className="text-right text-gray-600 text-sm">
          <p>NUMBER OF HOURS : {items.length}</p>
          <p>TOTAL HT : {totalHT.toFixed(2)}</p>
          <p>TOTAL DISCOUNT : {totalDiscount.toFixed(2)}</p>
          <p>TOTAL VAT : {totalVAT.toFixed(2)}</p>
        </div>
        <h2 className="text-blue-600 text-lg font-bold text-right mt-2">
          TOTAL : <span className="text-green-500">{grandTotal.toFixed(2)}</span>
        </h2>
      </div> */}
      </div>
            <Button type="submit" className="w-full mt-4 bg-primary">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ShortTermContractTenantForm;
