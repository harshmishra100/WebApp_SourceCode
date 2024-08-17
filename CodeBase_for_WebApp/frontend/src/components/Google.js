// src/components/GoogleSuccess.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const email = query.get("email");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/teacher/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
};

export default GoogleSuccess;
