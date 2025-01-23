// ValidatedMandatesList.tsx
import React from "react";
import { Mandate } from "@/types/DataProps";

interface ValidatedMandatesListProps {
  mandates: Mandate[];
}

const ValidatedMandatesList: React.FC<ValidatedMandatesListProps> = ({ mandates }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md overflow-auto">
        <div className="w-fit ">   <h3 className="text-lg font-semibold mb-4">List of the Last 10 Validated Mandates</h3>
      <table className=" border">
        <thead>
          <tr className="bg-red-100 gap-5 fle text-left">
            <th className="p-2">Good</th>
            <th className="p-2">Surface Area</th>
            <th className="p-2">Owner</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {mandates.map((mandate, index) => (
            <tr key={index} className="border-b w-fit">
              <td className="p-2">{mandate.good}</td>
              <td className="p-2">{mandate.surfaceArea}</td>
              <td className="p-2">{mandate.owner}</td>
              <td className="p-2">{mandate.type}</td>
              <td className="p-2">{mandate.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> </div>
  );
};

export default ValidatedMandatesList;
