const express = require("express");
const PDFDocument = require("pdfkit");

const router = express.Router();

router.get("/reservation/:id", async (req, res) => {
  try {
    const Reservation = require("../models/reservation");

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Invoice-${reservation._id}.pdf`,
    );

    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc.fontSize(24).text("ROYAL SPICE", {
      align: "center",
    });

    doc.moveDown();

    doc.fontSize(18).text("Reservation Invoice");

    doc.moveDown();

    doc.text(`Customer Name: ${reservation.name}`);
    doc.text(`Booking ID: ${reservation._id}`);
    doc.text(`Date: ${reservation.date}`);
    doc.text(`Time: ${reservation.time}`);
    doc.text(`Table Number: ${reservation.tableNumber}`);

    doc.moveDown();

    doc.text(`Reservation Fee: ₹500`);

    const gst = 500 * 0.18;

    doc.text(`GST (18%): ₹${gst}`);

    doc.text(`Total Paid: ₹${500 + gst}`);

    doc.end();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
