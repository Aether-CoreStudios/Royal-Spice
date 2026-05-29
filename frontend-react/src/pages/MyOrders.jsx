import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================
     ORDER TRACKING
  ========================= */

  const getProgressWidth = (status) => {
    switch (status) {
      case "Preparing":
        return "25%";

      case "Cooking":
        return "50%";

      case "Out For Delivery":
        return "75%";

      case "Delivered":
        return "100%";

      default:
        return "20%";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Preparing":
        return "#F59E0B";

      case "Cooking":
        return "#3B82F6";

      case "Out For Delivery":
        return "#8B5CF6";

      case "Delivered":
        return "#10B981";

      default:
        return "#C8973A";
    }
  };

  /* =========================
     DOWNLOAD INVOICE
  ========================= */

  const downloadInvoice = (order) => {
    const doc = new jsPDF();

    // HEADER

    doc.setFontSize(24);
    doc.setTextColor(200, 151, 58);
    doc.text("Royal Spice Restaurant", 20, 20);

    doc.setFontSize(14);
    doc.setTextColor(120);
    doc.text("Luxury Dining Invoice", 20, 30);

    // LINE

    doc.line(20, 38, 190, 38);

    // CUSTOMER DETAILS

    doc.setFontSize(13);
    doc.setTextColor(0);

    doc.text(`Customer Name: ${order.user}`, 20, 50);

    doc.text(`Phone: ${order.phone || "N/A"}`, 20, 60);

    doc.text(`Address: ${order.address}`, 20, 70);

    doc.text(`Order Status: ${order.orderStatus || "Preparing"}`, 20, 80);

    doc.text(`Payment ID: ${order.paymentId || "N/A"}`, 20, 90);

    // TABLE

    const tableColumn = ["Item", "Qty", "Price"];

    const tableRows = [];

    order.items?.forEach((item) => {
      tableRows.push([
        item.name,
        item.quantity,
        `₹${item.price * item.quantity}`,
      ]);
    });

    autoTable(doc, {
      startY: 105,
      head: [tableColumn],
      body: tableRows,
    });

    // TOTAL

    doc.setFontSize(16);

    doc.text(
      `Total Amount: ₹${order.totalAmount}`,
      20,
      doc.lastAutoTable.finalY + 20,
    );

    // FOOTER

    doc.setFontSize(13);

    doc.setTextColor(120);

    doc.text(
      "Thank You For Dining With Us!",
      20,
      doc.lastAutoTable.finalY + 40,
    );

    doc.save(`RoyalSpice_Invoice_${order._id}.pdf`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020817",
        paddingTop: "170px",
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
            marginBottom: "15px",
          }}
        >
          LIVE ORDER TRACKING
        </p>

        <h1
          style={{
            fontSize: "65px",
            marginBottom: "20px",
          }}
        >
          My Orders
        </h1>

        <p
          style={{
            color: "#888",
            maxWidth: "700px",
            margin: "auto",
            lineHeight: "1.8",
          }}
        >
          Track your luxury dining orders in real time.
        </p>
      </div>

      {orders.length === 0 ? (
        <h2
          style={{
            textAlign: "center",
            color: "#888",
          }}
        >
          No Orders Found
        </h2>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "35px",
          }}
        >
          {orders.map((order, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              whileHover={{
                y: -8,
              }}
              transition={{
                duration: 0.4,
              }}
              style={{
                background: "#111827",
                padding: "35px",
                borderRadius: "30px",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
              }}
            >
              {/* TOP */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "20px",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "#C8973A",
                      marginBottom: "15px",
                    }}
                  >
                    Order #{index + 1}
                  </h2>

                  <p>
                    <strong>User:</strong> {order.user}
                  </p>

                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>

                  <p>
                    <strong>Phone:</strong> {order.phone}
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
                    }}
                  >
                    ₹{order.totalAmount}
                  </h2>

                  <div
                    style={{
                      marginTop: "15px",
                      background: getStatusColor(
                        order.orderStatus || "Preparing",
                      ),
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      fontWeight: "bold",
                      display: "inline-block",
                    }}
                  >
                    {order.orderStatus || "Preparing"}
                  </div>
                </div>
              </div>

              {/* ITEMS */}

              <div
                style={{
                  marginTop: "30px",
                }}
              >
                <h3
                  style={{
                    color: "#C8973A",
                    marginBottom: "20px",
                  }}
                >
                  Ordered Items
                </h3>

                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                      paddingBottom: "10px",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <p>
                      {item.name} × {item.quantity}
                    </p>

                    <p
                      style={{
                        color: "#C8973A",
                      }}
                    >
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* TRACKING BAR */}

              <div
                style={{
                  marginTop: "35px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    color: "#999",
                    fontSize: "14px",
                  }}
                >
                  <span>Preparing</span>
                  <span>Cooking</span>
                  <span>Delivery</span>
                  <span>Delivered</span>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "14px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: getProgressWidth(order.orderStatus),
                    }}
                    transition={{
                      duration: 1,
                    }}
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg,#C8973A,#E5C06B)",
                      borderRadius: "20px",
                    }}
                  />
                </div>

                {/* DOWNLOAD BUTTON */}

                <button
                  onClick={() => downloadInvoice(order)}
                  style={{
                    marginTop: "25px",
                    background: "#C8973A",
                    color: "black",
                    border: "none",
                    padding: "14px 24px",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                >
                  Download Invoice
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
