import React, { useState } from "react";
import { Eye, Edit } from "lucide-react"; // Icons for View and Edit actions

interface User {
  name: string;
  email: string;
  contact: string;
  service: string;
  status: string;
}

const UserTable: React.FC = () => {
  const users: User[] = [
    { name: "New IT Company", email: "info@titi-immobilier.net", contact: "27 22 29 21 03", service: "Service commercial", status: "Online" },
    { name: "MY CECILE", email: "cecilimea@titi-immobilier.net", contact: "0142999857", service: "DIRECTION", status: "Online" },
    { name: "KOUADIO KOFFI SYLVEST...", email: "kouadiosylvestre@titi-immobilier.net", contact: "0142999632", service: "Service commercial", status: "Online" },
    { name: "BOHUI BRICE", email: "bricebohui@titi-immobilier.net", contact: "0142999778", service: "Recovery service", status: "Online" },
    { name: "User 5", email: "user5@titi-immobilier.net", contact: "0142999888", service: "Service commercial", status: "Offline" },
    { name: "User 6", email: "user6@titi-immobilier.net", contact: "0142999999", service: "DIRECTION", status: "Offline" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // Get the current page data
  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleView = (email: string) => {
    alert(`View User: ${email}`);
  };

  const handleEdit = (email: string) => {
    alert(`Edit User: ${email}`);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow overflow-auto">
      <h3 className="text-lg font-bold mb-4">USER LIST</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-primary-light text-white border-primary border-2">
            <th className="p-2 border">Name and Surname</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Service</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.contact}</td>
              <td className="p-2 border">{user.service}</td>
              <td className="p-2 border">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    user.status === "Online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleView(user.email)}
                  className="mr-2 text-blue-500 hover:underline"
                >
                  <Eye className="inline mr-1" /> View
                </button>
                <button
                  onClick={() => handleEdit(user.email)}
                  className="text-blue-500 hover:underline"
                >
                  <Edit className="inline mr-1" /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-primary text-gray-50"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNext}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-primary text-gray-50"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
