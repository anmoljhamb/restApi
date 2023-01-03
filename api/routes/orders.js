const express = require("express");
const Order = require("../models/orders");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.get("/", (req, res) => {
    Order.find()
        .select("_id product quantity")
        .populate("product", "_id name")
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
});

router.post("/", checkAuth, (req, res) => {
    console.log("User: ", req.user);
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
    });
    order
        .save()
        .then((result) => {
            return result.populate("product", "_id name price");
        })
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});

router.get("/:orderId", (req, res) => {
    Order.findById(req.params.orderId)
        .populate("product", "_id name price")
        .select("_id product quantity")
        .exec()
        .then((result) => {
            if (result) return res.status(200).json(result);
            res.status(404).json({ err: { message: "Record not found." } });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ err });
        });
});

router.patch("/:orderId", checkAuth, (req, res) => {
    Order.updateOne({ _id: req.params.orderId }, { $set: req.body })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
});

router.delete("/:orderId", checkAuth, (req, res) => {
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
});

module.exports = router;
