import * as React from "react"
import  useFetchData  from "@/hooks/useFetchData"
import { Owner } from "@/types/DataProps"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface OwnerComboboxProps {
  name: string
  control: any
}

export function OwnerCombobox({ name, control }: OwnerComboboxProps) {
  const { data: owners, loading, error } = useFetchData<Owner[]>(
    `${import.meta.env.VITE_API_URL}/api/get-all-owners`
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching owners: {error}</div>

  return (
    <FormItem className="flex flex-col gap-2 ">
    <FormLabel>Owners *</FormLabel>
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
                className={cn("justify-between", !field.value && "text-muted-foreground")}
              >
                {field.value
                  ? owners?.find((owner) => owner.id === field.value)?.is_business_owner
                    ? owners?.find((owner) => owner.id === field.value)?.business_company_name
                    : owners?.find((owner) => owner.id === field.value)?.private_name
                  : "Select an owner"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className=" p-0">
            <Command className="">
              <CommandInput placeholder="Search owner..." />
              <CommandList>
                <CommandEmpty>No owner found.</CommandEmpty>
                <CommandGroup>
                  {owners?.map((owner) => (
                    <CommandItem
                      key={owner.id}
                      value={owner.private_name} 
                      onSelect={() => field.onChange(owner.id)} 
                    >
                      {owner.is_business_owner
                        ? owner.business_company_name 
                        : owner.private_name}       
                      <Check
                        className={cn(
                          "ml-auto",
                          owner.id === field.value ? "opacity-100" : "opacity-0"
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
  
  
  )
}
