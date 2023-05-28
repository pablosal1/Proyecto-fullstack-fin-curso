const jwt = require("jsonwebtoken");


// Verificacion de token y token de refresco.

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send("Access denied")
    }

    try {
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        console.log("Verified user:", verified); // Agregar este console.log
        req.user = verified
        next()
    } catch (error){
    
        try {
            const verified = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
            console.log("Verified user:", verified); // Agregar este console.log
            req.user = verified
            next()
        } catch (error){
            res.status(400).send("expired token")
        }
    }
};


// Permisos de administrador.

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).send("Unauthorized");
    }
  };
  

module.exports = { verifyToken, isAdmin };