const express = require("express");

const Razorpay = require("razorpay");

const crypto = require("crypto");

const router = express.Router();

/* =========================
   RAZORPAY INSTANCE
========================= */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_SECRET,
});

/* =========================
   CREATE PAYMENT ORDER
========================= */

router.post(
  "/create-order",

  async (req, res) => {
    try {
      const { amount } = req.body;

      // VALIDATION

      if (!amount) {
        return res.status(400).json({
          message: "Amount is required",
        });
      }

      const options = {
        amount: amount * 100,

        currency: "INR",

        receipt: "receipt_" + Date.now(),
      };

      const order = await razorpay.orders.create(options);

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

/* =========================
   VERIFY PAYMENT
========================= */

router.post(
  "/verify-payment",

  async (req, res) => {
    try {
      const {
        razorpay_order_id,

        razorpay_payment_id,

        razorpay_signature,
      } = req.body;

      const body = razorpay_order_id + "|" + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac(
          "sha256",

          process.env.RAZORPAY_SECRET,
        )

        .update(body.toString())

        .digest("hex");

      const isAuthentic = expectedSignature === razorpay_signature;

      if (isAuthentic) {
        res.status(200).json({
          success: true,

          message: "Payment Verified Successfully",
        });
      } else {
        res.status(400).json({
          success: false,

          message: "Payment Verification Failed",
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

module.exports = router;
