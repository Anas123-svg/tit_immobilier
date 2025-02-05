import React from "react";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex w-full  flex-col items-center justify-center p-8 bg-gray-200 rounded-md">
      <div className="text-orange-500 text-6xl mb-4">😞</div>
      <h2 className="text-2xl font-bold mb-2">Oops!!</h2>
      <p className="text-gray-500">{message} Not Found</p>
    </div>
  );
};

export default EmptyState;
