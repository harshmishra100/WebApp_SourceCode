import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Navbar />
      <br />
      <div style={{ margin: "50px auto", maxWidth: "800px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>
          Welcome to the Question Bank Generator App
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "40px" }}>
          Empowering teachers to create, manage, and utilize question banks for
          quizzes and exams.
        </p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ flex: "1", margin: "0 20px" }}>
            <h3 style={{ marginBottom: "10px" }}>Add Questions</h3>
            <p>
              Teachers can easily add questions to the database categorized by
              topics for easy retrieval.
            </p>
          </div>
          <div style={{ flex: "1", margin: "0 20px" }}>
            <h3 style={{ marginBottom: "10px" }}>Filter and Prepare Quizzes</h3>
            <p>
              Filter questions by topic to create customized quizzes and exams
              tailored to specific subjects and grades.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "40px",
          }}
        >
          <div style={{ flex: "1", margin: "0 20px" }}>
            <h3 style={{ marginBottom: "10px" }}>Export to Documents</h3>
            <p>
              Export quizzes and exams into editable documents (DOCX) or
              professional-looking PDFs for easy distribution and printing.
            </p>
          </div>
          <div style={{ flex: "1", margin: "0 20px" }}>
            <h3 style={{ marginBottom: "10px" }}>AI Paper Generation</h3>
            <p>
              Utilize AI to generate question papers on any topic or create
              papers from a given blueprint to streamline exam preparation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
