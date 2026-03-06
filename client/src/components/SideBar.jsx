import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaHome, FaPlusSquare } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const navigate=useNavigate()
  const location = useLocation();

  

  const linkStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    textDecoration: "none",
    color: location.pathname === path ? "#000" : "#555",
    fontWeight: location.pathname === path ? "600" : "400",
    borderRadius: "8px",
    backgroundColor:
      location.pathname === path ? "#f0f0f0" : "transparent",
    transition: "0.3s",
  });

  function logout(){
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        borderRight: "1px solid #ddd",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "25px 15px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div>
        <h2
          style={{
            fontWeight: "700",
            marginBottom: "40px",
            cursor: "pointer",
          }}
        >
          SocialApp
        </h2>

        {/* Navigation Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/post-card" style={linkStyle("/post-card")}>
            <FaHome /> All Posts
          </Link>

          <Link to="/profile" style={linkStyle("/profile")}>
            <FaUser /> Profile
          </Link>

          <Link to="/create-post" style={linkStyle("/create-post")}>
            <FaPlusSquare /> Create Post
          </Link>

          <div
  onClick={logout}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 15px",
    cursor: "pointer",
    color: "#555",
    borderRadius: "8px",
  }}
>
  <FiLogOut /> Logout
</div>
        </div>
      </div>

      {/* Bottom Section */}
      
      <div style={{ fontSize: "14px", color: "#999" }}>
        © 2026 SocialApp
      </div>
    </div>
  );
};

export default Sidebar;