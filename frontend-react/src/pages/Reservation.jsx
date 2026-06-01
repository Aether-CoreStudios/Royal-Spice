import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Reservation() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [reservedTables, setReservedTables] = useState([]);
  useEffect(() => {
    const fetchReservedTables = async () => {
      if (!time) return;

      try {
        const res = await axios.get(
          `https://royal-spice.onrender.com/api/reservations/reserved-tables?date=${date.toISOString().split("T")[0]}&time=${time}`,
        );

        setReservedTables(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservedTables();
  }, [date, time]);

  const handlePayment = async () => {
    if (!name || !phone || !email || !guests || !time || !tableNumber) {
      alert("Please fill all fields");
      return;
    }
    const selectedDate = new Date(date);

    const now = new Date();

    if (selectedDate.toDateString() === now.toDateString()) {
      let hour = parseInt(time.split(":")[0]);

      if (time.includes("PM") && hour !== 12) {
        hour += 12;
      }

      const reservationTime = new Date();

      reservationTime.setHours(hour, 0, 0, 0);

      if (reservationTime <= now) {
        alert("You cannot reserve a past time slot.");
        return;
      }
    }
    if (!window.Razorpay) {
      alert("Razorpay not loaded");
      return;
    }
    try {
      const check = await axios.post(
        "https://royal-spice.onrender.com/api/reservations/check-table",
        {
          date: date.toISOString().split("T")[0],
          time,
          tableNumber: Number(tableNumber),
        },
      );

      if (!check.data.available) {
        alert(`Table ${tableNumber} is already reserved`);
        return;
      }
    } catch (error) {
      alert(error.response?.data?.message || "Table unavailable");
      return;
    }
    const options = {
      key: "rzp_test_StDNc3KaC2jMyg",

      amount: 500 * 100,

      currency: "INR",

      name: "Royal Spice Restaurant",

      description: "Table Reservation",

      handler: async function (response) {
        try {
          const reservationData = {
            name,
            email,
            phone,
            guests: Number(guests),
            date: date.toISOString().split("T")[0],
            time,
            tableNumber: Number(tableNumber),
            reservationFee: 500,
            paymentStatus: "paid",
            paymentId: response.razorpay_payment_id,
          };

          await axios.post(
            "https://royal-spice.onrender.com/api/reservations",
            reservationData,
          );

          alert("Table Reserved Successfully");

          setName("");
          setPhone("");
          setEmail("");
          setGuests("");
          setDate(new Date());
          setTime("");
          setTableNumber("");
        } catch (error) {
          console.log(error);

          alert(
            error.response?.data?.message ||
              error.message ||
              "Reservation Failed",
          );
        }
      },

      prefill: {
        name,
        email,
        contact: phone,
      },

      theme: {
        color: "#C8973A",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };
  const today = new Date().toDateString();

  const availableTimeSlots = [
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
  ].filter((slot) => {
    const selectedDate = new Date(date);

    // Future dates show all times
    if (selectedDate.toDateString() !== today) {
      return true;
    }

    const now = new Date();

    let hour = parseInt(slot.split(":")[0]);

    if (slot.includes("PM") && hour !== 12) {
      hour += 12;
    }

    const slotDate = new Date();
    slotDate.setHours(hour, 0, 0, 0);

    return slotDate > now;
  });
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right,#050505,#0F172A,#111827)",
        color: "white",
        paddingTop: window.innerWidth <= 768 ? "230px" : "140px",
        paddingBottom: "60px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        <p
          style={{
            color: "#C8973A",
            letterSpacing: "4px",
          }}
        >
          LUXURY EXPERIENCE
        </p>

        <h1
          style={{
            fontSize: "60px",
            marginTop: "10px",
          }}
        >
          Reserve Your Table
        </h1>

        <p
          style={{
            color: "#9ca3af",
            marginTop: "10px",
          }}
        >
          Premium Dining Experience at Royal Spice
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "#111827",
          padding: "40px",
          borderRadius: "25px",
          border: "1px solid rgba(200,151,58,0.3)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        }}
      >
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

        <input
          type="number"
          placeholder="Number Of Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          style={inputStyle}
        />

        <div
          style={{
            background: "#0F172A",
            padding: "20px",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        >
          <Calendar value={date} onChange={setDate} minDate={new Date()} />
        </div>
        <h3
          style={{
            color: "#C8973A",
            marginTop: "30px",
            marginBottom: "15px",
          }}
        >
          Select Table
        </h3>

        <select
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "14px",
            border: "1px solid #333",
            background: "#0F172A",
            color: "white",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => (
            <option
              key={table}
              value={table}
              disabled={reservedTables.includes(table)}
            >
              {reservedTables.includes(table)
                ? `Table ${table} (Reserved)`
                : `Table ${table}`}
            </option>
          ))}
        </select>
        <h3
          style={{
            color: "#C8973A",
            marginTop: "30px",
            marginBottom: "15px",
          }}
        >
          Select Time
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {availableTimeSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setTime(slot)}
              style={{
                padding: "12px 20px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                background: time === slot ? "#C8973A" : "#1E293B",
                color: time === slot ? "black" : "white",
              }}
            >
              {slot}
            </button>
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "25px",
            color: "#C8973A",
            fontWeight: "bold",
          }}
        >
          Reservation Fee: ₹500
        </p>

        <button
          onClick={handlePayment}
          style={{
            width: "100%",
            marginTop: "25px",
            background: "linear-gradient(135deg,#C8973A,#E5C06B)",
            color: "black",
            border: "none",
            padding: "18px",
            borderRadius: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Pay ₹500 & Reserve Table
        </button>
      </motion.div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "20px",
  borderRadius: "14px",
  border: "1px solid #333",
  background: "#0F172A",
  color: "white",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
};

export default Reservation;
