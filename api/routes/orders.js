const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "GET request for the url /orders",
    });
});

router.post("/", (req, res) => {
    res.status(201).json({
        message: "POST request for the url /orders",
    });
});

router.get("/:orderId", (req, res) => {
    res.status(200).json({
        message: "GET request for the url /orders/:orderId",
        orderId: req.params.orderId,
    });
});

router.patch("/:orderId", (req, res) => {
    res.status(200).json({
        message: "PATCH request for the url /orders/:orderId",
        orderId: req.params.orderId,
    });
});

router.delete("/:orderId", (req, res) => {
    res.status(200).json({
        message: "DELETE request for the url /orders/:orderId",
        orderId: req.params.orderId,
    });
});

module.exports = router;
