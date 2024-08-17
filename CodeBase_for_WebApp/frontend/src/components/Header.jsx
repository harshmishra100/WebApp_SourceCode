import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <ul
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        listStyle: "none",
        padding: "10px",
        backgroundColor: "#3498db",
        marginBottom: "50px",
        color: "white",
        width: "100%",
        textAlign: "center",
      }}
    >
      <li style={{ display: "inline-block", marginRight: "10px" }}>
        <Link
          to="/admin/Dashboard"
          style={{ color: "white", textDecoration: "none" }}
        >
          DashBoard
        </Link>
      </li>
      <li style={{ display: "inline-block", marginRight: "10px" }}>
        <Link
          to="/admin/questions/create"
          style={{ color: "white", textDecoration: "none" }}
        >
          Create Question
        </Link>
      </li>
      <li style={{ display: "inline-block", marginRight: "10px" }}>
        <Link
          to="/admin/questions/bulk-upload"
          style={{ color: "white", textDecoration: "none" }}
        >
          Bulk Upload Questions
        </Link>
      </li>
      <li style={{ display: "inline-block", marginRight: "10px" }}>
        <Link
          to="/admin/add-admin"
          style={{ color: "white", textDecoration: "none" }}
        >
          Add Admin
        </Link>
      </li>
      <li style={{ display: "inline-block", marginRight: "10px" }}>
        <Link to="/logout" style={{ color: "white", textDecoration: "none" }}>
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default Header;
