const Sweet = require("../models/Sweet");

exports.purchase = async (req, res) => {
  const sweet = await Sweet.findById(req.params.id);
  if (sweet.quantity <= 0) return res.status(400).json({ message: "Out of stock" });

  sweet.quantity -= 1;
  await sweet.save();
  res.json(sweet);
};

exports.restock = async (req, res) => {
  const { amount } = req.body;

  if (amount === undefined || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({
      message: "Restock amount must be a positive number"
    });
  }

  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  sweet.quantity += amount;
  await sweet.save();

  res.json(sweet);
};
