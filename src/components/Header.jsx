import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogoLacasti from './LogoCasti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(localStorage.getItem('auth') === 'true');

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(localStorage.getItem('auth') === 'true');
    };

    // Escucha cambios de storage en otras pestañas
    window.addEventListener('storage', handleStorageChange);
    
    // Escucha cambios en la misma pestaña usando un evento personalizado
    window.addEventListener('authChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('auth');
    setIsAuth(false);
    // Dispara evento personalizado para actualizar en la misma pestaña
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className='navbar-glass' sticky="top">
      <Container fluid className="px-2 px-md-3">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center flex-shrink-0">
          <span className="me-2 d-inline-flex align-items-center">
            <LogoLacasti size={32} />
          </span>
          <span className="fw-semibold d-none d-sm-inline" style={{fontSize: '0.95rem'}}>LACASTI CLOTHES</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-2" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* left group: logo + primary links */}
          <Nav className="me-auto align-items-center nav-left">
            <Nav.Link as={Link} to="/" className="px-2">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos" className="px-2">Productos</Nav.Link>

            {isAuth && (
              <>
                <Nav.Link as={Link} to="/perfil/usuario123" className="px-2 d-none d-md-inline">Perfil</Nav.Link>
                <Nav.Link as={Link} to="/admin" className="px-2 d-none d-md-inline">Admin</Nav.Link>
              </>
            )}
          </Nav>

          {/* right group: login + cart (stay at right) */}
          <Nav className="d-flex align-items-center nav-right">
            {!isAuth ? (
              <>
                <Nav.Link as={Link} to="/login" className="px-2">Login</Nav.Link>
                <Nav.Link as={Link} to="/carrito" className='text-white px-2' aria-label="Carrito">                  
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/carrito" className='text-white px-2 me-2' aria-label="Carrito">                  
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </Nav.Link>
                <Button variant="outline-light" onClick={cerrarSesion} size="sm">Cerrar</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
