import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registro.css';

const Registro = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();

        const user = {
            username,
            email,
            password,
            nombre,
            apellidos,
        };

        if (!username || !email || !password || !nombre || !apellidos) {
            alert('Todos los campos son obligatorios');
            return;
        }


        fetch('http://localhost:9000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.ok) {
                    setSuccessMessage('Registro exitoso. Por favor, inicia sesión.');
                    setTimeout(() => {
                        navigate('/auth/login');
                    }, 2000)
                } else {
                    return response.json().then((data) => {
                        throw new Error(data.error);
                    });
                }
            })
            .catch((error) => {
                alert('Usuario o email ya existe. Elige otro usuario o email.');
                    console.error(error);
                });
    };

    return (
        <div className="registro-form-container">
            <h2 className="form-title">Registrarse</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form className="registro-form-wrapper">
                <div className="registro-form-group">
                    <label htmlFor="username" className="registro-label">
                        Usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="registro-input"
                        placeholder="Ingrese su nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="registro-form-group">
                    <label htmlFor="email" className="registro-label">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="registro-input"
                        placeholder="Ingrese su correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="registro-form-group">
                    <label htmlFor="password" className="registro-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="registro-input"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="registro-form-group">
                    <label htmlFor="nombre" className="registro-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        className="registro-input"
                        placeholder="Ingrese su nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="registro-form-group">
                    <label htmlFor="apellidos" className="registro-label">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        id="apellidos"
                        className="registro-input"
                        placeholder="Ingrese sus apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                    />
                </div>
                <button id="register-button" className="registro-button" onClick={handleRegister}>
                    Registrar
                </button>
                <p className='boton-inicio-sesion'>
                    ¿Ya tienes una cuenta? <Link to="/auth/login">Iniciar sesión</Link>
                </p>

            </form>

        </div>
    );
};

export default Registro;
