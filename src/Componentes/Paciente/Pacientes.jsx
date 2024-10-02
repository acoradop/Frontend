// Pacientes.js
import React, { useState, useEffect } from "react";
import "./Pacientes.css";
import icono1 from "../../Imagenes/NuevoPaci.png";
import icono2 from "../../Imagenes/modificar.png";
import icono3 from "../../Imagenes/borrar-usuario.png";
import icono4 from "../../Imagenes/Buscar.png";
import icono5 from "../../Imagenes/cerrar.png";
import Sidebar from "../../sidebar/sidebar";

import NuevoPaciente from "./Nuevopaciente";
import ModificarPaciente from "./Modificarpaciente";
import EliminarPaciente from "./Eliminarpaciente";
import BuscarPaciente from "./Buscarpaciente";

import { BACKEND_API } from "../../Rutabackend";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get(`${BACKEND_API}api/pacientes`);
        setPacientes(response.data);
      } catch (error) {
        console.error("Error al obtener los pacientes:", error);
      }
    };
    fetchPacientes();
  }, []);

  const EliminarPaciente = async (id) => {
    try {
      await axios.delete(`${BACKEND_API}api/paciente/${id}`);
      toast.success('¡Paciente eliminado exitosamente!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate('/inicio');
        navigate('/pacientes');
      }, 800);
    } catch (error) {
      console.error("Error al eliminar al Paciente:", error);
    }
  };

  const formatFecha = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son base 0
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
  };

  return (
    <div className="pacientes-container">
      <section>
        <h2>Bienvenida a la Clínica Médica</h2>
        <h3>Pacientes</h3>
      </section>
      <div className="button-container">
        <button
          className="button" 
          onClick={() => navigate("/pacientes/nuevo")}
        >
          <img src={icono1} alt="Icono 1" />
          Nuevo
        </button>
        <button className="button" onClick={() => navigate(`/inicio`)}>
          <img src={icono5} alt="Icono 5" />
          Cerrar
        </button>
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
            {pacientes.map((paciente, index) => (
              <tr key={index}>
                <td>{paciente.id_paciente}</td>
                <td>{paciente.nombre_paciente}</td>
                <td>{paciente.apellido_paciente}</td>
                <td>{formatFecha(paciente.fechadenacimiento_paciente)}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => navigate(`/pacientes/ModificarPaciente/?id=${paciente.id_paciente}`)}
                  >
                    <img src={icono2} alt="Icono 2" />
                    Modificar
                  </button>
                  <button
                    className="button"
                    onClick={()=> EliminarPaciente(paciente.id_paciente)}
                  >
                    <img src={icono3} alt="Icono 3" />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Pacientes;
