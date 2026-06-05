import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "../firebase";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const registerUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await sendEmailVerification(userCredential.user);

      setSuccessMessage(
        "Account created successfully! Please check your Inbox. If you don't see the verification email, check your Spam/Junk folder. Verify your email before logging in.",
      );

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "120px",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(15,23,42,0.92)",
          padding: "50px",
          borderRadius: "25px",
          width: "420px",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        <h1
          style={{
            color: "#C8973A",
            textAlign: "center",
            marginBottom: "35px",
            fontSize: "40px",
          }}
        >
          Create Account
        </h1>

        {successMessage && (
          <div
            style={{
              background: "#d4edda",
              color: "#155724",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {successMessage}
          </div>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={registerUser} style={signupBtn}>
          Create Account
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "1px solid #333",
  background: "#0F172A",
  color: "white",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

const signupBtn = {
  width: "100%",
  padding: "16px",
  background: "linear-gradient(135deg,#C8973A,#E5C06B)",
  border: "none",
  borderRadius: "12px",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

export default Signup;
