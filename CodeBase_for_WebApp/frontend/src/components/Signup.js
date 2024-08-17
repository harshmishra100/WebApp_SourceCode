import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "./Navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/signup", {
        email,
        password,
        confirmPassword,
        firstname,
        lastname,
        userType: "teacher", // Default userType
      });
      if (response.data.status === "success") {
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 50px)", // Adjusted for navbar height
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
          <h2 style={{ textAlign: "center" }}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>First Name:</label>
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <label>Last Name:</label>
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
