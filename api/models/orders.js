const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
