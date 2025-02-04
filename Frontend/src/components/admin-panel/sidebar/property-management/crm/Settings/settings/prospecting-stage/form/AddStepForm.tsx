import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField, FormControl, FormItem, FormMessage, FormLabel } from "@/components/ui/form"; // Assuming these components are from ShadCN
import { useFormSubmit } from "@/hooks/useFormSubmit";

// Zod schema for validation
const schema = z.object({
  label: z.string().min(1, "Label is required"), // Validation for the label
});

type FormData = z.infer<typeof schema>;

export function AddStepForm() {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { control, handleSubmit, formState: { errors } } = methods;

 const apiUrl = import.meta.env.VITE_API_URL + '/api/crm-management/prospecting-stage'
        const onSubmit = useFormSubmit<typeof schema>(apiUrl);  // Use custom hook
      

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-primary text-white hover:bg-primary-dark hover:text-white">
          Add <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a step</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
            {/* Label Field */}
            <FormField control={control} name="label" render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="label" className="text-right">
                  Label <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} id="label" placeholder="Label" />
                </FormControl>
                {errors.label && <FormMessage>{errors.label?.message}</FormMessage>}
              </FormItem>
            )} />
            
            {/* Submit Button */}
            <DialogFooter>
              <Button type="submit" className="ml-2">Save</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
