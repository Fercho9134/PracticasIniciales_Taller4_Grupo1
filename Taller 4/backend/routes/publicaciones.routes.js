import express from 'express';
import { cargarPublicaciones, cargarComentarios, nuevoComentario } from '../controllers/publicacion.controllers.js';

const publicacionRoutes = express.Router();

publicacionRoutes.get('/', cargarPublicaciones);
publicacionRoutes.get('/obtenercomentarios/:id', cargarComentarios);
publicacionRoutes.post('/nuevocomentario', nuevoComentario);

export default publicacionRoutes;
