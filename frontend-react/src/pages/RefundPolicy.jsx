import React from "react";

function RefundPolicy() {
  return (
    <div style={container}>
      <h1 style={title}>Refund Policy</h1>

      <p style={text}>
        At Royal Spice, we aim to provide the best dining experience. Please
        read our refund policy carefully before making reservations or payments.
      </p>

      <h2 style={subtitle}>1. Reservation Cancellation</h2>
      <p style={text}>
        Cancellations made at least 24 hours before the reservation time are
        eligible for a full refund.
      </p>

      <h2 style={subtitle}>2. Late Cancellation</h2>
      <p style={text}>
        Cancellations made less than 24 hours before the booking time may not be
        eligible for a refund.
      </p>

      <h2 style={subtitle}>3. No-Show Policy</h2>
      <p style={text}>
        If a customer does not show up for their reservation without prior
        notice, no refund will be provided.
      </p>

      <h2 style={subtitle}>4. Online Orders</h2>
      <p style={text}>
        Refunds for food orders are only applicable in case of incorrect,
        damaged, or missing items.
      </p>

      <h2 style={subtitle}>5. Refund Processing Time</h2>
      <p style={text}>
        Approved refunds will be processed within 5–7 business days.
      </p>

      <h2 style={subtitle}>6. Contact Support</h2>
      <p style={text}>
        For refund-related queries, contact us at support@royalspice.com
      </p>

      <p style={footerText}>Last updated: 2026 • Royal Spice</p>
    </div>
  );
}

const container = {
  padding: "120px 10%",
  background: "#0B1120",
  color: "white",
  minHeight: "100vh",
};

const title = {
  fontSize: "40px",
  color: "#C8973A",
  marginBottom: "20px",
};

const subtitle = {
  fontSize: "22px",
  marginTop: "30px",
  color: "#F5C16C",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#D1D5DB",
};

const footerText = {
  marginTop: "40px",
  color: "#6B7280",
  fontSize: "14px",
};

export default RefundPolicy;
