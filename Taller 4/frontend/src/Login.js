import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupStyle.css';
import {Helmet} from 'react-helmet';

function Login() {
  const [values, setValues] = useState({
    registroAcademico: '',
    contrasena: ''
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    axios.get('http://localhost:8081')
    .then(res => {
        if(res.data.valid){
            navigate('/');
        }else{
            navigate('/login');
        }
    })
    .catch(err => console.log(err));
}, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
    .then(res => 
      {
        if(res.data.Login){
          navigate('/')
        }else{
          alert("Datos inválidos")
          console.log(res);
        }
      })
    .catch(err => console.log(err));
    }


  return (
    <div className="body-container">
        <Helmet>
                <title>Inicio de sesión</title>
            </Helmet>
      <div className="container">
        <h2>Inicio de Sesión</h2>
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
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              type="password"
              placeholder="Contraseña"
              name="contrasena"
              onChange={handleInput}
              required
            />
          </div>

          <button type="submit">Iniciar Sesión</button>
          <Link to="/recuperacion">Olvide mi contraseña</Link>
          <Link to="/signup">Registrarse</Link>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
