import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      console.log(response.data);
      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.token);
        navigate(response.data.redirect);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <h2 style={{ textAlign: "center" }}>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
            />
            <label>Password:</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
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
              Login
            </button>
          </form>
          <button
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
              backgroundColor: "#dd4b39",
              color: "white",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            <a
              href="http://localhost:3000/auth/google/callback"
              style={{ color: "white", textDecoration: "none" }}
            >
              Continue With Google
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
