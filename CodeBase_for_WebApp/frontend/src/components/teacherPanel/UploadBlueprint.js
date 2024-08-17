import React, { useState } from "react";
import axios from "axios";
import TeacherBar from "../TeacherBar";

const UploadBlueprint = () => {
  const [file, setFile] = useState(null);
  const [questionPaper, setQuestionPaper] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("blueprint", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/teacher/dashboard/upload-blueprint",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setQuestionPaper(response.data.questionPaper);
    } catch (error) {
      console.error("Error uploading blueprint:", error);
    }
  };

  const handleExport = async (format) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/teacher/dashboard/export-question-paper`,
        {
          questionPaper,
          format,
          schoolName: "Sample School",
          className: "Sample Class",
          classDuration: "2 hours",
          maxMarks: "100",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob", // important for file download
        },
      );

      const blob = new Blob([response.data], {
        type:
          format === "pdf"
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `question-paper.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error exporting question paper:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        padding: "20px",
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
        <TeacherBar />
        <br />
        <br />
        <br />
        <h2 style={{ textAlign: "center" }}>Upload Blueprint</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChange} />
          <br />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Upload
          </button>
        </form>
        {questionPaper && (
          <div>
            <h3 style={{ marginTop: "20px" }}>Generated Question Paper</h3>
            <p>{questionPaper}</p>
            <button
              onClick={() => handleExport("pdf")}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Export as PDF
            </button>
            <button
              onClick={() => handleExport("docx")}
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "10px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              Export as DOCX
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadBlueprint;
