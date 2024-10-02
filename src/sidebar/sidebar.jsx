// Sidebar.js
import React from 'react';
import './sidebar.css'; // Asegúrate de tener estilos para tu sidebar
import icono5 from '../Imagenes/cerrar.png';
const Sidebar = ({ isOpen, content, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        {content}
      </div>
      <button className="close-button" onClick={onClose}>
        <img src={icono5} alt="Icono 1" />
        Cerrar
      </button>
    </div>
  );
};

export default Sidebar;
