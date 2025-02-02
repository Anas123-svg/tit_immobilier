import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select, { MultiValue }  from "react-select"; // Import react-select
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { SettingsHeader } from "@/components/admin-panel/sidebar/profile/Settings/settings/UI/SettingsHeader";
import { Settings } from "lucide-react";


// Define Zod Schema for validation
const FunnelFormSchema = z.object({
  stage: z.string().nonempty("Stage is required"),
  is_rental: z.boolean(),
  duration_of_treatment: z.number().min(1, "Duration must be at least 1 day"),
  commercial_actions: z.array(z.string()).min(1, "At least one action is required"),
});

type FunnelFormData = z.infer<typeof FunnelFormSchema>;

const SalesProspectingFunnel = () => {
  const [editable, setEditable] = useState(false);

  const form = useForm<FunnelFormData>({
    resolver: zodResolver(FunnelFormSchema),
    defaultValues: {
      stage: "Initial Contact",
      is_rental: true,
      duration_of_treatment: 30,
      commercial_actions: ["Email Follow-up", "Phone Call", "Property Viewing"],
    }
  });

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  useEffect(() => {
    if ((!editable && form.formState.isDirty) || form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [editable, form.formState.isDirty, form.formState.isSubmitSuccessful, form.reset]);

  const onSubmit = (data: FunnelFormData) => {
    console.log(data);
    // Implement your update logic here
  };

  // Options for react-select
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
  const [selectedOption, setSelectedOption] = useState([{ value: "Email Follow-up", label: "Email Follow-up" }]);

  return (
    <div className="space-y-5">
    <SettingsHeader
    icon={Settings}
    title="Sales prospecting funnel"
  
  />
      <div className="p-4 bg-white shadow rounded-lg space-y-5 border-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Stage Field */}
          <FormField control={form.control} name="stage" render={({ field }) => (
            <FormItem>
              <FormLabel>Stage</FormLabel>
              <FormControl>
                <Controller
                  name="stage"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={stageOptions}
                      classNamePrefix="react-select"
                      placeholder="Select Stage"
                      onChange={(selected) => field.onChange(selected?.value)}
                      value={stageOptions.find(option => option.value === field.value)}
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Is Rental Checkbox */}
          <FormField control={form.control} name="is_rental" render={({ field }) => (
            <FormItem>
              <FormLabel>Is Rental</FormLabel>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          {/* Duration of Treatment */}
          <FormField control={form.control} name="duration_of_treatment" render={({ field }) => (
            <FormItem>
              <FormLabel>Duration of Treatment (days)</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="Duration" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

<FormField
  control={form.control}
  name="commercial_actions"
  render={({ field }) => (
    <FormItem>
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
            // Handle the change and ensure the selected options are updated properly
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

          {/* Submit Button */}
          {editable && (
            <Button type="submit" className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
              Save Changes
            </Button>
          )}
        </form>
        </Form>
      </div>
    </div>
  );
};

export default SalesProspectingFunnel;
