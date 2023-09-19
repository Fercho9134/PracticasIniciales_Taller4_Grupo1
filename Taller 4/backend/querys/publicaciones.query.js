const QUERY ={
    cargarPublicaciones: 'SELECT * FROM publicaciones',
    cargarComentarios: 'SELECT * FROM comentarios WHERE publicacion_id = ?',
    nuevoComentario: 'INSERT INTO comentarios (publicacion_id, usuario_id, nombre_usuario, registro_academico_usuario, comentario, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)',
};

export default QUERY;