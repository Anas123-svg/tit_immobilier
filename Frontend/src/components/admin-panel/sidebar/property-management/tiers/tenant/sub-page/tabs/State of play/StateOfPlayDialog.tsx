import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye } from 'lucide-react';
import { StateOfPlay } from '@/types/DataProps';

// Define form schema using Zod for validation
const FormSchema = z.object({
  tenant_id: z.number().optional(),
  contract_id: z.number().optional(),
  date_of_establishment: z.string().optional(),
  state_type: z.string().optional(),
  observation: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  documents: z.string().optional(),
  state: z.string().optional(),
});

interface StateOfPlayDialogProps {
  stateOfPlay: StateOfPlay; // Assuming stateOfPlay data will be passed as props
}

const StateOfPlayDialog: React.FC<StateOfPlayDialogProps> = ({ stateOfPlay }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
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
          State of Play Details for Tenant {stateOfPlay?.tenant_id ? `Tenant ${stateOfPlay?.tenant_id}` : 'N/A'}
        </DialogTitle>

        <DialogDescription className='space-y-5'>
          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
            State of Play Details
          </h2>
          <div className='grid md:grid-cols-2 gap-2'>
            <p><strong>Tenant ID:</strong> {stateOfPlay.tenant_id}</p>
            <p><strong>Contract ID:</strong> {stateOfPlay.contract_id}</p>
            <p><strong>Date of Establishment:</strong> {stateOfPlay.date_of_establishment}</p>
            <p><strong>State Type:</strong> {stateOfPlay.state_type}</p>
            <p><strong>Observation:</strong> {stateOfPlay.observation}</p>
            <p><strong>Created At:</strong> {stateOfPlay.created_at}</p>
            <p><strong>Updated At:</strong> {stateOfPlay.updated_at}</p>
            <p><strong>State:</strong> {stateOfPlay.state}</p>
            <p><strong>Documents:</strong> {stateOfPlay.documents ? stateOfPlay.documents : 'N/A'}</p>
          </div>
        </DialogDescription>

        <DialogClose asChild>
          <Button className="btn">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default StateOfPlayDialog;
