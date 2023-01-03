const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", async function (next) {
    console.log(this.password);
    console.log(this.username);
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
