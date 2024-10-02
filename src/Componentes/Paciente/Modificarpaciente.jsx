// ModificarPaciente.js
import React, { useState, useEffect } from 'react';
import '../Paciente/Modificarpaciente.css';
import icono1 from '../../Imagenes/guardar.png';
import icono6 from '../../Imagenes/cerrar.png';

import { BACKEND_API } from "../../Rutabackend";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModificarPaciente = () => {
  const [id_paciente, setIdPaciente] = useState('');
  const [nombre_paciente, setNombrePaciente] = useState('');
  const [apellido_paciente, setApellidoPaciente] = useState('');
  const [fechadenacimiento_paciente, setFechaPa] = useState('');
  const [sexo_paciente, setSexoPaciente] = useState('');
  const [telefono_paciente, setTelefonoPaciente] = useState('');
  const [correo_paciente, setCorreoPaciente] = useState('');
  const [activo_paciente, setActivoPaciente] = useState('');
  const [alergico_paciente, setAlergicoPaciente] = useState('');
  const [desalergias_paciente, setDesalergiasPaciente] = useState('');
  const [fechaConsulta, setFechaConsulta] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const [paciente, setPacientes] = useState('');
  const [hora_consulta, setHoraConsulta] = useState('');

  const [errorPaciente, setErrorPaciente] = useState('');
  const [modificar_paciente, setModificar_paciente] = useState('');

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
          setTelefonoPaciente(paciente.telefono_paciente || '');
          setCorreoPaciente(paciente.correo_paciente || '');
          setActivoPaciente(paciente.activo_paciente || '');
          setAlergicoPaciente(paciente.alergico_paciente || '');
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

  const handleDateChange = (event) => {
    setFechaPa(event.target.value);
  };

  const handleOptionChangealergico = (e) => {
    setAlergicoPaciente(e.target.value === 'true');
 };

 const handleOptionChange2 = (e) => {
  setActivoPaciente(e.target.value === 'true');
};


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
  
  const pacienteActualizado = {
    nombre_paciente,
    apellido_paciente,
    fechadenacimiento_paciente,
    sexo_paciente,
    telefono_paciente,
    correo_paciente,
    activo_paciente,
    alergico_paciente,
    desalergias_paciente
  };

  try {
    await axios.put(`${BACKEND_API}api/actualizar-paciente/${id_paciente}`, pacienteActualizado); // Asegúrate de pasar los datos actualizados aquí
    toast.success('Paciente modificado exitosamente!', {
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
      navigate('/pacientes');
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
    <div className="boton-contenedor">
      <button className="boton-guardar" onClick={handleModificarPaciente}>
        <img src={icono1} alt="Guardar" />
        Guardar
      </button>
      <button className="boton-cerrar" onClick={() => navigate(-1)}>
        <img src={icono6} alt="Cerrar" />
        Cerrar
      </button>
    </div>
    <div className="seccion-datos">
      <p>Datos personales</p>
    </div>
    <form className='formulario-paciente'>
      <div className="grupo-input">
        <label>
          Numero de Paciente
          <input type="text" value={id_paciente} readOnly />
        </label>
      </div>
      <div className="grupo-input">
        <label>
          Nombres de Paciente
          <input type="text" value={nombre_paciente} onChange={(e) => setNombrePaciente(e.target.value)} />
        </label>
      </div>
      <div className="grupo-input">
        <label>
          Apellidos de Paciente
          <input type="text" value={apellido_paciente} onChange={(e) => setApellidoPaciente(e.target.value)} />
        </label>
      </div>
      <div className="grupo-input">
        <label>
          Fecha de Nacimiento
          <input type="text" value={formatFecha(fechadenacimiento_paciente)} onChange={(e) => setFechaPa(e.target.value)} />
        </label>
      </div>
      <div className="fila-formulario">
        <div className="grupo-formulario">
          <label>
            Sexo de Paciente
            <input type="text" value={sexo_paciente} onChange={(e) => setSexoPaciente(e.target.value)} />
          </label>
        </div>
      </div>
      <div className="seccion-datos">
        <p>Datos de contacto</p>
      </div>
      <form>
        <div className="fila-formulario">
          <div className="grupo-formulario">
            <label>
              Número de teléfono
              <input type="text" id="numerotel" value={telefono_paciente} name="telefono_paciente" onChange={(e) => setTelefonoPaciente(e.target.value)} required />
            </label>
          </div>
          <div className="grupo-formulario">
            <label>
              Correo Electronico
              <input type="text" id="correo" value={correo_paciente} name="correo_paciente" onChange={(e) => setCorreoPaciente(e.target.value)} required />
            </label>
          </div>
          <div className="etiqueta-radio">
            <label>Está Activo</label>
            <label className="opciones-radio">
              <input type="radio" value={true} checked={activo_paciente === true} onChange={handleOptionChange2} />
              Sí
            </label>
            <label className="opciones-radio">
              <input type="radio" value={false} checked={activo_paciente === false} onChange={handleOptionChange2} />
              No
            </label>
          </div>
        </div>
      </form>
      <div className="seccion-datos">
        <p>Notas personales</p>
      </div>
      <div className="fila-formulario">
        <div className="etiqueta-radio">
          <label>Es Alérgico</label>
          <label className="opciones-radio">
            <input type="radio" value={true} checked={alergico_paciente === true} onChange={handleOptionChangealergico} />
            Sí
          </label>
          <label className="opciones-radio">
            <input type="radio" value={false} checked={alergico_paciente === false} onChange={handleOptionChangealergico} />
            No
          </label>
        </div>
        <div className="grupo-formulario">
          <label>
            A qué es alérgico
            <input type="text" id="alergicoaque" value={desalergias_paciente} name="desalergias_paciente" onChange={(e) => setDesalergiasPaciente(e.target.value)} required />
          </label>
        </div>
      </div>
    </form>

    <ToastContainer />
  </div>
);
};

export default ModificarPaciente;