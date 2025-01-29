import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Uploader from "@/components/common/uploader";
import ProfilePicUploader from "@/components/common/profilePicUploader";
import { Separator } from "@/components/ui/separator";
import Selection from "@/components/common";
import { useState } from "react";
import { useFormSubmit } from "@/hooks/useFormSubmit";
const UserFormSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  Gender: z.string().nonempty({ message: "Gender is required" }),
  userLogin: z.string().nonempty({ message: "User Login is required" }),
  service: z.string().nonempty({ message: "Service is required" }),
  contact: z.string().nonempty({ message: "Contact is required" }),
  pronouns: z.string().nonempty({ message: "Pronouns is required" }),
  photo: z.string().optional(),
  permissions: z.array(z.string()).optional(),
  documents: z.array(z.string()).optional(),
});

const services = [
  { label: "Service 1", value: "service1" },
  { label: "Service 2", value: "service2" },
  { label: "Service 3", value: "service3" },
];

const permissions = [
  { label: "Permission 1", value: "permission1" },
  { label: "Permission 2", value: "permission2" },
  { label: "Permission 3", value: "permission3" },
];

const UserForm = () => {
  const [open, setOpen] = useState(false);
  const openChange = () => {
    setOpen(!open);
    userForm.reset();
  };
  const userForm = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "John Doe",
      email: "johndoe@example.com",
      password: "password123",  // Ensure to hash this in real applications
      Gender: "Male",
      userLogin: "johndoe",
      service: "service1",  // Default to first service
      contact: "+1234567890",
      pronouns: "he/him",
      photo: "",
      permissions: ["permission1"], // Default permission
      documents: [],
    
    },
  });
 

   const apiUrl = import.meta.env.VITE_API_URL + '/api/users';
          const onSubmit = useFormSubmit<typeof UserFormSchema>(apiUrl);  // Use custom hook
        


  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogTrigger className="px-4 py-2 text-white rounded-md bg-teal-500">
        Add User
      </DialogTrigger>
      <DialogContent className="w-full max-w-[95vw] lg:max-w-[900px] h-auto max-h-[95vh] overflow-y-auto p-6">
        <DialogTitle className="text-lg md:text-xl">Add a user</DialogTitle>
        <Form {...userForm}>
          <form
            onSubmit={userForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <h2 className="bg-teal-500 text-white text-center p-2 text-sm md:text-base">
              USER DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField
                control={userForm.control}
                name="pronouns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pronouns</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        switch (value) {
                          case "he/him":
                            userForm.setValue("Gender", "Male");
                            break;
                          case "she/her":
                            userForm.setValue("Gender", "Female");
                            break;
                          case "they/them":
                            userForm.setValue("Gender", "Non-binary");
                            break;
                          default:
                            userForm.setValue("Gender", "");
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Pronouns" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="he/him">He/Him</SelectItem>
                        <SelectItem value="she/her">She/Her</SelectItem>
                        <SelectItem value="they/them">They/Them</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="Gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input placeholder="Gender" {...field} disabled />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="userLogin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Login</FormLabel>
                    <FormControl>
                      <Input placeholder="User Login" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="service"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="my-[0.31rem]">Service</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? services.find(
                                  (service) => service.value === field.value
                                )?.label
                              : "Select Service"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search language..." />
                          <CommandList>
                            <CommandEmpty>No services found.</CommandEmpty>
                            <CommandGroup>
                              {services.map((service) => (
                                <CommandItem
                                  value={service.label}
                                  key={service.value}
                                  onSelect={() => {
                                    userForm.setValue("service", service.value);
                                  }}
                                >
                                  {service.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      service.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <h2 className="bg-teal-500 text-white text-center p-2 text-sm md:text-base">
              ALLOCATION OF ACCESS RIGHTS
            </h2>
            <Selection
              list={permissions.map((permission) => permission.value)}
              selectedList={userForm.watch("permissions") || []}
              onChange={(permissions) =>
                userForm.setValue("permissions", permissions)
              }
            />
            <h2 className="bg-teal-500 text-white text-center p-2 text-sm md:text-base">
              PHOTO AND DOCUMENTS
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <ProfilePicUploader
                  profilePic={userForm.watch("photo") || ""}
                  onChange={(url) => userForm.setValue("photo", url)}
                />
              </div>
              <Separator
                orientation="vertical"
                className="hidden md:block h-50"
              />
              <Uploader
                onChange={(files) => userForm.setValue("documents", files)}
                maxFiles={5}
                addedFiles={userForm.watch("documents") || []}
              />
            </div>
            <Button type="submit" className="w-full my-2 bg-teal-500">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
