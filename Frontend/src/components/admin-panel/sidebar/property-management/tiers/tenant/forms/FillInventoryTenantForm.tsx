import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { ContractCombobox } from "@/components/admin-panel/UI-components/Combobox/ContractCombobox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import FileUploader from "@/components/common/uploader";

const FillInventoryTenantForm = () => {
  const [open, setOpen] = useState(false);
  const [inventoryState, setInventoryState] = useState([
    { equipment: "", quantity: 0, state: "", comment: "" },
  ]);

  const handleAddInventory = () => {
    setInventoryState([
      ...inventoryState,
      { equipment: "", quantity: 0, state: "", comment: "" },
    ]);
  };

  const handleRemoveInventory = (index: number) => {
    const updatedInventory = inventoryState.filter((_, i) => i !== index);
    setInventoryState(updatedInventory);
  };



  const inventorySchema = z.object({
    tenant_id: z.number().min(1, "Tenant ID is required"),
    contract_id: z.number().min(1, "Contract ID is required"),
    date_of_establishment: z.string().optional(),
    state_type: z.string().optional(),
    observation: z.string().optional(),
    inventory_of_elements: z.array(
      z.object({
        equipment: z.string().optional(),
        state: z.string().optional(),
        comment: z.string().optional(),
        upload: z.array(z.string().url()), // Assuming upload contains a URL
      })
    ).optional(),
    documents: z.array(z.string().url()), // Assuming documents contain URLs
  });
  

  

  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
  });


const apiUrl = import.meta.env.VITE_API_URL + "/api/tenant-fill-inventory";
  const onSubmit =  useFormSubmit<typeof inventorySchema>(apiUrl);  // Use custom hook
 
const TenantId = form.watch("tenant_id")
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>Fill Inventory</DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[1200px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle>Fill Inventory for Tenant</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Tenant and Contract Selection */}
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              SELECT TENANT AND CONTRACT
            </h2>
            <div className="grid grid-cols-3 gap-5">
              <TenantCombobox name="tenant_id" control={form.control} />
              <div className=" col-span-2"><ContractCombobox name="contract_id" tenantId={TenantId} control={form.control} />
            </div>
         </div>   <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
            REGISTRATION DETAILS
            </h2>
            <div className="grid grid-cols-3 gap-5">
              {/* Date of Signature Field */}
  <FormField
    control={form.control}
    name="date_of_establishment"
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
    {/* Contract Type Field */}
    <FormField
    control={form.control}
    name="state_type"
    render={({ field }) => (
      <FormItem>
        <FormLabel>State type *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select State Type" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="ENTREE">ENTREE</SelectItem>
            <SelectItem value="Exit">Exit</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage className="text-xs" />
      </FormItem>
    )}
  />
    <FormField control={form.control} name={`observation`} render={({ field }) => (
          <FormItem>
            <FormLabel>Observations or reservations</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter Here" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
            </div>

            {/* Inventory Details */}
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              INVENTORY DETAILS
            </h2>
            <div className="flex flex-col space-y-5">
              {inventoryState.map((_, index) => (
                <div key={index} className="grid grid-cols-4 gap-5">
                  <FormField
                    control={form.control}
                    name={`inventory_of_elements.${index}.equipment`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Equipment *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Item Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
 
                      
                 

                  <FormField
                    control={form.control}
                    name={`inventory_of_elements.${index}.state`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                        State *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Good/Bad" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`inventory_of_elements.${index}.comment`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Additional notes" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
  <FileUploader
                                onChange={(files) => form.setValue(`inventory_of_elements.${index}.upload`, files)}
                                maxFiles={1}
                                addedFiles={form.watch(`inventory_of_elements.${index}.upload`) || []}
                              />
                   
                  <button
                    type="button"
                    className="bg-red-500 w-fit self-end text-white px-4 py-2 rounded-md"
                    onClick={() => handleRemoveInventory(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="bg-secondary w-fit self-end text-white px-4 py-2 rounded-md"
                onClick={handleAddInventory}
              >
                Add Inventory Item
              </button>
            </div>

            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
            ATTACHMENTS
            </h2>
            <div className="p-4 border-2 border-dashed ">
  <FileUploader
                                             onChange={(files) => form.setValue("documents", files)}
                                             maxFiles={5}
                                             addedFiles={form.watch("documents") || []}
                                           />
            </div>
            {/* Submit Button */}
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FillInventoryTenantForm;
