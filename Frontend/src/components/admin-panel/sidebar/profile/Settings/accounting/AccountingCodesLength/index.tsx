import { Save } from 'lucide-react';
import React, { useState, ChangeEvent, FormEvent } from 'react';

const AccountingCodesLength = () => {
  // State for storing the lengths of accounting codes
  const [thirdPartyAccountLength, setThirdPartyAccountLength] = useState<number>(6);
  const [generalAccountLength, setGeneralAccountLength] = useState<number>(6);

  // Handle change for third party accounting accounts
  const handleThirdPartyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setThirdPartyAccountLength(Number(event.target.value));
  };

  // Handle change for general accounting accounts
  const handleGeneralChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGeneralAccountLength(Number(event.target.value));
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Third Party Account Length:', thirdPartyAccountLength);
    console.log('General Account Length:', generalAccountLength);
    // Add additional logic for what happens when the form is submitted
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Length of accounting accounts</h1>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center">
          <label htmlFor="thirdPartyLength" className="flex-1">
            Length of Third Party Accounting Accounts
          </label>
          <input
            type="number"
            id="thirdPartyLength"
            value={thirdPartyAccountLength}
            onChange={handleThirdPartyChange}
            className="w-20 p-1 border rounded text-right"
          />
        </div>
        <div className="flex sm:flex-row flex-col items-start justify-between sm:items-center">
          <label htmlFor="generalAccountLength" className="flex-1">
            Length of general accounting accounts
          </label>
          <input
            type="number"
            id="generalAccountLength"
            value={generalAccountLength}
            onChange={handleGeneralChange}
            className="w-20 p-1 border rounded text-right"
          />
        </div>
     <div className="flex justify-end ">   <button type="submit" className="px-5 items-center justify-center flex gap-2 py-2 bg-primary text-white rounded hover:bg-primary-dark">
     <Save size={20}/> Save 
        </button>  
        </div>
      </form>
    </div>
  );
};

export default AccountingCodesLength;
