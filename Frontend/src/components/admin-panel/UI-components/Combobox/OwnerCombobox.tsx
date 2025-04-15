import * as React from "react";
import useFetchData from "@/hooks/useFetchData";
import { Owner } from "@/types/DataProps";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User } from "@/types";

interface OwnerComboboxProps {
  name: string;
  control: any;
}

export function OwnerCombobox({ name, control }: OwnerComboboxProps) {
  const {
    data: users,
    loading,
    error,
  } = useFetchData<User[]>(`${import.meta.env.VITE_API_URL}/api/users`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users: {error}</div>;

  return (
    <FormItem className="flex flex-col gap-2 ">
      <FormLabel>Users *</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
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
                    ? users?.find((user) => user.id === field.value)?.name
                    : "Select a user"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className=" p-0">
              <Command className="">
                <CommandInput placeholder="Search owner..." />
                <CommandList>
                  <CommandEmpty>No user found.</CommandEmpty>
                  <CommandGroup>
                    {users?.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.name}
                        onSelect={() => field.onChange(user.id)}
                      >
                        {user.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            field.value === user.id
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
        )}
      />
      <FormMessage />
    </FormItem>
  );
}
