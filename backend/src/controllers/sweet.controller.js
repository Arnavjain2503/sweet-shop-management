const mongoose = require("mongoose");
const Sweet = require("../models/Sweet");

/**
 * CREATE SWEET (ADMIN)
 */
exports.create = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price == null || quantity == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error during creation" });
  }
};

/**
 * GET ALL SWEETS
 */
exports.getAll = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

/**
 * SEARCH SWEETS
 */
exports.search = async (req, res) => {
  const sweets = await Sweet.find(req.query);
  res.json(sweets);
};

/**
 * UPDATE SWEET (ADMIN)
 */
exports.update = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid sweet ID" });
  }

  const updated = await Sweet.findByIdAndUpdate(id, req.body, { new: true });

  if (!updated) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  res.json(updated);
};

/**
 * DELETE SWEET (ADMIN)
 */
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid sweet ID" });
    }

    const deleted = await Sweet.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Server error during deletion" });
  }
};
