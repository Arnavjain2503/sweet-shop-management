const Sweet = require("../models/Sweet");

exports.create = async (req, res) => {
  const { name, category, price, quantity } = req.body;

  if (!name || !category || price == null || quantity == null) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sweet = await Sweet.create({ name, category, price, quantity });
  res.status(201).json(sweet);
};


exports.getAll = async (req, res) => {
  res.json(await Sweet.find());
};

exports.search = async (req, res) => {
  res.json(await Sweet.find(req.query));
};

exports.update = async (req, res) => {
  res.json(await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.remove = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
