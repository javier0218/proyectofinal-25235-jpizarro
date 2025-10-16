import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LogoLacasti from './LogoCasti';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


export default function Header() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('auth') === 'true';

  const cerrarSesion = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className='navbar-glass'>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span className="me-2 d-inline-flex align-items-center">
            <LogoLacasti size={32} />
          </span>
          <span className="fw-semibold">LACASTI CLOTHES</span>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>

            {isAuth && (
              <>
                <Nav.Link as={Link} to="/perfil/usuario123">Perfil</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {!isAuth ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/carrito" className='text-white'>                  
                  <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                </Nav.Link>
              </>
            ) : (
              <>
                <Button variant="outline-light" onClick={cerrarSesion}>Cerrar sesión</Button>
                
              </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
