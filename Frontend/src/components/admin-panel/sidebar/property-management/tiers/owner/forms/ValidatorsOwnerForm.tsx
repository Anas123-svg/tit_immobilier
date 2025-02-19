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
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useState } from "react";
  import Selection from "@/components/common";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import useFetchData from "@/hooks/useFetchData";
import { Owner, User } from "@/types/DataProps";
import useFetchAuthData from "@/hooks/useFetchAuthData";
  
  // Define validation schema
  const FormSchema = z.object({
    type_of_selection: z.string().optional(),
    users: z.array(z.string()).min(1, "At least one validator must be selected"),
    owners: z.array(z.string()).min(1, "At least one owner must be selected"),
  });
  
  const ValidatorsOwnerForm = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        type_of_selection: "",
        users: [],
        owners: ["Owner1"],
      },
    });
    const { data, loading, error } = useFetchAuthData<User[]>(
      `${import.meta.env.VITE_API_URL}/api/users`
    );
    const availableUsers = data?.map((user)=>{
      return user?.name 
    })||["heleloo"]
  const apiUrl = import.meta.env.VITE_API_URL + "/api/owner-validator-assignment";
    const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
  
  
    return (
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger>Assign Validators to Owners</DialogTrigger>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[800px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">
            Validator Assignment Form
          </DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Selection Type */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
  INFORMATION
</h2>
<div className="">
  <FormField
    control={form.control}
    name="type_of_selection"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Type of Selection *</FormLabel>
        <Select onValueChange={field.onChange}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a Selection Type" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="All Goods">All Goods</SelectItem>
            <SelectItem value="Grouped selection">Grouped Selection</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
</div>

  
              {/* Validators Selection */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                ASSIGN VALIDATORS
              </h2>
              <Selection
                list={availableUsers}
                selectedList={form.watch("users") || []}
                onChange={(selected) => {
                  form.setValue("users", selected);
                }}
              />
  
              <Button type="submit" className="w-full my-2 bg-primary">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default ValidatorsOwnerForm;
  