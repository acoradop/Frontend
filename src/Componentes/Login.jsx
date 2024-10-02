import React, { useState, useEffect } from 'react';
import '../Componentes/Login.css';
import logo from '../Imagenes/logo_clinica sin fondo.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { BACKEND_API } from '../Rutabackend';
import user from '../Imagenes/UsuarioNeg.png';
import contraseña from '../Imagenes/contraseña.png';

function Login({ onLoginSuccess }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userAdmin = localStorage.getItem('clinicaadmin');
    if (userAdmin === 'true') {
      navigate('/inicio'); // Redirigir al inicio si ya está autenticado
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!usuario || !password) {
      toast.error('Por favor, complete ambos campos.', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_API}api/login`,
        {
          usuario_login: usuario,
          contrasena_login: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response && response.data && response.data.success) {
        const nombreUsuario = response.data.nombre || 'Anónimo';
        localStorage.setItem('clinicaadmin', 'true');

        toast.success(`Inicio de sesión exitoso. Bienvenido, ${nombreUsuario}!`, {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });

        if (onLoginSuccess) {
          onLoginSuccess();
        }

        navigate('/inicio'); // Redirigir al inicio
      } else {
        toast.error('Usuario o contraseña incorrectos', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Usuario o contraseña incorrectos', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
      } else {
        toast.error('Error de red. Inténtalo más tarde.', {
          position: 'bottom-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'dark',
        });
      }
    }

    setUsuario('');
    setPassword('');
  };

  return (
    <div className="background">
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <br />
        <form className="formularie" onSubmit={handleLogin}>
          <div className="input-container">
            <label htmlFor="usuario" className="input-label">
              <img src={user} alt="Logo" />
            </label>
            <input
              type="text"
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="input-field"
              placeholder="Ingrese usuario"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="input-label">
              <img src={contraseña} alt="Logo" />
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
              placeholder="Ingrese contraseña"
            />
          </div>
          <br />
          <button type="submit">Ingresar</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;


