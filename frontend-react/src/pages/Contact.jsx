import React from "react";

function Contact() {
  return (
    <div
      style={{
        marginTop: "130px",
        padding: "40px",
        color: "white",
        minHeight: "100vh",
        background: "#05070D",
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1
          style={{
            color: "#C8973A",
            fontSize: "50px",
            marginBottom: "10px",
          }}
        >
          Contact Royal Spice
        </h1>

        <p
          style={{
            color: "#9ca3af",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          We are dedicated to delivering exceptional dining experiences, luxury
          hospitality, and world-class customer service. Reach out to us for
          reservations, private events, room bookings, or general inquiries.
        </p>
      </div>

      {/* CONTACT SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
        }}
      >
        {/* LEFT */}
        <div
          style={{
            background: "#111827",
            padding: "35px",
            borderRadius: "20px",
            border: "1px solid rgba(200,151,58,0.2)",
          }}
        >
          <h2 style={{ color: "#C8973A" }}>Get In Touch</h2>

          <div style={{ marginTop: "25px" }}>
            <h3>📍 Address</h3>
            <p style={{ color: "#d1d5db" }}>
              123 Royal Street,
              <br />
              Chennai, Tamil Nadu,
              <br />
              India
            </p>
          </div>

          <div style={{ marginTop: "25px" }}>
            <h3>📞 Phone</h3>
            <p style={{ color: "#d1d5db" }}>+91 9876543210</p>
          </div>

          <div style={{ marginTop: "25px" }}>
            <h3>📧 Email</h3>
            <p style={{ color: "#d1d5db" }}>royalspice@gmail.com</p>
          </div>

          <div style={{ marginTop: "25px" }}>
            <h3>🕒 Opening Hours</h3>
            <p style={{ color: "#d1d5db" }}>
              Monday - Sunday
              <br />
              10:00 AM - 11:00 PM
            </p>
          </div>

          <div style={{ marginTop: "25px" }}>
            <h3>⭐ Customer Rating</h3>
            <p style={{ color: "#C8973A", fontSize: "18px" }}>★★★★★ 4.9 / 5</p>
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            background: "#111827",
            padding: "35px",
            borderRadius: "20px",
            border: "1px solid rgba(200,151,58,0.2)",
          }}
        >
          <h2 style={{ color: "#C8973A" }}>Send Us A Message</h2>

          <form>
            <input type="text" placeholder="Your Name" style={inputStyle} />

            <input type="email" placeholder="Your Email" style={inputStyle} />

            <input type="text" placeholder="Subject" style={inputStyle} />

            <textarea
              placeholder="Your Message"
              rows="6"
              style={{
                ...inputStyle,
                resize: "none",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                background: "linear-gradient(135deg,#C8973A,#E5C06B)",
                color: "black",
                border: "none",
                padding: "15px",
                borderRadius: "12px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* GOOGLE MAP */}
      <div
        style={{
          marginTop: "50px",
          background: "#111827",
          padding: "25px",
          borderRadius: "20px",
          border: "1px solid rgba(200,151,58,0.2)",
        }}
      >
        <h2
          style={{
            color: "#C8973A",
            marginBottom: "20px",
          }}
        >
          Find Us
        </h2>

        <iframe
          title="location"
          width="100%"
          height="400"
          style={{
            border: 0,
            borderRadius: "15px",
          }}
          loading="lazy"
          allowFullScreen
          src="https://maps.google.com/maps?q=Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
        />
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "15px",
  background: "#1F2937",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "white",
  boxSizing: "border-box",
};

export default Contact;
