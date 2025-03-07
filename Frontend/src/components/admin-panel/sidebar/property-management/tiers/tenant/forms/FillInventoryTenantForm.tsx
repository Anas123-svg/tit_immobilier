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

const FillInventoryTenantForm = () => {
  const [open, setOpen] = useState(false);
  const [inventoryState, setInventoryState] = useState([
    { item: "", quantity: 0, condition: "", description: "" },
  ]);

  const handleAddInventory = () => {
    setInventoryState([
      ...inventoryState,
      { item: "", quantity: 0, condition: "", description: "" },
    ]);
  };

  const handleRemoveInventory = (index: number) => {
    const updatedInventory = inventoryState.filter((_, i) => i !== index);
    setInventoryState(updatedInventory);
  };

  // Form schema
  const inventorySchema = z.object({
    tenant_id: z.number().min(1, "Tenant ID is required"),
    contract_id: z.number().min(1, "Contract ID is required"),
    inventory: z.array(
      z.object({
        item: z.string().optional(),
        quantity: z.number().optional(),
        condition: z.string().optional(),
        description: z.string().optional(),
      })
    ),
  });

  const form = useForm({
    resolver: zodResolver(inventorySchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted with data: ", data);
    // Handle form submission
  };
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
            <div className="grid grid-cols-2 gap-5">
              <TenantCombobox name="tenant_id" control={form.control} />
              <ContractCombobox name="contract_id" tenantId={TenantId} control={form.control} />
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
                    name={`inventory.${index}.item`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Item Name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`inventory.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} placeholder="0" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`inventory.${index}.condition`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Good/Bad" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`inventory.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Additional notes" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
