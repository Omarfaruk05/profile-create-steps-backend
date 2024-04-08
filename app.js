const express = require("express");
const app = express();
const cors = require("cors");

const userRoute = require("./src/app/routes/user.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/users", userRoute);

app.get("/", (req, res) => {
  res.send("Wellcome to Dirbble.");
});

app.all("*", (req, res) => {
  res.send("Opps...No Route Found.");
});

module.exports = app;
