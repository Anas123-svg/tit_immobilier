import * as React from "react"
import useFetchData from "@/hooks/useFetchData"
import { Contract } from "@/types/DataProps" // You might need to define this type based on the contract response
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface ContractComboboxProps {
  name: string
  control: any
}

export function ContractCombobox({ name, control }: ContractComboboxProps) {
  const { data: contracts, loading, error } = useFetchData<Contract[]>(
    `${import.meta.env.VITE_API_URL}/api/tenant-contract`
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching contracts: {error}</div>

  return (
    <FormItem className="flex flex-col gap-2">
      <FormLabel>Contract *</FormLabel>
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
                    ? contracts?.find((contract) => contract.id === field.value)?.location
                    : "Select a contract"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search contract..." />
                <CommandList>
                  <CommandEmpty>No contract found.</CommandEmpty>
                  <CommandGroup>
                    {contracts?.map((contract) => (
                      <CommandItem
                        key={contract.id}
                        value={contract.location}
                        onSelect={() => field.onChange(contract.id)}
                      >
                        {contract.location} - {contract.contract_type}
                        <Check
                          className={cn(
                            "ml-auto",
                            contract.id === field.value ? "opacity-100" : "opacity-0"
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
