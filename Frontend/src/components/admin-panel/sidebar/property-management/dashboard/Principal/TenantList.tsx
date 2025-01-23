import React, { useState } from "react";
import ListItem from "./ListItem";
import Pagination from "./Pagination"; // Pagination component
import Search from "./Search"; // Search component

interface Tenant {
  name: string;
  phone: string;
  code: string;
  status: string;
  pay: string;
}

const TenantList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Define how many items to display per page

  const tenants: Tenant[] = [
    { name: "Mr ASSEMIAN N'GUESSAN ADOLPHE", phone: "0707778973", code: "ZA-6972-6414-01", status: "ACTIVE", pay: "9 900 000 XOF" },
    { name: "Mr YAO N'GUESSAN ALAIN ROLAND", phone: "0777120473", code: "ZA-6972-2939-01", status: "ACTIVE", pay: "0 XOF" },
    { name: "Mme OGOKE DORCAS", phone: "0173154892", code: "ZA-6972-2970-01", status: "ACTIVE", pay: "150,000 XOF" },
    { name: "Mme KONAN MINI REBECCA", phone: "0710004867", code: "ZA-6972-9196-01", status: "ACTIVE", pay: "585,000 XOF" },
    { name: "Mr GBESSO EGNONNISSE", phone: "0707192127", code: "ZA-6972-1679-01", status: "ACTIVE", pay: "0 XOF" },
  ];

  // Filter tenants based on search term
  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);
  const paginatedTenants = filteredTenants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Search setSearchTerm={setSearchTerm} />
      <div className="overflow-hidden bg-white shadow-sm rounded-md">
        {paginatedTenants.map((tenant, index) => (
          <ListItem key={index} {...tenant} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default TenantList;
