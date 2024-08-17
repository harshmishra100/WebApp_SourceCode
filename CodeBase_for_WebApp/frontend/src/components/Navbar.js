import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#3498db",
        marginBottom: "50px",
        color: "white",
        width: "100%",
        height: "50px",
        marginLeft: "-20px",
      }}
    >
      <div>
        <img
          src="https://play-lh.googleusercontent.com/klu-ztyIPi6F84wMOEhRQ1FchvHmwPqqRxWAzFuQy3KHGeOKe5bjBA16oLIXr3No3Sos=w240-h480-rw"
          alt="logo"
          style={{ maxHeight: "30%", maxWidth: "30%" }}
        />
      </div>

      <ul style={{ listStyle: "none", display: "flex" }}>
        <li style={{ marginRight: "30px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li style={{ marginRight: "30px" }}>
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        </li>
        <li style={{ marginRight: "30px" }}>
          <Link to="/signup" style={{ color: "white", textDecoration: "none" }}>
            Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
