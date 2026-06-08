const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true,
  },

  roomType: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  capacity: {
    type: Number,
    default: 2,
  },

  images: {
    type: [String],
    default: [],
  },

  amenities: {
    type: [String],
    default: [],
  },

  status: {
    type: String,
    enum: ["available", "booked", "maintenance"],
    default: "available",
  },
});

module.exports = mongoose.model("Room", roomSchema);
