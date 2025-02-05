import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function FileUploader({
  addedFiles,
  onChange,
  maxFiles = 5,
}: {
  addedFiles: string[];
  maxFiles: number;
  onChange: (files: string[]) => void;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const ALLOWED_FORMATS = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const CLOUDINARY_UPLOAD_PRESET = "tit-immobilier";
  const CLOUDINARY_CLOUD_NAME = "dewqsghdi";
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;

  const uploadSingleFile = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(CLOUDINARY_UPLOAD_URL, data, {
      withCredentials: false,
    });

    return res.data.secure_url;
  };

  const validateFiles = (files: FileList) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 Megabits

    if (files.length + addedFiles.length > maxFiles) {
      throw new Error(`You can only upload ${maxFiles} files`);
    }

    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_FILE_SIZE) {
        throw new Error("File size should not exceed 2 Megabits");
      }
      if (!ALLOWED_FORMATS.includes(files[i].type)) {
        throw new Error("Unsupported file format");
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    try {
      const files = e.target.files;
      if (!files) return;

      validateFiles(files);

      const urls = await Promise.all(Array.from(files).map(uploadSingleFile));

      toast.success("Files uploaded successfully");
      onChange([...addedFiles, ...urls]);
    } catch (error: any) {
      toast.error(error.message || "Error uploading file");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (ev: React.MouseEvent, fileUrl: string) => {
    ev.preventDefault();
    if (isUploading) {
      alert("Please wait for current upload to complete");
      return;
    }
    onChange([...addedFiles.filter((file) => file !== fileUrl)]);
  };

  const getFileIcon = (url: string) => {
    if (typeof url !== 'string') {
      return "📁"; // Return a default icon if `url` is not a string
    }
    const extension = url.split(".").pop()?.toLowerCase();
    console.log(extension);
    const iconMap: { [key: string]: string } = {
      jpg: "📷",
      jpeg: "📷",
      png: "📷",
      pdf: "📄",
      doc: "📝",
      docx: "📝",
      xls: "📊",
      xlsx: "📊",
    };
    return iconMap[extension || ""] || "📁";
  };

  return (
    <div className="w-full">
      <p className="text-sm">
        <strong>Formats and Size:</strong> JPEG, JPG, PNG, PDF, DOCS, DOCX, XlS,
        XLM for a maximum size of 2MB
      </p>
      <div className="flex flex-wrap gap-4 mt-2">
      {addedFiles.map((fileUrl, index) => (
  <div
    key={fileUrl + index}  // Use a combination of the file URL and index to guarantee uniqueness
    className="relative flex items-center p-2 border rounded"
  >
    <span className="mr-2 text-2xl">{getFileIcon(fileUrl)}</span>
    <button
      type="button"
      onClick={(ev) => removeFile(ev, fileUrl)}
      className="ml-auto text-red-500 hover:text-red-700"
    >
      Remove
    </button>
  </div>
))}

        {addedFiles.length < maxFiles && (
          <label
            className={`text-gray-600 flex items-center justify-center border rounded p-2 cursor-pointer ${
              isUploading ? "animate-pulse" : ""
            }`}
          >
            <input
              type="file"
              multiple
              disabled={isUploading}
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileUpload}
            />
            {!isUploading ? "Upload Files" : "Uploading..."}
          </label>
        )}
      </div>
    </div>
  );
}
