import React from 'react';

export type TableRow = {
  designation: string;
  total: number;
  paid: number;
  unpaid: number;
};

const SelectionDetails: React.FC = () => {
  const data: TableRow[] = [
    { designation: 'Facture du loyer de janvier 2025', total: 93000, paid: 0, unpaid: 93000 },
    { designation: 'Facture du loyer de février 2025', total: 93000, paid: 0, unpaid: 93000 },
    { designation: 'Facture du loyer de mars 2025', total: 93000, paid: 0, unpaid: 93000 },
  ];

  return (
    <div className='space-y-6'>
      <h2 className="bg-primary text-white text-center p-2 text-sm md:text-base">SELECTION DETAILS</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Total */}
        <div className="bg-blue-500 text-white p-4 text-center rounded-md">
          <h3 className="text-lg font-semibold">TOTAL: 0 XOF</h3>
        </div>

        {/* Payment */}
        <div className="bg-green-500 text-white p-4 text-center rounded-md">
          <h3 className="text-lg font-semibold">PAYMENT: 0 XOF</h3>
        </div>

        {/* Impact */}
        <div className="bg-red-500 text-white p-4 text-center rounded-md">
          <h3 className="text-lg font-semibold">IMPACT: 0 XOF</h3>
        </div>
      </div>

      {/* Table for Designations */}
      <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Designation</th>
            <th className="border border-gray-300 p-2">Total</th>
            <th className="border border-gray-300 p-2">Paid</th>
            <th className="border border-gray-300 p-2">Unpaid</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                <input type="checkbox" /> {row.designation}
              </td>
              <td className="border border-gray-300 p-2">{row.total}</td>
              <td className="border border-gray-300 p-2">{row.paid}</td>
              <td className="border border-gray-300 p-2 text-red-500">{row.unpaid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectionDetails;
