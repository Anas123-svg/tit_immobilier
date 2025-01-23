import React from "react";

interface Breadcrumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
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
  );
};

export default Breadcrumbs;
