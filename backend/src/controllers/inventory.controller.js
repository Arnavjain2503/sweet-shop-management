const Sweet = require("../models/Sweet");
const Order = require("../models/Order");

exports.purchase = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });

    if (sweet.quantity <= 0) return res.status(400).json({ message: "Out of stock" });

    sweet.quantity -= 1;
    await sweet.save();

    await Order.create({
      user: req.user.id, 
      sweet: sweet._id,
      name: sweet.name,
      price: sweet.price,
      quantity: 1
    });



    console.log(`[SUCCESS] Order created for User: ${req.user.id}, Sweet: ${sweet.name}`);
    res.json(sweet);
  } catch (error) {
    console.error("Purchase Error:", error);
    res.status(500).json({ message: error.message || "Server error during purchase" });
  }
};

exports.restock = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({
      message: "Restock amount must be a positive number",
    });
  }

  const sweet = await Sweet.findById(req.params.id);
  if (!sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }

  sweet.quantity += amount;
  await sweet.save();

  res.status(200).json(sweet);
};
