import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function MyProfile() {
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [idUsuario, setIdUsuario] = useState('');
  const [editedData, setEditedData] = useState({
    nombres: '',
    apellidos: '',
    correo_electronico: '',
    registro_academico: '',
  });
  const [coursesAprobados, setCoursesAprobados] = useState([]);
  const navigate = useNavigate();
  const [sumaCreditos, setSumaCreditos] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.valid) {
          setUserData(res.data.user);
          setIdUsuario(res.data.user.user_id);
          setEditedData({
            nombres: res.data.user.nombres,
            apellidos: res.data.user.apellidos,
            correo_electronico: res.data.user.correo_electronico,
            registro_academico: res.data.user.registro_academico,
          });
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // Realiza una solicitud para obtener los cursos aprobados por el usuario
    axios.get(`http://localhost:8081/users/cursos/${idUsuario}`)
      .then((response) => {
        setCoursesAprobados(response.data); // Almacena la lista de cursos aprobados
      })
      .catch((error) => {
        console.error('Error al obtener los cursos aprobados:', error);
      });
  }, [idUsuario]);

  useEffect(() => {
    // Realiza una solicitud para obtener todos los cursos disponibles
    axios.get(`http://localhost:8081/publicaciones/cursos`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener todos los cursos:', error);
      });
  }, []);

  useEffect(() => {
    // Realizar una solicitud para obtener la suma de créditos desde la base de datos
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
        console.error('Error al obtener la suma de créditos:', error);
      });
  }, [idUsuario]);

  // Manejadores para la edición de datos
  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = () => {
    console.log(editedData);
    console.log(userData.registro_academico)
    // Realiza una solicitud para actualizar el perfil con los datos editados
    axios.put(`http://localhost:8081/users/actualizar`, editedData)
      .then((response) => {
        // Actualiza la información de usuario con los datos editados
        setUserData(response.data);
        console.log(response);
        alert('Perfil actualizado');
      })
      .catch((error) => {
        console.error('Error al actualizar el perfil:', error);
      });
  };

  const actualizarSumaCreditos = () => {
    // Realizar una solicitud para obtener la suma de créditos desde la base de datos
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
        console.error('Error al obtener la suma de créditos:', error);
      });
  };

  const handleToggleCourse = (courseId) => {
    // Verificar si el curso ya está en la lista de cursos aprobados del usuario
    const isCourseAprobado = coursesAprobados.some((c) => c.curso_id === courseId);

    if (isCourseAprobado) {
      // Si el curso está en la lista, quitarlo
      const updatedCoursesAprobados = coursesAprobados.filter((c) => c.curso_id !== courseId);
      setCoursesAprobados(updatedCoursesAprobados);

      // Realizar la solicitud para quitar el curso aprobado en la base de datos
      axios.delete('http://localhost:8081/users/quitarCursoAprobado', { data: { usuario_id: idUsuario, curso_id: courseId } })
        .then((response) => {
          actualizarSumaCreditos();
        })
        .catch((error) => {
          console.error('Error al quitar el curso aprobado:', error);
        });
    } else {

      axios.post('http://localhost:8081/users/agregarCursoAprobado', { usuario_id: idUsuario, curso_id: courseId })
        .then((response) => {
          // Si el curso no está en la lista, agregarlo
          const course = courses.find((c) => c.curso_id === courseId);
          setCoursesAprobados([...coursesAprobados, course]);
          actualizarSumaCreditos();
        })
        .catch((error) => {
          console.error('Error al agregar el curso aprobado:', error);
        });
    }
  };


  return (
    <div className="my-profile-container"> {/* Aplica una clase CSS al contenedor principal */}
      <h1>Perfil de Usuario</h1>
      <div className="profile-info">
        <input
          type="text"
          name="nombres"
          value={editedData.nombres}
          onChange={handleInputChange}
          placeholder="Nombres"
        />
        <input
          type="text"
          name="apellidos"
          value={editedData.apellidos}
          onChange={handleInputChange}
          placeholder="Apellidos"
        />
        <input
          type="text"
          name="correo_electronico"
          value={editedData.correo_electronico}
          onChange={handleInputChange}
          placeholder="Correo Electrónico"
        />

        <button className="update-button" onClick={handleUpdateProfile}>
          Guardar Cambios
        </button>
      </div>

      {/* Mostrar la lista de cursos disponibles */}
      <div className="course-list">
        <h2>Lista de Cursos</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.curso_id}>
              <div className="course-info">
                <span className="course-name">{course.nombre_curso}</span>
                <span className="course-credits">Créditos: {course.creditos}</span>
              </div>
              <button
                className={`toggle-button ${coursesAprobados.some((c) => c.curso_id === course.curso_id) ? 'remove' : 'add'}`}
                onClick={() => handleToggleCourse(course.curso_id)}
              >
                {/* Botón para agregar/quitar cursos aprobados */}
                {coursesAprobados.some((c) => c.curso_id === course.curso_id)
                  ? 'Quitar'
                  : 'Agregar'}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mostrar la lista de cursos aprobados */}
      <div className="approved-courses">
        <h2>Cursos Aprobados</h2>
        <ul>
          {coursesAprobados.map((course) => (
            <li key={course.curso_id}>
              <div className="course-info">
                <span className="course-name">{course.nombre_curso}</span>
                <span className="course-credits">Créditos: {course.creditos}</span>
              </div>
              <button
                className="toggle-button remove"
                onClick={() => handleToggleCourse(course.curso_id)}
              >
                {/* Botón para quitar cursos aprobados */}
                Quitar
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="total-credits">Total de Créditos: {sumaCreditos}</p>
      <Link to="/" className="btnVolver">Volver</Link>
    </div>
  );
}

export default MyProfile;
