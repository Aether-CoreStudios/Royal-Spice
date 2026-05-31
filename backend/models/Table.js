const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    unique: true,
    required: true,
  },

  status: {
    type: String,
    enum: ["available", "reserved", "closed"],
    default: "available",
  },
});

module.exports = mongoose.model("Table", tableSchema);
