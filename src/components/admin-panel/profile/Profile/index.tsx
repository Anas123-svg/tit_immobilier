import React from "react";
import UserImage from "@/assets/avatar-default.png"; // Replace with your actual image path

const ProfileComponent: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Profile Header */}
      <div className="bg-primary text-white rounded-lg p-6 flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
          <img
            src={UserImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">New IT Company...</h2>
          <p className="text-sm">SERVICE COMMERCIAL</p>
          <p className="text-sm mt-2">
            <span className="font-medium">Email:</span> info@tit-immobilier.net
          </p>
          <p className="text-sm">
            <span className="font-medium">Phone:</span> 27 22 29 21 03
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400">
          Back
        </button>
        <button className="px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500">
          Change My Password
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Change My Profile Picture
        </button>
      </div>

      {/* Profile Details */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-medium">Name:</p>
            <p>NEW COMPANY TIT-IMMOBILIER</p>
          </div>
          <div>
            <p className="font-medium">Role:</p>
            <p>SERVICE COMMERCIAL</p>
          </div>
          <div>
            <p className="font-medium">Created On:</p>
            <p>January 7, 2025 at 1:25:13 AM</p>
          </div>
          <div>
            <p className="font-medium">Modified On:</p>
            <p>January 12, 2025 at 4:41:11 AM</p>
          </div>
        </div>

        {/* File Sheet Section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-primary">File Sheet</h3>
          <div className="mt-2 border border-gray-300 rounded-lg p-4">
            <p className="text-sm">
              ACCEPTED FORMATS AND SIZES: JPEG, JPG, PNG, PDF, DOCS, DOCX, XLS,
              XLM for a maximum size of 2 Mega bits
            </p>
            <div className="mt-4 h-24 border-dashed border-2 border-gray-300 flex items-center justify-center text-gray-500">
              Drag and drop files here or click to upload
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
