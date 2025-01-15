// Pagination.tsx
import React from 'react';

const Pagination: React.FC = () => {
  return (
    <div className="flex justify-between items-center py-3 px-4 border-t">
      <button className="text-blue-600">Premier</button>
      <button className="text-blue-600">Previous</button>
      <button className="text-blue-600">1</button>
      <button className="text-blue-600">2</button>
      <button className="text-blue-600">Following</button>
      <button className="text-blue-600">Last</button>
    </div>
  );
};

export default Pagination;
