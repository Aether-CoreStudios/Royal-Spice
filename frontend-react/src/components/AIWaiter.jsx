import React, { useState } from "react";
import axios from "axios";
import { FaConciergeBell } from "react-icons/fa";

function AIWaiter() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [chat, setChat] = useState([
    {
      sender: "bot",
      text: "Welcome to Royal Spice. How may I assist you today?",
    },
  ]);

  const suggestions = [
    "Suggest luxury dishes",
    "Best desserts?",
    "Recommend drinks",
    "Table reservation help",
  ];
  const quickReplies = {
    "Suggest luxury dishes":
      "Our chef recommends Truffle Pasta, Wagyu Steak and Royal Grill Platter.",

    "Best desserts?":
      "Customers love Chocolate Lava Cake and Royal Pistachio Cheesecake.",

    "Recommend drinks": "Try our Signature Mojito or Blue Lagoon Mocktail.",

    "Table reservation help":
      "You can reserve tables easily from our Reservation page.",
  };
  const sendMessage = async (text) => {
    const finalMessage = text || message;

    if (!finalMessage) return;

    const userMessage = {
      sender: "user",
      text: finalMessage,
    };

    setChat((prev) => [...prev, userMessage]);

    setMessage("");

    try {
      if (quickReplies[finalMessage]) {
        const botMessage = {
          sender: "bot",
          text: quickReplies[finalMessage],
        };

        setChat((prev) => [...prev, botMessage]);

        return;
      }
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        message: finalMessage,
      });

      const botMessage = {
        sender: "bot",
        text: res.data.reply,
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* FLOATING BUTTON */}

      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",

          width: "70px",
          height: "70px",

          borderRadius: "50%",

          background: "linear-gradient(135deg,#C8973A,#E5C06B)",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          cursor: "pointer",

          zIndex: 9999,

          boxShadow: "0 0 35px rgba(200,151,58,0.6)",

          fontSize: "30px",

          color: "black",

          transition: "0.3s",
        }}
      >
        <FaConciergeBell />
      </div>

      {/* CHAT PANEL */}

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "25px",
            width: "320px",
            background: "#111827",
            borderRadius: "22px",
            padding: "18px",
            zIndex: 9999,
            boxShadow: "0 0 40px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h3
            style={{
              color: "#C8973A",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            Royal Spice AI Waiter
          </h3>

          {/* CHAT */}

          <div
            style={{
              height: "260px",
              overflowY: "auto",
              marginBottom: "15px",
              paddingRight: "5px",
            }}
          >
            {chat.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",

                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: "14px",

                    background: msg.sender === "user" ? "#C8973A" : "#1F2937",

                    color: msg.sender === "user" ? "black" : "white",

                    maxWidth: "85%",
                    fontSize: "14px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* SUGGESTIONS */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "15px",
            }}
          >
            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => sendMessage(item)}
                style={{
                  background: "#1F2937",
                  color: "#ddd",
                  border: "none",
                  borderRadius: "20px",
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* INPUT */}

          <input
            type="text"
            placeholder="Ask AI Waiter..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              marginBottom: "10px",
              background: "#0F172A",
              color: "white",
            }}
          />

          <button
            onClick={() => sendMessage()}
            style={{
              width: "100%",
              background: "linear-gradient(135deg,#C8973A,#E5C06B)",

              color: "black",
              border: "none",
              padding: "14px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}

export default AIWaiter;
