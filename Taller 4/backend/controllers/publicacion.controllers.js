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