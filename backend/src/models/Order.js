const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sweet: { type: mongoose.Schema.Types.ObjectId, ref: "Sweet", required: true },
    name: { type: String, required: true }, 
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
