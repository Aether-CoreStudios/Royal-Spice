import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaXTwitter,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(to bottom, #05070D 0%, #0B1120 100%)",
        color: "white",
        marginTop: "100px",
        borderTop: "2px solid rgba(200,151,58,0.25)",
      }}
    >
      {/* TOP SECTION */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px 40px",
        }}
      >
        <h1
          style={{
            color: "#C8973A",
            fontSize: "58px",
            marginBottom: "15px",
            fontFamily: "serif",
          }}
        >
          Royal Spice
        </h1>

        <p
          style={{
            color: "#9CA3AF",
            maxWidth: "700px",
            margin: "auto",
            lineHeight: "1.8",
            fontSize: "16px",
          }}
        >
          Experience luxury dining, premium hospitality, elegant ambience,
          world-class cuisine and unforgettable moments crafted specially for
          our guests.
        </p>
      </div>

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "50px",
          padding: "0 10% 50px",
        }}
      >
        {/* QUICK LINKS */}
        <div>
          <h2 style={{ color: "#C8973A", marginBottom: "20px" }}>
            Quick Links
          </h2>

          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/menu" style={linkStyle}>
            Menu
          </Link>
          <Link to="/reservation" style={linkStyle}>
            Reservation
          </Link>
          <Link to="/orders" style={linkStyle}>
            Orders
          </Link>
          <Link to="/rooms" style={linkStyle}>
            Rooms
          </Link>
          <Link to="/contact" style={linkStyle}>
            Contact
          </Link>
        </div>

        {/* CONTACT */}
        <div>
          <h2 style={{ color: "#C8973A", marginBottom: "20px" }}>Contact Us</h2>

          <p style={infoStyle}>
            <FaPhone /> &nbsp; +91 9876543210
          </p>

          <p style={infoStyle}>
            <FaEnvelope /> &nbsp; royalspice@gmail.com
          </p>

          <p style={infoStyle}>
            <FaLocationDot /> &nbsp; Chennai, Tamil Nadu, India
          </p>
        </div>

        {/* HOURS */}
        <div>
          <h2 style={{ color: "#C8973A", marginBottom: "20px" }}>
            Opening Hours
          </h2>

          <p style={hourStyle}>
            Monday - Friday
            <br />
            <span style={{ color: "#9CA3AF" }}>10:00 AM - 11:00 PM</span>
          </p>

          <p style={hourStyle}>
            Saturday - Sunday
            <br />
            <span style={{ color: "#9CA3AF" }}>09:00 AM - 12:00 AM</span>
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div
        style={{
          width: "85%",
          height: "1px",
          background: "rgba(255,255,255,0.08)",
          margin: "0 auto",
        }}
      />

      {/* SOCIAL */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding: "35px 0",
        }}
      >
        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          <div style={socialCircle}>
            <FaInstagram color="#C8973A" />
          </div>
        </a>

        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <div style={socialCircle}>
            <FaFacebook color="#C8973A" />
          </div>
        </a>

        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          <div style={socialCircle}>
            <FaLinkedin color="#C8973A" />
          </div>
        </a>

        <a href="https://x.com" target="_blank" rel="noreferrer">
          <div style={socialCircle}>
            <FaXTwitter color="#C8973A" />
          </div>
        </a>
      </div>

      {/* POLICY LINKS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "25px",
          padding: "10px 20px 5px",
          flexWrap: "wrap",
        }}
      >
        <Link to="/privacy-policy" style={policyStyle}>
          Privacy Policy
        </Link>

        <Link to="/refund-policy" style={policyStyle}>
          Refund Policy
        </Link>
      </div>

      {/* BOTTOM BAR */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          textAlign: "center",
          padding: "20px",
          color: "#6B7280",
          fontSize: "14px",
        }}
      >
        © 2026 Royal Spice • Luxury Dining Experience • All Rights Reserved
      </div>
    </footer>
  );
}

/* STYLES */
const linkStyle = {
  display: "block",
  color: "#D1D5DB",
  textDecoration: "none",
  marginBottom: "12px",
  transition: "0.3s",
};

const infoStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#D1D5DB",
  marginBottom: "15px",
};

const hourStyle = {
  color: "white",
  lineHeight: "1.8",
  marginBottom: "20px",
};

const socialCircle = {
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  background: "rgba(200,151,58,0.12)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  transition: "0.3s",
};

const policyStyle = {
  color: "#9CA3AF",
  textDecoration: "none",
  fontSize: "14px",
  transition: "0.3s",
};

export default Footer;
