// NuevoPaciente.js
import React, { useState, useEffect } from 'react';
import '../Paciente/Nuevopaciente.css';

import icono1 from '../../Imagenes/guardar.png';
import icono2 from '../../Imagenes/cerrar.png';
import icono3 from '../../Imagenes/imprimir.png';
import { BACKEND_API } from "../../Rutabackend";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NuevoPaciente = () => {
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
  const [errorPaciente, setErrorPaciente] = useState('');
  const navigate = useNavigate();

  const handleDateChange = (event) => {
    setFechaPa(event.target.value);
  };

  const handleOptionChangealergico = (e) => {
    setAlergicoPaciente(e.target.value === 'true');
 };

 const handleOptionChange2 = (e) => {
  setActivoPaciente(e.target.value === 'true');
};

useEffect(() => {
  const fetchPacientes = async () => {
    try {
      const response = await axios.get(`${BACKEND_API}api/pacientes`);
      const data = response.data;

      if (data.length > 0) {
        // Encuentra el máximo id_paciente en el arreglo
        const maxIdPaciente = Math.max(...data.map(paciente => paciente.id_paciente));
        const nuevoIdPaciente = maxIdPaciente + 1; // Incrementa el id
        setIdPaciente(nuevoIdPaciente); // Establece el nuevo id
        console.log("ID DEL PACIENTE incrementado", nuevoIdPaciente);
      }
    } catch (error) {
      console.error("Error al obtener el id de los pacientes:", error);
    }
  };
  fetchPacientes();
}, []);



 const handleCrearPaciente = async (e) => {
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
    await axios.post(`${BACKEND_API}api/paciente`, { nombre_paciente, apellido_paciente,fechadenacimiento_paciente,sexo_paciente, telefono_paciente,correo_paciente,
      activo_paciente,alergico_paciente,desalergias_paciente });
    toast.success('Paciente registrado exitosamente!', {
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
      navigate('/pacientes')
    }, 500);
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


  return (
    <div>
      <section>
        <h3>Nuevo Paciente</h3>
      </section>
      <div className="button-container2">
        <button className="button2" onClick={handleCrearPaciente}>
          <img src={icono1} alt="Guardar" />
          Guardar
        </button>
        <button className="button2">
          <img src={icono3} alt="Imprimir" />
          Imprimir
        </button>
        <button className="button2" onClick={() => navigate(-1)}>
          <img src={icono2} alt="Cerrar" />
          Cerrar
        </button>
      </div>

      <form className='formulario2' onSubmit={handleCrearPaciente}>
        <div className="empty"><p>Datos personales</p></div>
        <div className="input-group">
          <label>Numero de Paciente
            <input type="text" readOnly value={id_paciente} />
          </label>
        </div>
        <div className="input-group">
          <label>Nombres de Paciente
            <input type="text" value={nombre_paciente} onChange={(e) => setNombrePaciente(e.target.value)} required />
          </label>
        </div>
        <div className="input-group">
          <label>Apellidos de Paciente
            <input type="text" value={apellido_paciente} onChange={(e) => setApellidoPaciente(e.target.value)} required />
          </label>
        </div>
        <div className="input-group">
          <label>Fecha de Nacimiento
            <input type="date" value={fechadenacimiento_paciente} onChange={handleDateChange} />
          </label>
        </div>
        <div className="input-group">
          <label>Sexo de Paciente
            <input type="text" value={sexo_paciente} onChange={(e) => setSexoPaciente(e.target.value)} required />
          </label>
        </div>
        <div className="empty"><p>Datos de contacto</p></div>
        <div className="form-row">
          <div className="form-group">
            <label>Número de teléfono
              <input type="text" value={telefono_paciente} onChange={(e) => setTelefonoPaciente(e.target.value)} required />
            </label>
          </div>
          <div className="form-group">
            <label>Correo Electrónico
              <input type="text" value={correo_paciente} onChange={(e) => setCorreoPaciente(e.target.value)} required />
            </label>
          </div>
          <div className="input-group">
            <label>¿Está Activo?</label>
            <div className="radio-container">
            <label className="radio-label">
              <input type="radio" value={true} checked={activo_paciente === true} onChange={handleOptionChange2} />
              Sí
            </label>
            <label className="radio-label">
              <input type="radio" value={false} checked={activo_paciente === false} onChange={handleOptionChange2} />
              No
            </label>
            </div>
          </div>
        </div>
        <div className="empty"><p>Notas personales</p></div>
        <div className="form-row">
          <div className="input-group">
            <label>¿Es Alérgico?</label>
            <div className="radio-container">
              <label className="radio-label">
                  <input type="radio" value={true} checked={alergico_paciente === true} onChange={handleOptionChangealergico} />
                  Sí
                </label>
                <label className="radio-label">
                  <input type="radio" value={false} checked={alergico_paciente === false} onChange={handleOptionChangealergico} />
                  No
                </label>

            </div>
              
            
          </div>
          <div className="form-group">
            <label>A qué es alérgico
              <input type="text" value={desalergias_paciente} onChange={(e) => setDesalergiasPaciente(e.target.value)} required />
            </label>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default NuevoPaciente;

