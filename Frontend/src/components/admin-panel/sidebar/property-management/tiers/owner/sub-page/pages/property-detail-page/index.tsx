import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Good from "./Good"; // Import Good Component
import Ticket from "./Ticket"; // Import Ticket Component
import { Wallet } from "lucide-react";

export function PropertyDetailPage() {
  const [activeTab, setActiveTab] = useState("good");

  const tabs = [
    {
      name: "good",
      label: "Good",
      icon: <Wallet className="inline mr-2" />, // Replace with the correct icon
      component: (
       
            <Good
              propertyName="YAO FERNAND BUILDING"
              marketValue="2,220,000 XOF"
              totalRent="2,220,000 XOF"
              totalCharges="0 XOF"
              rentalValue="2,220,000 XOF"
              rentals={{ occupied: 4, available: 11, reserved: 0 }}
            />
      
      ),
    },
    {
      name: "ticket",
      label: "Ticket",
      icon: <Wallet className="inline mr-2" />, // Replace with the correct icon
      component: (
        
            <Ticket />
        
    
        
      ),
    },
  ];

  return (
    <div className="pt-10 rounded-lg shadow-lg bg-white">
   
      {/* Tabs for Good and Ticket */}
      <div className="grid grid-cols-2 gap-4  border-b shadow-lg border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`py-2 px-4 text-sm font-semibold ${
              activeTab === tab.name
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render content based on active tab */}
      {tabs
        .filter((tab) => tab.name === activeTab)
        .map((tab) => (
          <div key={tab.name}>{tab.component}</div>
        ))}
    </div>
  );
}
