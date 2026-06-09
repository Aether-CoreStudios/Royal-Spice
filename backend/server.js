require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cron = require("node-cron");

const chatbotRoutes = require("./routes/chatbotRoutes");
const roomRoutes = require("./routes/roomRoutes");
const roomBookingRoutes = require("./routes/roomBookingRoutes");
const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const authRoutes = require("./routes/authRoutes");

const expireReservations = require("./utils/expireReservations");

const app = express();

/* =========================
   TRUST PROXY
========================= */

app.set("trust proxy", 1);

/* =========================
   CORS
========================= */

app.use(
  cors({
    origin: ["http://localhost:3000", "https://royal-spice-alpha.vercel.app"],
    credentials: true,
  }),
);

/* =========================
   BODY PARSER
========================= */

app.use(express.json());

/* =========================
   SECURITY
========================= */

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  message: "Too many requests, please try again later.",
});

app.use(limiter);

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Restaurant API Running Successfully",
  });
});

/* =========================
   API ROUTES
========================= */

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/menu", menuRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/reservations", reservationRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/chatbot", chatbotRoutes);

app.use("/api/rooms", roomRoutes);

app.use("/api/room-bookings", roomBookingRoutes);

app.use("/api/invoices", invoiceRoutes);

/* =========================
   CRON JOBS
========================= */

cron.schedule("* * * * *", async () => {
  try {
    await expireReservations();
  } catch (error) {
    console.error("Reservation expiration error:", error);
  }
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Something went wrong",
  });
});

/* =========================
   DATABASE CONNECTION
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });
