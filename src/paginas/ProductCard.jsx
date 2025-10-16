import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, agregarAlCarrito }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={product.image} alt={product.title} className='card-img-top img-fluid' style={{ height: '200px', objectFit: 'contain' }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: '1rem' }}>{product.title}</Card.Title>
                <Card.Text style={{ fontSize: '0.9rem', flexGrow: 1 }}>{product.description}</Card.Text>
                <Card.Text className="mt-auto">${product.price}</Card.Text>
                <Button variant="primary" onClick={() => agregarAlCarrito(product)}>Agregar al carrito</Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;