const express = require("express");
const twilio = require("twilio");

const sendEmail = require("../utils/sendEmail");
const Reservation = require("../models/reservation");
const Table = require("../models/Table");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

/* =========================
   GET ALL RESERVATIONS (ADMIN ONLY)
========================= */

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   CHECK TABLE AVAILABILITY (PUBLIC)
========================= */

router.post("/check-table", async (req, res) => {
  try {
    const { date, time, tableNumber } = req.body;

    const existing = await Reservation.findOne({
      date,
      time,
      tableNumber,
    });

    return res.json({
      available: !existing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   CREATE RESERVATION (PUBLIC)
========================= */

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, guests, date, time, tableNumber } = req.body;

    const now = new Date();
    const reservationDateTime = new Date(`${date}T${time}`);

    if (reservationDateTime <= now) {
      return res.status(400).json({
        success: false,
        message: "Cannot book past time",
      });
    }

    const existing = await Reservation.findOne({
      date,
      time,
      tableNumber,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Table already booked",
      });
    }

    const newReservation = new Reservation({
      name,
      email,
      phone,
      guests,
      date,
      time,
      tableNumber,
      tableStatus: "reserved",
      status: "confirmed",
      paymentStatus: "pending",
      refundStatus: "not_required",
    });

    await newReservation.save();

    await Table.findOneAndUpdate({ tableNumber }, { status: "reserved" });

    await sendEmail(
      email,
      "Reservation Confirmed",
      `Hello ${name}, your reservation is confirmed for ${date} at ${time}.`,
    );

    res.status(201).json({
      success: true,
      message: "Reservation created",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   CANCEL SINGLE RESERVATION (ADMIN ONLY)
========================= */

router.put("/cancel/:id", protect, adminOnly, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    if (reservation.status === "cancelled") {
      return res.status(400).json({
        message: "Already cancelled",
      });
    }

    reservation.status = "cancelled";
    reservation.refundStatus = "requested";
    reservation.cancelledAt = new Date();

    await reservation.save();

    await Table.findOneAndUpdate(
      { tableNumber: reservation.tableNumber },
      { status: "available" },
    );

    await sendEmail(
      reservation.email,
      "Reservation Cancelled",
      `Hello ${reservation.name},

Your reservation at Royal Spice has been cancelled.

We apologize for the inconvenience.`,
    );

    res.status(200).json({
      success: true,
      message: "Reservation cancelled",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   CANCEL ALL RESERVATIONS (ADMIN ONLY)
========================= */

router.delete("/cancel-all", protect, adminOnly, async (req, res) => {
  try {
    await Reservation.updateMany(
      { status: { $ne: "cancelled" } },
      {
        status: "cancelled",
        cancelledAt: new Date(),
        refundStatus: "not_required",
      },
    );

    await Table.updateMany({}, { status: "available" });

    res.status(200).json({
      success: true,
      message: "All reservations cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   GET TABLES
========================= */

router.get("/tables", async (req, res) => {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   GET RESERVED TABLES
========================= */

router.get("/reserved-tables", async (req, res) => {
  try {
    const { date, time } = req.query;

    const reservations = await Reservation.find({
      date,
      time,
      tableStatus: "reserved",
    });

    const reservedTables = reservations.map(
      (reservation) => reservation.tableNumber,
    );

    res.json(reservedTables);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
