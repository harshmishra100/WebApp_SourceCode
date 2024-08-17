import React from "react";
import { Link } from "react-router-dom";

const TeacherBar = () => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#3498db",
        width: "100%",
        zIndex: 1000, // Ensure the Navbar is above other content
      }}
    >
      <ul style={{ listStyle: "none", display: "flex", padding: 0 }}>
        <li style={{ marginRight: "20px" }}>
          <Link
            to="/teacher/dashboard/generate-question-paper"
            style={{ color: "white", textDecoration: "none" }}
          >
            Generate With AI
          </Link>
        </li>
        <li style={{ marginRight: "20px" }}>
          <Link
            to="/teacher/dashboard/upload-blueprint"
            style={{ color: "white", textDecoration: "none" }}
          >
            Upload Blueprint
          </Link>
        </li>
        <li style={{ marginRight: "20px" }}>
          <Link
            to="/teacher/dashboard/questions"
            style={{ color: "white", textDecoration: "none" }}
          >
            Fetch from Question Bank
          </Link>
        </li>
        <li>
          <Link to="/logout" style={{ color: "white", textDecoration: "none" }}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default TeacherBar;
