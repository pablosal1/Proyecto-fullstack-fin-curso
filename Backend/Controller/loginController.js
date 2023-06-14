const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../lib/util");
const { verifyToken } = require("../middlewares/auth");
const Model = require("../Model/loginModel");
const multer = require("multer");

//register endpoint

router.post("/register", async (req, res) => {
    try {
        const existingUser = await Model.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] }).exec();
        if (existingUser) {
            return res.status(409).json({
                status: "failed",
                data: null,
                error: "Username or email already exists. Please choose a different username or email."
            });
        }

        const data = new Model({
            username: req.body.username,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
            role: req.body.role,
        });

        data.save()
            .then((data) =>
                res.status(201).json({ status: "succeeded", data, error: null })
            )
            .catch((error) => {
                if (error.code === 11000) {
                    return res.status(409).json({
                        status: "failed",
                        data: null,
                        error: "You are trying to register an existing email. Please choose a new email and try again."
                    });
                } else {
                    return res.status(400).json({ status: "failed", data: null, error: error.message });
                }
            });
    } catch (error) {
        if (error.message == "data and salt arguments required") {
            res.status(422).json({
                status: "failed",
                data: null,
                error: "Password is required. Please insert a valid password and try again."
            });
        } else {
            res.status(500).json({ status: "failed", data: null, error: "Internal server error" });
        }
    }
});


/* login endpoint */
router.post("/login", async (req, res) => {
    try {
        const data = await Model.findOne({ email: req.body.email }).exec();

        if (data) {
            const validPassword = await bcrypt.compare(
                req.body.password,
                data.password
            );
            if (validPassword) {

                /*generar token */
                const user = {
                    id: data._id,
                    username: data.username,
                    email: data.email,
                    role: data.role,
                    permissions: {
                        get: data.role === 'admin',
                        delete: data.role === 'admin',
                        post: data.role === 'admin',
                        patch: data.role === 'admin'

                    }


                }
                const token = generateToken(user, false);
                const refreshToken = generateToken(user, true);


                res.status(200).json({
                    status: "succeeded", data: {
                        id: data._id,
                        username: data.username,
                        email: data.email,
                        role: data.role,
                        token,
                        refreshToken,
                    },
                    error: null,
                });
            } else {
                res.status(401).json({ status: "failed", data: null, error: "wrong email or password" })
            }
        } else {
            res.status(401).json({ status: "failed", data: null, error: "wrong email or password" })
        }
    } catch (error) {
        res.status(400).json({
            status: "failed",
            data: null,
            error: error.message,
        });
    }
});





router.get("/refresh", verifyToken, (req, res) => {
    if (!req.user) {
        return res.status(400).send("access denied");

    }
    const { email, role, exp } = req.user
    res.status(200).json({
        status: "succeeded",
        data: {
            token: generateToken({ email, role }, false),
            refreshToken: generateToken({ email, role }, true),
        },
        error: null,
    });
});



// // Obtener datos del usuario actual
router.get("/", verifyToken, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ status: "failed", data: null, error: "Unauthorized" });
    }

    try {
        const user = await Model.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ status: "failed", data: null, error: "User not found" });
        }


        res.status(200).json({ status: "succeeded", data: user, error: null });
    } catch (error) {
        res.status(500).json({ status: "failed", data: null, error: error.message });
    }
});

// Obtener datos de un usuario específico por su ID
router.get("/user/:id", verifyToken, async (req, res) => {
    if (!req.user) {
        return res
            .status(401)
            .json({ status: "failed", data: null, error: "Unauthorized" });
    }

    try {
        const userId = req.params.id;
        const user = await Model.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ status: "failed", data: null, error: "User not found" });
        }

        // Cargar la foto del usuario si existe
        const imageUrl = `http://localhost:9000/imagenes/${user.file}`;

        const userData = {
            _id: user._id,
            nombre: user.nombre,
            username: user.username,
            apellidos: user.apellidos,
            password: user.password,
            email: user.email,
            file: imageUrl,

        };

        res.status(200).json({ status: "succeeded", data: userData, error: null });
    } catch (error) {
        res
            .status(500)
            .json({ status: "failed", data: null, error: error.message });
    }
});

// Logout endpoint
router.post("/logout", (req, res) => {
    // Eliminar la sesión del usuario
    // Por ejemplo, puedes eliminar el token de actualización del almacenamiento local
    const token = req.headers.authorization;;
    // Envía una respuesta exitosa al cliente
    res.status(200).json({ message: "Logout successful" });
});



// Logica almacenamiento con multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Establece la carpeta de destino para guardar las imágenes
        cb(null, "./imagenes/");
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname;
        const extension = originalName.split('.').pop();
        const randomString = Math.random().toString(36).substring(2, 15);
        const fileName = `${randomString}.${extension}`;
        cb(null, fileName);
    },


});

const fileFilter = function (req, file, cb) {
    // Verificar si el archivo es una imagen
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('El archivo debe ser una imagen válida.'));
    }
};

const upload = multer({ storage: storage , fileFilter: fileFilter});
// Subir imagen Login
router.patch("/user/:id", verifyToken, upload.single("file"), async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let newFile = req.file ? req.file.originalname : null; // Verifica si se proporcionó un archivo
    const options = { new: true };

    if (req.file) {
        // Si se proporciona un archivo, actualiza el campo "file" con el nombre de la nueva imagen
        data.file = req.file.filename;
    }
    if (data.password) {
        // Si se proporciona una nueva contraseña, encriptarla antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        data.password = hashedPassword;
    }

    try {
        const existingUser = await Model.findOne({ $or: [{ username: data.username }, { email: data.email }] }).exec();
        if (existingUser && existingUser._id != id) {
            return res.status(409).json({
                status: "failed",
                data: null,
                error: "User o Email ya existen. Por favor elige otro User o Email.."
            });
        }

        Model.findByIdAndUpdate(id, data, options)
            .then((updatedData) => {
                if (!updatedData) {
                    return res.status(404).json({
                        status: "failed",
                        data: null,
                        error: "User not found",
                    });
                }

                const imageUrl = `http://localhost:9000/perfil/user/imagenes/${updatedData.file}`;
                const responseData = {
                    _id: updatedData._id,
                    nombre: updatedData.nombre,
                    username: updatedData.username,
                    apellidos: updatedData.apellidos,
                    password: updatedData.password,
                    email: updatedData.email,
                    file: imageUrl,
                };

                res.status(200).json({ status: "succeeded", data: responseData, error: null });
            })
            .catch((error) =>
                res.status(404).json({
                    status: "failed",
                    data: null,
                    error: error.message,
                })
            );
    } catch (error) {
        res.status(500).json({ status: "failed", data: null, error: error.message });
    }
});




module.exports = router;