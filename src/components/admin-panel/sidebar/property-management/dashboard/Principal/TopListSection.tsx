// TopListSection.tsx
import React, { useState } from 'react';
import ListItem from './ListItem'; // Reusable list item component
import Pagination from './Pagination'; // Pagination component
import Search from './Search'; // Search component

interface TopListSectionProps {
  title: string;
  data: Array<{ name: string, phone: string, code: string, status: string, pay: string }>;
  itemsPerPage: number;
}

const TopListSection: React.FC<TopListSectionProps> = ({ title, data, itemsPerPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter the data based on search term
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-lg mb-6 w-[49%] border border-gray-300">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
      
      {/* Search */}
      <Search setSearchTerm={setSearchTerm} />

      <div className="overflow-hidden bg-white shadow-sm rounded-md">
        {currentItems.map((item, index) => (
          <ListItem key={index} {...item} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalPages={totalPages} 
      />
    </div>
  );
};

export default TopListSection;
