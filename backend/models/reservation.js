const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },
    tableNumber: {
      type: Number,
      required: true,
    },

    tableStatus: {
      type: String,
      enum: ["available", "reserved", "closed"],
      default: "available",
    },
    reservationFee: {
      type: Number,
      default: 500,
    },
    paymentStatus: {
      type: String,
      default: "paid",
    },

    paymentId: {
      type: String,
    },
    refundStatus: {
      type: String,
      default: "Not Required",
    },
    refundId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Reservation", reservationSchema);
