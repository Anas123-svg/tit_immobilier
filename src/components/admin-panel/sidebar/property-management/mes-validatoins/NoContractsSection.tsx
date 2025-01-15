import React from "react";

interface NoContractsSectionProps {
  message: string;
}

const NoContractsSection: React.FC<NoContractsSectionProps> = ({ message }) => {
  return (
    <div className="p-4 bg-white shadow rounded-md mt-6">
      <h3 className="text-lg font-semibold text-center">{message}</h3>
      <div className="flex justify-center items-center mt-4">
        <div className="text-center text-yellow-500">
          <span className="text-6xl">😞</span>
        </div>
      </div>
    </div>
  );
};

export default NoContractsSection;
