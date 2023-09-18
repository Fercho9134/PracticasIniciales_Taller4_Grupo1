import database from '../config/mysql.config.js';
import bcrypt from 'bcrypt';
import QUERY from '../querys/login.querys.js';

export const login = async (req, res) => {
    const { registroAcademico, contrasena } = req.body;
    try {
        database.query(QUERY.BUSCAR_USUARIO, [registroAcademico], async (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al iniciar sesión" });
            }
            if (result.length > 0) {
                const user = result[0];
                const validPassword = await bcrypt.compare(contrasena, user.contraseña);
                if (validPassword) {
                    req.session.user = user;
                    return res.json({ Login: true });
                } else {
                    return res.json({ Login: false });
                }
            } else {
                return res.json({ Login: false });
            }
        });
    } catch (error) {
        console.log(error);
        return res.json({ error: "Error al iniciar sesión" });
    }
};

export const signup = async (req, res) => {
    const { registroAcademico, nombres, apellidos, contrasena, correoElectronico } = req.body;

    try {
        database.query(QUERY.BUSCAR_USUARIO, [registroAcademico], async (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al registrar usuario" });
            }
            if (result.length > 0) {
                // El registro académico ya se ha utilizado, enviar un mensaje de error
                return res.json({ error: "El registro académico ya se ha utilizado en otra cuenta" });
            } else {
                // El registro académico no se ha utilizado, continuar con el registro
                const hashedPassword = await bcrypt.hash(contrasena, 10); // Hash de la contraseña
                const values = [registroAcademico, nombres, apellidos, hashedPassword, correoElectronico];

                database.query(QUERY.REGISTRAR_USUARIO, values, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.json({ error: "Error al registrar usuario" });
                    }
                    return res.json(result);
                });
            }
        });
    }

    catch (error) {
        console.error(error);
        return res.json({ error: "Error al registrar usuario" });
    }
}

export const logout = (req, res) => {
    try {
        // Destruir la sesión del usuario
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al cerrar sesión" });
            }
            // Sesión de usuario destruida con éxito
            return res.json({ success: true });
        });
    } catch (error) {
        console.error(error);
        return res.json({ error: "Error al cerrar sesión" });
    }
};

export const recuperarContrasena = async (req, res) => {
    const {registroAcademico, correoElectronico, contrasenaNueva} = req.body;
    try {
        database.query(QUERY.BUSCAR_USUARIO_REGISTRO_CORREO, [registroAcademico, correoElectronico], async (err, result) => {
            if (err) {
                console.error(err);
                return res.json({ error: "Error al recuperar contraseña" });
            }
            if (result.length > 0) {
                const hashedPassword = await bcrypt.hash(contrasenaNueva, 10); // Hash de la contraseña
                const values = [hashedPassword, registroAcademico, correoElectronico];
                database.query(QUERY.ACTUALIZAR_CONTRASENA, values, (err, result) => {
                    if (err) {
                        console.error(err);
                        return res.json({ error: "Error al recuperar contraseña" });
                    }
                    return res.json({Exito: true, result});
                });
            } else {
                return res.json({ error: "No se encontró un usuario con los datos proporcionados" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.json({ error: "Error al recuperar contraseña" });
    }
}
