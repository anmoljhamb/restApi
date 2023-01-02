const express = require("express");
const app = express();
const productRouter = require("./api/routes/products");
const orderRouter = require("./api/routes/orders");

app.use("/products", productRouter);
app.use("/orders", orderRouter);

module.exports = app;
