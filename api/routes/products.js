const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "GET request for the url /products",
    });
});

router.post("/", (req, res) => {
    res.status(201).json({
        message: "POST request for the url /products",
    });
});

router.get("/:productId", (req, res) => {
    res.status(200).json({
        message: "GET request for the url /products/:productId",
        productId: req.params.productId,
    });
});

router.patch("/:productId", (req, res) => {
    res.status(200).json({
        message: "PATCH request for the url /products/:productId",
        productId: req.params.productId,
    });
});

router.delete("/:productId", (req, res) => {
    res.status(200).json({
        message: "DELETE request for the url /products/:productId",
        productId: req.params.productId,
    });
});

module.exports = router;
