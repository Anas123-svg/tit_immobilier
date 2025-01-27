import React from 'react';

const CalendarStatusSection: React.FC = () => {
  const calendarStatus = [
    { label: 'Inactive', color: 'red-500' },
    { label: 'Active', color: 'green-500' },
    { label: 'Expired', color: 'orange-500' },
    { label: 'Expires in about 3 months', color: 'yellow-500' },
  ];

  return (
    <div className="mt-6 bg-white space-y-4 p-6 rounded-lg shadow-md">
     <div className=" border-b-2  pb-2 "> <h2 className="text-lg font-semibold">Calendar Status</h2></div>
      <div className="flex gap-4 mt-4">
        {calendarStatus.map((status, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full bg-${status.color}`}
            ></span>
            <span>{status.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarStatusSection;
