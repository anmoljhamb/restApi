const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const User = require("../models/users");

router.get("/", (req, res) => {
    User.find()
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                err,
            });
        });
});

router.post("/signup", (req, res) => {
    const user = new User({ ...req.body, _id: mongoose.Types.ObjectId() });
    user.save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;
