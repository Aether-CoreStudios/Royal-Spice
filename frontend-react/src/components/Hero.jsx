import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* OVERLAY */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.85))",
        }}
      ></div>

      {/* GLOW EFFECT */}

      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "rgba(200,151,58,0.15)",
          filter: "blur(120px)",
          borderRadius: "50%",
          top: "-100px",
          right: "-100px",
        }}
      ></div>

      {/* CONTENT */}

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
          padding: "20px",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0px" }}
          animate={{ opacity: 1, letterSpacing: "5px" }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            color: "#C8973A",
            marginBottom: "25px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          WELCOME TO ROYAL SPICE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{
            fontSize: "clamp(45px, 8vw, 100px)",
            lineHeight: "1.1",
            marginBottom: "30px",
            fontWeight: "800",
          }}
        >
          Taste The Luxury <br /> Of Fine Dining
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            color: "#ddd",
            maxWidth: "700px",
            margin: "0 auto",
            lineHeight: "1.9",
            fontSize: "18px",
            marginBottom: "45px",
          }}
        >
          Experience handcrafted dishes, elegant ambience, and unforgettable
          flavors made by world-class chefs.
        </motion.p>

        {/* BUTTONS */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 1 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => navigate("/menu")} style={primaryBtn}>
            Explore Menu
          </button>

          <button onClick={() => navigate("/reservation")} style={secondaryBtn}>
            Book Table
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* BUTTONS */

const primaryBtn = {
  background: "#C8973A",
  color: "black",
  border: "none",
  padding: "18px 40px",
  borderRadius: "40px",
  fontSize: "17px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 25px rgba(200,151,58,0.4)",
  transition: "0.3s",
};

const secondaryBtn = {
  background: "transparent",
  color: "white",
  border: "1px solid #C8973A",
  padding: "18px 40px",
  borderRadius: "40px",
  fontSize: "17px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "0.3s",
};

export default Hero;
