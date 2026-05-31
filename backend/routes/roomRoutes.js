const express = require("express");
const router = express.Router();
const Room = require("../models/rooms");

// Get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a room
router.post("/", async (req, res) => {
  try {
    const room = new Room({
      roomNumber: req.body.roomNumber,
      roomType: req.body.roomType,
      price: req.body.price,
      status: req.body.status || "available",
    });

    const savedRoom = await room.save();

    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
