import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye } from 'lucide-react';
import { TenantPayment } from '@/types/DataProps';

// Define form schema using Zod for validation
const PaymentFormSchema = z.object({
  tenant_id: z.number().optional(),
  contract_id: z.number().optional(),
  payment_method: z.string().optional(),
  payment_date: z.string().optional(),
  done_by: z.string().optional(),
  amount: z.number().optional(),
  transaction_details: z.string().optional(),
  state: z.string().optional(),
  invoice_number: z.string().optional(),
  documents: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  designation: z.string().optional(),
  invoice_type: z.string().optional(),
  total: z.number().optional(),
  treasury_type: z.string().optional(),
  cheque: z.string().optional(),
  bank: z.string().optional(),
  transaction: z.string().optional(),
  tiers: z.string().optional(),
});

interface PaymentDialogProps {
  payment: TenantPayment;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ payment }) => {
  const form = useForm<z.infer<typeof PaymentFormSchema>>({
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      tenant_id: payment.tenant_id,
      contract_id: payment.contract_id,
      payment_method: payment.payment_method,
      payment_date: payment.payment_date,
      done_by: payment.done_by,
      amount: payment.amount??0,
      transaction_details: payment.Transaction_details??"",
      state: payment.state,
      invoice_number: payment.invoice_number,
      documents: payment.documents??"",
      created_at: payment.created_at,
      updated_at: payment.updated_at,
      designation: payment.designation??"",
      invoice_type: payment.invoice_type,
      total: payment.total??0,
      treasury_type: payment.treasury_type??"",
      cheque: payment.cheque,
      bank: payment.bank,
      transaction: payment.transaction??"",
      tiers: payment.tiers,
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
          Payment Details for Tenant {payment.tenant_id}
        </DialogTitle>

        <DialogDescription className='space-y-5'>
          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
            Payment Information
          </h2>
          <div className='grid md:grid-cols-2 gap-2'>
            <p><strong>Tenant ID:</strong> {payment.tenant_id}</p>
            <p><strong>Contract ID:</strong> {payment.contract_id}</p>
            <p><strong>Payment Method:</strong> {payment.payment_method}</p>
            <p><strong>Payment Date:</strong> {payment.payment_date}</p>
            <p><strong>Amount:</strong> {payment.amount ? `${payment.amount} XOF` : 'N/A'}</p>
            <p><strong>Transaction Details:</strong> {payment.Transaction_details}</p>
            <p><strong>State:</strong> {payment.state}</p>
            <p><strong>Invoice Number:</strong> {payment.invoice_number}</p>
            <p><strong>Documents:</strong> {payment.documents}</p>
            <p><strong>Created At:</strong> {payment.created_at}</p>
            <p><strong>Updated At:</strong> {payment.updated_at}</p>
            <p><strong>Designation:</strong> {payment.designation}</p>
            <p><strong>Invoice Type:</strong> {payment.invoice_type}</p>
            <p><strong>Total:</strong> {payment.total ? `${payment.total} XOF` : 'N/A'}</p>
            <p><strong>Treasury Type:</strong> {payment.treasury_type}</p>
            <p><strong>Cheque:</strong> {payment.cheque}</p>
            <p><strong>Bank:</strong> {payment.bank}</p>
            <p><strong>Transaction:</strong> {payment.transaction}</p>
            <p><strong>Tiers:</strong> {payment.tiers}</p>
          </div>
        </DialogDescription>

        <DialogClose asChild>
          <Button className="btn">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
