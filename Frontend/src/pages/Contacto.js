import React from 'react';
import { FaFacebook, FaInstagram, FaTripadvisor } from 'react-icons/fa';
import "./Contacto.css";
const Contacto = () => {
    return (
        <div className="contacto-container">
            <div className="horario-titulo">
                <h2 >Horario atencion al cliente.</h2>
                <p>De Martes a Sábados : 10:00–14:00, 16:00–20:00
                    Domingo y Lunes: Cerrado</p>
            </div>
            <div className="datos-contacto">
                <div className="datos-contacto-info">
                    <h2 className="datos-contacto-titulo">Datos de contacto.</h2>
                    <p>Teléfono: 612345678</p>
                    <p>Correo electrónico: administracion@caketime.com</p>
                    <p>Dirección: Zona alcazabilla, Málaga</p>
                </div>

            </div>
            <div className="mapa-container">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d408979.8016202033!2d-4.473986138281241!3d36.79084110807796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7259c44fdb212d%3A0x6025dc92c9ca32cf!2zTcOhbGFnYQ!5e0!3m2!1ses!2ses!4v1685139527494!5m2!1ses!2ses"
                    width="600"
                    height="450"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: "0" }}
                    title="Malaga"
                ></iframe>
            </div>
            <h4>Siguenos en nuestras redes sociales</h4>
            <div className='redes-sociales'>
                <a href="https://www.facebook.com/">
                    <FaFacebook className="icono-facebook" />
                </a>
                <a href="https://www.instagram.com/">
                    <FaInstagram className="icono-instagram" />
                </a>
                <a href="https://www.tripadvisor.es/">
                    <FaTripadvisor className="icono-tripadvisor" />
                </a>
            </div>
        </div>

    );
};

export default Contacto;
