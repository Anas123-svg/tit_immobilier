import React from 'react';

type NotificationProps = {
  message: string;
  isVisible: boolean;
};

const Notification: React.FC<NotificationProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default Notification;
