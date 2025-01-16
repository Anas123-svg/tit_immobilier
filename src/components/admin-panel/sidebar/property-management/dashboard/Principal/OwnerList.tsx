import React, { useState } from "react";
import ListItem from "./ListItem";
import Pagination from "./Pagination";
import Search from "./Search";

interface Owner {
  name: string;
  phone: string;
  code: string;
  status: string;
  pay: string;
}

const OwnerList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const owners: Owner[] = [
    { name: "Mrs. DIOMANDE AUDREY ASTOU", phone: "627745376", code: "ZA-6972-8243-01", status: "ACTIVE", pay: "150,000 XOF" },
    { name: "Mr SANGARE YOU ARE THE ONE", phone: "0709739307", code: "ZA-6972-2150-01", status: "ACTIVE", pay: "0 XOF" },
    { name: "Mr YAO KOUADIO FERNAND", phone: "585139200", code: "ZA-6972-6988-01", status: "ACTIVE", pay: "200,000 XOF" },
    { name: "Mr DEMBELE BASSERIBA", phone: "19782278791", code: "ZA-6972-4802-01", status: "ACTIVE", pay: "0 XOF" },
  ];

  const filteredOwners = owners.filter((owner) =>
    owner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOwners = filteredOwners.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <Search setSearchTerm={setSearchTerm} />
      <div className="overflow-hidden bg-white shadow-sm rounded-md">
        {paginatedOwners.map((owner, index) => (
          <ListItem key={index} {...owner} />
        ))}
      </div>
      <Pagination
       
        totalPages={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default OwnerList;
