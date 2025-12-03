import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const API_URL = 'https://69092b0b2d902d0651b2dfae.mockapi.io/productos';

const Admin = () => {
    const [productos, setProductos] = useState([]);
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        stock: "",
        image: "",
    });

    const [editId, setIsEditId] = useState(null);

    //fetch --> obtener los productos
    const getProductos = () => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error('Error fetching products:', err));
    };

    //Cerrar modal
    const handleClose = () => {
        setShow(false);
        setProduct({
            title: "",
            description: "",
            price: "",
            stock: "",
            image: "",
            category: "",
        });
        setIsEditId(null);
    };

    //Abrir modal (acepta product opcional)
    const handleShow = (product) => {
        setShow(true);
        if (product) {
            setProduct({
                ...product, //crear un objeto en paralelo basado en el original, para no mutar el original
                price: Number(product.price),
                stock: Number(product.stock),
            });
            setIsEditId(product.id);
        } else {
            setProduct({
                title: "",
                description: "",
                price: "",
                stock: "",
                image: "",
                category: "",
            });
            setIsEditId(null);
        }
    };

    //Crear o actualizar product
    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...product,
            price: Number(product.price),
            stock: Number(product.stock),
        };

        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `${API_URL}/${editId}` : API_URL;

        fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(productData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(() => {
                handleClose();
                getProductos();
            })
            .catch((err) => console.error('Error saving product:', err));
    }; 

    //Eliminar product
    const handleDelete = (id) => {
        if(!window.confirm('¿Estás seguro de que deseas eliminar este product?')) return;
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'})
            .then((res) => {
                if (!res.ok) { 
                    throw new Error('Error al eliminar el product');
                }
                return res.json();
            })
            .then(() => {
                getProductos();
            })
            .catch((err) => console.error('Error deleting product:', err));
    };

    //Cargar productos al iniciar
    useEffect(() => {
        getProductos();
    }, []);



    return (
        <div className="container mt-4">
            <h2>Administra Los Productos</h2>
            <p></p>
            <p>Crea, Actualiza y Edita los productos a vender.</p>
            <Button variant="primary" className="mb-3" onClick={()=>handleShow()}>
                Agregar Producto
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((product) => (
                        <tr key={product.id}>
                           <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>${Number(product.price).toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>{product.category}</td>
                            <td>
                                {product.image?.startsWith("http") && (//check si la imagen es una URL válida
                                    <img src={product.image} 
                                    alt={product.title} 
                                    style={{ width: '50px',
                                     height: '50px', objectFit: 'contain' }} />
                                )}
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Button size="sm"
                                    variant="secondary"
                                    onClick={() => handleShow(product)}
                                    style={{ flex: 1 }}>
                                        Editar
                                    </Button>
                                    <Button size="sm" variant="danger" onClick={() => handleDelete(product.id)}
                                    style={{ flex: 1 }}>   
                                        Eliminar
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editId ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control
                                value={product.title}
                                onChange={(e) => setProduct({ ...product, title: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={product.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={product.price}
                                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                value={product.stock}
                                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                                required
                            />
                        </Form.Group>
                         <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                value={product.category}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Imagen (URL)</Form.Label>
                            <Form.Control
                                value={product.image}
                                onChange={(e) => setProduct({ ...product, image: e.target.value })}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default Admin;

                                



