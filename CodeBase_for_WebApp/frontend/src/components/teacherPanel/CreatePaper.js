import React, { useState } from "react";
import axios from "axios";
import TeacherBar from "../TeacherBar";

const CreatePaper = () => {
  const [formData, setFormData] = useState({
    standard: "",
    topic: "",
    bloomLevel: "",
    difficulty: "",
    schoolName: "",
  });
  const [questionPaper, setQuestionPaper] = useState("");
  const [logoUrl, setLogoUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/teacher/dashboard/generate-question-paper",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setQuestionPaper(response.data.questionPaper);
      setLogoUrl(response.data.logoUrl);
    } catch (error) {
      console.error("Error creating question paper:", error);
    }
  };

  const handleExport = async (format) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/teacher/dashboard/export-question-paper`,
        {
          questionPaper,
          format,
          schoolName: formData.schoolName,
          className: formData.standard,
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
        <div>
          <h2 style={{ textAlign: "center" }}>Create Paper using AI</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Standard:
              <input
                type="text"
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                }}
              />
            </label>
            <br />
            <label>
              Topic:
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                }}
              />
            </label>
            <br />
            <label>
              Bloom's Taxonomy Level:
              <input
                type="text"
                name="bloomLevel"
                value={formData.bloomLevel}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                }}
              />
            </label>
            <br />
            <label>
              Difficulty:
              <input
                type="text"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                }}
              />
            </label>
            <br />
            <label>
              School Name:
              <input
                type="text"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  marginBottom: "10px",
                }}
              />
            </label>
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
              Generate Question Paper
            </button>
          </form>
          {questionPaper && (
            <div>
              <h2>Generated Question Paper</h2>
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
    </div>
  );
};

export default CreatePaper;
