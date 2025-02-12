import * as React from "react"
import useFetchData from "@/hooks/useFetchData"
import { OwnerMandate } from "@/types/DataProps" // Assuming you have the correct `OwnerMandate` type
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface OwnerMandatesProps {
  name: string
  control: any
  formState?: any
  id?: number
}

export function OwnerMandatesCombobox({ name, control, formState, id }: OwnerMandatesProps) {
  // Fetching the owner mandates data based on owner_id
  const { data: mandates, loading, error } = useFetchData<OwnerMandate>(`${import.meta.env.VITE_API_URL}/api/owner-mandate/by-owner-id/${id}`)

  if (loading) return <div>Loading...</div>
 
  return (
    <FormItem className="flex flex-col justify-between gap-2">
      <FormLabel>Mandates for Property*</FormLabel>
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
                    ? mandates?.data?.find((mandate) => mandate.id === field.value)?.neighborhood
                    : "Select a mandate for property"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search mandate property..." />
                <CommandList>
                  <CommandEmpty>{error ? "No mandates found" : "No mandates available."}</CommandEmpty>
                  <CommandGroup>
                    {mandates?.data?.map((mandate) => (
                      <CommandItem
                        key={mandate.id}
                        value={mandate.neighborhood}
                        onSelect={() => field.onChange(mandate.id)}
                        disabled={mandate.id === field.value} // Disable the item if it's already selected
                      >
                        {mandate.neighborhood} {/* Customize this with relevant field */}
                        <Check
                          className={cn(
                            "ml-auto",
                            mandate.id === field.value ? "opacity-100" : "opacity-0"
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
      {formState.errors[name] && (
        <FormMessage>{formState.errors[name]?.message}</FormMessage>
      )}
    </FormItem>
  )
}
