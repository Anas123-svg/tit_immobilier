import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye } from 'lucide-react';
import { TenantBill } from '@/types/DataProps';

// Define form schema using Zod for validation
const FormSchema = z.object({
  month: z.string().optional(),
  rent: z.string().optional(),
  charge: z.string().optional(),
  total: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  state: z.string().optional(),
});

interface BillsDialogProps {
  bill: TenantBill; // Assuming bill data will be passed as props
}

const BillsDialog: React.FC<BillsDialogProps> = ({ bill }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
          <Eye size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className='min-w-[200px] md:min-w-[600px]'>
        <DialogTitle className='text-xl font-semibold text-center'>
          Bill Details for Tenant {bill?.tenant_id ? `${bill?.tenant_id}` : 'N/A'}
        </DialogTitle>

        <DialogDescription className='space-y-5'>
          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
            Bill Details
          </h2>
          <div className='grid md:grid-cols-2 gap-2'>
            <p><strong>Tenant ID:</strong> {bill.tenant_id}</p>
            <p><strong>Contract ID:</strong> {bill.contract_id}</p>
            <p><strong>Month:</strong> {bill.month}</p>
            <p><strong>Rent:</strong> {bill.rent ? `${bill.rent} XOF` : 'N/A'}</p>
            <p><strong>Charge:</strong> {bill.charge ? `${bill.charge} XOF` : 'N/A'}</p>
            <p><strong>Total:</strong> {bill.total ? `${bill.total} XOF` : 'N/A'}</p>
            <p><strong>Created At:</strong> {bill.created_at}</p>
            <p><strong>Updated At:</strong> {bill.updated_at}</p>
            <p><strong>State:</strong> {bill.state}</p>
          </div>
        </DialogDescription>

        <DialogClose asChild>
          <Button className="btn">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default BillsDialog;
