import { LucideIcon } from "lucide-react";

export interface StatCardProps {
    name: string;
    value: string ;
    color: string;
    icon: React.ElementType; // Use React.ElementType for the icon component
    activeLabel?: string;
    inactiveLabel?: string;
  }
export interface SummaryCardProps {
  name: string;
  value: string | number;
  color: string;
}

export interface FilterOptions {
  type: string[];
}

export interface SummaryCardSectionProps {
  cards: SummaryCardProps[];
}