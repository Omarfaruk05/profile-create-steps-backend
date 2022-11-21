const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product."],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"],
    },
    description: {
        type: String,
        required: true,
    },
    imageURLs: {
        mediumImg: {
            type: [String],
            validate: {
            validator: (value) => {
                if (!value || !Array.isArray(value)) {
                return false
                }
                let Ok = true;
                value.forEach((v) => {
                console.log(validator.isURL(v));
                if (!validator.isURL(v)) {
                    Ok = false;
                }
                });
                return Ok;
            },
            message: "Provide a valid image URL",
            },
        },
        largeImg: [{
            type: [String],
            validate: {
            validator: (value) => {
                if (!value || !Array.isArray(value)) {
                return false
                }
                let Ok = true;
                value.forEach((v) => {
                console.log(validator.isURL(v));
                if (!validator.isURL(v)) {
                    Ok = false;
                }
                });
                return Ok;
            },
            message: "Provide a valid image URL",
            },
        }],
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        name: {
          type: String,
          required: true,
        },
        id: {
          type: ObjectId,
          required: true,
          ref: "Brand",
        },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;