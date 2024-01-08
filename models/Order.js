const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a brnad name"],
      maxLength: 100,
      unique: true,
    },
    orderStatus: {
      type: String,
      enum: ["PENDING", "COMPLETE"],
      required: true,
      default: "PENDING",
    },
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
    User: {
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
