// ValidatedMandatesList.tsx
import React from "react";
const ValidatedMandatesList = ({ mandates }: any) => {
  return (
    <div className="p-4 bg-white shadow rounded-md overflow-auto">
      <div className="w-fit ">
        {" "}
        <h3 className="text-lg font-semibold mb-4">
          List of the Last 10 Validated Mandates
        </h3>
        <table className=" border">
          <thead>
            <tr className="bg-red-100 gap-5 fle text-left">
              <th className="p-2">Status</th>
              <th className="p-2">Owner</th>
              <th className="p-2">Type</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {mandates.map((mandate: any, index: any) => (
              <tr key={index} className="border-b w-fit">
                <td className="p-2">{mandate.status}</td>
                <td className="p-2">{mandate.owner_name}</td>
                <td className="p-2">{mandate.type_of_mandate}</td>
                <td className="p-2">{mandate.tax_payable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
    </div>
  );
};

export default ValidatedMandatesList;
