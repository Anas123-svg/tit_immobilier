import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Good, Mandate } from '@/types/DataProps';
import { Eye } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
// Define form schema using Zod for validation
const FormSchema = z.object({
  documents: z.array(z.string()).optional(),
});

interface MandateDialogProps {
  good: Good;
}

const LocativeDialog: React.FC<MandateDialogProps> = ({ good }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const rent = good.details?.[0]?.rent || 0;
  const charge = good.details?.[0]?.charges || 0;
  const total = rent + charge;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
          <Eye size={18} />
        </button>
      </DialogTrigger>
      <DialogContent className='min-w-[200px] md:min-w-[600px]'>
        <DialogTitle className=''></DialogTitle>
        <DialogDescription className='space-y-5'>
          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
            Property Details: <span className='font-bold'>{good.neighborhood}</span>
          </h2>
          <div className='grid md:grid-cols-2 gap-2'>
            <p><strong>Code:</strong> {good.details?.[0]?.door_number}</p>
            <p><strong>Owner:</strong> {good.owner}</p>
            <p><strong>Rental Type:</strong> {good.details?.[0]?.rental_type}</p>
            <p><strong>Status:</strong> {good.status}</p>
            <p><strong>Rent:</strong> {rent} XOF</p>
            <p><strong>Charge:</strong> {charge} XOF</p>
            <p><strong>Total Rent:</strong> {total} XOF</p>
          </div>
        </DialogDescription>

        <DialogClose asChild>
          <Button className="btn">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default LocativeDialog;
