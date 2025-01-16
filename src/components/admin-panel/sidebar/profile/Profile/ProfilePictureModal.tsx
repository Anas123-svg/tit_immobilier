import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";

interface ProfilePictureModalProps {
  isModalOpen?: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
}

const ProfilePictureModal: React.FC<ProfilePictureModalProps> = ({
  isModalOpen = true,
  setIsModalOpen = () => {},
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      console.log("Uploaded file:", selectedFile);
      setIsModalOpen(false); // Close modal after saving
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg w-[400px] p-6"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-primary">
                Add my profile picture
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} className="text-secondary" />
              </button>
            </div>

            {/* Upload Section */}
            <div className="text-center mb-6">
              <label
                htmlFor="file-upload"
                className="block w-full h-[150px] border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
              >
                {selectedFile ? (
                  <p className="text-sm text-primary">{selectedFile.name}</p>
                ) : (
                  <>
                    <Upload size={40} className="text-gray-500 mb-2" />
                    <p className="text-sm text-gray-500">Select a photo</p>
                  </>
                )}
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfilePictureModal;
