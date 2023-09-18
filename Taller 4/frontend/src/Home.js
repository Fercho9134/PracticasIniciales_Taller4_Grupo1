import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.valid) {
          setName(res.data.user.nombres);
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleLogout = () => {
    axios.post('http://localhost:8081/logout')
      .then((res) => {
        if (res.data.success) {
          navigate('/login');
        } else {
          console.error('Error al cerrar sesión');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Helmet>
        <title>Inicio</title>
      </Helmet>

      <h1>Bienvenido {name}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;