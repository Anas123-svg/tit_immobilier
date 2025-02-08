import React from "react";
import ContractsList from "./ContractsList";


import { tenantStats } from "@/data/dummyData";
import HeaderSection from "@/components/admin-panel/UI-components/HeaderSection";
import { FilterOption } from "@/types/DataProps";
import { User, FileText, Briefcase, DollarSign, Phone } from "lucide-react";

import StatisticCardsSection2 from "@/components/admin-panel/UI-components/StatisticCardsSection2";
import ChartSection from "@/components/admin-panel/UI-components/ChartSection";
import { ChartData, ChartOptions } from "chart.js";
import StatisticCardsSection4 from "@/components/admin-panel/UI-components/StatisticCardsSection4";
import CircularDiagram from "@/components/admin-panel/UI-components/CircularDiagram";
import StatisticCard4 from "@/components/admin-panel/UI-components/StatisticCard4";
import useFetchData from "@/hooks/useFetchData";
import StatisticCard2 from "@/components/admin-panel/UI-components/StatisticCard2";
import DynamicTable from "@/components/admin-panel/UI-components/DynamicTable";
import { Link } from "react-router-dom";


interface Stats {
  total_tenants: number;
  total_contracts: number;
  total_bills: number;
  total_payments: number;
  total_invoice: number;
  pending_invoice:  number;
  last_tenants: any[];
  last_unpaid_tenants: any[];
  last_to_be_renewed_contracts:any[];
  list_active_contracts:any[];
  list_terminated_contracts:any[];
  tenants_bills:any[];
  tenants_payments: any[];
  tenant_invoice: any[];
  pie_chart_data: any[];

  waiting_invoice: number;
  sales: number;
  unpaid_invoice: number;
  in_progress_invoice: number;
}
const TenantDashboard: React.FC = () => {
  const breadcrumbs = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tenant", path: "/dashboard/tenant" },
  ];
  const filters: FilterOption[] = [
    {
      type: "select",
      label: "Type",
      name: "type",
      options: [
        "ALL",
        "RENT",
        "ENTRY INVOICE",
        "PENALTY",
        "OTHER INVOICES",
        "RENEWAL",
        "TERMINATION",
      ],
    },
    {
      type: "text",
      label: "Tenant",
      name: "tenant",
      placeholder: "Tenant",
    },
    {
      type: "date",
      label: "Start date",
      name: "startDate",
      placeholder: "mm/dd/yyyy",
    },
    {
      type: "date",
      label: "End date",
      name: "endDate",
      placeholder: "mm/dd/yyyy",
    },
  ];

  const handleFilterChange = (name: string, value: string) => {
    console.log(`Filter changed: ${name} = ${value}`);
  };

  const handleFilterSubmit = () => {
    console.log("Filters submitted");
  };


  const { data: stats, loading, error } = useFetchData<Stats>(
    `${import.meta.env.VITE_API_URL}/api/dashboard/tenants`
  );
  const data: ChartData<"bar"> = {
    labels: [
      "Jan 1 - Jan 5, 2025",
      "Jan 6 - Jan 12, 2025",
      "Jan 13 - Jan 19, 2025",
      "Jan 20 - Jan 26, 2025",
      "Jan 27 - Jan 31, 2025",
    ],
    datasets: [
      {
        label: "Total",
        data: [1786000, 1200000, 1300000, 1100000, 1500000],
        backgroundColor: "#4F46E5",
        borderColor: "#4F46E5",
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
      },
      {
        label: "Paid",
        data: [893000, 870000, 850000, 830000, 900000],
        backgroundColor: "#22C55E",
        borderColor: "#22C55E",
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
      },
      {
        label: "Unpaid",
        data: [893000, 700000, 600000, 750000, 600000],
        backgroundColor: "#EF4444",
        borderColor: "#EF4444",
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false, // Prevents automatic aspect ratio maintenance
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Monthly Rent Collection Statistics",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Period",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount (XOF)",
        },
        beginAtZero: true,
        ticks: {
          stepSize: 500000,
        },
      },
    },
  };

  const circulardata = {
    labels: ["Outstanding", "Paid", "Total"],
    datasets: [
      {
        data: stats?.pie_chart_data||[],
        backgroundColor: ["#F87171", "#34D399", "#3B82F6"],
      },
    ],
  };

  // Explicitly type the options object
  const circularoptions: ChartOptions<"doughnut"> = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Explicitly use a valid value
      },
    },
  };

  const tenantStats = [
    { name: "Invoice(s)", value: stats?.total_invoice, currency: "XOF", color: "bg-blue-500" },
    { name: "Waiting(s)", value:stats?.waiting_invoice, currency: "XOF", color: "bg-blue-400" },
    { name: "Unpaid", value:stats?.unpaid_invoice, currency: "XOF", color: "bg-red-500" },
    { name: "In progress", value: stats?.in_progress_invoice, currency: "XOF", color: "bg-yellow-500" },
    { name: "Sales", value: stats?.sales, currency: "XOF", color: "bg-green-500" },
  ];
  const statisCardData = [
    { name: "Tenant", value: stats?.total_tenants, icon: User, color: "bg-red-500" },
    { name: "Contract", value:  stats?.total_contracts, icon: FileText, color: "bg-blue-500" },
    { name: "Bill", value:  stats?.total_bills, icon: Briefcase, color: "bg-green-500" },
    { name: "Payment", value:  stats?.total_payments, icon: DollarSign, color: "bg-yellow-500" },
  ];

  const unpaidTenantsData = stats?.last_unpaid_tenants.map(tenant => {
    if (tenant.is_business_tenant) {
      return {
        name: (
          <Link to={`/tier/tenants/detail-page/${tenant.id}`}>  <div className="gap-5 flex items-center">
            <div className="">
              <User size={15} /> {tenant.business_company_name}
            </div>
            <div className="">
              <Phone size={15} /> {tenant.business_manager_contact}
            </div>
          </div> </Link>
        ),
        status: `${tenant.payment_status}`,
      };
    } else {
      return {
        name: (
          <Link to={`/tier/tenants/detail-page/${tenant.id}`}>   <div className="gap-5 flex items-center">
            <div className="">
              <User size={15} /> {tenant.private_name}
            </div>
            <div className="">
              <Phone size={15} /> {tenant.private_whatsapp_contact}
            </div>
          </div></Link>
        ),
        status: `${tenant.payment_status}`,
      };
    }
  });

  // Define columns for the table
// Define columns for the table
const columns = [
  { label: "NAME", accessor: "name" }, // Tenant name or business name
  { label: "Status", accessor: "status" }, // Unpaid status of the tenant
];
  return (
    <div className="p-2 sm:p-6 bg-gray-100 min-h-screen space-y-10">
      {/* Header Section */}
      <HeaderSection
        title="Tenant"
        breadcrumbs={breadcrumbs}
        filters={filters}
        onFilterChange={handleFilterChange}
        onFilterSubmit={handleFilterSubmit}
      />
      {/* Statistics Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {statisCardData.map((card,index) => (
  <StatisticCard2
    key={index} // Assuming `id` or any unique property is available to act as the key
    name={card.name}
    value={card?.value?? 0}
    color={card.color}
    icon={card.icon}
  />
))}

      
   
    </div>

      {/* Contracts Lists */}
      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <ContractsList
          title="LIST OF LAST 10 ACTIVE CONTRACTS"
          data={stats?.list_active_contracts||[]}
          headerColor="bg-red-500"
          itemsPerPage={5}
        />
        <ContractsList
          title="LIST OF THE NEXT 10 CONTRACTS TO BE RENEWED"
          data={stats?.last_to_be_renewed_contracts||[]}
          headerColor="bg-yellow-500"
          itemsPerPage={5}
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="grid grid-cols-2  gap-5 h-fit">
          {tenantStats.map((tenantStat, index) =>
            index == 0 ? (
              <div className=" col-span-2">
                {" "}
                <StatisticCard4
                  key={index}
                  name={tenantStat.name}
                  value={tenantStat.value ?? 0}
                  currency={tenantStat.currency}
                  color={tenantStat.color}
                />
              </div>
            ) : (
              <StatisticCard4
                key={index}
                name={tenantStat.name}
                value={tenantStat.value??0}
                currency={tenantStat.currency}
                color={tenantStat.color}
              />
            )
          )}
        </div>
        <div className="">
          {" "}
          <CircularDiagram
            title="Circular Diagram of Amount"
            data={circulardata}
          />
        </div>
      </div>
      <div className="mt-6">
        <ChartSection title="Monthly Reveneu" data={data} options={options} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

      {/* Dynamic Table Component */}
      <DynamicTable
        columns={columns}
        data={unpaidTenantsData??[]}
        pageSize={5}
        title="LIST OF TENANTS WITH AT LEAST ONE UNPAID PAYMENT"
        addButton={true}
        addBorder={true}
       headerColor="green"
      />
    <DynamicTable
        columns={[]}
        data={[]}
        pageSize={5}
        title="LIST OF THE LAST 10 TERMINATED CONTRACTS"
  
        addBorder={true}
       headerColor="blue"
      />
      </div>
    </div>
  );
};

export default TenantDashboard;
