import React from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      {/* logo */}

      <div className="navbar-logo" onClick={() => navigate("/")}>
        <h1>Inventory</h1>
      </div>

      {/* serach bar */}
      <div className="navbar-search">
        <input type="text" name="search" placeholder="Search..."></input>
      </div>
      {/* profile and logout */}
      <div className="navbar-profile">
        <AccountCircleIcon
          style={{
            fontSize: "40px",
            color: "white",
            cursor: "pointer",
            marginLeft: "10px",
            marginRight: "20px",
          }}
        />

        <button className="navbar-post" onClick={() => navigate("/post")}>
          Post
        </button>

        <button className="navbar-logout">Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
