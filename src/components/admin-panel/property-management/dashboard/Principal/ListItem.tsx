// ListItem.tsx
import React from 'react';

interface ListItemProps {
  name: string;
  phone: string;
  code: string;
  status: string;
  pay: string;
}

const ListItem: React.FC<ListItemProps> = ({ name, phone, code, status, pay }) => {
  return (
    <div className="flex justify-between items-center py-3 px-4 border-b">
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500">Code: {code}</p>
      </div>
      <div className="flex justify-end items-center">
        <span className={`text-sm ${status === "ACTIVE" ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
        <span className="ml-3 text-sm">{pay}</span>
      </div>
    </div>
  );
};

export default ListItem;
