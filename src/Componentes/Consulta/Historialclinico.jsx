import React, { useState, useEffect } from 'react';
import './Historialclinico.css';

import closeIcon from '../../Imagenes/cerrar.png';
import medicalIcon from '../../Imagenes/historial-medico.png';
import { BACKEND_API } from "../../Rutabackend";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HistorialClinico = () => {

  const [idPacienten, setIdPaciente] = useState('');
  const [idConsulta, setIdConsulta] = useState('');

  const [nombre_paciente, setNombrePaciente] = useState('');
  const [apellido_paciente, setApellidoPaciente] = useState('');
  const [fechadenacimiento_paciente, setFechaPa] = useState('');
  const [hora_consulta, setHoraConsulta] = useState('');

  
  const location = useLocation();
  const navigate = useNavigate();
  const [paciente, setPacientes] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const idPaciente = queryParams.get('id');
    console.log("id paciente inicio:", idPaciente);
    if (idPaciente) {
      const fetchPaciente = async () => {
        try {
          const response = await axios.get(`${BACKEND_API}api/consultaobtener/${idPaciente}`);
          console.log('Datos del paciente:', response.data);
          
          // Actualiza el estado justo después de recibir los datos
          setIdPaciente(idPaciente);

          const pacienteData = response.data[0];
          setPacientes(response.data);
          setIdConsulta(pacienteData.id_consulta);

          // Actualiza los datos del paciente
          setNombrePaciente(pacienteData.nombre_paciente || '');
          setApellidoPaciente(pacienteData.apellido_paciente || '');
          setFechaPa(pacienteData.fechadenacimiento_paciente || '');
          setHoraConsulta(pacienteData.hora_consulta || '');

          // Asegúrate de que el idPaciente se está guardando correctamente
          console.log("id paciente actualizado:", idPaciente);

        } catch (error) {
          console.error("Error al obtener los datos del paciente o las consultas:", error);
          toast.error('¡Error al obtener los datos del paciente o las consultas!', {
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
  
      fetchPaciente();
    }
  }, [location.search]);

  

  const formatFecha = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son base 0
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
  };

  return (
    <div className="historial-clinico-container">
      <header className="header">
        <h2>HISTORIAL CLÍNICO</h2>
      </header>
      
      <div className="patient-info">
        <button className="boton1" onClick={() => navigate(-1)}>
          <img src={closeIcon} alt="Icono cerrar" />
          Cerrar
        </button>
        <div>
          <label>Nombres</label>
          <input type="text" value={nombre_paciente} readOnly />
        </div>
        <div>
          <label>Apellidos</label>
          <input type="text" value={apellido_paciente} readOnly />
        </div>
        <div>
          <label>Fecha de nacimiento</label>
          <input type="text" value={formatFecha(fechadenacimiento_paciente)} readOnly />
        </div>
      </div>
      
      <div className="table-container">
        <table >
          <thead>
            <tr>
              <th>Fecha de consulta</th>
              <th>Hora de consulta</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Fecha de nacimiento</th>
              <th>Ver ficha médica</th>
            </tr>
          </thead>
          <tbody>
            {paciente.map((paciente) => (
              <tr key={paciente.fechade_consulta}>
                <td style={{display: "none"}}>{paciente.id_consulta}</td>
                <td style={{display: "none"}}>{paciente.id_paciente}</td>
                <td>{formatFecha(paciente.fechade_consulta)}</td>
                <td>{paciente.hora_consulta}</td>
                <td>{paciente.nombre_paciente}</td>
                <td>{paciente.apellido_paciente}</td>
                <td>{formatFecha(paciente.fechadenacimiento_paciente)}</td>
                <td>
                  <button 
                    className="medical-button" 
                    onClick={() => navigate(`/consultas/Consultadepaciente/Historialdetallado/?idC=${paciente.id_consulta}&idP=${idPacienten}`)}
                  >
                    <img src={medicalIcon} alt="Ver ficha médica" />
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

export default HistorialClinico;
