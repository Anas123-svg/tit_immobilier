// Search.tsx
import React from 'react';

interface SearchProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ setSearchTerm }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default Search;
