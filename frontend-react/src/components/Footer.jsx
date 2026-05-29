import React from "react";

function Footer() {
  return (
    <div
      style={{
        background: "#05070D",
        color: "white",
        padding: "60px 10%",
        marginTop: "80px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "40px",
        }}
      >
        <div>
          <h1
            style={{
              color: "#C8973A",
              fontSize: "45px",
              marginBottom: "10px",
            }}
          >
            Royal Spice
          </h1>

          <p style={{ color: "#999", lineHeight: "1.8" }}>
            Experience luxury dining with premium taste, elegant ambience and
            world class service.
          </p>
        </div>

        <div>
          <h2 style={{ color: "#C8973A" }}>Quick Links</h2>

          <p>Home</p>
          <p>Menu</p>
          <p>Reservation</p>
          <p>Orders</p>
        </div>

        <div>
          <h2 style={{ color: "#C8973A" }}>Contact</h2>

          <p>Email: royalspice@gmail.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Location: Chennai, India</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "50px",
          textAlign: "center",
          color: "#777",
        }}
      >
        © 2026 Royal Spice. All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer;
