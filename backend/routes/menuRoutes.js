const express = require("express");

const router = express.Router();

const Menu = require("../models/Menu");

/* =========================
   GET ALL MENU ITEMS
========================= */

router.get("/", async (req, res) => {
  try {
    const menuItems = await Menu.find();

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   ADD MENU ITEM
========================= */

router.post("/", async (req, res) => {
  try {
    console.log(req.body);

    const { name, price, category, description, image } = req.body;

    const newMenu = new Menu({
      name,
      price,
      category,
      description,
      image,
    });

    const savedMenu = await newMenu.save();

    res.status(201).json({
      message: "Food Added Successfully",
      menu: savedMenu,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

/* =========================
   DELETE MENU ITEM
========================= */

router.delete("/:id", async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Food Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
/* =========================
   UPDATE MENU ITEM
========================= */

router.put("/:id", async (req, res) => {
  try {
    const updatedFood = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
