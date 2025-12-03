import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Row, Col, Container, Form, InputGroup, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useCartDispatch } from '../context/CartContext';
import { useToast } from '../context/ToastContext';


const ProductList = ({ category = null }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState(''); // immediate input value
    const [debouncedQuery, setDebouncedQuery] = useState(''); // debounced value used for filtering
    const debounceRef = useRef(null);

    useEffect(() => {
        let url = 'https://69092b0b2d902d0651b2dfae.mockapi.io/productos';
        if (category) {
            url = `https://69092b0b2d902d0651b2dfae.mockapi.io/productos/category/${category}`;
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

    // Debounce the query so filtering is efficient while typing
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setDebouncedQuery(query.trim().toLowerCase());
        }, 250);
        return () => clearTimeout(debounceRef.current);
    }, [query]);


    const dispatch = useCartDispatch();
    const { showToast } = useToast();
    const handleAgregarAlCarrito = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
        showToast?.(`Producto "${product.title}" agregado al carrito`);
    }

    // Compute filtered products by name (title) or category, case-insensitive
    const filteredProducts = useMemo(() => {
        if (!debouncedQuery) return products;
        return products.filter(p => {
            const name = (p.title || p.name || '').toString().toLowerCase();
            const cat = (p.category || '').toString().toLowerCase();
            return name.includes(debouncedQuery) || cat.includes(debouncedQuery);
        });
    }, [products, debouncedQuery]);

    if (loading) {
        return <div>Cargando productos...</div>;
    }

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col>
                    <InputGroup>
                        <Form.Control
                            placeholder="Buscar por nombre o categoría (Faldas, Camisas, etc.)"
                            aria-label="Buscar productos"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={() => { setQuery(''); setDebouncedQuery(''); }}>
                            Limpiar
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                {filteredProducts.length === 0 ? (
                    <Col>
                        <div>No se encontraron productos para "{query}"</div>
                    </Col>
                ) : (
                    filteredProducts.map(product => (
                        <Col key={product.id} sm={12} md={6} lg={4} className="mb-4">
                            <ProductCard product={product} agregarAlCarrito={handleAgregarAlCarrito} />   
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default ProductList;

