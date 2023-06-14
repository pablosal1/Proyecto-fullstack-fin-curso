const express = require("express");
const { verifyToken, isAdmin } = require("../middlewares/auth");
const router = express.Router();
const Model = require("../Model/productosModel");
const multer = require("multer");



// Peticion para ver productos.

router.get("/", async (req, res) => {
  Model.find()
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        error: error.message,
      })
    );
});

// Peticion para ver los detalles de un producto.
router.get('/productos/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ status: 'error', data: null, error: 'Producto no encontrado' });
    }
    res.status(200).json({ status: 'success', data: producto, error: null });
  } catch (error) {
    res.status(500).json({ status: 'error', data: null, error: error.message });
  }
});

// Peticiones para administradores.

// Borrar producto.
router.delete("/:id", verifyToken, isAdmin, (req, res) => {
  let id = req.params.id;

  Model.findByIdAndDelete(id)
    .then((data) =>
      res.status(200).json({ status: "succeeded", data, error: null })
    )
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        error: error.message,
      })
    );
});

// Logica almacenamiento con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Establece la carpeta de destino para guardar las imágenes
    cb(null, "./imagenes");
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const extension = originalName.split('.').pop();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `${randomString}.${extension}`;
    cb(null, fileName);
  },


  fileFilter: function (req, file, cb) {
    // Verificar si el archivo es una imagen
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('El archivo debe ser una imagen válida.'));
    }
  },
});

const upload = multer({ storage: storage });


// Endpoint POST
router.post("/", verifyToken, isAdmin, upload.single("file"), (req, res) => {
  const data = new Model({
    nombrePastel: req.body.nombrePastel,
    descripcionPastel: req.body.descripcionPastel,
    precio: req.body.precio,
    tipo: req.body.tipo,
    file: req.file.filename // Guarda el nombre de la imagen en el modelo
  });

  data.save()
    .then((savedData) => {
      const imageUrl = `${req.protocol}://${req.get("host")}/imagenes/${savedData.file}`;
      const responseData = {
        _id: savedData._id,
        nombrePastel: savedData.nombrePastel,
        descripcionPastel: savedData.descripcionPastel,
        precio: savedData.precio,
        tipo: savedData.tipo,
        file: imageUrl
      };
      res.status(201).json({ status: "succeeded", data: responseData, error: null });
    })
    .catch((error) =>
      res.status(404).json({
        status: "failed",
        data: null,
        error: error.message,
      })
    );
});

// Endpoint GET
router.get("/:id", (req, res) => {

  const id = req.params.id;

  Model.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          status: "failed",
          data: null,
          error: "Producto no encontrado",
        });
      }

      const imageUrl = `http://localhost:9000/imagenes/${data.file}`;
      const responseData = {
        _id: data._id,
        nombrePastel: data.nombrePastel,
        precio: data.precio,
        descripcionPastel: data.descripcionPastel,
        file: imageUrl,
      };

      res.status(200).json({ status: "succeeded", data: responseData, error: null });
    })
    .catch((error) =>
      res.status(500).json({
        status: "failed",
        data: null,
        error: error.message,
      })
    );
});

// Endpoint PATCH
router.patch("/:id", verifyToken, isAdmin, upload.single("file"), (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let newFile = req.file ? req.file.originalname : null; // Verifica si se proporcionó un archivo
  const options = {
    new: true,
  };

  if (newFile) {
    // Si se proporciona un archivo, actualiza el campo "file" con el nombre de la nueva imagen
    data.file = newFile;
  }

  Model.findByIdAndUpdate(id, data, options)
    .then((updatedData) => {
      const imageUrl = `http://localhost:9000/productos/imagenes/${updatedData.file}`;
      const responseData = {
        _id: updatedData._id,
        nombrePastel: updatedData.nombrePastel,
        precio: updatedData.precio,
        descripcionPastel: req.body.descripcionPastel,
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
});



module.exports = router;