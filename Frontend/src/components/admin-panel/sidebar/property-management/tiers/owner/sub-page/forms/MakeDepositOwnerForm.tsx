import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Button component
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OwnerCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerCombobox";
import { OwnerRentPropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerRentPropertyCombobox";
import Treasury from "@/components/admin-panel/sidebar/profile/Settings/accounting/Treasury";
import { TreasuryCombobox } from "@/components/admin-panel/UI-components/Combobox/TreasuryCombobox";
import { OwnerSalePropertyCombobox } from "@/components/admin-panel/UI-components/Combobox/OwnerSalePropertyCombobox";
import { watch } from "fs";
import FileUploader from "@/components/common/uploader";
import { useSubmit } from "react-router-dom";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define form schema using Zod for validation



const FormSchema = z.object({
  owner_id: z.number().int().positive("Owner ID must be a positive integer"),
  treasury_id: z.number().int().positive("Treasury ID must be a positive integer"),
  property_id: z.number().int().positive("Property ID must be a positive integer"),
  date_of_operation: z.string().optional(),
  description: z.string().optional(),
  payment_method: z.string().optional(),
  amount: z.number().positive("Amount must be a positive number").optional(),
  done_by: z.string().optional(),
  cheque: z.string().optional(),
  bank: z.string().optional(),
  phone_no: z.string().regex(/^\+\d{10,15}$/, "Invalid phone number format").optional(),
  transaction: z.string().optional(),
  documents: z.array(z.string()).optional(),
  tiers: z.string().optional()
});


interface MakeDepositOwnerFormProps {
    open: boolean; // Controlled by parent to show/hide dialog
    onClose: () => void; // Function to close the dialog
   
  }
  const MakeDepositOwnerForm: React.FC<MakeDepositOwnerFormProps> = ({ open, onClose }) => {
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

  });

   const apiUrl = import.meta.env.VITE_API_URL + '/api/wallet/add ';
         const onSubmit = useFormSubmit<typeof FormSchema>(apiUrl);  // Use custom hook
       
  const ownerId = form.watch("owner_id")
  const paymentMethod = form.watch("payment_method")
  const doneBy = form.watch("done_by")

  return (
    <div>

      {/* Dialog Component */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[800px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-lg md:text-xl">Make a Deposit</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Deposit Information Section */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                DEPOSIT INFORMATION
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
           

<OwnerCombobox control={form.control} name="owner_id" />

<OwnerSalePropertyCombobox name="property_id" formState={form.formState} control={form.control} id={ownerId}/>
    
<TreasuryCombobox name="treasury_id" control={form.control }/>
     
                {/* Date of Operation */}
                <FormField
                  control={form.control}
                  name="date_of_operation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Operation</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

         
              

              </div>

              {/* Payment Method Section */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                PAYMENT METHOD
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Payment Method */}
                       {/* Amount */}
                       <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="Enter Amount" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="SPECIES">SPECIES</SelectItem>
          <SelectItem value="CHEQUE">CHEQUE</SelectItem>
          <SelectItem value="MOBILE MONEY">MOBILE MONEY</SelectItem>
          <SelectItem value="WAVE">WAVE</SelectItem>
          <SelectItem value="PAYMENT">PAYMENT</SelectItem>
        </SelectContent>
      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Done By */}
                <FormField
                  control={form.control}
                  name="done_by"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Done By</FormLabel>
                      <FormControl>
                       <Select onValueChange={field.onChange}>
                               <FormControl>
                                 <SelectTrigger>
                                   <SelectValue placeholder="Select Done By" />
                                 </SelectTrigger>
                               </FormControl>
                               <SelectContent>
                                 <SelectItem value="HIMSELF">HIMSELF</SelectItem>
                                 <SelectItem value="OTHER">OTHER</SelectItem>
                                
                               </SelectContent>
                             </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> 



                {
                  (paymentMethod =="MOBILE MONEY" 
                  
  || paymentMethod =="WAVE" 

  || paymentMethod =="PAYMENT" 
                           )         &&<>  <FormField
                  control={form.control}
                  name="phone_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone no</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> 
                 <FormField
                  control={form.control}
                  name="transaction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction no</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Transaction no" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> 
                </>
                }
                {
                  paymentMethod =="CHEQUE"
                  &&<>  <FormField
                  control={form.control}
                  name="bank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank no</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Bank" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> 
                 <FormField
                  control={form.control}
                  name="cheque"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cheque no</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter Cheque no" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> 
                </>
                }

                
                {
                  doneBy =="OTHER" && 
                  <FormField
                  control={form.control}
                  name="tiers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiers</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Name of the third paryy" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> 
                }
              </div>

              {/* Additional Documents Section */}
              <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
                SOME ADDITIONAL DOCUMENTS
              </h2>
              <FileUploader
                             onChange={(files) => form.setValue("documents", files)}
                             maxFiles={5}
                             addedFiles={form.watch("documents") || []}
                           />

              {/* Submit Button */}
              <Button type="submit" className="w-full my-2 bg-primary">
                Save
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default   MakeDepositOwnerForm;
