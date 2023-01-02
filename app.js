const express = require("express");
const app = express();
const morgan = require("morgan");
const productRouter = require("./api/routes/products");
const orderRouter = require("./api/routes/orders");

app.use(morgan("dev"));
app.use("/products", productRouter);
app.use("/orders", orderRouter);

module.exports = app;
