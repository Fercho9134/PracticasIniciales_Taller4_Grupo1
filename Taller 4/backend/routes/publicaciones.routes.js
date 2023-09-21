import express from 'express';
import { cargarPublicaciones, cargarComentarios, nuevoComentario, ObtenerCatedraticos, ObtenerCursos, nuevaPublicacionCatedratico, nuevaPublicacionCurso, cargarPublicacionesCatedratico, cargarPublicacionesCurso, cargarPublicacionesSoloCursos, cargarPublicacionesSoloCatedraticos } from '../controllers/publicacion.controllers.js';

const publicacionRoutes = express.Router();

publicacionRoutes.get('/', cargarPublicaciones);
publicacionRoutes.get('/obtenercomentarios/:id', cargarComentarios);
publicacionRoutes.post('/nuevocomentario', nuevoComentario);
publicacionRoutes.get('/catedraticos', ObtenerCatedraticos);
publicacionRoutes.get('/cursos', ObtenerCursos);
publicacionRoutes.post('/nuevapublicacioncatedratico', nuevaPublicacionCatedratico);
publicacionRoutes.post('/nuevapublicacioncurso', nuevaPublicacionCurso);
publicacionRoutes.get('/cargarpublicacionescatedratico/:id', cargarPublicacionesCatedratico);
publicacionRoutes.get('/cargarpublicacionescurso/:id', cargarPublicacionesCurso);
publicacionRoutes.get('/cargarpublicacionessolocursos', cargarPublicacionesSoloCursos);
publicacionRoutes.get('/cargarpublicacionessolocatedraticos', cargarPublicacionesSoloCatedraticos);



export default publicacionRoutes;
