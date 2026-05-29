import React from "react";

import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "120px",
        background:
          "linear-gradient(to bottom right, #050505, #111111, #1A1A1A)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      {/* CARD */}

      <div
        style={{
          width: "100%",
          maxWidth: "650px",
          background: "#151515",
          padding: "60px 40px",
          borderRadius: "30px",
          border: "1px solid #222",
          textAlign: "center",
          boxShadow: "0px 10px 40px rgba(0,0,0,0.6)",
          animation: "fadeIn 1s ease",
        }}
      >
        {/* ICON */}

        <div
          style={{
            width: "120px",
            height: "120px",
            margin: "auto",
            borderRadius: "50%",
            background: "rgba(200,151,58,0.15)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
            border: "2px solid #C8973A",
            fontSize: "60px",
          }}
        >
          ✅
        </div>

        {/* TITLE */}

        <p
          style={{
            color: "#C8973A",
            letterSpacing: "4px",
            marginBottom: "10px",
          }}
        >
          PAYMENT CONFIRMED
        </p>

        <h1
          style={{
            color: "#F5F0E8",
            fontSize: "55px",
            marginBottom: "20px",
          }}
        >
          Order Successful
        </h1>

        <p
          style={{
            color: "#999",
            lineHeight: "1.8",
            fontSize: "18px",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          Thank you for dining with Royal Spice Restaurant. Your order has been
          successfully placed and our chefs are preparing your luxury meal.
        </p>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* HOME */}

          <button
            onClick={() => navigate("/")}
            style={{
              padding: "16px 32px",
              borderRadius: "40px",
              border: "none",
              background: "#C8973A",
              color: "black",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Back To Home
          </button>

          {/* MY ORDERS */}

          <button
            onClick={() => navigate("/myorders")}
            style={{
              padding: "16px 32px",
              borderRadius: "40px",
              border: "1px solid #C8973A",
              background: "transparent",
              color: "#C8973A",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
