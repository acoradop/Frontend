import React, { useState, useEffect } from 'react';
import './Consultas.css';
import icono1 from '../../Imagenes/NuevoPaci.png';
import icono4 from '../../Imagenes/Buscar.png';
import icono5 from '../../Imagenes/cerrar.png';
import Sidebar from '../../sidebar/sidebar';
import icono2 from "../../Imagenes/modificar.png";
import NuevoPaciente from '../Paciente/Nuevopaciente';
import { useNavigate } from "react-router-dom";
import { BACKEND_API } from "../../Rutabackend";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const Consultas = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarComponent, setSidebarComponent] = useState(null);
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);
  const navigate = useNavigate();
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [errorPaciente, setErrorPaciente] = useState('');

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get(`${BACKEND_API}api/pacientes`);
        setPacientes(response.data);
        setFilteredPacientes(response.data);
      } catch (error) {
        console.error("Error al obtener los pacientes:", error);
      }
    };
    fetchPacientes();
  }, []);

  useEffect(() => {
    if (nombrePaciente) {
      const filtered = pacientes.filter(paciente =>
        paciente.nombre_paciente.toLowerCase().includes(nombrePaciente.toLowerCase())
      );
      setFilteredPacientes(filtered);
    } else {
      setFilteredPacientes(pacientes);
    }
  }, [nombrePaciente, pacientes]);

  const handleBuscarPaciente = async (e) => {
    e.preventDefault();
    if (errorPaciente) {
      toast.error(errorPaciente, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      await axios.get(`${BACKEND_API}api/consulta/${nombrePaciente}`);
      toast.success('Paciente encontrado exitosamente!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error('Error al registrar el paciente:', error);
      toast.error('¡Error al registrar el paciente!', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleButtonClick = (Component) => {
    setSidebarComponent(<Component />);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarComponent(null);
  };

  return (
    <div className="pacientes-container">
      <section>
        <h2>Bienvenida a la Clínica Médica</h2>
        <h3>Consultas</h3>
      </section>
      <div className="button-container5">
        <label>
          Buscar paciente
          <input
            type="text"
            value={nombrePaciente}
            onChange={(e) => setNombrePaciente(e.target.value)}
          />
        </label>
        <label>
          Crear paciente
        </label>
        <div className='sub'>
          <button className="button5" onClick={() => navigate("/pacientes/nuevo")}>
            <img src={icono1} alt="Icono 1" />
            Nuevo
          </button>
          <button className="button5" onClick={() => navigate(`/inicio`)}>
            <img src={icono5} alt="Icono 5" />
            Cerrar
          </button>
        </div>
      </div>

      <div className="pacientetabla">
        <table>
          <thead>
            <tr>
              <th>Número de paciente</th>
              <th>Nombre del paciente</th>
              <th>Apellido del paciente</th>
              <th>Fecha de nacimiento</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPacientes.map((paciente, index) => (
              <tr key={index}>
                <td>{paciente.id_paciente}</td>
                <td>{paciente.nombre_paciente}</td>
                <td>{paciente.apellido_paciente}</td>
                <td>{paciente.fechadenacimiento_paciente}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => navigate(`/consultas/Consultadepaciente?id=${paciente.id_paciente}`)}
                  >
                    <img src={icono2} alt="Icono 2" />
                    Consulta
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Consultas;