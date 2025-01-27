import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Settings } from 'lucide-react';
import { PencilIcon, CheckIcon } from 'lucide-react';
import {SettingsHeader} from '../UI/SettingsHeader';
import Notification from '../UI/Notification';

type FormData = {
  typeOfUsage: string;
  agreed: string;
  email: string;
  mailingAddress: string;
  responsible: string;
  sectorOfActivity: string;
  tradeRegisterNumber: string;
  taxpayerAccountNumber: string;
  seat: string;
  commune: string;
  propertyTax: string;
  allowMobilePayments: string;
  vat: string;
};

const GeneralSettings: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      typeOfUsage: 'Business',
      agreed: 'Yes',
      email: 'info@tit-immobilier.net',
      mailingAddress: '01 BP 1804 Abidjan 01.',
      responsible: 'M. GBADOU YAHI Simplice',
      sectorOfActivity: '',
      tradeRegisterNumber: 'CI-ABI-2012-B-5676',
      taxpayerAccountNumber: 'N°NCC',
      seat: 'Cocody, Avenue Jean Mermoz',
      commune: 'COCODY',
      propertyTax: 'Property tax',
      allowMobilePayments: 'NON',
      vat: 'vat'
    }
  });

  const [editable, setEditable] = useState(false);

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
    // Other submission logic
  };

  const [isNotificationVisible, setNotificationVisible] = useState(true);

  return (
    <div className="space-y-5 ">
      <SettingsHeader
        icon={Settings}
        title="General Settings"
      
      />
      <Notification
        message="Attention! You have no SMS. Please contact your provider to get credit!"
        isVisible={isNotificationVisible}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow rounded-lg border-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Agency Settings</h1>
          <button type="button" onClick={handleEditToggle} className="p-2 focus:border-0 rounded-md bg-primary text-white hover:bg-primary-dark">
            {editable ? <CheckIcon className="h-5 w-5  " /> : <PencilIcon className="h-5 w-5" />}
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-1 gap-4">  {[
  { label: "Type d'usage", name: 'typeOfUsage', type: 'select', options: ['Business', 'Personal'] },
  { label: "Agreed?", name: 'agreed', type: 'select', options: ['Yes', 'No'] },
  { label: "E-mail", name: 'email', type: 'email' },
  { label: "Mailing address", name: 'mailingAddress', type: 'text' },
  { label: "Responsible", name: 'responsible', type: 'text' },
  { label: "Sector of activity", name: 'sectorOfActivity', type: 'text' },
  { label: "Trade register number", name: 'tradeRegisterNumber', type: 'text' },
  { label: "Taxpayer account number", name: 'taxpayerAccountNumber', type: 'text' },
  { label: "Seat", name: 'seat', type: 'text' },
  { label: "Commune", name: 'commune', type: 'text' },
  { label: "Property tax", name: 'propertyTax', type: 'text' },
  { label: "Allow Mobile Payments", name: 'allowMobilePayments', type: 'select', options: ['YES', 'NO'] },
  { label: "VAT (%)", name: 'vat', type: 'text' }
].map(field => (
        
          <div key={field.name} className="mb-4">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">{field.label}</label>
            <Controller
              control={control}
            name="typeOfUsage"
              render={({ field: { onChange, onBlur, value, ref } }) => field.type === 'select' ? (
                <select ref={ref} onChange={onChange} onBlur={onBlur} value={value} disabled={!editable} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  {field.options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <input ref={ref} onChange={onChange} onBlur={onBlur} value={value} type={field.type} disabled={!editable} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              )}
            />
          </div>
         
        ))}
       </div>
        {editable && (
          <button type="submit" className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
            Save Changes
          </button>
        )}
     
      </form>
    </div>
  );
};

export default GeneralSettings;
