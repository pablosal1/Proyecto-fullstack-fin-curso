import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ModificarPerfil.css';

function ModificarPerfil() {
  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (username !== '') {
      formData.append('username', username);
    }

    if (nombre !== '') {
      formData.append('nombre', nombre);
    }

    if (apellidos !== '') {
      formData.append('apellidos', apellidos);
    }

    if (email !== '') {
      formData.append('email', email);
    }

    if (password !== '') {
      formData.append('password', password);
    }

    if (selectedImage !== null) {
      formData.append('file', selectedImage);
    }

    fetch(`http://localhost:9000/auth/user/${id}`, {
      method: 'PATCH',
      headers: {
        'auth-token': localStorage.getItem('accessToken'),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'succeeded') {
          window.location.reload();
        } else {
          console.error('Error al modificar el perfil:', result.error);
        }
      })
      .catch((error) => {
        console.error('Error al realizar la solicitud:', error);
      });

    navigate(`/perfil/user/${id}`);
  };

  return (
    <form className="modificar-user-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nuevo nombre de usuario"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="text"
        placeholder="Modifica tu nombre"
        value={nombre}
        onChange={(event) => setNombre(event.target.value)}
      />
      <input
        type="text"
        placeholder="Modifica tus apellidos"
        value={apellidos}
        onChange={(event) => setApellidos(event.target.value)}
      />
      <input
        type="text"
        placeholder="Modifica tu correo electrónico"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Modifica tu contraseña"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <input
        type="file"
        name="file"
        onChange={handleImageChange} />


      <button className= "button" type="submit">Modificar Perfil</button>
    </form>
  );
}

export default ModificarPerfil;
