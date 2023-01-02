const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
