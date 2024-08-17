import React, { useState } from "react";
import api from "../api";
import Header from "./Header";

const token = localStorage.getItem("token");

const BulkUploadQuestions = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        "admin/dashboard/questions/bulk-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      setUploadStatus("Upload successful!");
    } catch (error) {
      console.error("Error during bulk upload:", error);
      setUploadStatus("An error occurred!");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Header />
        <br />
        <h1 style={{ textAlign: "center" }}>Bulk Upload Questions</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label style={{ marginBottom: "10px" }}>Upload CSV:</label>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ marginBottom: "20px" }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload
          </button>
        </form>
        {uploadStatus && (
          <p style={{ marginTop: "10px", textAlign: "center" }}>
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default BulkUploadQuestions;
