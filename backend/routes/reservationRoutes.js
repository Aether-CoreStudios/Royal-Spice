const express = require("express");
const twilio = require("twilio");

const sendEmail = require("../utils/sendEmail");
const Reservation = require("../models/Reservation");

const router = express.Router();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

// GET ALL RESERVATIONS
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({
      createdAt: -1,
    });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CHECK TABLE AVAILABILITY
router.post("/check-table", async (req, res) => {
  try {
    const { date, time, tableNumber } = req.body;

    const existingReservation = await Reservation.findOne({
      date,
      time,
      tableNumber,
    });

    if (existingReservation) {
      return res.json({
        available: false,
      });
    }

    res.json({
      available: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE RESERVATION
router.post("/", async (req, res) => {
  try {
    console.log("RESERVATION DATA:");
    console.log(req.body);

    const { name, email, phone, guests, date, time, tableNumber } = req.body;
    const now = new Date();

    let hour = parseInt(time.split(":")[0]);

    if (time.includes("PM") && hour !== 12) {
      hour += 12;
    }

    const reservationDate = new Date(date);
    reservationDate.setHours(hour, 0, 0, 0);

    if (reservationDate <= now) {
      return res.status(400).json({
        success: false,
        message: "Cannot reserve a table for a past time",
      });
    }
    // Prevent booking past date/time

    const reservationDateTime = new Date(`${date}T${time}`);

    if (reservationDateTime <= now) {
      return res.status(400).json({
        success: false,
        message: "Cannot book a reservation in the past",
      });
    }

    const existingReservation = await Reservation.findOne({
      date,
      time,
      tableNumber,
    });

    console.log("FOUND:", existingReservation);

    if (existingReservation) {
      return res.status(400).json({
        success: false,
        message: `Table ${tableNumber} is already reserved for this time`,
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
      status: "Confirmed",
    });

    await newReservation.save();

    console.log("SAVED RESERVATION:");
    console.log(newReservation);

    const Table = require("../models/Table");

    await Table.findOneAndUpdate({ tableNumber }, { status: "reserved" });

    // WhatsApp message (optional)
    /*
    await client.messages.create({
      body: `
🍽 Royal Spice Reservation Confirmed

👤 Name: ${name}
📅 Date: ${date}
⏰ Time: ${time}
👥 Guests: ${guests}

Thank you for reserving with Royal Spice.
      `,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+91${phone}`,
    });
    */

    await sendEmail(
      email,
      "Royal Spice Reservation Confirmed",
      `Hello ${name},

Your reservation is confirmed.

Date: ${date}
Time: ${time}
Guests: ${guests}
Table Number: ${tableNumber}

Thank you for choosing Royal Spice.`,
    );

    res.status(201).json({
      success: true,
      message: "Reservation Saved",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// CANCEL SINGLE RESERVATION
router.put("/cancel/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    reservation.status = "Cancelled";

    reservation.refundStatus = "Pending";

    await reservation.save();

    await sendEmail(
      reservation.email,
      "Reservation Cancelled",
      `Hello ${reservation.name},

Your reservation at Royal Spice has been cancelled.

We apologize for the inconvenience.`,
    );

    res.status(200).json({
      success: true,
      message: "Reservation Cancelled",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// CANCEL ALL RESERVATIONS
router.delete("/cancel-all", async (req, res) => {
  try {
    await Reservation.deleteMany({});

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

// GET TABLES
router.get("/tables", async (req, res) => {
  try {
    const Table = require("../models/Table");

    const tables = await Table.find();

    res.json(tables);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET RESERVED TABLES
router.get("/reserved-tables", async (req, res) => {
  try {
    const { date, time } = req.query;

    console.log("DATE:", date);
    console.log("TIME:", time);

    const reservations = await Reservation.find({
      date,
      time,
      tableStatus: "reserved",
    });

    console.log("FOUND TABLES:", reservations);

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
