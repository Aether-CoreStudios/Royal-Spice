const express = require("express");
const Order = require("../models/order");
const sendEmail = require("../utils/sendEmail");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* =========================
   CREATE ORDER (PUBLIC)
========================= */

router.post("/", async (req, res) => {
  try {
    const {
      user,
      email,
      items,
      totalAmount,
      paymentId,
      address,
      phone,
      paymentStatus,
      refundStatus,
      orderStatus,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
      });
    }

    const order = new Order({
      user,
      email,
      items,
      totalAmount,
      paymentId,
      paymentStatus: paymentStatus || "Paid",
      refundStatus: refundStatus || "not_required",
      address,
      phone,
      orderStatus: orderStatus || "Preparing",
    });

    const savedOrder = await order.save();

    res.status(201).json({
      message: "Order Saved Successfully",
      order: savedOrder,
    });

    if (email) {
      sendEmail(
        email,
        "Royal Spice Order Confirmed",
        `Hello ${user},

Your order has been confirmed.

Total Amount: ₹${totalAmount}

Status: Preparing

Thank you for ordering from Royal Spice.`,
      ).catch((err) => console.log("Email Error:", err));
    }
  } catch (error) {
    console.log("ORDER ROUTE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   DASHBOARD STATS (ADMIN ONLY)
========================= */

router.get("/stats/dashboard", protect, adminOnly, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const totalRevenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue =
      totalRevenueData.length > 0 ? totalRevenueData[0].totalRevenue : 0;

    res.json({
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   GET ALL ORDERS (ADMIN ONLY)
========================= */

router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
/* =========================
   GET MY ORDERS
========================= */

router.get("/myorders/:email", async (req, res) => {
  try {
    const orders = await Order.find({
      email: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
/* =========================
   GET SINGLE ORDER (ADMIN ONLY)
========================= */

router.get("/:id", protect, adminOnly, async (req, res) => {
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
   UPDATE ORDER STATUS (ADMIN ONLY)
========================= */

router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = req.body.orderStatus;
    await order.save();

    const updatedOrder = order;

    if (updatedOrder?.email) {
      sendEmail(
        updatedOrder.email,
        `Order Status Updated - ${updatedOrder.orderStatus}`,
        `Hello ${updatedOrder.user},

Your order status is now:

${updatedOrder.orderStatus}

Thank you for choosing Royal Spice.`,
      ).catch((err) => console.log(err));
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
   CANCEL ORDER (SOFT DELETE - ADMIN ONLY)
========================= */

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
      });
    }

    order.orderStatus = "Cancelled";
    order.refundStatus = "requested";

    await order.save();

    res.json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
