import FileUploader from '@/components/common/uploader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Mandate } from '@/types/DataProps';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define form schema using Zod for validation
const FormSchema = z.object({

  documents: z.array(z.string()).optional(),
});



interface MandateDialogProps {
  mandate: Mandate;
}

const MandateDialog: React.FC<MandateDialogProps> = ({ mandate }) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    
      });
  return (
    <Dialog>
      <DialogTrigger asChild>
         <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
           <Eye size={18} />
         </button>
      </DialogTrigger>
      <DialogContent className='min-w-[200px] md:min-w-[800px] sm:min-w-[600px]'>
        <DialogTitle className=''></DialogTitle>
        <DialogDescription className='space-y-5'>
        <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
        Details of the mandate for the property <span className='font-bold'> {mandate.neighborhood}</span>
              </h2>
          <div className='grid md:grid-cols-2 gap-2'>
            <p><strong>Reference:</strong> {mandate.id}</p>
            <p><strong>Type of Mandate:</strong> {mandate.type_of_mandate}</p>
            <p><strong>Owner:</strong> {mandate.owner_name}</p>
            <p><strong>Property Concerned:</strong> {mandate.neighborhood}</p>
            <p><strong>Property Type:</strong> {mandate.type_of_property}</p>
            <p><strong>Status:</strong> {mandate.status}</p>
            <p><strong>Tax Payable:</strong> {mandate.tax_payable ? "Yes" : "No"}</p>
            <p><strong>Commission:</strong> {mandate.commission}%</p>
            <p><strong>Billing Type:</strong> {mandate.billing_type}</p>
            <p><strong>Deduct Commission:</strong> {mandate.deduct_commission ? "Yes" : "No"}</p>
            <p><strong>Digital Signature:</strong> {mandate.digital_signature_of_the_mandate}</p>
            <p><strong>Debut Date:</strong> {mandate.debut_date}</p>
            <p><strong>End Date:</strong> {mandate.end_date}</p>
            <p><strong>Date of Signature:</strong> {mandate.date_of_signature}</p>
            <p><strong>Tacit Renewal:</strong> {mandate.tacit_renewal ? "Yes" : "No"}</p>
            <p><strong>Created At:</strong> {mandate.created_at}</p>
          </div>

          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
              PHOTO AND DOCUMENTS
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
          
              <FileUploader
                onChange={(files) => form.setValue("documents", files)}
                maxFiles={5}
                addedFiles={form.watch("documents") || []}
              />
            </div>
        </DialogDescription>
        
          <DialogClose asChild>
            <Button className="btn">Close</Button>
          </DialogClose>
   
     
      </DialogContent>
    </Dialog>
  );
};

export default MandateDialog;
