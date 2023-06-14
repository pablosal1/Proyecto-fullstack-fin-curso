const jwt = require("jsonwebtoken");

// Generar tokens.

const generateToken = (user, isRefreshToken) => {
    if(isRefreshToken) {
        return jwt.sign(user,
            process.env.REFRESH_TOKEN_SECRET, { expiresIn: "111111111111111111120m" }
        );
    } else {
        return jwt.sign(user,
            process.env.TOKEN_SECRET, { expiresIn: "1111111111111115m" }
        );
    }
};

module.exports = { generateToken };