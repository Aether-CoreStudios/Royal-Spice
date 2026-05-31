import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminRoomBookings() {
  const [bookings, setBookings] = useState([]);
  const [searchBooking, setSearchBooking] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "https://royal-spice.onrender.com/api/room-bookings",
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkoutRoom = async (booking) => {
    try {
      await axios.put(
        `https://royal-spice.onrender.com/api/room-bookings/checkout/${booking._id}`,
      );

      alert("Room Checked Out Successfully");

      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Checkout Failed");
    }
  };
  const deleteBooking = async (id) => {
    try {
      if (!window.confirm("Delete this booking?")) return;

      await axios.delete(
        `https://royal-spice.onrender.com/api/room-bookings/${id}`,
      );

      alert("Booking deleted");

      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Delete failed");
    }
  };
  const checkoutAllRooms = async () => {
    const confirmCheckout = window.confirm(
      "Are you sure you want to check out ALL booked rooms?",
    );

    if (!confirmCheckout) return;

    try {
      await axios.put(
        "https://royal-spice.onrender.com/api/room-bookings/checkout-all",
      );

      alert("All rooms checked out successfully");

      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to check out rooms");
    }
  };

  return (
    <div
      style={{
        marginTop: "120px",
        padding: "30px",
        minHeight: "100vh",
        background: "#020B2D",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            color: "#C8973A",
            fontSize: "42px",
            margin: 0,
          }}
        >
          Room Bookings
        </h1>

        <button
          onClick={checkoutAllRooms}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Check Out All Rooms
        </button>
      </div>

      <input
        type="text"
        placeholder="Search customer"
        value={searchBooking}
        onChange={(e) => setSearchBooking(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "10px",
          background: "#111827",
          color: "white",
          border: "1px solid #333",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(350px,1fr))",
          gap: "25px",
        }}
      >
        {bookings
          .filter((booking) => booking.status !== "checkedout")
          .filter((booking) =>
            booking.customerName
              ?.toLowerCase()
              .includes(searchBooking.toLowerCase()),
          )
          .map((booking) => (
            <div
              key={booking._id}
              style={{
                background: "linear-gradient(145deg,#111827,#1f2937)",
                padding: "25px",
                borderRadius: "20px",
                border: "1px solid rgba(200,151,58,0.3)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              }}
            >
              <h2 style={{ color: "#C8973A" }}>{booking.customerName}</h2>

              <p>
                <strong>Booking ID:</strong> {booking.bookingId}
              </p>

              <p>Email: {booking.email}</p>

              <p>Phone: {booking.phone}</p>

              <p>
                <strong>Room No:</strong> {booking.roomNumber}
              </p>

              <p>
                <strong>Room Type:</strong> {booking.roomType}
              </p>

              <p>
                <strong>Room Price:</strong> ₹{booking.roomPrice}
              </p>

              <p>Guests: {booking.guests}</p>

              <p>Check In: {new Date(booking.checkIn).toLocaleDateString()}</p>

              <p>
                Check Out: {new Date(booking.checkOut).toLocaleDateString()}
              </p>

              <p>
                <strong>Status:</strong>

                <span
                  style={{
                    color:
                      booking.status === "booked"
                        ? "#22c55e"
                        : booking.status === "checkedout"
                          ? "#3b82f6"
                          : booking.status === "rejected"
                            ? "#ef4444"
                            : "#f59e0b",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {booking.status}
                </span>
              </p>

              <p>
                <strong>Payment:</strong>

                <span
                  style={{
                    color:
                      booking.paymentStatus === "paid" ? "#22c55e" : "#ef4444",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {booking.paymentStatus}
                </span>
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                {booking.status === "booked" && (
                  <button
                    onClick={() => checkoutRoom(booking)}
                    style={{
                      background: "#10B981",
                      color: "white",
                      border: "none",
                      padding: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Check Out
                  </button>
                )}
                <button
                  onClick={() => deleteBooking(booking._id)}
                  style={{
                    background: "#EF4444",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete Booking
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminRoomBookings;
