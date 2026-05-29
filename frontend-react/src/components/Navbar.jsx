import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const { totalItems } = useContext(CartContext);

  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
      className="navbar"
      style={{
        width: "100%",
        background: "rgba(5,5,5,0.95)",
        backdropFilter: "blur(8px)",
        padding: "14px 35px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        zIndex: 999,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxSizing: "border-box",
      }}
    >
      {/* LOGO */}

      <div>
        <h1
          className="logo"
          style={{
            color: "#C8973A",
            fontSize: "52px",
            margin: 0,
            fontFamily: "serif",
            lineHeight: "50px",
          }}
        >
          Royal Spice
        </h1>

        <p
          style={{
            color: "#d1d5db",
            letterSpacing: "6px",
            margin: 0,
            marginTop: "4px",
            fontSize: "14px",
          }}
        >
          LUXURY DINING
        </p>
      </div>
      {/* NAV LINKS */}

      <div
        className="nav-links"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          fontWeight: "bold",
        }}
      >
        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: isActive ? "#C8973A" : "white",

            borderBottom: isActive ? "2px solid #C8973A" : "none",

            paddingBottom: "5px",

            textDecoration: "none",

            fontWeight: "bold",

            transition: "0.3s",
          })}
        >
          Home
        </NavLink>

        <NavLink
          to="/menu"
          style={({ isActive }) => ({
            color: isActive ? "#C8973A" : "white",

            borderBottom: isActive ? "2px solid #C8973A" : "none",

            paddingBottom: "5px",

            textDecoration: "none",

            fontWeight: "bold",

            transition: "0.3s",
          })}
        >
          Menu
        </NavLink>

        <NavLink
          to="/reservation"
          style={({ isActive }) => ({
            color: isActive ? "#C8973A" : "white",

            borderBottom: isActive ? "2px solid #C8973A" : "none",

            paddingBottom: "5px",

            textDecoration: "none",

            fontWeight: "bold",

            transition: "0.3s",
          })}
        >
          Reservation
        </NavLink>

        <NavLink
          to="/cart"
          style={({ isActive }) => ({
            ...cartStyle,

            color: isActive ? "#C8973A" : "white",

            borderBottom: isActive ? "2px solid #C8973A" : "none",
          })}
        >
          Cart ({totalItems})
        </NavLink>

        <NavLink
          to="/orders"
          style={({ isActive }) => ({
            color: isActive ? "#C8973A" : "white",

            borderBottom: isActive ? "2px solid #C8973A" : "none",

            paddingBottom: "5px",

            textDecoration: "none",

            fontWeight: "bold",

            transition: "0.3s",
          })}
        >
          Orders
        </NavLink>
        <NavLink
          to="/delivery-map"
          style={({ isActive }) => ({
            color: isActive ? "#C8973A" : "white",

            borderBottom: isActive ? "2px solid #C8973A" : "none",

            paddingBottom: "5px",

            textDecoration: "none",

            fontWeight: "bold",

            transition: "0.3s",
          })}
        >
          Delivery Map
        </NavLink>

        {!isLoggedIn ? (
          <NavLink to="/login" style={loginBtn}>
            Login
          </NavLink>
        ) : (
          <button onClick={handleLogout} style={logoutBtn}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

const cartStyle = {
  color: "#C8973A",
  textDecoration: "none",
  fontSize: "17px",
  fontWeight: "bold",
};

const loginBtn = {
  background: "linear-gradient(135deg,#C8973A,#E5C06B)",
  color: "black",
  padding: "12px 24px",
  borderRadius: "18px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "15px",
  boxShadow: "0 0 18px rgba(200,151,58,0.6)",
};

const logoutBtn = {
  background: "linear-gradient(135deg,#C8973A,#E5C06B)",
  color: "black",
  padding: "12px 24px",
  borderRadius: "18px",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
  boxShadow: "0 0 18px rgba(200,151,58,0.6)",
};

export default Navbar;
