import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import './css/style.css';

function UserProfile() {
    const { registro } = useParams();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [idUsuario, setIdUsuario] = useState('');
    const [cursosAprobados, setCursosAprobados] = useState([]);
    const [sumaCreditos, setSumaCreditos] = useState(0);
    

    useEffect(() => {
        axios.get('http://localhost:8081')
          .then(res => {
            if (res.data.valid) {
            } else {
              navigate('/login');
            }
          })
          .catch(err => console.log(err));
    
      }, []);

    useEffect(() => {
        // Realiza una solicitud al servidor para obtener la información del perfil del usuario
        axios.get(`http://localhost:8081/users/${registro}`)
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const user = res.data[0]; // Accede al primer elemento del array
                    setUserData(user);
                    setIdUsuario(user.user_id);
                } else {

                    alert('No se encontró información para el número de registro proporcionado. Volviendo a la página principal');
                    navigate('/');
                }
            })
            .catch((err) => {
                console.error('Error al buscar el perfil del usuario:', err);
            });
    }, [registro]);

    useEffect(() => {
        // Realiza la solicitud para obtener los cursos aprobados
        axios.get(`http://localhost:8081/users/cursos/${idUsuario}`)
            .then((response) => {
                setCursosAprobados(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los cursos aprobados:', error);
            });

        // Realiza la solicitud para obtener la suma de créditos
        axios.get(`http://localhost:8081/users/creditos/${idUsuario}`)
            .then((response) => {
                // Verifica si hay al menos un objeto en el array antes de acceder a él
                if (response.data.length > 0) {
                    const totalCreditos = response.data[0].total_creditos;
                    setSumaCreditos(totalCreditos);
                    console.log(totalCreditos);
                } else {
                    console.error('El array de respuesta está vacío.');
                }
            })
            .catch((error) => {
                console.log(idUsuario);
                console.error('Error al obtener la suma de créditos:', error);
            });
    }, [idUsuario]);



    if (!userData) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <Helmet>
                <title>Perfil de Usuario</title>
            </Helmet>
            <div className="container-user-profile">
                <h1>Perfil de Usuario</h1>
                <div className="user-profile-info">
                    <h2>{userData.nombres} {userData.apellidos}</h2>
                    <p><b>Número de Registro:</b> {userData.registro_academico}</p>
                    <p><b>Correo Electrónico:</b> {userData.correo_electronico}</p>
                </div>

                <h2>Cursos Aprobados</h2>
                <ul>
                    {cursosAprobados.map((curso) => (
                        <li key={curso.curso_id}>{curso.nombre_curso} - Créditos: {curso.creditos}</li>
                    ))}
                </ul>

                <p><b>Suma de Créditos:</b> {sumaCreditos}</p>

                <Link to="/" className="btnVolver">Volver</Link>
            </div>

        </div>
    );
}

export default UserProfile;
