import React, { useState } from "react";
import axios from "axios";
import TeacherBar from "../TeacherBar";

const FetchQuestions = () => {
  const [formData, setFormData] = useState({
    difficulty: "",
    bloom_taxonomy: "",
    grade: "",
    subject: "",
    type: "",
    topic: "",
  });
  const [exportData, setExportData] = useState({
    schoolName: "Sample School",
    classDuration: "2 hours",
    maxMarks: "100",
  });
  const [questions, setQuestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleExportChange = (e) => {
    const { name, value } = e.target;
    setExportData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct query parameters string
    const queryString = Object.keys(formData)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`,
      )
      .join("&");

    try {
      const response = await axios.get(
        `http://localhost:3000/api/teacher/dashboard/questions?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleExport = async (format) => {
    try {
      const questionsFormatted = questions
        .map((q, index) => `${index + 1}. ${q.question}`)
        .join("\n");
      const response = await axios.post(
        "http://localhost:3000/api/teacher/dashboard/export-question-paper",
        {
          questionPaper: questionsFormatted,
          format,
          schoolName: exportData.schoolName,
          className: formData.grade,
          classDuration: exportData.classDuration,
          maxMarks: exportData.maxMarks,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
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
      a.download = `questions.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error exporting questions:", error);
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
        <h2 style={{ textAlign: "center" }}>Fetch Questions</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Difficulty:
            <input
              type="text"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Bloom's Taxonomy:
            <input
              type="text"
              name="bloom_taxonomy"
              value={formData.bloom_taxonomy}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Grade:
            <input
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Type:
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
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
            Fetch Questions
          </button>
        </form>
        <h3 style={{ marginTop: "20px" }}>Export Settings</h3>
        <label>
          School Name:
          <input
            type="text"
            name="schoolName"
            value={exportData.schoolName}
            onChange={handleExportChange}
          />
        </label>
        <br />
        <label>
          Class Duration:
          <input
            type="text"
            name="classDuration"
            value={exportData.classDuration}
            onChange={handleExportChange}
          />
        </label>
        <br />
        <label>
          Maximum Marks:
          <input
            type="text"
            name="maxMarks"
            value={exportData.maxMarks}
            onChange={handleExportChange}
          />
        </label>
        <br />
        <ul>
          {questions.map((question, index) => (
            <li key={question.id}>
              {index + 1}. {question.question}
            </li>
          ))}
        </ul>
        {questions.length > 0 && (
          <div>
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

export default FetchQuestions;
