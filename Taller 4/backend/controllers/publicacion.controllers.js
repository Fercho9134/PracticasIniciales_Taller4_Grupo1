import database from '../config/mysql.config.js';
import QUERY from '../querys/publicaciones.query.js';

export const cargarPublicaciones = async (req, res) => {
    try {
        database.query(QUERY.cargarPublicaciones, (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar publicaciones" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar publicaciones" });
    }
}

export const cargarComentarios = async (req, res) => {
    try {
        const { id } = req.params;
        database.query(QUERY.cargarComentarios, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar comentarios" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar comentarios" });
    }
}

export const nuevoComentario = async (req, res) => {
    try {
        const { publicacion_id, usuario_id, nombre_usuario, registro_academico_usuario, comentario, fecha_creacion } = req.body;
        database.query(QUERY.nuevoComentario, [publicacion_id, usuario_id, nombre_usuario, registro_academico_usuario, comentario, fecha_creacion], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al crear comentario" });
            }
            return res.json({ success: "Comentario creado exitosamente" });
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al crear comentario" });
    }
}

export const ObtenerCatedraticos = async (req, res) => {
    try {
        database.query(QUERY.ObtenerCatedraticos, (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar catedraticos" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar catedraticos" });
    }
}

export const ObtenerCursos = async (req, res) => {
    try {
        database.query(QUERY.obtenerCursos, (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar cursos" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar cursos" });
    }
}

export const nuevaPublicacionCatedratico = async (req, res) => {
    try {
        const { usuario_id, nombre_usuario, catedratico_id, nombre_catedratico, tipo, mensaje, fecha_creacion, calificacion_estrellas } = req.body;
        database.query(QUERY.nuevaPublicacionCatedratico, [usuario_id, nombre_usuario, catedratico_id, nombre_catedratico, tipo, mensaje, fecha_creacion, calificacion_estrellas], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al crear publicacion" });
            }
            return res.json({ success: "Publicacion creada exitosamente" });
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al crear publicacion" });
    }}

export const nuevaPublicacionCurso = async (req, res) => {
    try {
        const { usuario_id, nombre_usuario, curso_id, nombre_curso, tipo, mensaje, fecha_creacion, calificacion_estrellas } = req.body;
        database.query(QUERY.nuevaPublicacionCurso, [usuario_id, nombre_usuario, curso_id, nombre_curso, tipo, mensaje, fecha_creacion, calificacion_estrellas], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al crear publicacion" });
            }
            return res.json({ success: "Publicacion creada exitosamente" });
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al crear publicacion" });
    }}

export const cargarPublicacionesCatedratico = async (req, res) => {
    try {
        const { id } = req.params;
        database.query(QUERY.cargarPublicacionesCatedratico, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar publicaciones" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar publicaciones" });
    }
}

export const cargarPublicacionesCurso = async (req, res) => {
    try {
        const { id } = req.params;
        database.query(QUERY.cargarPublicacionesCurso, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar publicaciones" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar publicaciones" });
    }
}

export const cargarPublicacionesSoloCursos = async (req, res) => {
    try {
        database.query(QUERY.cargarPublicacionesSoloCursos, (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar publicaciones" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar publicaciones" });
    }
}

export const cargarPublicacionesSoloCatedraticos = async (req, res) => {
    try {
        database.query(QUERY.cargarPublicacionesSoloCatedraticos, (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar publicaciones" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar publicaciones" });
    }
}