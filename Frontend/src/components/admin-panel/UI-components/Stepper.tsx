import { Button } from '@/components/ui/button';
import React, { ReactNode, useState } from 'react';

// Stepper Props Interface
interface StepperProps {
  children: ReactNode[]; // Each step will be a child
  activeStep: number; // Active step index
  onStepChange: (step: number) => void; // Callback for step change
  stepsTitle: string[]
}

const Stepper: React.FC<StepperProps> = ({ children, activeStep, onStepChange,stepsTitle }) => {
  const handleNext = () => {
    if (activeStep < children.length - 1) {
      onStepChange(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      onStepChange(activeStep - 1);
    }
  };

  return (
    <div className='space-y-12'>
        {/* Step Indicator */}
        <div className="flex items-center w-full">
  
  {children.map((_, index) => (
   <div className=" w-full relative"> <div key={index} className={`flex left-10 items-center ${index < children.length - 1 && ( "w-full")} absolute`}>
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center border ${index <= activeStep ? 'bg-secondary' : 'bg-gray-300'} ${index === activeStep ? 'border-blue-500' : 'border-gray-300'}`}
      >
        <span className={`text-white ${index === activeStep ? 'font-bold' : ''}`}>
          {index + 1}
        </span>
      </div>
      {index < children.length - 1 && (
        <div className="flex-grow h-1 bg-gray-300 mx-2"></div>
      )}
     
    </div><div className="mt-10">    {stepsTitle[index]}</div>

    </div>
  ))}
</div>


      <div className="steps-container">
        {children.map((child, index) => (
          <div
            key={index}
            style={{
              display: index === activeStep ? 'block' : 'none', // Only display the active step
            }}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="flex gap-5">
      <Button
               onClick={handlePrev} disabled={activeStep === 0}
                  className="bg-gray-500 hover:bg-gray-600"
                >
                  Previous
                </Button>
                <Button
                 onClick={handleNext} disabled={activeStep === children.length - 1}
                  className="bg-secondary hover:bg-secondary-dark"
                >
                  Next
                </Button>
     
      </div>
    </div>
  );
};

export default Stepper;
