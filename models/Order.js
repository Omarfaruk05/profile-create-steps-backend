const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    totalAmount: {
      type: String,
      required: true,
    },
    paidStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS"],
      default: "PENDING",
    },
    transectionId: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
