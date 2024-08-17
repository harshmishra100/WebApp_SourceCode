import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css"; // Import your CSS file for styling

const LogoutButton = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    // Clear saved storage
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="logout-container">
      <button onClick={togglePopup}>Logout</button>
      {showPopup && (
        <div className="logout-popup">
          <div className="popup-content">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7046/7046204.png" // Replace with your exit image path
              alt="Exit"
              className="exit-image"
            />
            <p>Are you sure to logout?</p>
            <div className="popup-buttons">
              <button onClick={handleLogout}>Yes, Logout</button>
              <button onClick={togglePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
