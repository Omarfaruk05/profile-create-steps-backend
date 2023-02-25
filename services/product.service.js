const Product = require("../models/Product");

exports.addProductService = async (product) => {
  const result = await Product.create(product);
  return result;
};
exports.getProductService = async (data) => {
  const result = await Product.find({ category: data });
  return result;
};
