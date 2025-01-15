import React from "react";
import { Home, Ticket, Tag, User } from "lucide-react"; // Import the necessary icons
import { SummaryCardSectionProps } from "@/types/DataProps"; // Adjust the import path

const SummaryCardSection: React.FC<SummaryCardSectionProps> = ({ cards }) => {
  const colorClasses: { [key: string]: string } = {
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
  };

  // Icon mapping for each card type
  const iconMapping: { [key: string]: React.ElementType } = {
    "Real estate": Home,
    Ticket: Ticket,
    Intervention: Tag,
    Supplier: User,
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const Icon = iconMapping[card.name] || Home; // Default to Home if no icon is found
        return (
          <div
            key={index}
            className={`p-4 rounded-md shadow ${colorClasses[card.color]}`}
          >
            <div className="flex items-center justify-between">
              <Icon size={24} />
              <h3 className="text-lg font-semibold">{card.value}</h3>
            </div>
            <p className="text-sm">{card.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCardSection;
