const { createOrderService, webhook } = require("../services/order.service");

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

exports.webhook = async (req, res) => {
  try {
    const data = req.query;
    console.log(data);
    const result = await webhook(data);

    res.status(200).json({
      status: true,
      message: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Payment doesn't Success.",
      error: error.message,
    });
  }
};
