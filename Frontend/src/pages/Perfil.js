import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserIdContext } from '../components/UserIdContext';
import './Perfil.css';

function Perfil() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { userId } = useContext(UserIdContext);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {

          const response = await fetch(`http://localhost:9000/auth/user/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('accessToken'),
            },
          });

          if (response.ok) {
            const fetchedUserData = await response.json();
            const fetchedUser = fetchedUserData.data;
            setUser(fetchedUser);
          } else {
            throw new Error('Error al obtener los datos del usuario');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditProfile = () => {
    navigate(`/perfil/modificarperfil/${id}`);
  };

  return (
    <div className="container">
      <div className="profile-container">
        <div>
          <h1 className="login-user-icon">
            {user && user.file ? (
              <img
                className="profile-photo"
                src={user && user.file}
                alt={user && user.username}
              />
            ) : (
              <FaUserCircle size={90} color="#efefef" />
            )}
          </h1>
          <div className="profile-details">
            {user && (
              <>
                <p className="user-username">Username: {user.username}</p>
                <p className="user-email">Email: {user.email}</p>
                <p className="user-name">Nombre: {user.nombre}</p>
                <p className="user-apellidos">Apellidos: {user.apellidos}</p>
              </>
            )}
          </div>
          <div className="profile-actions">
            <button className='boton' onClick={handleEditProfile}>Editar perfil</button>
            <Link to="/">Volver al inicio</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
