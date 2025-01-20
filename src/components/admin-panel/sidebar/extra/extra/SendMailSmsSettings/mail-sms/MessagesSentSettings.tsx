import React, { useState } from 'react';
import { Filter, Mail, Phone } from 'lucide-react'; // Importing relevant icons

export default function MessagesSentSettings() {
  const [selectedTab, setSelectedTab] = useState('mail'); // State to track selected tab
  const [type, setType] = useState('Mail');
  const [personalization, setPersonalization] = useState('All');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  const handleFilterChange = (name: string, value: string) => {
    if (name === 'type') setType(value);
    if (name === 'personalization') setPersonalization(value);
    if (name === 'email') setEmail(value);
    if (name === 'date') setDate(value);
  };

  const handleFilterSubmit = () => {
    console.log('Filters submitted:', { type, personalization, email, date });
  };

  return (
    <div className="p-6 space-y-6 ">
      {/* Warning Message */}
      <div className="bg-red-100 text-red-800 p-4 rounded-md">
        Attention! You have no SMS. Please contact your provider to get credit!
      </div>

      {/* Filter Section */}
      <div className="space-y-4 p-4 rounded shadow-lg border">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              value={type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Mail">Mail</option>
              <option value="SMS">SMS</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Personalization</label>
            <select
              value={personalization}
              onChange={(e) => handleFilterChange('personalization', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="All">All</option>
              <option value="Personalized">Personalized</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Email Address / Number</label>
            <input
              type="text"
              value={email}
              onChange={(e) => handleFilterChange('email', e.target.value)}
              placeholder="Email Address / Number"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => handleFilterChange('date', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
<div className="flex justify-end">
        <button
          onClick={handleFilterSubmit}
          className="py-2 flex gap-2 px-4 bg-secondary text-white rounded-md"
        >
          <Filter/>
          Filter
        </button></div>
      </div>
<div className="p-4 rounded shadow-lg border">
      {/* Tabs Navigation */}
      <div className="flex border-b ">
        <button
          onClick={() => setSelectedTab('mail')}
          className={`py-2 px-4 w-full text-center ${selectedTab === 'mail' ? 'border-b-2 border-primary text-primary ' : 'text-gray-500'}`}
        >
          <Mail className="inline mr-2" /> Mail Sent
        </button>
        <button
          onClick={() => setSelectedTab('sms')}
          className={`py-2 px-4 w-full text-center ${selectedTab === 'sms' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
        >
          <Phone className="inline mr-2" /> SMS Sent
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === 'mail' && (
        <div className="mt-4 p-4 bg-white rounded-md ">
          <h2 className="text-xl font-semibold">Mail Sent</h2>
          <div className="flex items-center gap-2 mt-4">
            <Mail className="text-red-500" />
            <span className="text-lg font-medium">No email sent yet.</span>
          </div>
        </div>
      )}
      {selectedTab === 'sms' && (
        <div className="mt-4 p-4 bg-white ">
          <h2 className="text-xl font-semibold">SMS Sent</h2>
          <div className="flex items-center gap-2 mt-4">
            <Phone className="text-red-500" />
            <span className="text-lg font-medium">No SMS sent yet.</span>
          </div>
        </div>
      )}
    </div></div>
  );
}
