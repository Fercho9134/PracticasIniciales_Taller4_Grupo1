import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import './css/style.css';

function Home() {
  const [name, setName] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [registroAcademico, setRegistroAcademico] = useState('');
  const navigate = useNavigate();
  const userAvatar = 'https://i.ibb.co/CMsqBx2/avatar.png';
  axios.defaults.withCredentials = true;

  const [publications, setPublications] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');


  const [showCommentsModal, setShowCommentsModal] = useState(false);

  // Nuevo estado para almacenar la publicación seleccionada
  const [selectedPublication, setSelectedPublication] = useState(null);

  // Nuevo estado para almacenar los comentarios de la publicación seleccionada
  const [selectedPublicationComments, setSelectedPublicationComments] = useState([]);
  const [isCommentBoxVisible, setCommentBoxVisible] = useState(false);


  // Nueva función para abrir la ventana emergente de comentarios y cargar los comentarios de la publicación
  const handleOpenCommentsModal = (publication) => {
    setSelectedPublication(publication); // Almacena la publicación seleccionada
    // Aquí puedes realizar una solicitud al servidor para obtener los comentarios de la publicación
    axios.get(`http://localhost:8081/publicaciones/obtenercomentarios/${publication.publicacion_id}`)
      .then(res => {
        setSelectedPublicationComments(res.data); // Almacena los comentarios en el estado
        setShowCommentsModal(true); // Abre la ventana emergente
      })
      .catch(err => console.log(err));
  };

  const handleCommentChange = (e) => {
    setNewCommentText(e.target.value);
  };


  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.valid) {
          setName(res.data.user.nombres);
          setApellidos(res.data.user.apellidos);
          setIdUsuario(res.data.user.user_id);
          setRegistroAcademico(res.data.user.registro_academico);
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));

    // Llamar a la función para cargar publicaciones cuando el componente se monta
    getPublications();
  }, []);

  const getPublications = () => {
    axios.get('http://localhost:8081/publicaciones')
      .then(res => {
        setPublications(res.data);
      })
      .catch(err => console.log(err));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const newComment = {
      publicacion_id: selectedPublication.publicacion_id,
      usuario_id: idUsuario,
      nombre_usuario: name + ' ' + apellidos,
      registro_academico_usuario: registroAcademico,
      comentario: newCommentText,
      fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }
    axios.post('http://localhost:8081/publicaciones/nuevocomentario', newComment)
      .then(res => {
        if (res.data.success) {
          // Actualiza los comentarios de la publicación
          setSelectedPublicationComments([...selectedPublicationComments, newComment]);
          setNewCommentText(''); // Borra el texto del nuevo comentario después de enviarlo
        } else {
          console.error('Error al agregar comentario');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCloseCommentsModal = () => {
    setShowCommentsModal(false);
    setSelectedPublication(null); // Limpia la publicación seleccionada
    setSelectedPublicationComments([]); // Limpia los comentarios cuando se cierra la ventana
    setCommentBoxVisible(false); // Opcional: oculta la caja de comentarios si está abierta
  };


  const handleSearch = () => {
    // Aquí puedes implementar la lógica para buscar publicaciones según el valor de "searchInput", "selectedCourse" y "selectedProfessor"
  };

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
    <div className="home-container">
      <header>
        <div className="logo">USAC</div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
        <div className="filters">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Filtrar por curso</option>
            {/* Opciones de cursos */}
          </select>
          <select
            value={selectedProfessor}
            onChange={(e) => setSelectedProfessor(e.target.value)}
          >
            <option value="">Filtrar por catedrático</option>
            {/* Opciones de catedráticos */}
          </select>
        </div>
        <div className="user-info">
          <div className="user-avatar">
            <img src={userAvatar} alt="Avatar" />
            <div className="user-options">
              <span>{name} {apellidos}</span>
              <button>Ver Perfil</button>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          </div>
        </div>
      </header>
      <main>
        {/* Aquí mapea las publicaciones y muestra cada una */}
        {publications.map((publication) => (
          <div className="publication" key={publication.publicacion_id}>
            {/* Información de la publicación */}
            <div className="user-info">
              <img className="foto" src={userAvatar} alt="Avatar" />
              <span>{publication.nombre_usuario}</span>
              <div className="date">{publication.fecha_creacion}</div>
            </div>
            <div className="content">
              <div className="course-or-professor">
                <span><b>Curso o profesor:</b> {publication.nombre_catedratico}{publication.nombre_curso}</span>
                <br />
                <span><b>Calificación:</b> {publication.calificacion_estrellas}</span>
              </div>
              <br></br>
              <div className="text">{publication.mensaje}</div>

            </div>
            <button
              className="comments-button"
              onClick={() => {
                handleOpenCommentsModal(publication);
                setCommentBoxVisible(true); // Mostrar la caja de comentarios al hacer clic
              }}
            >Comentarios</button>


            {/* Mostrar los comentarios debajo de la publicación seleccionada */}
            {selectedPublication !== null && selectedPublication.publicacion_id === publication.publicacion_id && (
              <div className="comments">
                <h3>Comentarios</h3>
                <button className='btnCerrar' onClick={handleCloseCommentsModal}>Cerrar Comentarios</button> {/* Botón para cerrar comentarios */}
                <ul>
                  {selectedPublicationComments.map((comment) => (
                    <li className='comment-item' key={comment.id}><b>{comment.nombre_usuario}:</b> {comment.comentario} <br></br>--- <i>Publicado el: {comment.fecha_creacion}</i></li>
                  ))}
                </ul>
              </div>
            )}

            {isCommentBoxVisible && selectedPublication === publication && (
              <div className="add-comment">
                <textarea
                  placeholder="Escribe tu comentario aquí"
                  value={newCommentText}
                  onChange={handleCommentChange}
                ></textarea>
                <button type="submit" onClick={handleSubmitComment}>
                  Publicar comentario
                </button>
              </div>
            )}
          </div>
        ))}
      </main>

      <div className="floating-button">Escribir publicación</div>
    </div>
  );
}

export default Home;