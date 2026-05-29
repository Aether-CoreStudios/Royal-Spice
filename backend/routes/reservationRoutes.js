const nodemailer = require("nodemailer");
const express = require("express");
const twilio = require("twilio");

const sendEmail = require("../utils/sendEmail");

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const Reservation = require("../models/Reservation");

const router = express.Router();

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

// CREATE RESERVATION

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, guests, date, time } = req.body;

    const newReservation = new Reservation({
      name,
      email,
      phone,
      guests,
      date,
      time,
      status: "Confirmed",
    });

    await newReservation.save();

    // WHATSAPP MESSAGE

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

    // EMAIL CONFIRMATION

    await sendEmail(
      email,

      "Royal Spice Reservation Confirmed",

      `Hello ${name},

Your reservation is confirmed.

Date: ${date}
Time: ${time}
Guests: ${guests}

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

// CANCEL RESERVATION

router.put("/cancel/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    reservation.status = "Cancelled";

    await reservation.save();

    // SEND CANCEL EMAIL

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

module.exports = router;
