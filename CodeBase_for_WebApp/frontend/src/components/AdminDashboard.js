// src/components/AdminDashboard.js
import React from "react";
import ".//CSS/AdminDashboard.css";
import Header from "./Header";

const AdminDashboard = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <br></br>
      <br></br>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>

      <div className="card-container">
        <div className="card">
          <h3>Create Question</h3>
          <p>
            This Feature allows to manually add a Question by asking necessary
            Information from the User .
          </p>
        </div>
        <div className="card">
          <h3>Bulk Upload Questions</h3>
          <p>
            This Feature allows to bulk import questions using CSV Making it a
            lot easier to add large number of questions.
          </p>
        </div>
        <div className="card">
          <h3>Add Admin</h3>
          <p>
            This Feature allows admin exclusive authority to add new admins ,
            since admins can not sign up .This ensures that the Administrative
            Priviledges are not granted without permission
          </p>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
