const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: async function (value) {
                const result = await mongoose.models["User"]
                    .findOne({
                        username: value,
                    })
                    .exec();
                return result == null;
            },
            message: (props) => {
                return `Unique username required. The given username ${props.value}  already exists.`;
            },
        },
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 12, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", userSchema);
module.exports = User;
