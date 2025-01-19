import React from "react";
import { Home } from "lucide-react"; // Default icon in case no mapping is provided

// Define the type for card data
interface CardData {
  name: string; // Card title or identifier
  value: string | number; // Value to display
  color: string; // Color identifier for the card
}

// Define the type for props
interface SummaryCardSectionProps {
  cards: CardData[]; // Array of cards
  iconMapping?: { [key: string]: React.ElementType }; // Optional mapping of names to icons
  colorClasses?: { [key: string]: string }; // Optional mapping of colors to classes
  additionalCardClasses?: string; // Additional classes for card styling
}

const StatisticCardsSection2: React.FC<SummaryCardSectionProps> = ({
  cards,
  iconMapping = {}, // Default to an empty mapping
  colorClasses = {}, // Default to an empty mapping
  additionalCardClasses = "", // Default to no additional classes
}) => {
  // Default color classes if none are provided
  const defaultColorClasses: { [key: string]: string } = {
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
  };

  // Merge provided color classes with defaults
  const mergedColorClasses = { ...defaultColorClasses, ...colorClasses };

  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => {
        // Use the provided icon mapping or default to the `Home` icon
        const Icon = iconMapping[card.name] || Home;

        return (
          <div
            key={index}
            className={`p-4 rounded-md shadow ${
              mergedColorClasses[card.color] || "bg-gray-100 text-gray-700"
            } ${additionalCardClasses}`}
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

export default StatisticCardsSection2;
