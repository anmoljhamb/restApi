const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const productRouter = require("./api/routes/products");
const orderRouter = require("./api/routes/orders");
const userRouter = require("./api/routes/users");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, "config.env") });

mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => {
        console.log("Database connected.");
    })
    .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/users", userRouter);

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, DELETE, PUT"
        );
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next) => {
    // handling for all the unmatched routes.
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
