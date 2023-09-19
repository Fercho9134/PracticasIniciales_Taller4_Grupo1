import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const NuevaPublicacion = () => {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('Catedratico');
  const [nombre, setNombre] = useState('');
  const [calificacion, setCalificacion] = useState(0);
  const [contenido, setContenido] = useState('');
  const [opcionesNombres, setOpcionesNombres] = useState([]); // Para almacenar los nombres de maestros o cursos
  const [idSeleccionado, setIdSeleccionado] = useState(''); // Para almacenar la ID del maestro o curso seleccionado
  const [name, setName] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [idUsuario, setIdUsuario] = useState('');
  const [registroAcademico, setRegistroAcademico] = useState('');

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
    setNombre('');
    setIdSeleccionado(''); // Reiniciar la ID cuando cambie el tipo
  };

  const handleCancelar = () => {
    navigate('/');
  };

  const handleNombreChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedId = selectedOption.getAttribute('data-id');
    setIdSeleccionado(selectedId);
    setNombre(e.target.value);
    console.log(selectedId);
  };
  
  

  // Simula la carga de nombres desde la base de datos (puedes reemplazar esto con tu lógica real)

  useEffect(() => {
    axios.get('http://localhost:8081')
      .then(res => {
        if (res.data.valid) {
          setName(res.data.user.nombres);
          setApellidos(res.data.user.apellidos);
          setIdUsuario(res.data.user.user_id);
          setRegistroAcademico(res.data.user.registro_academico);
        } else {
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (tipo === 'Catedratico') {
      // Cargar nombres de maestros desde la base de datos
      axios.get('http://localhost:8081/publicaciones/catedraticos')
        .then(res => {
          setOpcionesNombres(res.data.map(catedratico => ({
            id: catedratico.catedratico_id,
            nombre: catedratico.nombre
          })));
        })
        .catch(err => console.log(err));
    } else if (tipo === 'Curso') {
      // Cargar nombres de cursos desde la base de datos
      axios.get('http://localhost:8081/publicaciones/cursos')
        .then(res => {
          setOpcionesNombres(res.data.map(Curso => ({
            id: Curso.curso_id,
            nombre: Curso.nombre_curso
          })));
        })
        .catch(err => console.log(err));
    }
  }, [tipo]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("A")
    if (tipo === 'Catedratico') {
        const nuevaPublicacion = {
            usuario_id: idUsuario,
            nombre_usuario: name + ' ' + apellidos,
            catedratico_id: idSeleccionado,
            nombre_catedratico: nombre,
            tipo,
            mensaje: contenido,
            fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
            calificacion_estrellas: calificacion
          };
          console.log(nuevaPublicacion)
      axios.post('http://localhost:8081/publicaciones/nuevapublicacioncatedratico', nuevaPublicacion)
        .then(res => {
            console.log(res.data)
          if (res.data.success) {
            alert('Publicación creada exitosamente');
            navigate('/');
          }
        })
        .catch(err => console.log(err));
    } else if (tipo === 'Curso') {
        const nuevaPublicacion = {
            usuario_id: idUsuario,
            nombre_usuario: name + ' ' + apellidos,
            curso_id: idSeleccionado,
            nombre_curso: nombre,
            tipo,
            mensaje: contenido,
            fecha_creacion: new Date().toISOString().slice(0, 19).replace('T', ' '),
            calificacion_estrellas: calificacion
          };
      axios.post('http://localhost:8081/publicaciones/nuevapublicacioncurso', nuevaPublicacion)
        .then(res => {
          if (res.data.success) {
            alert('Publicación creada exitosamente');
            navigate('/');
          }
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="nueva-publicacion">
      <h2>Nueva Publicación</h2>
      <Helmet>
                <title>Nueva publicacion</title>
            </Helmet>
      <form>
        <div className="form-group">
          <label>Tipo de Publicación:</label>
          <select value={tipo} onChange={handleTipoChange}>
            <option value="Catedratico">Catedratico</option>
            <option value="Curso">Curso</option>
          </select>
        </div>

        <div className="form-group">
          <label>Nombre del {tipo === 'Catedratico' ? 'Catedratico' : 'Curso'}:</label>
          <select value={nombre} onChange={handleNombreChange}>
            <option value="" data-id="">
              Selecciona un {tipo === 'Catedratico' ? 'Catedratico' : 'Curso'}
            </option>
            {opcionesNombres.map((opcion) => (
              <option key={opcion.id} value={opcion.nombre} data-id={opcion.id}>
                {opcion.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Calificación (0-5):</label>
          <input
            type="number"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            min="0"
            max="5"
          />
        </div>

        <div className="form-group">
          <label>Contenido de la Publicación:</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows="4"
          />
        </div>

        <div className="botones">
          <button type="submit" onClick={handleSubmit}>Publicar</button>
          <button type="button" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevaPublicacion;
