import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FormularioProducto() {
  const navigate = useNavigate();
  const [nombrePastel, setNombrePastel] = useState('');
  const [descripcionPastel, setDescripcionPastel] = useState('');
  const [precio, setPrecio] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica si no se seleccionó ningún archivo o si el tipo de archivo no es una imagen
    if (!file || !file.type.startsWith('image/')) {
      alert('Por favor, seleccione un archivo de imagen válido.');
      return;
    }
    // Crea un objeto FormData para enviar los datos y la imagen al servidor
    const formData = new FormData();
    formData.append('nombrePastel', nombrePastel);
    formData.append('descripcionPastel', descripcionPastel);
    formData.append('precio', precio);
    formData.append('file', file);

    // Realiza la solicitud POST al servidor
    fetch('http://localhost:9000/productos', {
      method: 'POST',
      headers: {
        'auth-token': localStorage.getItem('accessToken'),
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // El producto se agregó correctamente
          // Restablece los valores del formulario después de enviar
          setNombrePastel('');
          setDescripcionPastel('');
          setPrecio('');
          setFile(null);
          navigate('/productos');
        } else {
          throw new Error('Error al agregar el producto');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div >
      <h2 className="form-title">Añadir Producto</h2>
      <form className="form-wrapper" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombrePastel" className="label">Nombre:</label>
          <input className="input"
            type="text"
            id="nombrePastel"
            value={nombrePastel}
            onChange={(e) => setNombrePastel(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="precio" className="label">Precio:</label>
          <input className="input"
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file" className="label">Imagen:</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <button className="button" type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default FormularioProducto;
