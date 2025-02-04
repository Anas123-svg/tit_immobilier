import { FormProvider, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectItem, SelectTrigger, SelectValue,SelectContent} from "@/components/ui/select";
import { SettingsHeader } from "@/components/admin-panel/sidebar/profile/Settings/settings/UI/SettingsHeader";
import { Settings } from "lucide-react";
import { useFormSubmit } from "@/hooks/useFormSubmit";

// Define your validation schema using Zod
const FormSchema = z.object({
  chef_commercial: z.string().nonempty("Chef commercial is required"),
  user_id: z.number().min(0,"Non Negative")
});

const GeneralConfigurationForm = () => {
  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      chef_commercial: "John Doe",
      user_id:1
    },
  });

  const { handleSubmit, control, formState: { errors } } = methods;

 const apiUrl = import.meta.env.VITE_API_URL + '/api/crm-management/general-configuration';
        const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
      
  return (<div className="space-y-10">   <SettingsHeader
    icon={Settings}
    title="General Configuration"
  
  />
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
     
     {/* Chef Commercial Field */}
<FormField control={control} name="chef_commercial" render={({ field }) => (
  <FormItem className="w-96">
    <FormLabel>Chef Commercial</FormLabel>
    <FormControl>
      <Select onValueChange={field.onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Chef Commercial" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="John Doe">John Doe</SelectItem>
          <SelectItem value="Jane Smith">Jane Smith</SelectItem>
          <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
        </SelectContent>
      </Select>
    </FormControl>
    <FormMessage>{errors.chef_commercial?.message}</FormMessage>
  </FormItem>
)} />

    
        {/* Submit Button */}
        <Button type="submit" className=" bg-primary hover:bg-primary-dark">Save</Button>
      </form>
    </FormProvider>
    </div>
  );
};

export default GeneralConfigurationForm;
