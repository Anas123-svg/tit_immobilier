import React, { useState } from 'react';

export default function TicketCategorySettings() {
  const [categories, setCategories] = useState<string[]>([]); // Array to hold ticket categories
  const [newCategory, setNewCategory] = useState<string>(''); // State for the new category input

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]); // Add new category to the list
      setNewCategory(''); // Clear input field after adding
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Ticket category</h2>

      <div className="bg-gray-50 p-6 rounded-xl shadow-md">
        {/* Add category input */}
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter category name"
          />
          <button
            onClick={handleAddCategory}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
          >
            Add+
          </button>
        </div>

        {/* List of added categories */}
        <div>
          <h3 className="font-medium text-gray-700">Existing Categories</h3>
          <ul className="list-disc pl-5 mt-2">
            {categories.map((category, index) => (
              <li key={index} className="text-sm text-gray-600">
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
