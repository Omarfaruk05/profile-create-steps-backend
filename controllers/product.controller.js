const {
  addProductService,
  getProductService,
} = require("../services/product.service");

// add product
exports.addProduct = async (req, res) => {
  try {
    const product = await addProductService(req.body);

    res.status(200).json({
      status: true,
      message: "Product added.",
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
exports.getProduct = async (req, res) => {
  try {
    const { category } = req.params;
    console.l;
    const products = await getProductService(category);

    res.status(200).json({
      status: true,
      message: "Products get succesfull",
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
