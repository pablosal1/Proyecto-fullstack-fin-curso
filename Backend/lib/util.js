const jwt = require("jsonwebtoken");

// Generar tokens.

const generateToken = (user, isRefreshToken) => {
    if(isRefreshToken) {
        return jwt.sign(user,
            process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1231231231231220m" }
        );
    } else {
        return jwt.sign(user,
            process.env.TOKEN_SECRET, { expiresIn: "1231231215m" }
        );
    }
};

module.exports = { generateToken };