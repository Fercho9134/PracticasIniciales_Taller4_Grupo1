import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/style.css';
import { Helmet } from 'react-helmet';

function Signup() {
  const [values, setValues] = useState({
    registroAcademico: '',
    nombres: '',
    apellidos: '',
    contrasena: '',
    correoElectronico: '',
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/signup', values)
      .then(res => {
        if (res.data.error) {
          // Mostrar el mensaje de error al usuario
          alert(res.data.error);
        } else {
          // Registro exitoso
          console.log(res);
          alert("Usuario registrado correctamente");
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }
  

  return (
    <div className="body-container">
      <Helmet>
        <title>Registrarse</title>
      </Helmet>
      <div className="container">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="registro_academico">Registro Académico:</label>
            <input
              type="text"
              placeholder="Registro Académico"
              name="registroAcademico"
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombres">Nombres:</label>
            <input
              type="text"
              placeholder="Nombres"
              name="nombres"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos:</label>
            <input
              type="text"
              placeholder="Apellidos"
              name="apellidos"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              type="password"
              placeholder="Contraseña"
              name="contrasena"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo_electronico">Correo Electrónico:</label>
            <input
              type="email"
              name="correoElectronico"
              placeholder="Correo Electrónico"
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit">Registrar</button>
          <Link to="/login">Iniciar Sesión</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
