import React, { useState, useEffect } from 'react';
import { Row, Col, Container, ListGroup } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useCartDispatch } from '../context/CartContext';
import { useToast } from '../context/ToastContext';


const ProductList = ({ category = null }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let url = 'https://fakestoreapi.com/products';
        if (category) {
            url = `https://fakestoreapi.com/products/category/${category}`;
        }

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            }); 
    }, [category]);


    const dispatch = useCartDispatch();
    const { showToast } = useToast();
    const handleAgregarAlCarrito = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
        showToast?.(`Producto "${product.title}" agregado al carrito`);
    }

    if (loading) {
        return <div>Cargando productos...</div>;
    }
    return (
        <Container className="mt-4">
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                        <ProductCard product={product} agregarAlCarrito={handleAgregarAlCarrito} />   
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProductList;

