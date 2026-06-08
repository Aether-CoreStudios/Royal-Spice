import React from "react";

function PrivacyPolicy() {
  return (
    <div style={container}>
      <h1 style={title}>Privacy Policy</h1>

      <p style={text}>
        At Royal Spice, we respect your privacy and are committed to protecting
        any personal information you share with us while using our website or
        services.
      </p>

      <h2 style={subtitle}>1. Information We Collect</h2>
      <p style={text}>
        We may collect basic information such as your name, phone number, email
        address, reservation details, and order history when you interact with
        our website.
      </p>

      <h2 style={subtitle}>2. How We Use Information</h2>
      <p style={text}>
        Your information is used to process reservations, manage orders, improve
        our services, and provide customer support.
      </p>

      <h2 style={subtitle}>3. Data Protection</h2>
      <p style={text}>
        We take appropriate security measures to protect your data from
        unauthorized access, alteration, or disclosure.
      </p>

      <h2 style={subtitle}>4. Sharing of Information</h2>
      <p style={text}>
        We do not sell or rent your personal information to third parties.
        Information may only be shared with trusted service providers when
        necessary.
      </p>

      <h2 style={subtitle}>5. Cookies</h2>
      <p style={text}>
        Our website may use cookies to enhance user experience and improve
        performance.
      </p>

      <h2 style={subtitle}>6. Changes to Policy</h2>
      <p style={text}>
        We may update this Privacy Policy occasionally. Users are advised to
        check this page regularly.
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

export default PrivacyPolicy;
