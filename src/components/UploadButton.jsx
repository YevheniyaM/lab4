import React from "react";
import { uploadArticles } from "../firestoreService";

const UploadButton = () => {
  const handleUpload = async () => {
    try {
      await uploadArticles();
      alert("Articles uploaded successfully!");
    } catch (error) {
      console.error("Error uploading articles:", error);
      alert("Failed to upload articles.");
    }
  };

  return <button onClick={handleUpload}>Upload Articles</button>;
};

export default UploadButton;
