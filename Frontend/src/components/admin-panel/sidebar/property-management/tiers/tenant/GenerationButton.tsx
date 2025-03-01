import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { RefreshCw } from "lucide-react";


  import { useState } from "react";
import NoticeOfDeadlineForm from "./forms/NoticeOfDeadlineForm";
import RentForm from "./forms/RentForm";
import PenaltyForm from "./forms/PenaltyForm";
 
  
  const GenerationButton = () => {
    const [open, setOpen] = useState(false);
    const openChange = () => {
      setOpen(!open);

    };
  
   
  
               
    return (
      <Dialog open={open} onOpenChange={openChange}>
           <DialogTrigger>    <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600">
        <RefreshCw size={16} />
        <span>Generation</span>
      </button></DialogTrigger>
  
        <DialogContent className="w-full max-w-[95vw] lg:max-w-[600px] h-auto max-h-[95vh] overflow-y-auto p-6">
          <DialogTitle className="text-md border-b pb-4">
          Generation
          </DialogTitle>
            <div className="flex items-center justify-center gap-5">

                <NoticeOfDeadlineForm/>
                <RentForm/>
                <PenaltyForm/>
            </div>
  
  
        </DialogContent>
      </Dialog>
    );
  };
  
  export default GenerationButton;
  