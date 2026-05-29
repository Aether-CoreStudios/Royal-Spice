const express = require("express");

const Order = require("../models/Order");

const sendEmail = require("../utils/sendEmail");

const router = express.Router();
const User = require("../models/user");
/* =========================
   CREATE ORDER
========================= */

router.post("/", async (req, res) => {
  try {
    const { user, email, items, totalAmount, paymentId, address, phone } =
      req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const newOrder = new Order({
      user,
      email,
      items,
      totalAmount,
      paymentId,
      address,
      phone,
      orderStatus: "Preparing",
    });

    const savedOrder = await newOrder.save();

    // ORDER CONFIRM EMAIL

    await sendEmail(
      email,

      "Royal Spice Order Confirmed",

      `Hello ${user},

Your order has been confirmed.

Total Amount: ₹${totalAmount}

Status: Preparing

Thank you for ordering from Royal Spice.`,
    );

    res.status(201).json({
      message: "Order Saved Successfully",
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   GET ALL ORDERS
========================= */

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   GET SINGLE ORDER
========================= */

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   UPDATE ORDER STATUS
========================= */

router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,

      {
        orderStatus: req.body.orderStatus,
      },

      {
        new: true,
      },
    );

    // SEND STATUS EMAIL

    if (updatedOrder.email) {
      await sendEmail(
        updatedOrder.email,

        `Order Status Updated - ${updatedOrder.orderStatus}`,

        `Hello ${updatedOrder.user},

Your order status is now:

${updatedOrder.orderStatus}

Thank you for choosing Royal Spice.`,
      );
    }

    res.status(200).json({
      message: "Order Updated Successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   DELETE ORDER
========================= */

router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
