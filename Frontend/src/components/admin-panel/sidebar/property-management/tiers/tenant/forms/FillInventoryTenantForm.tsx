import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { TenantCombobox } from "@/components/admin-panel/UI-components/Combobox/TenantCombobox";
import { ContractCombobox } from "@/components/admin-panel/UI-components/Combobox/ContractCombobox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import FileUploader from "@/components/common/uploader";

const FillInventoryTenantForm = () => {
  const [open, setOpen] = useState(false);

  // Define the schema
  const inventorySchema = z.object({
    tenant_id: z.number().min(1, "Tenant ID is required"),
    contract_id: z.number().min(1, "Contract ID is required"),
    date_of_establishment: z.string().optional(),
    state_type: z.string().optional(),
    observation: z.string().optional(),
    element_inventories: z
      .array(
        z.object({
          part_concerned: z.string().optional(),
          inventory_of_elements: z.array(
            z.object({
              equipment: z.string().optional(),
              state: z.string().optional(),
              comment: z.string().optional(),
              upload: z.array(z.string().url()).optional(), // Assuming upload contains URLs
            })
          ),
        })
      )
      .optional(),
    documents: z.array(z.string().url()).optional(), // Assuming documents contain URLs
  });

  // Create form with default values
  const form = useForm<z.infer<typeof inventorySchema>>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      element_inventories: [
        {
          part_concerned: "General",
          inventory_of_elements: [
            { equipment: "", state: "", comment: "", upload: [] },
          ],
        },
      ],
      documents: [],
    },
  });

  const apiUrl = import.meta.env.VITE_API_URL + "/api/tenant-fill-inventory";
  const onSubmit = useFormSubmit<typeof inventorySchema>(apiUrl);

  // Add a new part
  const handleAddPart = () => {
    const currentParts = form.getValues("element_inventories") || [];
    form.setValue("element_inventories", [
      ...currentParts,
      {
        part_concerned: "",
        inventory_of_elements: [
          { equipment: "", state: "", comment: "", upload: [] },
        ],
      },
    ]);
  };

  // Remove a part
  const handleRemovePart = (partIndex: number) => {
    const currentParts = form.getValues("element_inventories") || [];
    form.setValue(
      "element_inventories",
      currentParts.filter((_, i) => i !== partIndex)
    );
  };

  // Add inventory item to a specific part
  const handleAddInventoryItem = (partIndex: number) => {
    const currentParts = form.getValues("element_inventories") || [];
    const updatedParts = [...currentParts];

    if (updatedParts[partIndex]) {
      updatedParts[partIndex].inventory_of_elements.push({
        equipment: "",
        state: "",
        comment: "",
        upload: [],
      });

      form.setValue("element_inventories", updatedParts);
    }
  };

  // Remove inventory item from a specific part
  const handleRemoveInventoryItem = (partIndex: number, itemIndex: number) => {
    const currentParts = form.getValues("element_inventories") || [];
    const updatedParts = [...currentParts];

    if (updatedParts[partIndex]) {
      updatedParts[partIndex].inventory_of_elements = updatedParts[
        partIndex
      ].inventory_of_elements.filter((_, i) => i !== itemIndex);

      form.setValue("element_inventories", updatedParts);
    }
  };

  const TenantId = form.watch("tenant_id");
  const element_inventories = form.watch("element_inventories") || [];

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
              <div className="col-span-2">
                <ContractCombobox
                  name="contract_id"
                  tenantId={TenantId}
                  control={form.control}
                />
              </div>
            </div>

            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
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
              {/* State Type Field */}
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
              <FormField
                control={form.control}
                name="observation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observations or reservations</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Here" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Parts and Inventory Details */}
            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              PARTS AND INVENTORY DETAILS
            </h2>

            {element_inventories.map((part, partIndex) => (
              <div key={partIndex} className="border p-4 mb-6 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Part {partIndex + 1}</h3>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => handleRemovePart(partIndex)}
                  >
                    Remove Part
                  </button>
                </div>

                <FormField
                  control={form.control}
                  name={`element_inventories.${partIndex}.part_concerned`}
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel>Part Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter part name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <h4 className="font-semibold mb-2">Inventory Items</h4>
                {part.inventory_of_elements.map((_, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="grid grid-cols-4 gap-4 mb-4 p-3 bg-gray-50 rounded-md"
                  >
                    <FormField
                      control={form.control}
                      name={`element_inventories.${partIndex}.inventory_of_elements.${itemIndex}.equipment`}
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
                      name={`element_inventories.${partIndex}.inventory_of_elements.${itemIndex}.state`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Good/Bad" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`element_inventories.${partIndex}.inventory_of_elements.${itemIndex}.comment`}
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

                    <div>
                      <FormLabel>Upload</FormLabel>
                      <FileUploader
                        onChange={(files) =>
                          form.setValue(
                            `element_inventories.${partIndex}.inventory_of_elements.${itemIndex}.upload`,
                            files
                          )
                        }
                        maxFiles={1}
                        addedFiles={
                          form.watch(
                            `element_inventories.${partIndex}.inventory_of_elements.${itemIndex}.upload`
                          ) || []
                        }
                      />
                    </div>

                    {part.inventory_of_elements.length > 1 && (
                      <button
                        type="button"
                        className="bg-red-500 text-white px-3 py-1 rounded-md col-span-4 w-fit"
                        onClick={() =>
                          handleRemoveInventoryItem(partIndex, itemIndex)
                        }
                      >
                        Remove Item
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  onClick={() => handleAddInventoryItem(partIndex)}
                >
                  Add Inventory Item
                </button>
              </div>
            ))}

            <button
              type="button"
              className="bg-secondary text-white px-4 py-2 rounded-md"
              onClick={handleAddPart}
            >
              Add New Part
            </button>

            <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              ATTACHMENTS
            </h2>
            <div className="p-4 border-2 border-dashed">
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
