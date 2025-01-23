import React from 'react';
import { Icon as LucideIcon, Edit2 } from 'lucide-react';

type SettingsHeaderProps = {
  icon: React.ElementType;
  title: string;
};

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ icon: Icon, title }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-primary text-white shadow">
      <div className="flex items-center">
        <Icon className="h-6 w-6  mr-2" /> {/* Adjust size as needed */}
        <h1 className="text-xl font-semibold ">{title}</h1>
      </div>
    
    </div>
  );
};


