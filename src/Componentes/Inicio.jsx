import './Inicio.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_API } from '../Rutabackend'; // Asegúrate de tener correctamente definido BACKEND_API

const Inicio = () => {
  const [totalPacientes, setTotalPacientes] = useState(0);
  const [consultasDiarias, setConsultasDiarias] = useState(0);
  const [consultasMensuales, setConsultasMensuales] = useState(0);

  useEffect(() => {
    const obtenerTotalPacientes = async () => {
      try {
        const response = await axios.get(`${BACKEND_API}api/pacientes/contar`);
        setTotalPacientes(response.data.total); // Ajusta la propiedad según tu backend
      } catch (error) {
        console.error('Error al obtener el total de pacientes:', error);
      }
    };

    const obtenerConsultasDiarias = async () => {
      try {
        const fechaActual = new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
        const response = await axios.get(`${BACKEND_API}api/consultas/diarias/${fechaActual}`);
        setConsultasDiarias(response.data.consultasDiarias);
      } catch (error) {
        console.error('Error al obtener el total de consultas diarias:', error);
      }
    };

    const obtenerConsultasMensuales = async () => {
      try {
        const mesActual = new Date().toISOString().slice(0, 7); // Formato YYYY-MM
        const response = await axios.get(`${BACKEND_API}api/consultas/mensuales/${mesActual}`);
        setConsultasMensuales(response.data.consultasMensuales);
      } catch (error) {
        console.error('Error al obtener el total de consultas mensuales:', error);
      }
    };

    const guardarRegistroMensual = async () => {
      try {
        const registroData = {
          consultasdiarias_reportes: consultasDiarias,
          consultasmensuales_reporte: consultasMensuales,
        };
        // Llamada al endpoint para guardar el registro mensual
        await axios.post(`${BACKEND_API}api/registros/mensual`, registroData);
        console.log('Registro mensual guardado correctamente');
      } catch (error) {
        console.error('Error al guardar el registro mensual:', error);
      }
    };

    const guardarRegistroReportes = async () => {
      try {
        // Llamada al endpoint para guardar el registro
        await axios.post(`${BACKEND_API}api/registros/guardar`);
        console.log('Registro guardado correctamente');
      } catch (error) {
        console.error('Error al guardar el registro:', error);
      }
    };

    const fetchDataAndSave = async () => {
      await obtenerTotalPacientes();
      await obtenerConsultasDiarias();
      await obtenerConsultasMensuales();

      // Solo guardar registros si hay datos válidos
      if (consultasDiarias > 0 || consultasMensuales > 0) {
        await guardarRegistroMensual();
        
      }
      await guardarRegistroReportes();
    };

    fetchDataAndSave();
  }, [consultasDiarias, consultasMensuales]); // Solo se ejecuta al montar el componente

  return (
    <div className='principal'>
      <h2>Bienvenida a la Clínica Médica</h2>
      <div className="container">
        <section className="section">
          <h3>Pacientes de la Clínica</h3>
          <br />
          <p>{totalPacientes}</p> {/* Mostrar el total de pacientes */}
        </section>
        <section className="section">
          <h3>Consultas diarias</h3>
          <br />
          <p>{consultasDiarias}</p> {/* Mostrar el total de consultas diarias */}
        </section>
        <section className="section">
          <h3>Consultas mensuales</h3>
          <br />
          <p>{consultasMensuales}</p> {/* Mostrar el total de consultas mensuales */}
        </section>
      </div>
    </div>
  );
};

export default Inicio;
