import React from 'react';

interface EmergencyContactProps {
  emergencyContactName: string;
  emergencyContactNumber: string;
  emergencyContactRelation: string;
}

const EmergencyContact = ({
  emergencyContactName,
  emergencyContactNumber,
  emergencyContactRelation,
}: EmergencyContactProps) => {
  return (
    <div>
      <p><strong>Emergency Contact:</strong> {emergencyContactName}</p>
      <p><strong>Contact Number:</strong> {emergencyContactNumber}</p>
      <p><strong>Relation:</strong> {emergencyContactRelation}</p>
    </div>
  );
};

export default EmergencyContact;
