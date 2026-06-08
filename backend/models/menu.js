const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    // ⭐ FOOD TAGS (vegan, spicy, bestseller etc.)
    tags: {
      type: [String],
      default: [],
    },

    // ⭐ DISCOUNT SYSTEM
    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    discountActive: {
      type: Boolean,
      default: false,
    },

    // ⭐ STOCK / INVENTORY CONTROL
    stock: {
      type: Number,
      default: 100,
      min: 0,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    // ⭐ RATING SYSTEM
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    ratingCount: {
      type: Number,
      default: 0,
    },

    // ⭐ ORDER TRACKING
    orderCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("Menu", menuSchema);
