import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCartDispatch } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product, agregarAlCarrito }) => {
    const dispatch = useCartDispatch();

    const { showToast } = useToast();

    const handleAdd = (p) => {
        if (typeof agregarAlCarrito === 'function') {
            // backward compatibility with parent-provided handler
            agregarAlCarrito(p);
            showToast?.(`Producto "${p.title}" agregado al carrito`);
        } else {
            dispatch({ type: 'ADD_ITEM', payload: p });
            showToast?.(`Producto "${p.title}" agregado al carrito`);
        }
    };

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={product.image} alt={product.title} className='card-img-top img-fluid' style={{ height: '200px', objectFit: 'contain' }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: '1rem' }}>{product.title}</Card.Title>
                <Card.Text style={{ fontSize: '0.9rem', flexGrow: 1 }}>{product.description}</Card.Text>
                <Card.Text className="mt-auto"><strong>${product.price}</strong></Card.Text>
                <Button variant="primary" onClick={() => handleAdd(product)}>Agregar al carrito</Button>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;