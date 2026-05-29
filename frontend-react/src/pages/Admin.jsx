import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

function Admin() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    fetchOrders();
    fetchMenu();
    fetchReservations();
  }, []);

  // FETCH ORDERS

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");

      setOrders(response.data);

      const revenue = response.data.reduce(
        (total, order) => total + (order.totalAmount || 0),
        0,
      );

      setTotalRevenue(revenue);
    } catch (error) {
      console.log(error);
    }
  };
  // FETCH RESERVATIONS

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reservations",
      );

      if (Array.isArray(response.data)) {
        setReservations(response.data);
      } else if (response.data.reservations) {
        setReservations(response.data.reservations);
      } else {
        setReservations([]);
      }
    } catch (error) {
      console.log(error);
      setReservations([]);
    }
  };
  // FETCH MENU

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/menu");

      setMenuItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ANALYTICS DATA

  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 18000 },
    { month: "Mar", revenue: 15000 },
    { month: "Apr", revenue: 24000 },
    { month: "May", revenue: 28000 },
    {
      month: "Jun",
      revenue: totalRevenue || 32000,
    },
  ];

  const salesData = [
    {
      name: "Orders",
      value: orders.length,
    },
    {
      name: "Menu",
      value: menuItems.length,
    },
    {
      name: "Revenue",
      value: totalRevenue / 1000,
    },
  ];

  const COLORS = ["#C8973A", "#10B981", "#3B82F6"];

  const expenses = Math.floor(totalRevenue * 0.35);

  const profit = totalRevenue - expenses;
  const cancelReservation = async (id, email) => {
    try {
      // remove instantly from UI
      setReservations((prev) => prev.filter((item) => item._id !== id));

      // backend request
      await axios.put(`http://localhost:5000/api/reservations/cancel/${id}`, {
        email,
      });

      alert("Reservation Cancelled Successfully");
    } catch (error) {
      console.log(error);

      // reload only if failed
      fetchReservations();
    }
  };
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        paddingTop: "120px",
        background: "linear-gradient(to bottom right,#070B14,#0F172A,#111827)",
        color: "white",
      }}
    >
      {/* SIDEBAR */}

      <div
        style={{
          width: "260px",
          background: "#111827",
          padding: "30px 20px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <h1
            style={{
              color: "#C8973A",
              fontSize: "38px",
              marginBottom: "5px",
            }}
          >
            Royal Spice
          </h1>

          <p
            style={{
              color: "#888",
              fontSize: "12px",
              letterSpacing: "4px",
            }}
          >
            LUXURY ADMIN PANEL
          </p>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          <li
            style={{
              ...menuStyle,
              background: activeSection === "dashboard" ? "#C8973A" : "#1E293B",
              color: activeSection === "dashboard" ? "black" : "white",
            }}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </li>

          <li
            style={{
              ...menuStyle,
              background: activeSection === "menu" ? "#C8973A" : "#1E293B",
              color: activeSection === "menu" ? "black" : "white",
            }}
            onClick={() => setActiveSection("menu")}
          >
            Menu Items
          </li>

          <li
            style={{
              ...menuStyle,
              background: activeSection === "orders" ? "#C8973A" : "#1E293B",
              color: activeSection === "orders" ? "black" : "white",
            }}
            onClick={() => setActiveSection("orders")}
          >
            Orders
          </li>
          <li
            style={{
              ...menuStyle,
              background:
                activeSection === "reservations" ? "#C8973A" : "#1E293B",
              color: activeSection === "reservations" ? "black" : "white",
            }}
            onClick={() => setActiveSection("reservations")}
          >
            Reservations
          </li>

          <li style={menuStyle} onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>

      {/* MAIN */}

      <motion.div
        initial={{
          opacity: 0,
          x: 40,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <p
              style={{
                color: "#C8973A",
                letterSpacing: "4px",
                marginBottom: "10px",
              }}
            >
              LUXURY RESTAURANT MANAGEMENT
            </p>

            <h1
              style={{
                color: "#C8973A",
                fontSize: "52px",
                fontWeight: "bold",
                margin: 0,
              }}
            >
              Royal Spice Control Center
            </h1>
          </div>

          <div
            style={{
              background: "#111827",
              padding: "18px 28px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              style={{
                color: "#888",
                marginBottom: "8px",
              }}
            >
              Total Revenue
            </p>

            <h2
              style={{
                color: "#10B981",
                margin: 0,
              }}
            >
              ₹{totalRevenue}
            </h2>
          </div>
        </div>
        {/* DASHBOARD */}
        {activeSection === "dashboard" && (
          <>
            {/* TOP CARDS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: "25px",
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                style={dashboardCard}
              >
                <p style={cardLabel}>TOTAL ORDERS</p>

                <h1 style={cardNumber}>{orders.length}</h1>

                <div style={lineStyle}></div>

                <p style={goldText}>Customer Orders</p>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                style={dashboardCard}
              >
                <p style={cardLabel}>TOTAL REVENUE</p>

                <h1 style={cardNumber}>₹{totalRevenue}</h1>

                <div style={lineStyle}></div>

                <p style={greenText}>Restaurant Earnings</p>
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.03,
                }}
                style={dashboardCard}
              >
                <p style={cardLabel}>TOTAL PROFIT</p>

                <h1 style={cardNumber}>₹{profit}</h1>

                <div style={lineStyle}></div>

                <p style={blueText}>Monthly Profit</p>
              </motion.div>
            </div>

            {/* CHARTS */}

            <div
              style={{
                marginTop: "40px",
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "25px",
              }}
            >
              {/* BAR CHART */}

              <div style={sectionStyle}>
                <h2 style={titleStyle}>Revenue Analytics</h2>

                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={revenueData}>
                    <XAxis dataKey="month" stroke="#999" />

                    <YAxis stroke="#999" />

                    <Tooltip />

                    <Bar
                      dataKey="revenue"
                      fill="#C8973A"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* PIE CHART */}

              <div style={sectionStyle}>
                <h2 style={titleStyle}>Sales Overview</h2>

                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={salesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                    >
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* EXPENSES */}

            <div
              style={{
                marginTop: "40px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: "25px",
              }}
            >
              <div style={sectionStyle}>
                <h2 style={titleStyle}>Expenses</h2>

                <h1
                  style={{
                    color: "#EF4444",
                  }}
                >
                  ₹{expenses}
                </h1>

                <p
                  style={{
                    color: "#aaa",
                  }}
                >
                  Kitchen + Delivery + Maintenance
                </p>
              </div>

              <div style={sectionStyle}>
                <h2 style={titleStyle}>Profit Margin</h2>

                <h1
                  style={{
                    color: "#10B981",
                  }}
                >
                  65%
                </h1>

                <p
                  style={{
                    color: "#aaa",
                  }}
                >
                  Estimated monthly growth
                </p>
              </div>

              <div style={sectionStyle}>
                <h2 style={titleStyle}>Customer Growth</h2>

                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={revenueData}>
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#C8973A"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
        {/* MENU ITEMS */}
        {activeSection === "menu" && (
          <div style={sectionStyle}>
            <h2 style={titleStyle}>Menu Items</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                gap: "20px",
              }}
            >
              {menuItems.map((item) => (
                <motion.div
                  whileHover={{
                    y: -12,
                    scale: 1.02,
                  }}
                  key={item._id}
                  style={foodCard}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  <div
                    style={{
                      padding: "20px",
                    }}
                  >
                    <h3>{item.name}</h3>

                    <p
                      style={{
                        color: "#C8973A",
                      }}
                    >
                      ₹{item.price}
                    </p>

                    <p
                      style={{
                        color: "#aaa",
                      }}
                    >
                      {item.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* RESERVATIONS */}

        {activeSection === "reservations" && (
          <div style={sectionStyle}>
            <h2 style={titleStyle}>Luxury Reservations</h2>

            {reservations.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "50px",
                  color: "#888",
                }}
              >
                No Reservations Found
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
                  gap: "25px",
                }}
              >
                {reservations
                  ?.filter((item) => item.status !== "Cancelled")
                  .filter((item) => item.status !== "Cancelled")
                  .map((item, index) => (
                    <motion.div
                      key={item._id}
                      whileHover={{
                        y: -10,
                        scale: 1.02,
                      }}
                      style={{
                        background: "linear-gradient(145deg,#0F172A,#1E293B)",
                        padding: "30px",
                        borderRadius: "24px",
                        border: "1px solid rgba(255,255,255,0.08)",
                        boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                        }}
                      >
                        <h2
                          style={{
                            color: "#C8973A",
                            margin: 0,
                          }}
                        >
                          {item.name}
                        </h2>

                        <div
                          style={{
                            background: "#10B981",
                            padding: "8px 14px",
                            borderRadius: "30px",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          CONFIRMED
                        </div>
                      </div>

                      <p>
                        <strong style={{ color: "#C8973A" }}>Phone:</strong>{" "}
                        {item.phone}
                      </p>

                      <p>
                        <strong style={{ color: "#C8973A" }}>Guests:</strong>{" "}
                        {item.guests}
                      </p>

                      <p>
                        <strong style={{ color: "#C8973A" }}>Date:</strong>{" "}
                        {item.date}
                      </p>

                      <p>
                        <strong style={{ color: "#C8973A" }}>Time:</strong>{" "}
                        {item.time}
                      </p>

                      <button
                        onClick={() => cancelReservation(item._id, item.email)}
                        style={{
                          marginTop: "20px",
                          background: "#EF4444",
                          color: "white",
                          border: "none",
                          padding: "12px 20px",
                          borderRadius: "12px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                      >
                        Cancel Reservation
                      </button>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ORDERS */}

        {activeSection === "orders" && orders.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={titleStyle}>Customer Orders</h2>

            {orders.map((order, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.01,
                }}
                style={{
                  background: "linear-gradient(145deg,#0F172A,#1E293B)",
                  padding: "30px",
                  borderRadius: "24px",
                  marginBottom: "25px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
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
                      {order.user}
                    </h2>

                    <p>
                      <strong style={{ color: "#C8973A" }}>Phone:</strong>{" "}
                      {order.phone}
                    </p>

                    <p>
                      <strong style={{ color: "#C8973A" }}>Address:</strong>{" "}
                      {order.address}
                    </p>

                    <p>
                      <strong style={{ color: "#C8973A" }}>Payment ID:</strong>{" "}
                      {order.paymentId || "N/A"}
                    </p>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <h1
                      style={{
                        color: "#10B981",
                        marginBottom: "15px",
                      }}
                    >
                      ₹{order.totalAmount}
                    </h1>

                    <select
                      value={order.orderStatus || "Preparing"}
                      onChange={async (e) => {
                        try {
                          await axios.put(
                            `http://localhost:5000/api/orders/${order._id}`,
                            {
                              orderStatus: e.target.value,
                            },
                          );

                          fetchOrders();
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                      style={{
                        padding: "14px",
                        borderRadius: "12px",
                        background: "#111827",
                        color: "white",
                        border: "1px solid #333",
                        fontWeight: "bold",
                      }}
                    >
                      <option>Preparing</option>
                      <option>Cooking</option>
                      <option>Out For Delivery</option>
                      <option>Delivered</option>
                    </select>
                  </div>
                </div>

                {/* ITEMS */}

                <div
                  style={{
                    marginTop: "25px",
                  }}
                >
                  <h3
                    style={{
                      color: "#C8973A",
                      marginBottom: "15px",
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
                        paddingBottom: "12px",
                        marginBottom: "12px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <p>
                        {item.name} × {item.quantity}
                      </p>

                      <p
                        style={{
                          color: "#C8973A",
                          fontWeight: "bold",
                        }}
                      >
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                {/* STATUS BAR */}

                <div
                  style={{
                    marginTop: "25px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "14px",
                      background: "rgba(255,255,255,0.08)",
                      borderRadius: "20px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width:
                          order.orderStatus === "Preparing"
                            ? "25%"
                            : order.orderStatus === "Cooking"
                              ? "50%"
                              : order.orderStatus === "Out For Delivery"
                                ? "80%"
                                : "100%",
                        height: "100%",
                        background: "linear-gradient(90deg,#C8973A,#E5C06B)",
                        borderRadius: "20px",
                        transition: "0.5s",
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      color: "#888",
                      fontSize: "13px",
                    }}
                  >
                    <span>Preparing</span>
                    <span>Cooking</span>
                    <span>Delivery</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
/* STYLES */

const menuStyle = {
  padding: "16px 18px",
  borderRadius: "14px",
  marginBottom: "15px",
  cursor: "pointer",
  transition: "0.3s",
  fontWeight: "bold",
  letterSpacing: "1px",
  border: "1px solid rgba(255,255,255,0.05)",
};

const dashboardCard = {
  background: "linear-gradient(145deg, rgba(17,24,39,1), rgba(30,41,59,1))",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "28px",
  padding: "35px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.45)",
};

const cardLabel = {
  color: "#aaa",
  marginBottom: "10px",
  letterSpacing: "2px",
  fontSize: "14px",
};

const cardNumber = {
  fontSize: "55px",
  margin: 0,
};

const lineStyle = {
  width: "70px",
  height: "5px",
  background: "#C8973A",
  borderRadius: "20px",
  marginTop: "15px",
  marginBottom: "15px",
};

const goldText = {
  color: "#C8973A",
};

const greenText = {
  color: "#10B981",
};

const blueText = {
  color: "#3B82F6",
};

const sectionStyle = {
  marginTop: "40px",
  background: "rgba(17,24,39,0.95)",
  padding: "35px",
  borderRadius: "30px",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
};

const titleStyle = {
  color: "#C8973A",
  marginBottom: "25px",
};

const foodCard = {
  background: "#0F172A",
  borderRadius: "24px",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
};

export default Admin;
