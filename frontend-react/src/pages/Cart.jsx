import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeItem } = useContext(CartContext);

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0F19",
        color: "white",
        paddingTop: "160px",
        paddingLeft: "5%",
        paddingRight: "5%",
        paddingBottom: "50px",
      }}
    >
      <h1
        style={{
          color: "#C8973A",
          fontSize: "55px",
          marginBottom: "50px",
          textAlign: "center",
        }}
      >
        Your Luxury Cart
      </h1>

      {cartItems.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            color: "#aaa",
          }}
        >
          Cart Is Empty
        </h2>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            {cartItems.map((item, index) => (
              <motion.div
                key={item.name + index}
                whileHover={{
                  y: -8,
                  scale: 1.01,
                }}
                style={{
                  background: "linear-gradient(145deg,#111827,#0F172A)",
                  padding: "30px",
                  borderRadius: "25px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: "30px",
                    }}
                  >
                    {item.name}
                  </h2>

                  <p
                    style={{
                      color: "#aaa",
                      marginTop: "10px",
                    }}
                  >
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <h2
                    style={{
                      color: "#C8973A",
                      fontSize: "30px",
                    }}
                  >
                    ₹{item.price * item.quantity}
                  </h2>

                  <button
                    onClick={() => removeItem(item.name)}
                    style={{
                      marginTop: "15px",
                      background: "#DC2626",
                      color: "white",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            style={{
              marginTop: "60px",
              textAlign: "right",
            }}
          >
            <h1
              style={{
                color: "#C8973A",
                fontSize: "45px",
              }}
            >
              Total: ₹{totalPrice}
            </h1>

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() => navigate("/checkout")}
              style={{
                marginTop: "25px",
                background: "linear-gradient(135deg,#C8973A,#E5C06B)",
                color: "black",
                border: "none",
                padding: "20px 40px",
                borderRadius: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                fontSize: "18px",
                boxShadow: "0 0 30px rgba(200,151,58,0.45)",
              }}
            >
              Proceed To Checkout
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
