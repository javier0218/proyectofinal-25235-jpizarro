import {Container, Row, Col} from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css';

export default function Footer() {
  return (
    <footer className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
      <Container>
        <Row className="align-items-center">
        <Col md={6}>
          <p className="mb-0 text-center fw-semibold ">LACASTI CLOTHES ONLINE.
            </p>    
            <p className="mb-0 text-center  fw-semibold ">Siguenos a travès de nuestras redes sociales</p>      
        </Col>       
        <Col md={6}>
          <a href="https://www.facebook.com" className="text-white me-3">
            <i className="fa fa-facebook-f fa-2x"></i>
          </a>
          <a href="https://www.twitter.com" className="text-white me-3">
            <i className="fa fa-twitter fa-2x"></i>
          </a>
          <a href="https://www.instagram.com" className="text-white">
            <i className="fa fa-instagram fa-2x"></i>
          </a>
        </Col>
        </Row>
      </Container>
    </footer>
  );
}
