import * as React from "react"
import useFetchData from "@/hooks/useFetchData"
import { Treasury } from "@/types/DataProps" // Make sure to define the Treasury type in your DataProps
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface TreasuryComboboxProps {
  name: string
  control: any
}

export function TreasuryCombobox({ name, control }: TreasuryComboboxProps) {
  const { data: treasuries, loading, error } = useFetchData<Treasury[]>(`${import.meta.env.VITE_API_URL}/api/treasuries`)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching treasuries: {error}</div>

  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel>{name.replace("_", " ").toUpperCase()} *</FormLabel>
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
                    ? treasuries?.find((treasury) => treasury.id === field.value)?.label
                    : `Select ${name.replace("_", " ")}`}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command className="">
                <CommandInput placeholder={`Search ${name.replace("_", " ")}`} />
                <CommandList>
                  <CommandEmpty>No {name.replace("_", " ")} found.</CommandEmpty>
                  <CommandGroup>
                    {treasuries?.map((treasury) => (
                      <CommandItem
                        key={treasury.id}
                        value={treasury.label}  // Assuming 'label' as the display value
                        onSelect={() => field.onChange(treasury.id)}  // Updating the selected value
                      >
                        {treasury.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            treasury.id === field.value ? "opacity-100" : "opacity-0"
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
