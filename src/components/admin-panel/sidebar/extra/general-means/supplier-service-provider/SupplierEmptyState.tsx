import React from "react";

interface SupplierEmptyStateProps {
  message: string;
}

const SupplierEmptyState: React.FC<SupplierEmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-200 rounded-md">
      <div className="text-orange-500 text-6xl mb-4">😞</div>
      <h2 className="text-2xl font-bold mb-2">Oops!!</h2>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default SupplierEmptyState;
