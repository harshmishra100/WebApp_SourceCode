import React, { useState } from "react";
import Header from "./Header";
import api from "../api";

const CreateQuestion = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [bloomTaxonomy, setBloomTaxonomy] = useState("");
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
  const [id, setId] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "admin/dashboard/questions",
        {
          question,
          answer,
          difficulty,
          subject,
          grade,
          bloom_taxonomy: bloomTaxonomy,
          type,
          topic,
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      document.getElementById("status").innerHTML =
        "Question created successfully!";
      console.log(response.data);
    } catch (error) {
      console.error("Error creating question:", error);
      document.getElementById("status").innerHTML = "An Error Occurred!";
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
        <Header />
        <br />
        <br />
        <h1 style={{ textAlign: "center" }}>Create Question</h1>
        <form onSubmit={handleSubmit}>
          <label>Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <label>Answer:</label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <label>Difficulty:</label>
          <input
            type="text"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <label>Grade:</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <label>Bloom Taxonomy:</label>
          <input
            type="text"
            value={bloomTaxonomy}
            onChange={(e) => setBloomTaxonomy(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <label>Topic:</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <label>Id:</label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
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
            Create
          </button>
        </form>
        <div
          id="status"
          style={{ marginTop: "10px", textAlign: "center" }}
        ></div>
      </div>
    </div>
  );
};

export default CreateQuestion;
