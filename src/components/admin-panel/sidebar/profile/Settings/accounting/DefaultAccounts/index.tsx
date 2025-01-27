import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

// Define types for the fields and sections
interface AccountField {
  name: string;
  label: string;
}

interface AccountSection {
  title: string;
  fields: AccountField[];
}

// Define the form data type
interface FormData {
  [key: string]: string; // All fields are strings (adjust as needed)
}

// Structure of your form's sections and fields
const accountSections: AccountSection[] = [
  {
    title: 'Third Parties / Users',
    fields: [
      { name: 'trustees', label: 'Default accounting account for third-party "trustees"' },
      { name: 'suppliers', label: 'Default accounting account for third-party "suppliers"' },
      { name: 'employees', label: 'Default accounting account for "employee" third parties' }
    ]
  },
  {
    title: 'Product',
    fields: [
      { name: 'productsSold', label: 'Default accounting account for products sold' },
      { name: 'productsExported', label: 'Default accounting account for products sold and exported outside the EEC' },
      { name: 'productsPurchased', label: 'Default accounting account for products purchased in the same country' }
    ]
  },
  {
    title: 'Third Parties / Users',
    fields: [
      { name: 'trustees', label: 'Default accounting account for third-party "trustees"' },
      { name: 'suppliers', label: 'Default accounting account for third-party "suppliers"' },
      { name: 'employees', label: 'Default accounting account for "employee" third parties' }
    ]
  },
  {
    title: 'Product',
    fields: [
      { name: 'productsSold', label: 'Default accounting account for products sold' },
      { name: 'productsExported', label: 'Default accounting account for products sold and exported outside the EEC' },
      { name: 'productsPurchased', label: 'Default accounting account for products purchased in the same country' }
    ]
  }
];

const DefaultAccounts = () => {
  // Use FormData as the type for form values
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: accountSections.reduce((acc: FormData, section) => {
      section.fields.forEach(field => {
        acc[field.name] = ''; // Initialize all fields with empty values
      });
      return acc;
    }, {}) // Explicitly type the accumulator
  });

  // Submit handler with the correct type for data
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2 sm:p-5">
      {accountSections.map((section, index) => (
        <div key={index}>
          <h2 className="text-lg font-semibold p-2 text-center bg-secondary text-white mb-5">{section.title}</h2>
          <div className="">
            {section.fields.map((field) => (
              <div className="flex flex-col flex-wrap sm:flex-row justify-center items-center mb-5" key={field.name}>
                <label className="block mb-5 sm:text-start text-center lg:mb-0 text-sm font-bold text-gray-700 flex-grow w-full sm:w-1/2">
                  {field.label}
                </label>
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input
                      type="text"
                      placeholder="select Items"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      className="block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button type="submit" className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark">
          Save
        </button>
      </div>
    </form>
  );
};

export default DefaultAccounts;
