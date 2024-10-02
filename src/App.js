import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './Componentes/Login';
import Inicio from './Componentes/Inicio';
import Pacientes from './Componentes/Paciente/Pacientes';
import NuevoPaciente from './Componentes/Paciente/Nuevopaciente';
import Consultasdepacientes from './Componentes/Consulta/Consultadepacientes';
import Consultas from './Componentes/Consulta/Consultas';
import HistorialClinico from './Componentes/Consulta/Historialclinico.jsx';
import Historialdetallado from './Componentes/Consulta/Historialdetallado.jsx';
import ModificarPaciente from './Componentes/Paciente/Modificarpaciente.jsx';
import ModificarConsulta from './Componentes/Consulta/ModificarConsulta.jsx';
import './responsive.css';

import './Componentes/MainApp.css'; // Importar el archivo CSS
import logo from './Imagenes/logo_clinica sin fondo.png';
import inicio from './Imagenes/inicio.png';
import pacient from './Imagenes/paciente.png';
import consul from './Imagenes/consulta.png';
import salida from './Imagenes/salid.png';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Revisar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const authStatus = localStorage.getItem('clinicaadmin');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); // Si no está autenticado, asegúrate de actualizar el estado
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('clinicaadmin', 'true'); // Guardar en localStorage que el usuario está autenticado
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('clinicaadmin'); // Eliminar del localStorage al cerrar sesión
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/inicio" /> : <Login onLoginSuccess={handleLoginSuccess} />
            }
          />

          {/* Rutas protegidas */}
          <Route
            path="/*"
            element={<ProtectedRoute element={<MainApp onLogout={handleLogout} />} />}
          />

          {/* Redirigir cualquier ruta inválida al login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

function MainApp({ onLogout }) {
  const navigate = useNavigate(); // Hook para redirección
  const [openNav, setOpenNav] = useState(false);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  useEffect(() => {
    setOpenNav(false);
  }, [navigate]);

  return (
    <div className="main-app">
      <nav className={`${openNav ? 'vertical-nav open' : 'vertical-nav'}`}>
        <div className='btn-close-sidebar' onClick={() => setOpenNav(false)}><i className="fa-solid fa-xmark"></i></div>
        <img src={logo} alt="Logo" className="logo" />
        <ul>
          <li className="nav-item">
            <Link to="/inicio" className="nav-link">
              <img src={inicio} alt="Inicio" className="btn-icon" />
              Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pacientes" className="nav-link">
              <img src={pacient} alt="Pacientes" className="btn-icon" />
              Pacientes
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/consultas" className="nav-link">
              <img src={consul} alt="Consultas" className="btn-icon" />
              Consultas
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/login" onClick={handleLogoutClick} className="nav-link">
              <img src={salida} alt="Salida" className="btn-icon" />
              Salida
            </Link>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <div className='btn-sidebar' onClick={() => setOpenNav(!openNav)}> <i className="fa-solid fa-bars"></i> </div>
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/pacientes/nuevo" element={<NuevoPaciente />} />
          <Route path="/pacientes/ModificarPaciente" element={<ModificarPaciente />} />
          <Route path="/consultas" element={<Consultas />} />
          <Route path="/consultas/Consultadepaciente" element={<Consultasdepacientes />} />
          <Route path="/consultas/Consultadepaciente/HistorialClinico" element={<HistorialClinico />} />
          <Route path="/consultas/Consultadepaciente/Historialdetallado" element={<Historialdetallado />} />
          <Route path="/consultas/Consultadepaciente/Historialdetallado/ModificarConsulta" element={<ModificarConsulta />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
