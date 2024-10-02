import React, { useState, useEffect } from 'react';
import '../Consulta/ModificarConsulta.css';
import icono1 from '../../Imagenes/guardar.png';
import icono2 from '../../Imagenes/cancelar.png';
import icono3 from '../../Imagenes/modificar.png';
import icono4 from '../../Imagenes/imprimir.png';
import icono5 from '../../Imagenes/historial.png';
import icono6 from '../../Imagenes/cerrar.png';

import { BACKEND_API } from "../../Rutabackend";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModificarConsulta = () => {
  const [id_paciente, setIdPaciente] = useState('');
  const [nombre_paciente, setNombrePaciente] = useState('');
  const [apellido_paciente, setApellidoPaciente] = useState('');
  const [fechadenacimiento_paciente, setFechaPa] = useState('');
  const [sexo_paciente, setSexoPaciente] = useState('');
  const [desalergias_paciente, setDesalergiasPaciente] = useState('');
  const [fechaConsulta, setFechaConsulta] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const [paciente, setPacientes] = useState('');
  const [hora_consulta, setHoraConsulta] = useState('');

  const [consultas, setConsultas] = useState('');
  const [id_consulta, setId_consulta] = useState('');
  const [fechade_consulta, setFechadeconsulta] = useState('');
  const [sintomas_consulta, setSintomasconsulta] = useState('');
  const [diagnostico_consulta, setDiagnosticoconsulta] = useState('');
  const [tratamiento_consulta, setTratamiento_consulta] = useState('');
  const [fk_id_paciente, setFk_id_paciente] = useState('');
  const [errorPaciente, setErrorPaciente] = useState('');


  useEffect(() => {
    // Extraer el ID del paciente de la URL
    const queryParams = new URLSearchParams(location.search);
    const idConsultas = queryParams.get('idC');
    setId_consulta(idConsultas);
    console.log("id de consulta", idConsultas);

    if (idConsultas) {
      const fetchPaciente = async () => {
        try {
          const response = await axios.get(`${BACKEND_API}api/consultaobtenerFicha/${idConsultas}`);
          console.log('Datos del paciente y consulta:', response.data); // Verificar los datos recibidos
          const consultas = response.data[0]; // Si es un array, selecciona el primer elemento

          if (!consultas) {
            // Si no hay datos en consultas
            toast.error('¡Datos de consulta no encontrados!', {
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

          // Actualizar el estado con los datos del paciente
          setConsultas(consultas);
          setIdPaciente(consultas.id_paciente || '');
          setNombrePaciente(consultas.nombre_paciente || '');
          setApellidoPaciente(consultas.apellido_paciente || '');
          setFechaPa(consultas.fechadenacimiento_paciente || '');
          setSexoPaciente(consultas.sexo_paciente || '');
          setDesalergiasPaciente(consultas.desalergias_paciente || '');

          // Si tienes datos de consulta en la respuesta, los puedes asignar a los estados correspondientes
          setFechadeconsulta(consultas.fechade_consulta || '');
          
          setSintomasconsulta(consultas.sintomas_consulta || '');
          setDiagnosticoconsulta(consultas.diagnostico_consulta || '');
          setTratamiento_consulta(consultas.tratamiento_consulta || '');
          console.log("id consulta",id_consulta);
          console.log("Fecha de consulta:", consultas.fechade_consulta);
        } catch (error) {
          console.error("Error al obtener los datos del paciente y la consulta:", error);
          toast.error('¡Error al obtener los datos del paciente y la consulta!', {
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

  // Función para formatear la fecha en formato DD/MM/YYYY
  const formatFecha = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son base 0
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`; // Formato DD/MM/YYYY
  };

  const formatFechaConsulta = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha); // Convertir fecha a objeto Date
    if (isNaN(date.getTime())) {
      console.error("Formato de fecha inválido:", fecha);
      return 'Fecha inválida';
    }
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`; // Formato DD-MM-YYYY
  };
  
  // Función para convertir "DD-MM-YYYY" a "YYYY-MM-DD"
  const convertToInputFormat = (fecha) => {
    if (!fecha) return '';
    const [day, month, year] = fecha.split('-');
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  };

  useEffect(() => {
    setFk_id_paciente(id_paciente);
    setFechadeconsulta(fechaConsulta);
    
  }, [id_paciente,fechaConsulta]);

// Función para obtener la hora actual en formato HH:MM:SS
const obtenerHoraActual = () => {
  const hoy = new Date();
  const horas = String(hoy.getHours()).padStart(2, '0');
  const minutos = String(hoy.getMinutes()).padStart(2, '0');
  const segundos = String(hoy.getSeconds()).padStart(2, '0');
  return `${horas}:${minutos}:${segundos}`;
};

useEffect(() => {
  setHoraConsulta(obtenerHoraActual()); // Establecer la hora actual al cargar el componente
}, []);

const handleModificarPaciente = async (e) => {
  e.preventDefault();
  
  const FichaMedicaActualizado = {
    sintomas_consulta,
    diagnostico_consulta,
    tratamiento_consulta 
  };
  
  console.log('Datos enviados al servidor:', JSON.stringify(FichaMedicaActualizado)); // Verificar los datos antes de enviar
  
  try {
    await axios.put(`${BACKEND_API}api/actualizar-ficha/${id_consulta}`, FichaMedicaActualizado);
    toast.success('Ficha Médica modificada exitosamente!', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    setTimeout(() => {
      navigate('/consultas');
    }, 500);
  } catch (error) {
    console.error('Error al modificar el paciente:', error);
    toast.error('¡Error al modificar el paciente!', {
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





return (
  <div>
    <section>
      <h3>Modificar Paciente</h3>
    </section>
    <div className="botones-container">
      <button className="boton-guardar" onClick={handleModificarPaciente}>
        <img src={icono1} alt="Icono Guardar"  />
        Guardar
      </button>
      <button className="boton-cerrar" onClick={() => navigate(-1)}>
        <img src={icono6} alt="Icono Cerrar" />
        Cerrar
      </button>
    </div>
    <div className="contenedor-datos-personales">
      <p>Datos personales</p>
    </div>
    <form className='formulario-consulta'>
      <div className="grupo-input">
        <label>
          Numero de Paciente
          <input type="text" value={id_paciente} readOnly />
        </label>
      </div>
      <div className="grupo-input">
        <label>
          Nombres de Paciente
          <input type="text" value={nombre_paciente} readOnly />
        </label>
      </div>
      <div className="grupo-input">
        <label>
          Apellidos de Paciente
          <input type="text" value={apellido_paciente} readOnly />
        </label>
      </div>
      <div className="grupo-input">
        <label>
          Fecha de Nacimiento
          <input type="text" value={formatFecha(fechadenacimiento_paciente)} readOnly />
        </label>
      </div>
      <div className="grupo-input">
        <label>
          Fecha de Consulta
          <input type="date" value={convertToInputFormat(formatFechaConsulta(consultas.fechade_consulta))} readOnly />
        </label>
      </div>
      <div className="fila-formulario">
        <div className="grupo-formulario">
          <label>
            Sexo de Paciente
            <input type="text" value={sexo_paciente} readOnly />
          </label>
        </div>
        <div className="grupo-formulario">
          <label>
            Alérgico
            <input type="text" value={desalergias_paciente} readOnly />
          </label>
        </div>
      </div>
    </form>
    <div className='grupo-vertical'>
      <div className="grupo-input">
        <label>
          Síntoma
          <textarea type="text" className='area-texto' value={sintomas_consulta} onChange={(e) => setSintomasconsulta(e.target.value)} />
        </label>
      </div>
      <div className="grupo-input">
        <label>
          Diagnóstico
          <textarea type="text" className='area-texto' value={diagnostico_consulta} onChange={(e) => setDiagnosticoconsulta(e.target.value)} />
        </label>
      </div>
      <div className="grupo-input">
        <label>
          Tratamiento
          <textarea type="text" className='area-texto' value={tratamiento_consulta} onChange={(e) => setTratamiento_consulta(e.target.value)} />
        </label>
      </div>
    </div>
    <ToastContainer />
  </div>
);
};

export default ModificarConsulta;