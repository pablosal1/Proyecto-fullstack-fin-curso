import React, { useEffect, useState } from 'react';
import "./ContactoAdmin.css";

function ContactoAdmin() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagesPerPage] = useState(10); // Cantidad de mensajes por página

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:9000/contacto/contacto', {
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('accessToken'),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          throw new Error('Error al obtener los mensajes de contacto');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  // Obtener mensajes actuales en la página actual
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Eliminar mensaje por ID
  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`http://localhost:9000/contacto/contacto/${messageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('accessToken'),
        },
      });

      if (response.ok) {
        // Actualizar la lista de mensajes después de eliminar
        setMessages(messages.filter((message) => message._id !== messageId));
        console.log('Mensaje eliminado');
      } else {
        throw new Error('Error al eliminar el mensaje');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-Contacto-Admin">
      <h1>Mensajes de contacto (Administrador)</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Mensaje</th>
              <th>Enviado en</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentMessages.map((message) => (
              <tr key={message._id}>
                <td>{message.name}</td>
                <td>{message.email}</td>
                <td className="message">{message.message}</td>
                <td>{new Date(message.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => deleteMessage(message._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastMessage >= messages.length}>
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ContactoAdmin;
