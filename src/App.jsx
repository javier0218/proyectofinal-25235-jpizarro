import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './paginas/Login';
import Infaltables from './paginas/Infaltables';
import Perfil from './paginas/Perfil';
import Administracion from './paginas/Administracion';
import NoEncontrado from './paginas/NoEncontrado';
import RutaProtegida from './components/RutaProtegida';
import Home from './paginas/Home';
import Ofertas from './paginas/Ofertas';
import ProductList from './paginas/ProductList';
import Carrito from './paginas/Carrito';


function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />     
        <Route path="/login" element={<Login />} />
        <Route path="/ofertas" element={<Ofertas/>} />
        <Route path="/infaltables" element={<Infaltables/>} />
        <Route path="/productos" element={<ProductList/>} />       
  <Route path="/carrito" element={<Carrito/>} />
        <Route path="/perfil/:id" element={
          <RutaProtegida><Perfil /></RutaProtegida>
        } />
        <Route path="/admin" element={
          <RutaProtegida><Administracion /></RutaProtegida>
        } />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
