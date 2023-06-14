import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductoDetalle.css';

function ProductoDetalle({ isAdmin }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const response = await fetch(`http://localhost:9000/productos/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProducto(data.data);
        } else {
          throw new Error('Error al obtener el producto');
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerProducto();
  }, [id]);

  const handleEliminarProducto = async () => {
    try {
      const response = await fetch(`http://localhost:9000/productos/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        navigate('/productos');
      } else {
        throw new Error('Error al eliminar el producto');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleModificarProducto = () => {
    navigate(`/productos/modificar/${id}`);
  };

  if (!producto) {
    return <div className="producto-detalle">Cargando producto...</div>;
  }

  return (
    <div className="producto-detalle">
      <h3>{producto.nombrePastel}</h3>
      <img src={producto.file} alt={producto.nombrePastel} />
      <p className='titulo-precio'> {producto.precio}€</p>
      <p className='titulo-descripcion'>{producto.descripcionPastel}</p>
      <div className="button-container">
      {isAdmin && (
        <>
          <button onClick={handleEliminarProducto}>Eliminar Producto</button>
          <button onClick={handleModificarProducto}>Modificar Producto</button>
        </>
      )}
      </div>
      <Link to="/productos">Volver a productos</Link>
    </div >
  );
}

export default ProductoDetalle;
