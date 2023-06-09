import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import ContactoAdmin from './pages/ContactoAdmin';
import Productos from './pages/Productos';
import ProductoDetalle from './pages/ProductoDetalle';
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import FormularioProducto from './pages/FormularioProducto';
import ModificarProducto from './components/ModificarProducto';
import ModificarPerfil from './components/ModificarPerfil';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { UserIdContext } from './components/UserIdContext';

function App() {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          // El usuario no está autenticado, no es necesario hacer la solicitud
          return;
        }


        const response = await fetch('http://localhost:9000/auth/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('accessToken'),
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          const { _id: userId } = responseData.data;
          setUserId(userId);
          setUserData(responseData.data);
        } else {
          throw new Error('Error al obtener el userId');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserId();
  }, []);

  const isAdmin = userData && userData.role === 'admin';
  return (
    <div className="App">
      <BrowserRouter>
        <UserIdContext.Provider value={{ userId, setUserId, userData, setUserData, isAdmin }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/contactoAdmin" element={<ContactoAdmin />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<ProductoDetalle isAdmin={isAdmin} />} />
            <Route path="/productos/modificar/:id" element={<ModificarProducto />} />
            <Route path="/productos/nuevo" element={<FormularioProducto />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/perfil/user/:id" element={<Perfil />} />
            <Route path="/perfil/modificarperfil/:id" element={<ModificarPerfil />} />

          </Routes>
          <Footer />
        </UserIdContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
