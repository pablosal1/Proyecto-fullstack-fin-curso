import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './ProductoCard.css';

function ProductoCard({ producto, onDelete, onEdit, isAdmin }) {

  const cambiarSimboloPrecio = (precio) => {
    const precioEnEuros = precio.replace('$', '€');
    return precioEnEuros;
  };
  return (
    <div className="card">
      <img src={`http://localhost:9000/imagenes/${producto.file}`} alt={producto.file} />

      <div className="card-body">
        <h2 className="card-title">{producto.nombrePastel}</h2>
        <p className="card-price">{cambiarSimboloPrecio(producto.precio)}€</p>
        <div className="icon-container">
          {isAdmin && (
            <button className="edit-button" onClick={() => onEdit(producto._id)}>
              <i className="fas fa-pencil-alt"></i>
            </button>
          )}
          {isAdmin && (
            <button className="delete-button" onClick={onDelete}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

}

export default ProductoCard;
