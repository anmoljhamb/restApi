const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "..", "..", "config.env"),
});

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error });
    }
};

module.exports = checkAuth;
