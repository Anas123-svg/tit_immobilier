import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import { FilterOption } from "@/types/DataProps";
// import DynamicTable from '../../UI/DynamicTable'; // Importing the refactored table
import { Edit2, Eye, Trash2 } from "lucide-react";

// Define the breadcrumb data
const breadcrumbs = [
  { name: "Home", path: "/home" },
  { name: "Settings", path: "/settings" },
  { name: "Other", path: "/settings/other" },
  { name: "Equipment", path: "/home/settings/other/equipment" },
];

// Define the filter options
const filters: FilterOption[] = [
  {
    label: "Type",
    name: "type",
    type: "select",
    options: ["Dragonfly", "Other"],
  },
  {
    label: "Created by",
    name: "createdBy",
    type: "text",
  },
  {
    label: "Start date",
    name: "startDate",
    type: "date",
  },
  {
    label: "End date",
    name: "endDate",
    type: "date",
  },
];
const advancefilters: FilterOption[] = [
  {
    label: "Created by",
    name: "createdBy",
    type: "select",
    options: ["Selector"], // Assuming 'Selector' as an example; replace with actual options as needed
  },
  {
    label: "Creation date",
    name: "creationDate",
    type: "date",
  },
  {
    label: "Order",
    name: "order",
    type: "select",
    options: ["Ascending", "Descending"], // Assuming order types; adjust as necessary
  },
  {
    label: "Name",
    name: "name",
    type: "number", // Assuming it's a numeric input for the sake of example; adjust if it's different
    options: ["10", "20", "50"], // Example values for the number of entries per page
  },
];
const handleFilterChange = (name: string, value: string) => {
  console.log(`${name}: ${value}`);
};

const handleFilterSubmit = () => {
  console.log("Filters submitted");
};

const EquipmentSettings = () => {
  const data = new Array(15).fill(null).map((_, index) => ({
    id: index + 1,
    label: `Equipment ${index + 1}`,
    createdAt: `January 7, 2025 at 1:25:13 AM`,
  }));

  const columns = [
    { label: "Label", accessor: "label" },
    { label: "Created At", accessor: "createdAt" },
    {
      label: "Action",
      accessor: "",
      render: () => (
        <>
          <button className="p-2 mr-1  rounded-full bg-gray-500 text-white hover:bg-gray-600">
            <Eye size={18} />
          </button>
          <button className="p-2 mr-1 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            <Edit2 size={18} />
          </button>
          <button className="p-2 mr-1 rounded-full bg-red-500 text-white hover:bg-red-600">
            <Trash2 size={18} />
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <HeaderSection
        gridSize="4"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Equipment", path: "/equipment" },
        ]}
        title="Equipment"
        filters={filters}
        advancefilters={advancefilters}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />

      <DynamicTable
        title="Equipment"
        columns={columns}
        data={data}
        pageSize={5}
      />
    </div>
  );
};

export default EquipmentSettings;
