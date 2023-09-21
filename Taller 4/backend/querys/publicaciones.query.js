const QUERY ={
    cargarPublicaciones: 'SELECT * FROM publicaciones ORDER BY fecha_creacion DESC',
    cargarComentarios: 'SELECT * FROM comentarios WHERE publicacion_id = ?',
    nuevoComentario: 'INSERT INTO comentarios (publicacion_id, usuario_id, nombre_usuario, registro_academico_usuario, comentario, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?)',
    ObtenerCatedraticos: 'SELECT * FROM catedraticos',
    obtenerCursos: 'SELECT * FROM cursos',
    nuevaPublicacionCatedratico: 'INSERT INTO publicaciones (usuario_id, nombre_usuario, catedratico_id, nombre_catedratico, tipo, mensaje, fecha_creacion, calificacion_estrellas) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    nuevaPublicacionCurso: 'INSERT INTO publicaciones (usuario_id, nombre_usuario, curso_id, nombre_curso, tipo, mensaje, fecha_creacion, calificacion_estrellas) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    cargarPublicacionesCatedratico: 'SELECT * FROM publicaciones WHERE catedratico_id = ? ORDER BY fecha_creacion DESC',
    cargarPublicacionesCurso: 'SELECT * FROM publicaciones WHERE curso_id = ? ORDER BY fecha_creacion DESC',
    cargarPublicacionesSoloCursos: 'SELECT * FROM publicaciones WHERE tipo = "Curso" ORDER BY fecha_creacion DESC',
    cargarPublicacionesSoloCatedraticos: 'SELECT * FROM publicaciones WHERE tipo = "Catedratico" ORDER BY fecha_creacion DESC',
};

export default QUERY;