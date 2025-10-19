import React from 'react';
import { Container, Row, Col, Image, Button, Table, Form } from 'react-bootstrap';
import { useCart, useCartDispatch } from '../context/CartContext';

const Carrito = () => {
  const { items } = useCart();
  const dispatch = useCartDispatch();

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleChangeQty = (id, qty) => {
    const q = parseInt(qty, 10) || 1;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: q } });
  };

  const handleClear = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const total = items.reduce((sum, it) => sum + (it.price * (it.quantity || 1)), 0);

  if (!items || items.length === 0) {
    return (
      <Container className="mt-4">
        <h3>Tu carrito está vacío</h3>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h3>Carrito de compras</h3>
          <Table responsive bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <Image src={item.image} alt={item.title} style={{ width: 64, height: 64, objectFit: 'contain' }} rounded />
                      <div className="ms-2">
                        <div>{item.title}</div>
                        <div className="text-muted small">ID: {item.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle">${item.price}</td>
                  <td className="align-middle" style={{ maxWidth: 140 }}>
                    <Form.Control type="number" min={1} value={item.quantity} onChange={(e) => handleChangeQty(item.id, e.target.value)} />
                  </td>
                  <td className="align-middle">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="align-middle">
                    <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Button variant="outline-danger" onClick={handleClear}>Vaciar carrito</Button>
            </div>
            <div>
              <h5>Total: ${total.toFixed(2)}</h5>
              <Button variant="primary">Ir a pagar</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;
