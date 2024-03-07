const { ObjectId } = require("mongodb");
const { productSearchableFildes } = require("../constants/product.constants");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { default: axios } = require("axios");

exports.createOrderService = async (order) => {
  const tran_id = new ObjectId().toString();
  const data = {
    store_id: process.env.store_id,
    store_passwd: process.env.store_passwd,
    total_amount: order?.totalAmount,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `https://e-mart-server.vercel.app/api/v1/orders/success/${tran_id}`,
    fail_url: "https://e-mart-server.vercel.app/api/v1/fail",
    cancel_url: "https://e-mart-server.vercel.app/api/v1/cencel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: `${order?.firstName}${order?.lastName}`,
    cus_email: order?.email,
    cus_add1: order?.address,
    cus_add2: "Dhaka",
    cus_city: order?.town,
    cus_state: order?.state,
    cus_postcode: order?.postOrZipCode,
    cus_country: "Bangladesh",
    cus_phone: order?.contactNumber,
  };
  order.user = order?._id;
  delete order._id;
  const orderData = {
    totalAmount: order?.totalAmount,
    user: order?.user,
    products: order?.products,
    paidStatus: "PENDING",
    transectionId: tran_id,
  };

  await Order.create(orderData);

  const response = await axios({
    method: "POST",
    url: "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
    data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return response.data?.redirectGatewayURL;
};

exports.success = async (payload) => {
  console.log("dd", payload);
  const result = await Order.findOneAndUpdate(
    { tran_id: payload },
    { paidStatus: "SUCCESS" },
    { new: true }
  );
  return result;
};

exports.getAllOrderService = async (user) => {
  const result = await Order.find({ user })
    .populate("user")
    .populate("products");

  return result;
};

exports.getStockService = async (data) => {
  const result = await Product.find({ category: data }).limit();
  return result;
};

exports.getProductById = async (id) => {
  const result = await Product.findOne({ _id: id });
  return result;
};
