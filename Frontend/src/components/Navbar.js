import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIdContext } from './UserIdContext';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userId, setUserId } = useContext(UserIdContext);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          const response = await fetch(`http://localhost:9000/auth/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': accessToken,
            },
          });

          if (response.ok) {
            const userData = await response.json();

            setUserId(userData.data.id);
            setUsername(userData.data.username);
            setLoggedIn(true);
          } else {
            setUsername('');
            setLoggedIn(false);
            localStorage.removeItem('accessToken');
          }
        } else {
          setUsername('');
          setLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAuthentication();
  }, [setUserId]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUsername('');
    setLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setLoggedIn(isLoggedIn);
  }, []);

  return (
    <nav className="navbar">
      <button
        className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contacto">Contacto</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
      </ul>

      <div className="right-section">
        {loggedIn ? (
          <>
            <p>
              <Link to={`/perfil/user/${userId}`} className="profile-link">{`Bienvenido, ${username}`}</Link>
            </p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <div className="login-section">
            <Link to="/registro" className="profile-link">Registrarse</Link>
            <span className="separator">/</span>
            <Link to="/auth/login" className="profile-link">Iniciar Sesión</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
