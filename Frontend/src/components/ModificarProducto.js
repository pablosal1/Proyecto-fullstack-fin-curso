import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ModificarProducto.css';

function ModificarProducto() {
  const [nombrePastel, setNombrePastel] = useState('');
  const [precio, setPrecio] = useState('');
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const obtenerProducto = async () => {
      try {
        const response = await fetch(`http://localhost:9000/productos/${id}`);
        if (response.ok) {
          const data = await response.json();
          const { nombrePastel, precio } = data.data;
          setNombrePastel(nombrePastel);
          setPrecio(precio);
        } else {
          throw new Error('Error al obtener el producto');
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerProducto();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nombrePastel || !precio) {
      return;
    }

    const formData = new FormData();
    formData.append('nombrePastel', nombrePastel);
    formData.append('precio', precio);
    if (file) {
      formData.append('imagen', file);
    }

    fetch(`http://localhost:9000/productos/${id}`, {
      method: 'PATCH',
      headers: {

        'auth-token': localStorage.getItem('accessToken'),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'succeeded') {
          navigate('/productos');
        } else {
          console.error('Error al modificar el producto:', result.error);

        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);

      });
  };
  return (
    <form className="modificar-producto-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nuevo nombre del producto"
        value={nombrePastel}
        onChange={(event) => setNombrePastel(event.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Nuevo precio del producto"
        value={precio}
        onChange={(event) => setPrecio(event.target.value)}
        required
      />
      <input
        type="file"
        onChange={(event) => setFile(event.target.files[0])}
      />
      <button className= "button" type="submit">Modificar Producto</button>
      <Link to="/productos" className='link'>Volver a Productos</Link>
    </form>
  );
}

export default ModificarProducto;
