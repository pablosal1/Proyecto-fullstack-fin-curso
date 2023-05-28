import React from 'react';
import "./Footer.css";
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <div className="footer">

      <div className='icon-container'>
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      <p>&copy; 2023 Cake Time. Todos los derechos reservados.</p>  
      </div>

    </div>

  );
}

export default Footer;
