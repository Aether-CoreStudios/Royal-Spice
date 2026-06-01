import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);
  const pageStyle = {
    marginTop: "180px",
    padding: "20px",
  };
  const fetchRooms = async () => {
    try {
      const res = await axios.get("https://royal-spice.onrender.com/api/rooms");
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={pageStyle}>
      <h1>Rooms</h1>

      {rooms.map((room) => (
        <div
          key={room._id}
          style={{
            background: "linear-gradient(145deg,#111827,#1f2937)",
            color: "white",
            borderRadius: "20px",
            padding: "25px",
            marginBottom: "25px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            border: "1px solid rgba(200,151,58,0.3)",
          }}
        >
          <h2 style={{ color: "#C8973A" }}>{room.roomType} Suite</h2>

          <p>Room No: {room.roomNumber}</p>

          <p>Price: ₹{room.price} / Night</p>

          <p>
            Status:
            <span style={{ color: "#22c55e" }}> {room.status}</span>
          </p>

          {room.status === "available" ? (
            <button
              onClick={() =>
                navigate("/room-booking", {
                  state: {
                    roomNumber: room.roomNumber,
                    roomType: room.roomType,
                    roomPrice: room.price,
                  },
                })
              }
              style={{
                background: "linear-gradient(135deg,#C8973A,#E5C06B)",
                color: "black",
                border: "none",
                padding: "12px 24px",
                borderRadius: "30px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Book Now
            </button>
          ) : (
            <button
              disabled
              style={{
                background: "#EF4444",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "30px",
                fontWeight: "bold",
                marginTop: "10px",

                opacity: 0.8,
              }}
            >
              Already Booked
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Rooms;
