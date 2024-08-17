import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/dashboard/add-admin",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error adding admin: " + error.response.data.message);
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
          textAlign: "center",
        }}
      >
        <Header />
        <br />
        <h1 style={{ textAlign: "center" }}>Add New Admin</h1>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
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
            Add Admin
          </button>
        </form>
        {message && <p style={{ marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  );
};

export default AddAdmin;
