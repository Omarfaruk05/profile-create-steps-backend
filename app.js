const express = require("express");
const app = express();
const cors = require("cors");

const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const orderRoute = require("./routes/order.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);

app.get("/", (req, res) => {
  res.send("Wellcome to E-Mart server. All routes are working.");
});

app.all("*", (req, res) => {
  res.send("Opps...No Route Found.");
});

module.exports = app;
