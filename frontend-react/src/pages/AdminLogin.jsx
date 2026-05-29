import React, { useState } from "react";

function AdminLogin({ setIsAdmin }) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "royal123") {
      setIsAdmin(true);
    } else {
      alert("Wrong Password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#070B14",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#111827",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Admin Login</h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "14px",
            background: "#C8973A",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
