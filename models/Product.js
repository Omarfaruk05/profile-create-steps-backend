const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
  {
    category: {
      type: String,
    },
    productName: {
      type: String,
      required: [true, "Please provide a name for this product."],
    },
    productImage: {
      type: [String],
      validate: {
        validator: (value) => {
          if (!value || !Array.isArray(value)) {
            return false;
          }
          let allOk = true;
          value.forEach((v) => {
            if (!validator.isURL(v)) {
              allOk = false;
            }
          });
          return allOk;
        },
        message: "Provide a valid image URL",
      },
    },
    productImageWeb: {
      type: [String],
      validate: {
        validator: (value) => {
          if (!value || !Array.isArray(value)) {
            return false;
          }
          let allOk = true;
          value.forEach((v) => {
            if (!validator.isURL(v)) {
              allOk = false;
            }
          });
          return allOk;
        },
        message: "Provide a valid image URL",
      },
    },
    productDetails: {
      type: Object,
      required: true,
    },
    KeyFeatures: {
      type: Object,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Product quantity can't be negative"],
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can't be {VALUE}",
      },
    },
    discription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
