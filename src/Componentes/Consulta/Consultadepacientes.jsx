import React, { useState, useEffect } from 'react';
import './Consultadepacientes.css';
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

const Consultasdepacientes = () => {
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

  const [fechade_consulta, setFechadeconsulta] = useState('');
  const [sintomas_consulta, setSintomasconsulta] = useState('');
  const [diagnostico_consulta, setDiagnosticoconsulta] = useState('');
  const [tratamiento_consulta, setTratamiento_consulta] = useState('');
  const [fk_id_paciente, setFk_id_paciente] = useState('');
  const [errorPaciente, setErrorPaciente] = useState('');



  useEffect(() => {
    // Extraer el ID del paciente de la URL
    const queryParams = new URLSearchParams(location.search);
    const idPaciente = queryParams.get('id');

    if (idPaciente) {
      const fetchPaciente = async () => {
        try {
          const response = await axios.get(`${BACKEND_API}api/consultas/${idPaciente}`);
          console.log('Datos del paciente:', response.data); // Verificar los datos recibidos
          const paciente = response.data;
          setPacientes(response.data);
          // Actualizar el estado con los datos del paciente
          setIdPaciente(paciente.id_paciente || '');
          setNombrePaciente(paciente.nombre_paciente || '');
          setApellidoPaciente(paciente.apellido_paciente || '');
          setFechaPa(paciente.fechadenacimiento_paciente || '');
          setSexoPaciente(paciente.sexo_paciente || '');
          setDesalergiasPaciente(paciente.desalergias_paciente || '');
        } catch (error) {
          console.error("Error al obtener los datos del paciente:", error);
          toast.error('¡Error al obtener los datos del paciente!', {
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

  // Función para obtener la fecha actual en formato YYYY-MM-DD
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son base 0, por eso sumamos 1
    const day = String(hoy.getDate()).padStart(2, '0'); // Asegura que tenga 2 dígitos
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  };

  useEffect(() => {
    setFechaConsulta(obtenerFechaActual()); // Establecer la fecha actual en el estado
  }, []);

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

const handleCrearConsulta = async (e) => {
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
    await axios.post(`${BACKEND_API}api/consultadepaciente`, { 
      fechade_consulta, 
      sintomas_consulta, 
      diagnostico_consulta, 
      tratamiento_consulta, 
      hora_consulta, // Incluir la hora actual aquí
      fk_id_paciente
    });
   
    toast.success('Consulta registrada exitosamente!', {
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
    console.error('Error al registrar la consulta:', error);
    toast.error('¡Error al registrar la consulta!', {
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
        <h3>Consulta de Paciente</h3>
      </section>
      <div className="button6-container">
        <button className="button6" onClick={handleCrearConsulta}>
          <img src={icono1} alt="Icono 1"  />
          Guardar
        </button>
        {/*<button className="button6">
          <img src={icono2} alt="Icono 2" />
          Cancelar
        </button>
        <button className="button6">
          <img src={icono3} alt="Icono 4" />
          Modificar
        </button>*/}
        <button className="button6">
          <img src={icono4} alt="Icono 3" />
          Imprimir
        </button>
        <button className="button6" onClick={() => navigate(`/consultas/Consultadepaciente/HistorialClinico?id=${paciente.id_paciente}`)}>
          <img src={icono5} alt="Icono 3" />
          Historial
        </button>
        <button className="button6" onClick={() => navigate(-1)}>
          <img src={icono6} alt="Icono 3" />
          Cerrar
        </button>

      </div>
      <div className="empty">
        <p>Datos personales</p>
      </div>
      <form className='formulario'>
        <div className="input-group">
          <label>
            Numero de Paciente
            <input type="text" value={id_paciente} readOnly 
             />
          </label>
        </div>
        <div className="input-group">
          <label>
            Nombres de Paciente
            <input type="text" value={nombre_paciente} readOnly
             />
          </label>
        </div>
        <div className="input-group">
          <label>
            Apellidos de Paciente
            <input type="text" value={apellido_paciente} readOnly 
             />
          </label>
        </div>
        <div className="input-group">
          <label>
            Fecha de Nacimiento
            <input type="text" value={formatFecha(fechadenacimiento_paciente)} readOnly 
             />
          </label>
        </div>
        <div className="input-group">
          <label>
            Fecha de Consulta
            <input type="date" value={fechaConsulta} readOnly 
            />
          </label>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>
              Sexo de Paciente
              <input type="text" value={sexo_paciente} readOnly />
            </label>
          </div>
          <div className="form-group">
            <label>
              Alérgico
              <input type="text" value={desalergias_paciente} readOnly />
            </label>
          </div>
        </div>
      </form>
      <div className='vertical-group'>
        <div className="input-group">
          <label>
            Síntoma
            <textarea type="text" className='textarea' 
            onChange={(e) => setSintomasconsulta(e.target.value)}/>
          </label>
        </div>
        <div className="input-group">
          <label>
            Diagnóstico
            <textarea type="text" className='textarea' 
            onChange={(e) => setDiagnosticoconsulta(e.target.value)}/>
          </label>
        </div>
        <div className="input-group">
          <label>
            Tratamiento
            <textarea type="text" className='textarea' 
            onChange={(e) => setTratamiento_consulta(e.target.value)}/>
          </label>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Consultasdepacientes;