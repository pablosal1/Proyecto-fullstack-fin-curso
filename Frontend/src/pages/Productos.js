import React, { useState, useEffect, useContext } from 'react';
import ProductoCard from '../components/ProductoCard';
import { UserIdContext } from '../components/UserIdContext';
import { Link } from 'react-router-dom';
import "./Productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [productosPaginados, setProductosPaginados] = useState([]);

  
  const { userData } = useContext(UserIdContext);
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:9000/productos');
        if (response.ok) {
          const data = await response.json();
          setProductos(data.data);
        } else {
          throw new Error('Error al obtener los productos');
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerProductos();


  }, [userData]);

  // Filtrar productos por nombre.
  useEffect(() => {
    const filtrarProductos = () => {
      const productosFiltrados = productos.filter((producto) =>
        producto.nombrePastel.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setProductosFiltrados(productosFiltrados);
      setCurrentPage(1);
    };

    filtrarProductos();
  }, [productos, searchTerm]);

  // Paginación
  useEffect(() => {
    const indiceUltimoProducto = currentPage * productsPerPage;
    const indicePrimerProducto = indiceUltimoProducto - productsPerPage;
    const productosPaginados = productosFiltrados.slice(
      indicePrimerProducto,
      indiceUltimoProducto
    );
    setProductosPaginados(productosPaginados);
  }, [productosFiltrados, currentPage, productsPerPage]);

  const cambiarPagina = (numeroPagina) => setCurrentPage(numeroPagina);


  return (
    
    <div className="productos-flex-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {userData && userData.role === 'admin' && (
        <div className="add-product-link">
          <div className="add-product-container">
            <Link to="/productos/Nuevo" className="add-product-button">
              Agregar producto
            </Link>
          </div>
        </div>
      )}
     
      <div className="pagination-container">
          <div className="pagination">
            {Array.from({ length: Math.ceil(productosFiltrados.length / productsPerPage) }).map(
    
              (_, index) => (
                <button
                  key={index + 1}
                  className={currentPage === index + 1 ? 'active' : ''}
                  onClick={() => cambiarPagina(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>

      <div className="productos-container">
        <div className="productos-wrapper">
          {productosPaginados.map((producto) => (
            <div key={producto._id}>
               <Link to={`/productos/${producto._id}`}> 
              <ProductoCard producto={producto}/>
              </Link>
            </div>
          ))}
        </div>

        <div className="pagination-container2">
          <div className="pagination">
            {Array.from({ length: Math.ceil(productosFiltrados.length / productsPerPage) }).map(
              (_, index) => (
                <button
                  key={index + 1}
                  className={currentPage === index + 1 ? 'active' : ''}
                  onClick={() => cambiarPagina(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
      
  );

}

export default Productos;