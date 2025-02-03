import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";  // Assuming these components are from ShadCN

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit2, Plus, Settings, X } from "lucide-react";

// Zod schema for validation
const schema = z.object({
  charge_a_fee_for_pre_booking_a_sale: z.boolean({
    errorMap: () => {
      return { message: "Please select if you charge a fee for pre-booking a sale." };
    },
  }),
  charge_a_fee_for_pre_booking_a_rental: z.boolean({
    errorMap: () => {
      return { message: "Please select if you charge a fee for pre-booking a rental." };
    },
  }),
  sale_pre_reservation_fees: z
    .number()
    .optional()
    .refine((val) => val === undefined || val > 0, {
      message: "Sale pre-reservation fee must be a positive number.",
    }),
  rental_pre_reservation_fees: z
    .number()
    .optional()
    .refine((val) => val === undefined || val > 0, {
      message: "Rental pre-reservation fee must be a positive number.",
    }),
});


type FormData = z.infer<typeof schema>;

export function Costs() {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      charge_a_fee_for_pre_booking_a_sale: false,
      charge_a_fee_for_pre_booking_a_rental: false,
      sale_pre_reservation_fees: 10,
      rental_pre_reservation_fees: 20,
    },
  });

  const { control, handleSubmit, watch, formState: { errors } } = methods;

  const chargeSale = watch("charge_a_fee_for_pre_booking_a_sale");
  const chargeRental = watch("charge_a_fee_for_pre_booking_a_rental");

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Implement your API call or other submit logic here
  };
 const [editable, setEditable] = useState(false);
  
  const handleEditToggle = () => {
    setEditable(!editable);
  };
  return (<div className=" space-y-10">

       <div className="flex items-center justify-between p-4 bg-primary text-white shadow rounded-t-lg">
        <div className="flex items-center">
          <Settings className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-semibold">Costs</h1>
        </div>
        <Button
          type="button"
          onClick={handleEditToggle}
          className="p-2 bg-secondary w-10 hover:bg-secondary-dark text-white rounded-full"
        >
          {editable ? <X/> : <Edit2/>}
        </Button>
      </div>
   
 
 

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
       <div className=" grid grid-cols-3 gap-5">    {/* Do you charge a fee for pre-booking a sale? */}
            <FormField control={control} name="charge_a_fee_for_pre_booking_a_sale" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Do you charge a fee for pre-booking a sale?</FormLabel>
    <FormControl>
      <Select disabled={!editable}  onValueChange={(value) => field.onChange(value === "true")}> {/* Convert string "true" to boolean true */}
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">YES</SelectItem> {/* Set value as string */}
          <SelectItem value="false">NO</SelectItem> {/* Set value as string */}
        </SelectContent>
      </Select>
    </FormControl>
    <FormMessage>{errors.charge_a_fee_for_pre_booking_a_sale?.message}</FormMessage>
  </FormItem>
)} />


            {/* Sale pre-reservation fees */}
            {chargeSale ? (
              <FormField control={control} name="sale_pre_reservation_fees" render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale pre-reservation fees</FormLabel>
                  <FormControl>
                    <Input disabled={!editable} type="number" placeholder="Enter Sale Fee" />
                  </FormControl>
                  <FormMessage>{errors.sale_pre_reservation_fees?.message}</FormMessage>
                </FormItem>
              )} />
            ):(<div></div>) }

<FormField control={control} name="charge_a_fee_for_pre_booking_a_rental" render={({ field }) => (
  <FormItem className="col-span-2">
    <FormLabel>Do you charge a fee for pre-booking a rental?</FormLabel>
    <FormControl>
      <Select disabled={!editable}  onValueChange={(value) => field.onChange(value === "true")}> {/* Convert string "true" to boolean true */}
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">YES</SelectItem> {/* Set value as string */}
          <SelectItem value="false">NO</SelectItem> {/* Set value as string */}
        </SelectContent>
      </Select>
    </FormControl>
    <FormMessage>{errors.charge_a_fee_for_pre_booking_a_rental?.message}</FormMessage>
  </FormItem>
)} />

            {/* Rental pre-reservation fees */}
            {chargeRental && (
              <FormField control={control} name="rental_pre_reservation_fees" render={({ field }) => (
                <FormItem>
                  <FormLabel>Rental pre-reservation fees</FormLabel>
                  <FormControl>
                    <Input disabled={!editable}  type="number" placeholder="Enter Rental Fee" />
                  </FormControl>
                  <FormMessage>{errors.rental_pre_reservation_fees?.message}</FormMessage>
                </FormItem>
              )} />
            )}

</div>       {/* Submit Button */}
            <DialogFooter>
        
              <Button type="submit" className="ml-2 bg-primary text-white hover:bg-primary-dark hover:text-white">Save</Button>
            </DialogFooter>
          </form>
        </FormProvider>
       </div>
  );
}
