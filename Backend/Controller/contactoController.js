const express = require('express');
const router = express.Router();
const Contacto = require('../Model/contactoModel');

// Ruta para guardar el formulario de contacto
router.post('/contacto', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Guardar los datos en la base de datos
    const newContacto = new Contacto({
      name,
      email,
      message
    });

    await newContacto.save();

    // Enviar una respuesta exitosa
    res.status(200).json({ status: 'success', message: 'Formulario enviado correctamente' });
  } catch (error) {
    // Enviar una respuesta de error
    res.status(500).json({ status: 'error', message: 'Error al enviar el formulario', error: error.message });
  }
});

router.get('/contacto', async (req, res) => {
  try {
    const mensajes = await Contacto.find();
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los mensajes de contacto' });
  }
});

router.delete('/contacto/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar y eliminar el mensaje de contacto por su ID
    const deletedContacto = await Contacto.findByIdAndDelete(id);

    if (!deletedContacto) {
      return res.status(404).json({ status: 'error', message: 'Mensaje de contacto no encontrado' });
    }

    // Enviar una respuesta exitosa
    res.json({ status: 'success', message: 'Mensaje de contacto eliminado correctamente' });
  } catch (error) {
    // Enviar una respuesta de error
    res.status(500).json({ status: 'error', message: 'Error al eliminar el mensaje de contacto', error: error.message });
  }
});
module.exports = router;
