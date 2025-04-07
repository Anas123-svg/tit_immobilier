import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye } from 'lucide-react';
import { NoticeOfExpiry } from '@/types/DataProps';

// Define form schema using Zod for validation
const FormSchema = z.object({
  contract_id: z.number().optional(),
  tenant_id: z.number().optional(),
  month: z.string(),
  rent: z.number().optional(),
  charge: z.number().optional(),
  total: z.number().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

interface NoticeOfExpiryDialogProps {
  notice: NoticeOfExpiry; // Assuming notice data will be passed as props
}

const NoticeOfExpiryDialog: React.FC<NoticeOfExpiryDialogProps> = ({ notice }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      contract_id: notice.contract_id,
      tenant_id: notice.tenant_id,
      month: notice.month??"",
      rent: notice.rent??0,
      charge: notice.charge??0,
      total: notice.total??0,
      created_at: notice.created_at,
      updated_at: notice.updated_at,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full bg-gray-300 text-white hover:bg-gray-400">
          <Eye size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className="min-w-[200px] md:min-w-[600px]">
        <DialogTitle className="text-xl font-semibold text-center">
          Notice of Expiry Details for Contract {notice?.contract_id || 'N/A'}
        </DialogTitle>

        <DialogDescription className="space-y-5">
          <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">
            Notice Details
          </h2>
          <div className="grid md:grid-cols-2 gap-2">
            <p><strong>Contract ID:</strong> {notice.contract_id}</p>
            <p><strong>Tenant ID:</strong> {notice.tenant_id}</p>
            <p><strong>Month:</strong> {notice.month}</p>
            <p><strong>Rent:</strong> {notice.rent ? `${notice.rent} XOF` : 'N/A'}</p>
            <p><strong>Charge:</strong> {notice.charge ? `${notice.charge} XOF` : 'N/A'}</p>
            <p><strong>Total:</strong> {notice.total ? `${notice.total} XOF` : 'N/A'}</p>
            <p><strong>Created At:</strong> {notice.created_at}</p>
            <p><strong>Updated At:</strong> {notice.updated_at}</p>
          </div>
        </DialogDescription>

        <DialogClose asChild>
          <Button className="btn">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default NoticeOfExpiryDialog;
