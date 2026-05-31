const Reservation = require("../models/reservation");

const expireReservations = async () => {
  try {
    const now = new Date();

    const reservations = await Reservation.find({
      status: "Confirmed",
    });

    for (const reservation of reservations) {
      const reservationDateTime = new Date(
        `${reservation.date} ${reservation.time}`,
      );

      if (reservationDateTime < now) {
        reservation.status = "Expired";
        await reservation.save();
      }
    }

    console.log("Reservation expiry check completed");
  } catch (error) {
    console.log("Expire reservation error:", error);
  }
};

module.exports = expireReservations;
