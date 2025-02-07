import * as React from "react"
import useFetchData from "@/hooks/useFetchData"
import { Tenant } from "@/types/DataProps" // Assuming you have the correct `Tenant` type
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller } from "react-hook-form"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

interface TenantComboboxProps {
  name: string
  control: any
}

export function TenantCombobox({ name, control }: TenantComboboxProps) {
  const { data: tenants, loading, error } = useFetchData<Tenant[]>(`${import.meta.env.VITE_API_URL}/api/get-all-tenants`)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching tenants: {error}</div>

  return (
    <FormItem className="flex flex-col justify-between gap-2 ">
      <FormLabel>Tenants *</FormLabel>
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
                    ? tenants?.find((tenant) => tenant.id === field.value)?.is_business_tenant
                      ? tenants?.find((tenant) => tenant.id === field.value)?.business_company_name
                      : tenants?.find((tenant) => tenant.id === field.value)?.private_name
                    : "Select a tenant"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command className="">
                <CommandInput placeholder="Search tenant..." />
                <CommandList>
                  <CommandEmpty>No tenant found.</CommandEmpty>
                  <CommandGroup>
                    {tenants?.map((tenant) => (
                      <CommandItem
                        key={tenant.id}
                        value={tenant.private_name} // Use private_name for displaying value
                        onSelect={() => field.onChange(tenant.id)} // Save tenant.id in form state
                      >
                        {tenant.is_business_tenant
                          ? tenant.business_company_name // Show business_company_name if tenant is a business
                          : tenant.private_name}         // Otherwise, show private_name
                        <Check
                          className={cn(
                            "ml-auto",
                            tenant.id === field.value ? "opacity-100" : "opacity-0"
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
