import React from 'react';
import { useForm, Controller } from 'react-hook-form';

// Structure of your form's sections and fields
const accountSections = [
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
  },

];

const DefaultAccounts = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: accountSections.reduce((acc, section) => {
      section.fields.forEach(field => {
        acc[field.name] = ''; // Initialize all fields with empty values or fetch from an API
      });
      return acc;
    }, {})
  });

  const onSubmit =(data:any)  => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2 sm:p-5">
      {accountSections.map((section, index) => (
        <div key={index}>
          <h2 className="text-lg font-semibold p-2 text-center bg-secondary text-white mb-5">{section.title}</h2>
          <div className="">
            {section.fields.map((field) => (
              <div className='flex flex-col flex-wrap sm:flex-row justify-center items-center mb-5 ' key={field.name}>
                <label className="block mb-5 sm:text-start text-center lg:mb-0 text-sm font-bold text-gray-700 flex-grow w-full sm:w-1/2">{field.label}</label>
                <Controller
                  name={field.name}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <input

                      type="text"
                      placeholder='select Items'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      className="block  px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-end"><button type="submit" className="mt-4 px-4 py-2  bg-primary text-white rounded hover:bg-primary-dark">Save</button></div>
    </form>
  );
};

export default DefaultAccounts;
