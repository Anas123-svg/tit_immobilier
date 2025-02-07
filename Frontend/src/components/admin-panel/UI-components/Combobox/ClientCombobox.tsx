import * as React from "react"
import useFetchData from "@/hooks/useFetchData"
import { Client, Owner } from "@/types/DataProps"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface ClientComboboxProps {
  name: string
  control: any
}

export function ClientCombobox({ name, control }: ClientComboboxProps) {
  const { data: clients, loading, error } = useFetchData<Client[]>(`${import.meta.env.VITE_API_URL}/api/clients`)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching clients: {error}</div>

  return (
    <FormItem className="flex flex-col gap-2 ">
      <FormLabel>Clients *</FormLabel>
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
                    ? clients?.find((client) => client.id === field.value)?.is_business_client
                      ? clients?.find((client) => client.id === field.value)?.business_company_name
                      : clients?.find((client) => client.id === field.value)?.private_name
                    : "Select a client"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command className="">
                <CommandInput placeholder="Search client..." />
                <CommandList>
                  <CommandEmpty>No client found.</CommandEmpty>
                  <CommandGroup>
                    {clients?.map((client) => (
                      <CommandItem
                        key={client.id}
                        value={client.private_name} 
                        onSelect={() => field.onChange(client.id)} 
                      >
                        {client.is_business_client
                          ? client.business_company_name 
                          : client.private_name}         
                        <Check
                          className={cn(
                            "ml-auto",
                            client.id === field.value ? "opacity-100" : "opacity-0"
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
