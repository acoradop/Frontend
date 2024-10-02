import React, { useState, useEffect } from 'react';
import "./Historialdetallado.css";
import ima1 from "../../Imagenes/cerrar.png";
import ima2 from "../../Imagenes/eliminar.png";
import ima3 from "../../Imagenes/modificar.png";

import { BACKEND_API } from "../../Rutabackend";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HistorialClinico = () => {
  const [id_paciente, setIdPaciente] = useState('');
  const [nombre_paciente, setNombrePaciente] = useState('');
  const [apellido_paciente, setApellidoPaciente] = useState('');
  const [fechadenacimiento_paciente, setFechaPa] = useState('');
  const [sexo_paciente, setSexoPaciente] = useState('');
  const [desalergias_paciente, setDesalergiasPaciente] = useState('');
  const [fechaConsulta, setFechaConsulta] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const [idConsulta, setIdConsulta] = useState('');
  const [consultas, setConsultas] = useState('');
  const [paciente, setPacientes] = useState('');

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
    setIdConsulta(idConsultas);
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
          console.log("id consulta",idConsulta);
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
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setFk_id_paciente(id_paciente);
    setFechadeconsulta(fechaConsulta);

  }, [id_paciente, fechaConsulta]);

  
  const EliminarFichaMe = async (idConsultas) => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const idConsultas = queryParams.get('idC');
      await axios.delete(`${BACKEND_API}api/consultaElimF/${idConsultas}`);
      toast.success('¡Ficha médica eliminada exitosamente!', {
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
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error("Error al eliminar la ficha médica:", error);
    }
  };

  return (
    <div>
      <section>
        <h3>Historial detallado</h3>
      </section>
      <div className="boton2-container">
      <button className="boton2">
          <img src={ima3} alt="Icono 3" onClick={() => navigate(`/consultas/Consultadepaciente/Historialdetallado/ModificarConsulta?idC=${idConsulta}&idP=${id_paciente}`)} />
          Modificar
        </button>
        <button className="boton2"
        onClick={()=> EliminarFichaMe()}
        >
          <img src={ima2} alt="Icono 3" />
          Eliminar
        </button>
        <button className="boton2" onClick={() => navigate(-1)}>
          <img src={ima1} alt="Icono 3" />
          Cerrar
        </button>
      </div>
      <div className="empty">
        <p>Datos personales</p>
      </div>
      <form className='formulariohd'>
        <div className="input-group">
          <label>
            Numero de Paciente
            <input type="text" value={id_paciente} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Nombres de Paciente
            <input type="text" value={nombre_paciente} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Apellidos de Paciente
            <input type="text" value={apellido_paciente} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Fecha de Nacimiento
            <input type="text" value={formatFecha(fechadenacimiento_paciente)} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Fecha de Consulta
            <input type="text" value={formatFechaConsulta(fechade_consulta)} readOnly />
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
            <textarea className='large-textarea' value={sintomas_consulta} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Diagnóstico
            <textarea className='large-textarea' value={diagnostico_consulta} readOnly />
          </label>
        </div>
        <div className="input-group">
          <label>
            Tratamiento
            <textarea className='large-textarea' value={tratamiento_consulta} readOnly />
          </label>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HistorialClinico;

