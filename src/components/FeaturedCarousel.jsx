import React, { useEffect, useState } from 'react';
import { Carousel, Row, Col, Container } from 'react-bootstrap';
import ProductCard from '../paginas/ProductCard';
import { useCartDispatch } from '../context/CartContext';

const FeaturedCarousel = ({ category = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perPage, setPerPage] = useState(3);

  // Ajustar número de items por slide según ancho de ventana
  useEffect(() => {
    const updatePerPage = () => {
      const w = window.innerWidth;
      if (w < 576) setPerPage(1); // xs
      else if (w < 992) setPerPage(2); // md
      else setPerPage(3); // lg+
    };
    updatePerPage();
    window.addEventListener('resize', updatePerPage);
    return () => window.removeEventListener('resize', updatePerPage);
  }, []);

  useEffect(() => {
    let url = 'https://fakestoreapi.com/products?limit=12';
    if (category) url = `https://fakestoreapi.com/products/category/${category}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching featured products:', err);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <div>Cargando destacados...</div>;
  if (!products || products.length === 0) return <div>No hay productos destacados</div>;

  // Agrupar productos según perPage
  const slides = [];
  for (let i = 0; i < products.length; i += perPage) {
    slides.push(products.slice(i, i + perPage));
  }

  // Iconos SVG personalizados para controles
  const prevIcon = (
    <span aria-hidden="true" style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 18l-6-6 6-6" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const nextIcon = (
    <span aria-hidden="true" style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 6l6 6-6 6" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );

  const dispatch = useCartDispatch();

  return (
    <Container>
      <Carousel variant="dark" interval={4000} pause="hover" nextIcon={nextIcon} prevIcon={prevIcon} indicators>
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <Row className="gx-3">
              {group.map(product => (
                <Col key={product.id} sm={12} md={Math.floor(12 / perPage)} className="mb-3">
                  <ProductCard product={product} agregarAlCarrito={() => dispatch({ type: 'ADD_ITEM', payload: product })} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default FeaturedCarousel;
