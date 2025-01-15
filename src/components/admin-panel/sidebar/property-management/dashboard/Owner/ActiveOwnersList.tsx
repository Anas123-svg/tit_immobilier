// ActiveOwnersList.tsx
import React from "react";
import { Owner } from "@/types/DataProps";

interface ActiveOwnersListProps {
  owners: Owner[];
}

const ActiveOwnersList: React.FC<ActiveOwnersListProps> = ({ owners }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h3 className="text-lg font-semibold mb-4">List of Last 10 Active Owners</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-yellow-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Profession</th>
            <th className="p-2">Code</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{owner.name}</td>
              <td className="p-2">{owner.contact}</td>
              <td className="p-2">{owner.profession}</td>
              <td className="p-2">{owner.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveOwnersList;
