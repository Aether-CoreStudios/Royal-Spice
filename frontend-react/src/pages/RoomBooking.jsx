import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function RoomBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  const roomData = location.state || {};
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });
  const totalDays =
    formData.checkIn && formData.checkOut
      ? (new Date(formData.checkOut) - new Date(formData.checkIn)) /
        (1000 * 60 * 60 * 24)
      : 1;

  const totalAmount = roomData.roomPrice * totalDays;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = () => {
    console.log(roomData);
    console.log(roomData.roomPrice);

    // rest of your code...
    if (
      !formData.customerName ||
      !formData.email ||
      !formData.phone ||
      !formData.checkIn ||
      !formData.checkOut
    ) {
      alert("Please fill all details");
      return;
    }
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const totalDays = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

    const totalAmount = roomData.roomPrice * totalDays;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      alert("Check In date cannot be in the past");
      return;
    }
    if (checkOutDate <= checkInDate) {
      alert("Check Out must be after Check In");
      return;
    }
    const options = {
      key: "rzp_test_StDNc3KaC2jMyg",
      amount: totalAmount * 100,

      currency: "INR",

      name: "Royal Spice Hotel",

      description: "Room Booking Payment",

      handler: async function (response) {
        try {
          await axios.post("http://localhost:5000/api/room-bookings", {
            ...formData,

            roomNumber: roomData.roomNumber,

            roomType: roomData.roomType,

            roomPrice: roomData.roomPrice,

            amount: totalAmount,

            paymentStatus: "paid",

            paymentId: response.razorpay_payment_id,

            status: "booked",
          });

          alert("Room Booked Successfully");

          navigate("/rooms");
        } catch (error) {
          console.log(error);
          alert("Booking Failed");
        }
      },

      prefill: {
        name: formData.customerName,

        email: formData.email,

        contact: formData.phone,
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
        marginTop: "120px",
        padding: "30px",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#C8973A",
          fontSize: "3rem",
          marginBottom: "10px",
        }}
      >
        Luxury Room Booking
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#9ca3af",
          marginBottom: "40px",
        }}
      >
        Experience comfort and elegance at Royal Spice
      </p>
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto 20px",
          background: "#111827",
          color: "white",
          padding: "20px",
          borderRadius: "15px",
          border: "1px solid #C8973A",
        }}
      >
        <h3 style={{ color: "#C8973A" }}>Selected Room</h3>

        <p>Room Number: {roomData.roomNumber}</p>

        <p>Room Type: {roomData.roomType}</p>

        <p>Price: ₹{roomData.roomPrice}</p>
        <p>
          Total Amount: ₹
          {formData.checkIn && formData.checkOut
            ? roomData.roomPrice *
              ((new Date(formData.checkOut) - new Date(formData.checkIn)) /
                (1000 * 60 * 60 * 24))
            : roomData.roomPrice}
        </p>
      </div>

      <form
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          padding: "35px",
          borderRadius: "20px",
          background: "#111827",
          color: "white",
          border: "1px solid rgba(200,151,58,0.3)",
        }}
      >
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          style={{
            padding: "10px",
            height: "30px",
            borderRadius: "8px",
            border: "1px solid #C8973A",
            fontSize: "15px",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            padding: "10px",
            height: "30px",
            borderRadius: "8px",
            border: "1px solid #C8973A",
            fontSize: "15px",
          }}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={{
            padding: "10px",
            height: "30px",
            borderRadius: "8px",
            border: "1px solid #C8973A",
            fontSize: "15px",
          }}
        />

        <label>Check In</label>
        <input
          type="date"
          name="checkIn"
          min={new Date().toISOString().split("T")[0]}
          value={formData.checkIn}
          onChange={handleChange}
          style={{
            padding: "10px",
            height: "30px",
            borderRadius: "8px",
            border: "1px solid #C8973A",
            fontSize: "15px",
          }}
        />

        <label>Check Out</label>
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          style={{
            padding: "10px",
            height: "30px",
            borderRadius: "8px",
            border: "1px solid #C8973A",
            fontSize: "15px",
          }}
        />

        <input
          type="number"
          name="guests"
          min="1"
          placeholder="Number of Guests"
          value={formData.guests}
          onChange={handleChange}
          style={{
            padding: "10px",
            height: "30px",
            borderRadius: "8px",
            border: "1px solid #C8973A",
            fontSize: "15px",
          }}
        />

        <button
          type="button"
          onClick={handlePayment}
          style={{
            background: "#C8973A",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Pay ₹{totalAmount}
        </button>
      </form>
    </div>
  );
}

export default RoomBooking;
