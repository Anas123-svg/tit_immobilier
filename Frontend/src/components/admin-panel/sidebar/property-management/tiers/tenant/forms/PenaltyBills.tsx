import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { ContractCombobox } from "@/components/admin-panel/UI-components/Combobox/ContractCombobox";
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import useFetchData from "@/hooks/useFetchData";
import { Contract } from "@/types/DataProps";

// Define validation schema
const RentFormSchema = z.object({
  tenant_id: z.number().min(1, "Tenant ID is required"),
  contract_id: z.number().min(1, "Contract ID is required"),
  penalties: z.array(
    z.object({
      rent: z.number().optional(),
      charge: z.number().optional(),
      total: z.number().optional(),
      month: z.string().optional(),
    }).refine((data) => {
      // Ensure that total is the sum of rent and charge if they are provided
      if (data.rent !== undefined && data.charge !== undefined && data.total !== undefined) {
        return data.total === data.rent + data.charge;
      }
      return true;
    }, {
      message: "Total must be the sum of rent and charge",
    }),
  ),
});

type RentFormData = z.infer<typeof RentFormSchema>;

const RentBill = () => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };

  const form = useForm<RentFormData>({
    resolver: zodResolver(RentFormSchema),
    defaultValues: {
      penalties: [{ rent: 0, charge: 0, total: 0, month: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "penalties",
  });

  // Function to handle adding new penalty
  const handleAddBill = () => {
    append({ rent: 0, charge: 0, total: 0, month: "" });
  };

  const handleFieldChange = (index: number, field: keyof RentFormData['penalties'][0], value: string | number) => {
    const parsedValue = typeof value === "string" ? parseFloat(value) : value;
  
    // Dynamically setting the value using the field name
    form.setValue(`penalties.${index}.${field}`, parsedValue);
  
    // Getting rent and charge values
    const rent = form.getValues(`penalties.${index}.rent`);
    const charge = form.getValues(`penalties.${index}.charge`);
  
    // Calculating the total
    const total = (rent || 0) + (charge || 0);
  
    // Dynamically setting the total value
    form.setValue(`penalties.${index}.total`, total);
  };



      const TenantId = form.watch("tenant_id")
      const Contract  = form.watch("contract_id")
  const { data:contract, loading, error } = useFetchData<Contract>(`
    ${import.meta.env.VITE_API_URL}/api/tenant-contract/${Contract?Contract:'0'}
  `)
  useEffect(() => {
    if (contract?.rent_locative) {
      // Set rent and charge values from contract data
      const rent = contract.rent_locative.rent || 0;
      const charge = contract.rent_locative.charges || 0;
  
      // Loop through the fields and set values for each penalty
      fields.forEach((_, index) => {
        // Set rent and charge values in the form for each penalty
        form.setValue(`penalties.${index}.rent`, rent);
        form.setValue(`penalties.${index}.charge`, charge);
  
        // Calculate total as sum of rent and charge for each penalty
        const total = rent + charge;
        form.setValue(`penalties.${index}.total`, total); // Set total value for the current penalty
      });
    }
  }, [contract, form, fields]);
  
  
  const apiUrl = import.meta.env.VITE_API_URL + '/api/tenant-penalty';
  const onSubmit = useFormSubmit<typeof RentFormSchema>(apiUrl);  // Use custom hook

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger>Add Penalty</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1200px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Add Penalty Bill</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              SELECT CONTRACT
            </h2>
            <div className="grid grid-cols-2 gap-5">
              {/* Tenant Field */}
              <TenantCombobox name="tenant_id" control={form.control} />

              <ContractCombobox name="contract_id" tenantId={TenantId} control={form.control} />
            </div>
            { Contract &&
         <>   <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                  CONTRACT DETAILS
                </h2>
            {fields.map((item, index) => (
              <div key={item.id}>
             
                <div className="grid grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name={`penalties.${index}.month`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Month</FormLabel>
                        <FormControl>
                          <Input {...field} type="month" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

<FormField
  control={form.control}
  name={`penalties.${index}.rent`} // Dynamically access the rent field in the array
  render={({ field }) => (
    <FormItem>
      <FormLabel>Rent</FormLabel>
      <FormControl>
        <Input
          {...field}
          value={form.getValues(`penalties.${index}.rent`)} // Set the value from the form state
          disabled // Disable the field to make it read-only
          type="number"
          placeholder="Rent"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name={`penalties.${index}.charge`} // Dynamically access the charge field in the array
  render={({ field }) => (
    <FormItem>
      <FormLabel>Charge</FormLabel>
      <FormControl>
        <Input
          {...field}
          value={form.getValues(`penalties.${index}.charge`)} // Set the value from the form state
          disabled // Disable the field to make it read-only
          type="number"
          placeholder="Charge"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


                  <FormField
                    control={form.control}
                    name={`penalties.${index}.total`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            disabled
                            placeholder="Total"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Button to remove the penalty */}
                  <Button type="button" variant={"destructive"} onClick={() => remove(index)}>
                    Remove Bill
                  </Button>
                </div>
              </div>
            ))}

            {/* Button to add new penalty */}
            <Button type="button" onClick={handleAddBill}>
              Add More Bills
            </Button>

            </>}    {/* Submit Button */}
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        
        
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RentBill;
