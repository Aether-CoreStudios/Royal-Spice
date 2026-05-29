const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // USER INFO

    user: {
      type: String,
    },
    email: {
      type: String,
    },

    // ORDER ITEMS

    items: [
      {
        name: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    // TOTAL AMOUNT

    totalAmount: {
      type: Number,
      required: true,
    },

    // PAYMENT DETAILS

    paymentId: {
      type: String,
    },

    paymentStatus: {
      type: String,

      default: "Pending",
    },

    // ORDER STATUS

    orderStatus: {
      type: String,

      default: "Preparing",
    },

    // DELIVERY ADDRESS

    address: {
      type: String,
    },
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", orderSchema);
