import React from "react";
import { useNavigate } from "react-router-dom";

function Failed() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#0F172A",
        color: "white",
      }}
    >
      <h1
        style={{
          color: "#ff4d4d",
          fontSize: "55px",
          marginBottom: "15px",
        }}
      >
        Payment Failed ❌
      </h1>

      <p
        style={{
          color: "#aaa",
          fontSize: "18px",
          marginBottom: "30px",
        }}
      >
        Something went wrong while processing your payment.
      </p>

      <button
        onClick={() => navigate("/cart")}
        style={{
          marginTop: "20px",
          padding: "15px 30px",
          border: "none",
          borderRadius: "10px",
          background: "#C8973A",
          color: "black",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Back To Cart
      </button>
    </div>
  );
}

export default Failed;
