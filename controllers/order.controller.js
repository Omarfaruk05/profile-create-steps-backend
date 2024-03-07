const {
  createOrderService,
  webhook,
  success,
  getAllOrderService,
} = require("../services/order.service");

// create order
exports.createOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = await createOrderService(data);
    res.status(200).json({
      status: true,
      message: "Order Created.",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Order doesn't Created.",
      error: error.message,
    });
  }
};

exports.success = async (req, res) => {
  try {
    const data = req.params;
    const result = await success(data);

    if (result) {
      res.redirect("http://localhost:3000/receipt");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Payment doesn't Success.",
      error: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await getAllOrderService(id);
    res.status(200).json({
      status: true,
      message: "Order fetched successfully.",
      data: orders,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Order doesn't fetched successfully.",
      error: error.message,
    });
  }
};
