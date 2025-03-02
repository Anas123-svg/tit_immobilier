import * as React from "react"
import useFetchData from "@/hooks/useFetchData"
import { OwnerProperties, OwnerSaleProperty } from "@/types/DataProps" // Assuming you have the correct `OwnerSaleProperty` type
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface OwnerRentPropertyComboboxProps {
  name: string
  control: any
  formState?: any
  id?:number
}

export function OwnerRentPropertyCombobox({ name, control, formState,id }: OwnerRentPropertyComboboxProps) {
  const { data: properties, loading, error } = useFetchData<OwnerProperties>(`${import.meta.env.VITE_API_URL}/api/rent/properties/owner/${id?id:''}`)


  return (
    <FormItem className="flex flex-col justify-between gap-2 ">
      <FormLabel>Owner Rent Properties *</FormLabel>
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
                  className={cn(" justify-between", !field.value && "text-muted-foreground")}
                 
                >
                  {field.value
                    ? properties?.sale_properties.find((property) => property.id === field.value)?.property_name
                    : "Select a property"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search property..." />
                <CommandList>
                <CommandEmpty>{error ? "No property found" : "No property found."}</CommandEmpty> {/* Display the message if error occurs */}
                <CommandGroup>
                    {error? properties?.sale_properties?.map((property) => (
                      <CommandItem
                        key={property.id}
                        value={property.property_name}
                        onSelect={() => field.onChange(property?.id)}
                        disabled={property.id === field.value} // Disable the item if it's already selected
                      >
                        {property.property_name}  {/* Customize this with the relevant property */}
                        <Check
                          className={cn(
                            "ml-auto",
                            property.id === field.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    )):[]}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {/* Uncomment if you want to display errors */}
      {formState.errors[name] && (
        <FormMessage>{formState.errors[name]?.message}</FormMessage>  
      )}
    </FormItem>
  )
}
