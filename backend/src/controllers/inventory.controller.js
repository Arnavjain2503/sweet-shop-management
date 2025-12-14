const Sweet = require("../models/Sweet");

exports.purchase = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity <= 0) return res.status(400).json({ message: "Out of stock" });

    sweet.quantity -= 1;
    await sweet.save();
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error during purchase" });
  }
};

exports.restock = async (req, res) => {
  try {
    const { quantity } = req.body; // Changed from amount to quantity to match frontend

    if (quantity === undefined || typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({
        message: "Restock quantity must be a positive number"
      });
    }

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: "Server error during restock" });
  }
};
