import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupStyle.css';
import {Helmet} from 'react-helmet';

function Recuperacion() {
  const [values, setValues] = useState({
    registroAcademico: '',
    contrasena: ''
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/recuperacion', values)
    .then(res => 
      {
        if(res.data.Exito){
          navigate('/login')
          alert("Contraseña actualizada")
        }else{
          alert("Ocurrió un error al actualizar la contraseña, revise sus datos e intente de nuevo")
          console.log(res);
        }
      })
    .catch(err => console.log(err));
    }


  return (
    <div className="body-container">
        <Helmet>
                <title>Recuperar contraseña</title>
            </Helmet>
      <div className="container">
        <h2>Cambiar contraseña</h2>
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
            <label htmlFor="correo_electronico">Correo Electrónico:</label>
            <input
              type="email"
              name="correoElectronico"
              placeholder="Correo Electrónico"
              onChange={handleInput}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseña_nueva">Contraseña nueva:</label>
            <input
              type="password"
              placeholder="Contraseña nueva"
              name="contrasenaNueva"
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit">Actualizar contraseña</button>
          <Link to="/login">Iniciar Sesión</Link>
        </form>
      </div>
    </div>
  );
}

export default Recuperacion;
