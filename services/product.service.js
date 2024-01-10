const { productSearchableFildes } = require("../constants/product.constants");
const Product = require("../models/Product");

exports.addProductService = async (product) => {
  const result = await Product.create(product);
  return result;
};
exports.getStockService = async (data) => {
  const result = await Product.find({ category: data }).limit();
  return result;
};
exports.getAllProductsService = async (filters) => {
  const { searchTerm, limit, minPrice, maxPrice, ...filtersData } = filters;

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: productSearchableFildes.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (minPrice && !maxPrice) {
    andConditions.push({
      $and: [{ price: { $gte: Number(minPrice) } }],
    });
  }

  if (!minPrice && maxPrice) {
    andConditions.push({
      $and: [{ price: { $lte: Number(maxPrice) } }],
    });
  }

  if (minPrice && maxPrice) {
    andConditions.push({
      $and: [{ price: { $gte: Number(minPrice), $lte: Number(maxPrice) } }],
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Product.find(whereConditions).limit(limit);

  return result;
};
exports.getProductById = async (id) => {
  const result = await Product.findOne({ _id: id });
  return result;
};
