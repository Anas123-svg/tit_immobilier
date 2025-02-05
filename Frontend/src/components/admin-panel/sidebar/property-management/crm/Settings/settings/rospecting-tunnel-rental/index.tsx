
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Settings, Plus, Trash, Save, Edit2, Cross, X } from "lucide-react";

// Define Zod Schema for validation
const FunnelFormSchema = z.object({
  is_rental:z.boolean(),
  stages: z.array(
    z.object({
    
      number:z.number().optional(),
      stage: z.string().nonempty("Stage is required"),
      duration_of_treatment: z.number().min(1, "Duration must be at least 1 day"),
      commercial_actions: z.array(z.string()).min(1, "At least one action is required")
    })
  )
});

type FunnelFormData = z.infer<typeof FunnelFormSchema>;

const ProspectingTunnelRental = () => {
  const [editable, setEditable] = useState(false);
  
  const form = useForm<FunnelFormData>({
    resolver: zodResolver(FunnelFormSchema),
    defaultValues: {
      is_rental:false,
      stages: [{ stage: "", duration_of_treatment: 30, commercial_actions: [] }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "stages"
  });

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const onSubmit = (data: FunnelFormData) => {
    console.log(data);
    // Implement your update logic here
  };

  const stageOptions = [
    { value: "Initial Contact", label: "Initial Contact" },
    { value: "Follow-Up", label: "Follow-Up" },
    { value: "Property Viewing", label: "Property Viewing" }
  ];

  const commercialActionsOptions = [
    { value: "Email Follow-up", label: "Email Follow-up" },
    { value: "Phone Call", label: "Phone Call" },
    { value: "Property Viewing", label: "Property Viewing" }
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between p-4 bg-primary text-white shadow rounded-t-lg">
        <div className="flex items-center">
          <Settings className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-semibold">Sales prospecting funnel</h1>
        </div>
        <Button
          type="button"
          onClick={handleEditToggle}
          className="p-2 bg-secondary w-10 hover:bg-secondary-dark text-white rounded-full"
        >
          {editable ? <X/> : <Edit2/>}
        </Button>
      </div>
      <div className="flex flex-col">   <p className="text-orange-500">
              The prospecting funnel will start with the first item defined in the list. This means that when prospecting, attention will first be focused on the first item in the list and then it will gradually move to the following items.
            </p>

            {editable &&      <Button
              type="button"
              onClick={() => append({number:0, stage: "", duration_of_treatment: 30, commercial_actions: [] })}
              className=" bg-secondary self-end hover:bg-secondary-dark text-white w-fit font-bold py-2 px-4 rounded mt-4 flex items-center justify-center"
            >
              <Plus className="mr-2" />
              Add 
            </Button>}
        </div> 
        {editable &&       <div className="p-4 bg-white shadow rounded-lg space-y-5 border-2">
   <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
 
            {fields.map((item, index) => (
              <div key={item.id} className="flex space-x-4 mt-4 items-center justify-between">
            <FormField
  control={form.control}
  name={`stages.${index}.number`}
  render={({ field }) => (
    <FormItem className="w-10">
      <FormLabel className="flex items-center">
        <span className="mr-2">N°</span>
        <span className="text-red-500">*</span> {/* Red asterisk for required field */}
      </FormLabel>
      <FormControl>
        {/* Static counter number */}
        <Input
        disabled
          {...field}
          value={index + 1}  // Use index + 1 for the counter number
          readOnly  // Make it read-only as it's just a display
          className="border-gray-300 rounded-md text-center"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

                {/* Stage Field */}
                <FormField
                  control={form.control}
                  name={`stages.${index}.stage`}
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel>Stage</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          options={stageOptions}
                          classNamePrefix="react-select"
                          placeholder="Select Stage"
                          onChange={(selected) => field.onChange(selected?.value)}
                          value={stageOptions.find(option => option.value === field.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration of Treatment */}
                <FormField
                  control={form.control}
                  name={`stages.${index}.duration_of_treatment`}
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel>Duration of Treatment (days)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Duration" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Commercial Actions */}
                <FormField
                  control={form.control}
                  name={`stages.${index}.commercial_actions`}
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel>Commercial Actions</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          isMulti
                          options={commercialActionsOptions}
                          value={commercialActionsOptions.filter(option =>
                            field.value.includes(option.value)
                          )}
                          onChange={(selectedOptions) => {
                            const updatedValue = selectedOptions
                              ? selectedOptions.map((item: { value: string }) => item.value)
                              : [];
                            field.onChange(updatedValue); // Update the form state with selected values
                          }}
                          getOptionLabel={(e) => e.label}
                          getOptionValue={(e) => e.value}
                          placeholder="Select actions"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remove Button */}
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 bg-red-100  text-red-500 w-10 self-end hover:bg-red-100 rounded-full"
                >
                  <Trash />
                </Button>
              </div>
            ))}

            {editable && (
              <Button
                type="submit"
                className="w-fit bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded mt-4 flex items-center justify-center"
              >
                <Save className="mr-2" />
                Save Changes
              </Button>
            )}
          </form>
        </Form>
       
      </div> }  
    </div>
  );
};

export default ProspectingTunnelRental;
