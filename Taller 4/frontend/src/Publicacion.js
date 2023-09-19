import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Publicacion({ publication, comments, onSubmitComment }) {
    const [newComment, setNewComment] = useState(''); // Agrega un estado para el nuevo comentario
    const [name, setName] = useState('');
    const [apellidos, setApellidos] = useState('');
    const navigate = useNavigate();
    const [idUsuario, setIdUsuario] = useState(''); // Agrega un estado para el nuevo comentario
    const userAvatar = 'https://i.ibb.co/CMsqBx2/avatar.png'
    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.valid) {
                    setName(res.data.user.nombres);
                    setApellidos(res.data.user.apellidos);
                    setIdUsuario(res.data.user.id);
                } else {
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));

        // Llamar a la función para cargar publicaciones cuando el componente se monta
    }, []);

    // Función para manejar el cambio en el campo de comentario
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    return (
        <div className="publication-details">
            {/* Mostrar información de la publicación */}
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

            {/* Mostrar los comentarios existentes */}
            <div className="comments">
                <h3>Comentarios</h3>
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}><b>{comment.nombre_usuario}:</b> {comment.comentario} --- <i>Publicado el: {comment.fecha_creacion}</i></li>
                    ))}
                </ul>
            </div>

            {/* Formulario para agregar un nuevo comentario */}
            <div className="add-comment">
                <h3>Agregar un comentario</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitComment(newComment); // Llama a la función onSubmitComment con el contenido del nuevo comentario
                }}>
                    <textarea
                        placeholder="Escribe tu comentario aquí"
                        value={newComment}
                        onChange={handleCommentChange}
                    ></textarea>
                    <button type="submit">Publicar comentario</button>
                </form>

            </div>
        </div>
    );
}

export default Publicacion;
