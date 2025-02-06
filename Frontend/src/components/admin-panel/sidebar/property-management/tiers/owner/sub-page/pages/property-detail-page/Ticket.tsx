import DynamicTable from "@/components/admin-panel/UI-components/DynamicTable";
import React from "react";

const Ticket = () => (
  <div className="ticket-detail p-5">
    <DynamicTable title="List Of Tickets" addBorder={false} columns={[]} data={[]} pageSize={5} addButton={false} />
  
  </div>
);

export default Ticket;
