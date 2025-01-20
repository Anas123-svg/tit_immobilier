import React, { useState } from "react";
import { Mail } from "lucide-react"; // Importing Mail icon from Lucide
import { Editor, EditorState } from "draft-js"; // Importing Draft.js components
import "draft-js/dist/Draft.css"; // Import Quill's Snow theme CSS

export default function NewMessage() {
  const [typeOfShipment, setTypeOfShipment] = useState<string>("Mail");
  const [recipient, setRecipient] = useState<string>("");
  const [object, setObject] = useState<string>("");
  const [emailCount, setEmailCount] = useState<number>(0);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState); // Update the editor content state
  };

  const handleFilterSubmit = () => {
    const content = editorState.getCurrentContent();
    const contentText = content.getPlainText(); // Get plain text from the editor
    console.log("Content submitted:", contentText);
    // Add functionality to handle sending mail or SMS here
  };

  return (
    <div className="p-6 space-y-6 ">
      {/* Warning Message */}
      <div className="bg-red-100 text-red-800 p-4 rounded-md">
        Attention! You have no SMS. Please contact your provider to get credit!
      </div>
      {/* Number of Email Addresses Retrieved */}
     
    
       
   
      {/* Form Section */}
      <div className="space-y-4 bg-white p-6  rounded-lg shadow-lg border">
      <div className="bg-blue-100  rounded-md text-center p-3">
            Number of email addresses retrieved {emailCount} 
            </div>
            <div className="flex gap-5 flex-grow">
        {/* Type of Shipment */}
        <div className="flex gap-4 w-full">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Type of shipment</label>
            <select
              value={typeOfShipment}
              onChange={(e) => setTypeOfShipment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Mail">Mail</option>
              <option value="SMS">SMS</option>
            </select>
          </div>

    
        </div>
   {/* Recipient Dropdown */}
   <div className=" w-full">
          <label className="block text-sm font-medium text-gray-700">Recipient</label>
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a customization</option>
            <option value="Owner">Owner</option>
            <option value="Tenant">Tenant</option>
            <option value="Client">Client</option>
            <option value="Prospect">Prospect</option>
            <option value="Set email address(es)">Set the email address(es)</option>
          </select>
        </div></div>
        {/* Object Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Object</label>
          <textarea
            value={object}
            onChange={(e) => setObject(e.target.value)}
            placeholder="Enter the object"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

     
         {/* Draft.js Editor */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <div className="bg-white border border-gray-300 p-4 rounded-md">
          <Editor
            editorState={editorState}
            onChange={handleEditorChange}
            placeholder="Enter your message here"
          />
        </div>
      </div>
        {/* Send Button */}
        <div className="flex justify-end mt-6">
        <button
          onClick={handleFilterSubmit}
          className="px-6 py-2 bg-secondary text-white rounded-md"
        >
          <Mail className="inline mr-2" /> Send
        </button>
      </div>
      </div>

     

    
    </div>
  );
}
