-- Verificar si la base de datos existe antes de crearla
CREATE DATABASE IF NOT EXISTS CursosProfesoresBD;

-- Usar la base de datos
USE CursosProfesoresBD;

-- Verificar si la tabla Usuarios no existe antes de crearla
CREATE TABLE IF NOT EXISTS Usuarios (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    registro_academico VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL
);

-- Verificar si la tabla Catedraticos no existe antes de crearla
CREATE TABLE IF NOT EXISTS Catedraticos (
    catedratico_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    suma_calificaciones DECIMAL(10, 2) DEFAULT 0.0,
    contador_calificaciones INT DEFAULT 0,
    media_calificaciones DECIMAL(3, 2) DEFAULT 0.0
);

-- Verificar si la tabla Cursos no existe antes de crearla
CREATE TABLE IF NOT EXISTS Cursos (
    curso_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_curso VARCHAR(255) NOT NULL,
    creditos INT NOT NULL,
    suma_calificaciones DECIMAL(10, 2) DEFAULT 0.0,
    contador_calificaciones INT DEFAULT 0,
    media_calificaciones DECIMAL(3, 2) DEFAULT 0.0
);

-- Verificar si la tabla CursosAprobados no existe antes de crearla
CREATE TABLE IF NOT EXISTS CursosAprobados (
    usuario_id INT,
    curso_id INT,
    PRIMARY KEY (usuario_id, curso_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(user_id),
    FOREIGN KEY (curso_id) REFERENCES Cursos(curso_id)
);

-- Verificar si la tabla Publicaciones no existe antes de crearla
CREATE TABLE IF NOT EXISTS Publicaciones (
    publicacion_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nombre_usuario VARCHAR(255),
    catedratico_id INT,
    nombre_catedratico VARCHAR(255),
    curso_id INT,
    nombre_curso VARCHAR(255),
    tipo ENUM('Catedratico', 'Curso') NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL,
    calificacion_estrellas DECIMAL(3, 2) CHECK (calificacion_estrellas >= 0 AND calificacion_estrellas <= 5),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(user_id),
    FOREIGN KEY (catedratico_id) REFERENCES Catedraticos(catedratico_id),
    FOREIGN KEY (curso_id) REFERENCES Cursos(curso_id)
);

-- Verificar si la tabla Comentarios no existe antes de crearla
CREATE TABLE IF NOT EXISTS Comentarios (
    comentario_id INT AUTO_INCREMENT PRIMARY KEY,
    publicacion_id INT,
    usuario_id INT,
    nombre_usuario VARCHAR(255),
    registro_academico_usuario VARCHAR(20),
    comentario TEXT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL,
    FOREIGN KEY (publicacion_id) REFERENCES Publicaciones(publicacion_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(user_id)
);