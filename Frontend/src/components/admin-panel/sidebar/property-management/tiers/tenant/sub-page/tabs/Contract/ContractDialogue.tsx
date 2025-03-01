import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye } from 'lucide-react';
import { Contract } from '@/types/DataProps';

// Define form schema using Zod for validation
const FormSchema = z.object({

    owner_id: z.number().optional(),
    tenant_id: z.number().optional(),
    concerned: z.string().optional(),
    location: z.string().optional(),
    cost_of_rent: z.number().optional(),
    contract_type: z.string().optional(),
    date_of_signature: z.string().optional(),
    entry_date: z.string().optional(),
    end_date: z.string().optional(),
    number_of_months_of_deposit: z.number().optional(),
    deposit_amount: z.number().optional(),
    caution_to_be_paid: z.number().optional(),
    number_of_months_in_advance: z.number().optional(),
    advance_amount: z.number().optional(),
    penalty_for_delay: z.number().optional(),
    payment_limit: z.string().optional(),
    tacit_renewal: z.string().optional(),
    frequency: z.string().optional(),
    digital_signature_of_the_contract: z.string().optional(),
    due_date: z.string().optional(),
    status: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),

});

interface ContractDialogProps {
  contract: Contract; // Assuming contract data will be passed as props
}

const ContractDialog: React.FC<ContractDialogProps> = ({ contract }) => {
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
          Contract Details for {contract?.tenant_id ? `Tenant ${contract?.tenant_id}` : 'N/A'}
        </DialogTitle>

        <DialogDescription className='space-y-5'>
          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
            Contract Details
          </h2>
          <div className='grid md:grid-cols-2 gap-2'>
            <p><strong>Owner ID:</strong> {contract.owner_id}</p>
            <p><strong>Tenant ID:</strong> {contract.tenant_id}</p>
            <p><strong>Location:</strong> {contract.location}</p>
            <p><strong>Cost of Rent:</strong> {contract.cost_of_rent ? `${contract.cost_of_rent} XOF` : 'N/A'}</p>
            <p><strong>Contract Type:</strong> {contract.contract_type}</p>
            <p><strong>Date of Signature:</strong> {contract.date_of_signature}</p>
            <p><strong>Entry Date:</strong> {contract.entry_date}</p>
            <p><strong>End Date:</strong> {contract.end_date}</p>
            <p><strong>Number of Months of Deposit:</strong> {contract.Number_of_months_of_deposit}</p>
            <p><strong>Deposit Amount:</strong> {contract.deposit_amount ? `${contract.deposit_amount} XOF` : 'N/A'}</p>
            <p><strong>Caution to Be Paid:</strong> {contract.caution_to_be_paid ? `${contract.caution_to_be_paid} XOF` : 'N/A'}</p>
            <p><strong>Number of Months in Advance:</strong> {contract.number_of_months_in_advance}</p>
            <p><strong>Advance Amount:</strong> {contract.advance_amount ? `${contract.advance_amount} XOF` : 'N/A'}</p>
            <p><strong>Penalty for Delay:</strong> {contract.penalty_for_delay ? `${contract.penalty_for_delay} XOF` : 'N/A'}</p>
            <p><strong>Payment Limit:</strong> {contract.payment_limit}</p>
            <p><strong>Tacit Renewal:</strong> {contract.tacit_renewal}</p>
            <p><strong>Frequency:</strong> {contract.Frequency}</p>
            <p><strong>Digital Signature of the Contract:</strong> {contract.digital_signature_of_the_contract}</p>
            <p><strong>Due Date:</strong> {contract.due_date}</p>
            <p><strong>Status:</strong> {contract.status}</p>
            <p><strong>Created At:</strong> {contract.created_at}</p>
            <p><strong>Updated At:</strong> {contract.updated_at}</p>
          </div>
        </DialogDescription>

        <DialogClose asChild>
          <Button className="btn">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ContractDialog;
