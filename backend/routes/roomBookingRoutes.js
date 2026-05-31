const express = require("express");
const router = express.Router();

const RoomBooking = require("../models/roomBooking");
const sendEmail = require("../utils/sendEmail");

// Create Booking
router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const Room = require("../models/rooms");

    // Check room exists
    const room = await Room.findOne({
      roomNumber: req.body.roomNumber,
    });
    console.log("ROOM FOUND:", room);
    console.log("ROOM STATUS:", room?.status);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Prevent double booking
    if (room.status === "booked") {
      return res.status(400).json({
        success: false,
        message: "Room is already booked",
      });
    }

    // Save booking
    const totalBookings = await RoomBooking.countDocuments();

    const booking = new RoomBooking({
      ...req.body,

      bookingId: `RB-${new Date().getFullYear()}-${String(
        totalBookings + 1,
      ).padStart(4, "0")}`,
    });

    const savedBooking = await booking.save();
    console.log("SAVED BOOKING:", savedBooking);
    // Update room status
    await Room.findOneAndUpdate(
      { roomNumber: req.body.roomNumber },
      { status: "booked" },
    );

    console.log("SENDING ROOM BOOKING EMAIL...");

    await sendEmail(
      req.body.email,
      "Royal Spice Room Booking Confirmed",
      `Hello ${req.body.customerName},

Your room booking is confirmed.

Booking ID: ${savedBooking.bookingId}

Room Number: ${req.body.roomNumber}
Room Type: ${req.body.roomType}

Check In: ${req.body.checkIn}
Check Out: ${req.body.checkOut}

Guests: ${req.body.guests}

Amount Paid: ₹${req.body.roomPrice}`,
    );

    console.log("ROOM BOOKING EMAIL SENT");
    res.status(201).json({
      success: true,
      booking: savedBooking,
    });
  } catch (error) {
    console.log("ROOM BOOKING ERROR:");
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
// Get All Bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await RoomBooking.find();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Approve Booking
router.put("/approve/:id", async (req, res) => {
  try {
    const booking = await RoomBooking.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true },
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Reject Booking
router.put("/reject/:id", async (req, res) => {
  try {
    const booking = await RoomBooking.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true },
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// Get all room bookings
router.get("/all", async (req, res) => {
  try {
    const bookings = await RoomBooking.find();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// Checkout All Rooms
router.put("/checkout-all", async (req, res) => {
  try {
    const Room = require("../models/rooms");

    const bookings = await RoomBooking.find({
      status: "booked",
    });

    for (const booking of bookings) {
      await RoomBooking.findByIdAndDelete(booking._id);

      await Room.findOneAndUpdate(
        { roomNumber: booking.roomNumber },
        { status: "available" },
      );
      await Room.findOneAndUpdate(
        { roomNumber: booking.roomNumber },
        { status: "available" },
      );

      try {
        await sendEmail(
          booking.email,
          "Royal Spice Hotel - Check Out Completed",
          `Hello ${booking.customerName},

Your stay at Royal Spice Hotel has been completed successfully.

Booking ID: ${booking.bookingId}

Room Number: ${booking.roomNumber}

Thank you for choosing Royal Spice Hotel.`,
        );
      } catch (emailError) {
        console.log("Email Error:", emailError);
      }
    }

    res.json({
      success: true,
      message: "All rooms checked out successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Checkout Room
router.put("/checkout/:id", async (req, res) => {
  try {
    const Room = require("../models/rooms");

    const booking = await RoomBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "checkedout";

    await booking.save();

    await Room.findOneAndUpdate(
      { roomNumber: booking.roomNumber },
      { status: "available" },
    );
    await sendEmail(
      booking.email,

      "Royal Spice Hotel - Check Out Completed",

      `Hello ${booking.customerName},

Your stay at Royal Spice Hotel has been completed successfully.

Booking ID: ${booking.bookingId}

Room Number: ${booking.roomNumber}

Room Type: ${booking.roomType}

Check In: ${booking.checkIn}

Check Out: ${booking.checkOut}

Thank you for choosing Royal Spice Hotel.

We hope to welcome you again soon.`,
    );

    res.json({
      success: true,
      message: "Room checked out successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await RoomBooking.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
