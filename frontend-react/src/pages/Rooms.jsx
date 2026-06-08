import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("https://royal-spice.onrender.com/api/rooms");
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "200px",
          fontSize: "24px",
        }}
      >
        Loading Rooms...
      </div>
    );
  }

  return (
    <div
      style={{
        marginTop: "170px",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "white", marginBottom: "30px" }}>Luxury Rooms</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",
          gap: "25px",
        }}
      >
        {rooms.map((room) => (
          <div
            key={room._id}
            style={{
              background: "linear-gradient(145deg,#111827,#1f2937)",
              borderRadius: "20px",
              overflow: "hidden",
              color: "white",
              border: "1px solid rgba(200,151,58,0.3)",
            }}
          >
            <div>
              <img
                src={room.images?.[0]}
                alt={room.roomType}
                style={{
                  width: "100%",
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
                {room.images?.slice(1).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
            </div>

            <div style={{ padding: "20px" }}>
              <h2 style={{ color: "#C8973A" }}>{room.roomType} Suite</h2>

              <p>⭐ {room.rating}</p>

              <p>🚪 Room No: {room.roomNumber}</p>

              <p>👥 Capacity: {room.capacity} Guests</p>

              <p
                style={{
                  color: "#E5C06B",
                  fontWeight: "bold",
                  fontSize: "22px",
                }}
              >
                ₹{room.price} / Night
              </p>

              <div>
                <strong>Amenities:</strong>
                <div style={{ marginTop: "10px" }}>
                  {room.amenities?.map((item, index) => (
                    <span
                      key={index}
                      style={{
                        background: "#374151",
                        padding: "6px 10px",
                        borderRadius: "12px",
                        marginRight: "8px",
                        display: "inline-block",
                        marginBottom: "8px",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <p style={{ marginTop: "10px" }}>
                Status:
                <span
                  style={{
                    color: room.status === "available" ? "#22c55e" : "#ef4444",
                  }}
                >
                  {" "}
                  {room.status}
                </span>
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
                    width: "100%",
                    background: "linear-gradient(135deg,#C8973A,#E5C06B)",
                    color: "black",
                    border: "none",
                    padding: "12px",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    marginTop: "15px",
                  }}
                >
                  Book Now
                </button>
              ) : (
                <button
                  disabled
                  style={{
                    width: "100%",
                    background: "#EF4444",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    marginTop: "15px",
                  }}
                >
                  Already Booked
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
