const mongoose = require("mongoose");

const roomBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    customerName: {
      type: String,
      required: true,
    },
    bookingId: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      default: 0,
    },
    roomNumber: {
      type: Number,
    },

    roomType: {
      type: String,
    },
    roomPrice: {
      type: Number,
      required: true,
    },

    bookingType: {
      type: String,
      enum: ["book", "prebook"],
      default: "book",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
    },
    refundStatus: {
      type: String,
      enum: ["Not Required", "Pending", "Refunded"],
      default: "Not Required",
    },

    refundId: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "booked",
        "approved",
        "rejected",
        "checkedin",
        "checkedout",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("RoomBooking", roomBookingSchema);
