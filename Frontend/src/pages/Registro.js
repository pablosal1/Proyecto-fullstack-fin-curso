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
    const [errorMessage, setErrorMessage] = useState('');
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
            setErrorMessage('Todos los campos son obligatorios');
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
            });

    };

    return (
        <div className="form-container">
            <h2 className="form-title">Registrarse</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form className="form-wrapper">
                <div className="form-group">
                    <label htmlFor="username" className="label">
                        Usuario
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="input"
                        placeholder="Ingrese su nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="label">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="input"
                        placeholder="Ingrese su correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="input"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nombre" className="label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        className="input"
                        placeholder="Ingrese su nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="apellidos" className="label">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        id="apellidos"
                        className="input"
                        placeholder="Ingrese sus apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                    />
                </div>
                <button id="register-button" className="button" onClick={handleRegister}>
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
