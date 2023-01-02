const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
