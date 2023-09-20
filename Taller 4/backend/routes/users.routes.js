import express from 'express';
import { obtenerUsuarios, obtenerCursosAprobados, obtenerTotalCreditos, actualizarUsuario, agregarCursoAprobado, quitarCursoAprobado } from '../controllers/users.controllers.js';

const userRoutes = express.Router();

userRoutes.get('/:registro', obtenerUsuarios);
userRoutes.get('/cursos/:id', obtenerCursosAprobados);
userRoutes.get('/creditos/:id', obtenerTotalCreditos);
userRoutes.put('/actualizar/', actualizarUsuario);
userRoutes.post('/agregarCursoAprobado', agregarCursoAprobado);
userRoutes.delete('/quitarCursoAprobado', quitarCursoAprobado);

export default userRoutes;