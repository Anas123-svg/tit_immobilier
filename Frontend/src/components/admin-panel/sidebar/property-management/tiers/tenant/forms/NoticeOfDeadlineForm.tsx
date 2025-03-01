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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { useState } from "react";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { AntennaIcon } from "lucide-react";
  
  const FormSchema = z.object({
    periodicity: z.string().min(1, "Periodicity is required"), // Ensure periodicity is selected
    generation_month: z.string().min(1, "Generation month is required"), // Ensure month is selected
  });
  
  const NoticeOfDeadlineForm = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        periodicity: "MONTHLY", // default value for periodicity
        generation_month: "July 2025", // default value for generation month
      },
    });
  
    const onSubmit  = useFormSubmit<typeof FormSchema>("/api/notice");
  
    return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>
            <button className="bg-blue-500 text-white p-2 ">
          Notice of Deadline 

            </button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[1000px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">Generation of Due Notices</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Periodicity and Generation Month Section */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                NOTICE DETAILS
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="periodicity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Periodicity *</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Periodicity" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MONTHLY">MONTHLY</SelectItem>
                            <SelectItem value="QUARTERLY">QUARTERLY</SelectItem>
                            <SelectItem value="HALF-YEARLY">HALF-YEARLY</SelectItem>
                            <SelectItem value="ANNUAL">ANNUAL</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                <FormField
                  control={form.control}
                  name="generation_month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Generation month *</FormLabel>
                      <FormControl>
                        <Input {...field} type="month" placeholder="Select Month" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
  
              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  variant="outline"
                  className="text-gray-600"
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  className="bg-primary"
                  disabled={ form.formState.isSubmitting}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default NoticeOfDeadlineForm;
  