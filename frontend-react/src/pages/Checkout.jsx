import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handlePayment = () => {
    if (!name || !email || !phone || !address) {
      alert("Please fill all details");

      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay not loaded");

      return;
    }

    const options = {
      key: "rzp_test_StDNc3KaC2jMyg",

      amount: totalAmount * 100,

      currency: "INR",

      name: "Royal Spice Restaurant",

      description: "Luxury Dining Payment",

      handler: async function (response) {
        try {
          await axios.post("http://localhost:5000/api/orders", {
            user: name,
            email,
            items: cartItems,
            totalAmount,
            paymentId: response.razorpay_payment_id,
            address,
            phone,
            orderStatus: "Preparing",
          });

          // CLEAR CART
          clearCart();
          localStorage.removeItem("cart");

          alert("Payment Successful");

          navigate("/orders");
        } catch (error) {
          console.log(error);

          console.log(error.response);

          alert(error.response?.data?.message || "Order Failed");
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: phone,
      },

      theme: {
        color: "#C8973A",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #050505, #0F172A, #111827)",
        color: "white",
        paddingTop: "160px",
        paddingBottom: "60px",
        paddingLeft: "5%",
        paddingRight: "5%",
      }}
    >
      {/* TITLE */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <p
          style={{
            color: "#C8973A",
            letterSpacing: "4px",
            marginBottom: "10px",
          }}
        >
          SECURE PAYMENT
        </p>

        <h1
          style={{
            fontSize: "60px",
            marginBottom: "20px",
          }}
        >
          Checkout
        </h1>

        <p
          style={{
            color: "#999",
            maxWidth: "700px",
            margin: "auto",
            lineHeight: "1.8",
          }}
        >
          Complete your luxury dining order securely with Royal Spice.
        </p>
      </div>

      {/* MAIN SECTION */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* FORM */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            width: "500px",
            background: "#111827",
            padding: "40px",
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
          }}
        >
          <h2
            style={{
              color: "#C8973A",
              marginBottom: "30px",
            }}
          >
            Delivery Details
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />

          <textarea
            placeholder="Delivery Address"
            rows="5"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={handlePayment}
            style={{
              width: "100%",
              background: "linear-gradient(135deg,#C8973A,#E5C06B)",
              color: "black",
              border: "none",
              padding: "18px",
              borderRadius: "18px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "18px",
              marginTop: "20px",
              boxShadow: "0 0 30px rgba(200,151,58,0.4)",
            }}
          >
            Pay ₹{totalAmount}
          </button>
        </motion.div>

        {/* ORDER SUMMARY */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            width: "400px",
            background: "#111827",
            padding: "40px",
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            height: "fit-content",
          }}
        >
          <h2
            style={{
              color: "#C8973A",
              marginBottom: "30px",
            }}
          >
            Order Summary
          </h2>

          {cartItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                paddingBottom: "10px",
              }}
            >
              <div>
                <p style={{ fontSize: "18px" }}>{item.name}</p>

                <p
                  style={{
                    color: "#888",
                    marginTop: "5px",
                  }}
                >
                  Qty: {item.quantity}
                </p>
              </div>

              <h3 style={{ color: "#C8973A" }}>
                ₹{item.price * item.quantity}
              </h3>
            </div>
          ))}

          <div
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Total</h2>

            <h1
              style={{
                color: "#C8973A",
              }}
            >
              ₹{totalAmount}
            </h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "20px",
  borderRadius: "16px",
  border: "1px solid #333",
  background: "#0D0D0D",
  color: "white",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

export default Checkout;
