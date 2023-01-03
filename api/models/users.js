const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", async function (next) {
    // check if a username already exists or not. And if it does, return an error.
    console.log(this.password);
    console.log(this.username);
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
