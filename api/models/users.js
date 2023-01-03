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

const User = mongoose.model("User", userSchema);
module.exports = User;
