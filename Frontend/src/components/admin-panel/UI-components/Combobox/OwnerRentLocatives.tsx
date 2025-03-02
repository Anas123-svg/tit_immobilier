import * as React from "react"
import useFetchData from "@/hooks/useFetchData"
import { Locative, RentLocative } from "@/types/DataProps"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface LocativeComboboxProps {
  name: string
  control: any
  rentPropertyId?:number
  formState?: any
}

export function LocativeCombobox({ name, control ,rentPropertyId,formState}: LocativeComboboxProps) {
  const { data: rentLocative, loading, error } = useFetchData<RentLocative>(
    `${import.meta.env.VITE_API_URL}/api/owner-rent-locative/property/${rentPropertyId?rentPropertyId:'0'}`
  )

//   if (loading) return <div>Loading...</div>
//   if (error) return <div>Error fetching rentLocative: {error}</div>

  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel>Rent Locatives *</FormLabel>
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
                    ? rentLocative?.data?.find((locative) => locative.id === field.value)?.door_number
                    : "Select a locative"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search locative..." />
                <CommandList>
                  <CommandEmpty>No locative found.</CommandEmpty>
                  <CommandGroup>
                    {rentLocative?.data?.map((locative) => (
                      <CommandItem
                        key={locative.id}
                        value={locative.door_number}
                        onSelect={() => field.onChange(locative.id)}
                      >
                        {locative.rental_type } {locative.door_number}
                        <Check
                          className={cn(
                            "ml-auto",
                            locative.id === field.value ? "opacity-100" : "opacity-0"
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
      {/* Uncomment if you want to display errors */}
            {formState.errors[name] && (
              <FormMessage>{formState.errors[name]?.message}</FormMessage>  
            )}
      <FormMessage />
      
    </FormItem>
  )
}
