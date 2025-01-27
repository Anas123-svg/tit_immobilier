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
import Selection from "@/components/common";
import { useState } from "react";

const FormSchema = z.object({
  label: z.string().nonempty({ message: "Label is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  assigned_permissions: z.array(
    z.string().nonempty({ message: "Permission is required" })
  ),
});

const permissions = ["Read", "Write", "Delete"];

const PermissionForm = () => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    form.reset();
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      label: "",
      description: "",
      assigned_permissions: [],
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger className="px-4 py-2 text-white rounded-md bg-blue-500">
        Add Permission
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">Add Permission</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="bg-blue-500 text-white text-center p-2 text-sm md:text-base">
              PERMISSION DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Label" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="bg-blue-500 text-white text-center p-2 text-sm md:text-base">
              PERMISSIONS
            </h2>
            <Selection
              list={permissions}
              selectedList={form.watch("assigned_permissions") || []}
              onChange={(selected) => {
                form.setValue("assigned_permissions", selected);
              }}
            />
            <Button type="submit" className="w-full my-2 bg-blue-500">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionForm;
