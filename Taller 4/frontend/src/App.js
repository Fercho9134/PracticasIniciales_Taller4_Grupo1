import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Signup.js';
import Login from './Login.js';
import Home from './Home.js';
import Recuperacion from './Recuperacion.js';
import NuevaPublicacion from './NuevaPublicacion.js';
import {Helmet} from 'react-helmet';


function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Inicio</title>
      </Helmet>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/recuperacion' element={<Recuperacion/>}></Route>
          <Route path='/nueva-publicacion' element={<NuevaPublicacion/>}></Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App;
