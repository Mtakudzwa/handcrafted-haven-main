import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" }, // Corrected ref
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" }, // Corrected type & ref
      quantity: { type: Number, required: true },
    },
  ],
  amount: { type: Number, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true }, // Corrected type & ref
  status: { type: String, required: true, default: "Order Placed" },
  date: { type: Number, required: true },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;