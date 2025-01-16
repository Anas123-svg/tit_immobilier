import React from "react";

interface Breadcrumb {
  name: string;
  path: string;
}

interface LocationProspectHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const LocationProspectHeader: React.FC<LocationProspectHeaderProps> = ({
  title,
  breadcrumbs,
}) => {
  return (
    <div className="bg-primary text-white p-6 rounded-md mb-6">
      <div className="mb-2">
        <p className="text-sm">
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              <a href={crumb.path} className="hover:underline">
                {crumb.name}
              </a>
              {index < breadcrumbs.length - 1 && " > "}
            </span>
          ))}
        </p>
      </div>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
};

export default LocationProspectHeader;
