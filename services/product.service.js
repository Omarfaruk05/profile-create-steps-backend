const Product = require("../models/Product");

exports.addProductService = async (product) => {
  const result = await Product.create(product);
  return result;
};
exports.getStockService = async (data) => {
  const result = await Product.find({ category: data }).limit();
  return result;
};
exports.getProductForHomeService = async (data) => {
  const result = await Product.find({ category: data }).limit(8);
  return result;
};
exports.getProductServiceById = async (id) => {
  const result = await Product.findOne({ _id: id });
  return result;
};
