const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/products");
const checkAuth = require("../middleware/checkAuth");

router.get("/", (req, res) => {
    Product.find()
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/", checkAuth, (req, res) => {
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });
    product
        .save()
        .then((result) => {
            res.status(201).json({
                message: "POST request for the url /products",
                product: product,
            });
        })
        .catch((err) => {
            res.status(400).json({
                err,
            });
        });
});

router.get("/:productId", (req, res) => {
    Product.findById(req.params.productId)
        .exec()
        .then((result) => {
            if (result) return res.status(200).json(result);
            res.status(404).json({
                error: { message: "Requested not found." },
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.patch("/:productId", checkAuth, (req, res) => {
    console.log(req.body);
    Product.updateOne({ _id: req.params.productId }, { $set: req.body })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.delete("/:productId", checkAuth, (req, res) => {
    Product.remove({ _id: req.params.productId })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;
