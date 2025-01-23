import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CheckIcon, MessageSquareIcon, PencilIcon, Settings } from 'lucide-react';
import Notification from '../UI/Notification'; // Adjust path as needed
import { SettingsHeader } from '../UI/SettingsHeader';

type SmsSettingsForm = {
  notMessage: string;
  billMessage: string;
  paymentReminder: string;
  contractMessage: string;
  birthdayMessage: string;
  ticketMessage: string;
};

export default function SmsSettings() {
  const { control, handleSubmit, reset, formState: { isDirty, isSubmitSuccessful }  } = useForm<SmsSettingsForm>({
    defaultValues: {
      notMessage: 'Congratulations, your account has been created. Your login: [login], Password: [password]. You must change your password on first login.',
      billMessage: '[Name], [Depositor] has deposited [Amount] on [Date] for the bill [Bill] leaving [Balance] unpaid.',
      paymentReminder: 'Hello [Name], [Title]: Amount: [Amount], Remaining: [Balance], Date: [Date]',
      contractMessage: 'Your contract for [Property] starting on [Start Date] and ending on [End Date] has been processed. First payment due: [First Payment]. Thank you for your trust.',
      birthdayMessage: 'Happy Birthday [Name], your agency [Agency Name] wishes you a joyful day!',
      ticketMessage: 'Your complaint on [Date] regarding [Issue] has been received. Ticket ID: [Ticket ID]'
    }
  });


  const [editable, setEditable] = useState(false);

  const handleEditToggle = () => {
    setEditable(!editable);
  };
    React.useEffect(() => {
        if ((!editable && isDirty) || isSubmitSuccessful) {
            reset();
        }
    }, [editable, isDirty, isSubmitSuccessful, reset]);

  const onSubmit = (data: SmsSettingsForm) => {
    console.log(data);
    // Implement your update logic here
  };

  return (
    <div className="space-y-5">
      <SettingsHeader
      title='Sms Settings'
      icon={MessageSquareIcon}/>
    <div className="p-4 bg-white shadow rounded-lg space-y-5 border-2"> 
      <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-lg font-bold">SET AGENCY MESSAGES</h1>
          <button type="button" onClick={handleEditToggle} className="p-2 focus:border-0 rounded-md bg-primary text-white hover:bg-primary-dark">
            {editable ? <CheckIcon className="h-5 w-5  " /> : <PencilIcon className="h-5 w-5" />}
          </button>
        </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{Object.entries(control._defaultValues).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</label>
            <Controller
              name={key as keyof SmsSettingsForm}
              control={control}
              render={({ field }) => (
                <textarea {...field} rows={3} className="mt-1 text-sm block w-full p-2 border border-gray-300 rounded-md"></textarea>
              )}
            />
          </div>
        ))}</div> 
    {editable && (
          <button type="submit" className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded">
            Save Changes
          </button>
        )}
      </form>
      </div>
    </div>
  );
}
