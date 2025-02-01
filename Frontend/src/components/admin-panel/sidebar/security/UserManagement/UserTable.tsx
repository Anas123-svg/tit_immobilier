import { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Eye } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  service: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null); // Start with null
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage
        
        if (!token) {
          throw new Error("No token found");
        }

        // Send the token in the Authorization header
        const response = await axios.get<User[]>(`${import.meta.env.VITE_API_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer token for authentication
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users.");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle pagination logic
  const totalPages = users ? Math.ceil(users.length / itemsPerPage) : 0; // Safely check users
  const currentUsers = users ? users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

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

  if (loading) return <p>Loading...</p>; // Show loading text if data is being fetched
  if (error) return <p>{error}</p>; // Show error message if fetch fails

  return (
    <div className="p-4 bg-white rounded-md shadow overflow-auto">
      <div className="min-w-fit sm:w-full">
        <h3 className="text-lg font-bold mb-4">USER LIST</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-primary-light text-white border-primary border-2">
              <th className="p-2 border">Name and Surname</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Service</th>
       
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
            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-primary text-gray-50"}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-primary text-gray-50"}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
