import database from '../config/mysql.config.js';
import QUERY from '../querys/users.querys.js';

export const obtenerUsuarios = async (req, res) => {
    try {
        const { registro } = req.params;
        database.query(QUERY.obtenerUsuarios, [registro], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar usuarios" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar usuarios" });
    }
}

export const obtenerCursosAprobados = async (req, res) => {
    try {
        const { id } = req.params;
        database.query(QUERY.obtenerCursosAprobados, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar cursos aprobados" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar cursos aprobados" });
    }
}

export const obtenerTotalCreditos = async (req, res) => {
    try {
        const { id } = req.params;
        database.query(QUERY.obtenerTotalCreditos, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cargar total de creditos" });
            }
            return res.json(result);
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al cargar total de creditos" });
    }
}

export const actualizarUsuario = async (req, res) => {
    try {
        const { nombres, apellidos, correo_electronico, registro_academico } = req.body; // Obtén el registro académico desde los parámetros de la URL
        database.query(
            QUERY.actualizarUsuario,
            [nombres, apellidos, correo_electronico, registro_academico], 
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.json({ error: "Error al actualizar usuario" });
                }
                console.log(QUERY.actualizarUsuario, [nombres, apellidos, correo_electronico, registro_academico]);
                return res.json(result);
            }
        );
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al actualizar usuario" });
    }
}

export const agregarCursoAprobado = async (req, res) => {
    try {
        const { usuario_id, curso_id } = req.body; // Obtén el registro académico desde los parámetros de la URL
        database.query(
            QUERY.agregarCursoAprobado,
            [usuario_id, curso_id], 
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.json({ error: "Error al agregar curso aprobado" });
                }
                console.log(QUERY.agregarCursoAprobado, [usuario_id, curso_id]);
                return res.json(result);
            }
        );
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al agregar curso aprobado" });
    }
}

export const quitarCursoAprobado = async (req, res) => {
    try {
        const { usuario_id, curso_id } = req.body; // Obtén el registro académico desde los parámetros de la URL
        database.query(
            QUERY.quitarCursoAprobado,
            [usuario_id, curso_id], 
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.json({ error: "Error al quitar curso aprobado" });
                }
                console.log(QUERY.quitarCursoAprobado, [usuario_id, curso_id]);
                return res.json(result);
            }
        );
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al quitar curso aprobado" });
    }
}