import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Reservation() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const handleReservation = async () => {
    try {
      if (!name || !phone || !guests || !time) {
        alert("Please fill all fields");
        return;
      }

      const reservationData = {
        name: name,
        email: email,
        phone: phone,
        guests: Number(guests),
        date: date.toISOString(),
        time: time,
      };

      console.log(reservationData);

      const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:5000/api/reservations",
        headers: {
          "Content-Type": "application/json",
        },
        data: reservationData,
      });

      console.log(response.data);

      alert("Table Reserved Successfully");

      setName("");
      setPhone("");
      setGuests("");
      setDate(new Date());
      setTime("");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || error.message);
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#070B14",
        color: "white",
        paddingTop: "160px",
      }}
    >
      {/* HERO */}

      <div
        style={{
          height: "420px",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#C8973A",
              letterSpacing: "5px",
              marginBottom: "20px",
            }}
          >
            LUXURY EXPERIENCE
          </p>

          <h1
            style={{
              fontSize: "80px",
            }}
          >
            Reserve Your Table
          </h1>
        </motion.div>
      </div>

      {/* FORM */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "80px 20px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            width: "100%",
            maxWidth: "650px",
            background: "#111827",
            padding: "45px",
            borderRadius: "25px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          }}
        >
          <h2
            style={{
              color: "#C8973A",
              marginBottom: "30px",
              textAlign: "center",
              fontSize: "38px",
            }}
          >
            Book A Premium Dining Experience
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "30px",
              position: "relative",
              zIndex: 2,
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
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
                border: "1px solid #333",
              }}
            >
              <Calendar
                onChange={(value) => {
                  setDate(value);
                }}
                value={date}
                minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                showNeighboringMonth={false}
                style={{
                  marginBottom: "30px",
                }}
              />
            </div>

            <div
              style={{
                marginTop: "10px",
              }}
            >
              <h3
                style={{
                  color: "#C8973A",
                  marginBottom: "15px",
                }}
              >
                Select Time
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                {[
                  "06:00 PM",
                  "07:00 PM",
                  "08:00 PM",
                  "09:00 PM",
                  "10:00 PM",
                ].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setTime(slot)}
                    style={{
                      padding: "12px 18px",
                      borderRadius: "12px",
                      border: "none",
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
            </div>
            <p
              style={{
                color: "#C8973A",
                marginTop: "20px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Selected Date: {date.toDateString()}
            </p>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleReservation}
              style={{
                background: "linear-gradient(135deg,#C8973A,#E5C06B)",
                color: "black",
                padding: "18px",
                border: "none",
                borderRadius: "16px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "18px",
                marginTop: "10px",
              }}
            >
              Reserve Table
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "18px",
  borderRadius: "14px",
  border: "1px solid #333",
  background: "#0F172A",
  color: "white",
  fontSize: "16px",
  outline: "none",
};

export default Reservation;
