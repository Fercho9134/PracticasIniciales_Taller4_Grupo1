const QUERY ={
    obtenerUsuarios: 'SELECT * FROM usuarios where registro_academico = ?',
    obtenerCursosAprobados: 'SELECT Cursos.curso_id, Cursos.nombre_curso, Cursos.creditos FROM CursosAprobados INNER JOIN Cursos ON CursosAprobados.curso_id = Cursos.curso_id WHERE CursosAprobados.usuario_id = ?',
    obtenerTotalCreditos: 'SELECT SUM(Cursos.creditos) AS total_creditos FROM CursosAprobados INNER JOIN Cursos ON CursosAprobados.curso_id = Cursos.curso_id WHERE CursosAprobados.usuario_id = ?',
    actualizarUsuario: 'UPDATE usuarios SET nombres = ?, apellidos = ?, correo_electronico = ? WHERE registro_academico = ?',
    agregarCursoAprobado: 'INSERT INTO CursosAprobados (usuario_id, curso_id) VALUES (?, ?)',
    quitarCursoAprobado: 'DELETE FROM CursosAprobados WHERE usuario_id = ? AND curso_id = ?',
};

export default QUERY;