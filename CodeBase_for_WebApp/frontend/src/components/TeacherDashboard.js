// src/components/TeacherDashboard.js
import React from "react";
import { Link } from "react-router-dom";
import TeacherBar from "./TeacherBar";
import "./TeacherDashboard.css"; // Import CSS file for styling

const TeacherDashboard = () => {
  return (
    <>
      <TeacherBar />
      <br />
      <br />
      <br />
      <h1 style={{ textAlign: "center" }}>Teacher Dashboard</h1>
      <div className="dashboard-container">
        <div className="feature-card">
          <h2>Generate With AI</h2>
          <p>Allows you to create papers using Generative AI.</p>
        </div>
        <div className="feature-card">
          <h2>Upload Blueprint</h2>
          <p>Upload the blueprint of your paper; AI handles the rest.</p>
        </div>
        <div className="feature-card">
          <h2>Fetch from Question Bank</h2>
          <p>Filter questions from existing DB by topic and grade.</p>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
