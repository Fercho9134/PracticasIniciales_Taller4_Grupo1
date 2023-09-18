const QUERY ={
    REGISTRAR_USUARIO: 'INSERT INTO usuarios (registro_academico, nombres, apellidos, contraseña, correo_electronico) VALUES (?, ?, ?, ?, ?)',
    BUSCAR_USUARIO: 'SELECT * FROM usuarios WHERE registro_academico = ?',
    BUSCAR_USUARIO_REGISTRO_CORREO: 'SELECT * FROM usuarios WHERE registro_academico = ? AND correo_electronico = ?',
    ACTUALIZAR_CONTRASENA: 'UPDATE usuarios SET contraseña = ? WHERE registro_academico = ? AND correo_electronico = ?',
};
export default QUERY;