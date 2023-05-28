import React, { useState, useContext } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import './Login.css';
import { FaUserCircle } from 'react-icons/fa';

import  { UserIdContext }  from '../components/UserIdContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUserId, setUserData } = useContext(UserIdContext);

  const inicioSesion = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }); 

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.data.token;
        const refreshToken = data.data.refreshToken;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const userResponse = await fetch('http://localhost:9000/auth', {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': accessToken,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          const userId = userData.data._id;
          setUserData(userData.data);
          setUserId(userId);


          
          if (userData.data.role === 'admin') {
            navigate(`/perfil/user/${userId}`);
          } else {
            navigate(`/perfil/user/${userId}`, { state: { user: userData } });
          }

          window.location.reload();
        } else {
          throw new Error('Error al obtener los datos del usuario');
        }
      } else {
        setError('Error de autenticación');
      }
    } catch (error) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form onSubmit={inicioSesion}>
          <h1 className="login-user-icon">
            <FaUserCircle size={90} color="#efefef" />
          </h1>
          <div className="form-group">
            <label htmlFor="email" className="login-label">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu email"
              className="login-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="login-label">
              Contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <p className='boton-inicio-sesion'>
        ¿No tienes una cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
