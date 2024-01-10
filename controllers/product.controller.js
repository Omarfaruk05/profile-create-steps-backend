const { productFilterableFields } = require("../constants/product.constants");
const {
  getProductById,
  addProductService,
  getAllProduct,
} = require("../services/product.service");
const { default: pick } = require("../utils/pick");

// add product
exports.addProduct = async (req, res) => {
  try {
    const product = await addProductService(req.body);

    res.status(200).json({
      status: true,
      message: "Product added.",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Product doesn't added.",
      error: error.message,
    });
  }
};

//get product
exports.getAllProduct = async (req, res) => {
  try {
    const filters = pick(req.query, productFilterableFields);
    const products = await getAllProduct(filters);

    res.status(200).json({
      status: true,
      message: "Products get succesfully",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Products doesn't get.",
      error: error.message,
    });
  }
};

// get Product By Id
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const product = await getProductById(id);

    res.status(200).json({
      status: true,
      message: "Product get succesfull",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Product doesn't get.",
      error: error.message,
    });
  }
};
