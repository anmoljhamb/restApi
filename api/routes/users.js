const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");

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

router.post("/login", (req, res) => {
    User.findOne({ username: req.body.username })
        .exec()
        .then((result) => {
            if (!result)
                return res.status(400).json({
                    error: { message: "User doesn't exist" },
                });
            if (!bcrypt.compareSync(req.body.password, result.password))
                return res
                    .status(400)
                    .json({ error: { message: "Wrong Password." } });
            return res.status(200).json({ result });
        })
        .catch((err) => {
            res.status(400).json({ error: err });
        });
});

module.exports = router;
