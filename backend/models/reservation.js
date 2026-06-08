const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10,15}$/, "Invalid phone number"],
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    date: {
      type: Date,
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
      enum: ["available", "held", "reserved", "cancelled", "closed", "no_show"],
      default: "available",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    reservationFee: {
      type: Number,
      default: 500,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentId: {
      type: String,
    },

    refundStatus: {
      type: String,
      enum: ["not_required", "requested", "processing", "completed", "failed"],
      default: "not_required",
    },

    refundId: {
      type: String,
    },

    cancelledAt: {
      type: Date,
    },

    cancellationReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
reservationSchema.index({ tableNumber: 1, date: 1, time: 1 }, { unique: true });
module.exports =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);
