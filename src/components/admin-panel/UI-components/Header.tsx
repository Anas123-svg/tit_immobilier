import React from "react";
import Breadcrumbs from "./Breadcrumbs";

interface HeaderProps {
  title: string;
  breadcrumbs: { name: string; path: string }[];
}

const Header: React.FC<HeaderProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="bg-primary text-white p-6 rounded-md mb-6">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
};

export default Header;
