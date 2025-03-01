import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { useState } from "react";
  
  const PenaltyForm = () => {
    const [open, setOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
  
    const handleConfirm = () => {
      setIsConfirmed(true);
      setOpen(false);
      // Add your rent generation logic here
      console.log("Penalty generation confirmed!");
    };
  
    const handleCancel = () => {
      setIsConfirmed(false);
      setOpen(false);
      console.log("Penalty generation canceled!");
    };
  
    return (
      <div>
        {/* Trigger the dialog */}
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
          <DialogTrigger asChild>
          <button className="bg-yellow-500 text-white p-2 ">
         Penalty

            </button>
           
          </DialogTrigger>
  
          <DialogContent className="max-w-md p-6 space-y-4 bg-white rounded-lg shadow-md">
            <DialogTitle className="text-xl font-semibold text-center">
              Do you confirm the generation of Penalty?
            </DialogTitle>
  
            <div className="flex justify-center space-x-4">
              <Button
                variant="outline"
                className="text-gray-600 bg-gray-200"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <button
               
                className="bg-green-500 p-2 rounded-sm text-white"
                onClick={handleConfirm}
              >
                Confirm <span className="ml-2">✔</span>
              </button>
            </div>
          </DialogContent>
        </Dialog>
  
       
      </div>
    );
  };
  
  export default PenaltyForm;
  