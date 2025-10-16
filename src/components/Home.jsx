import React from 'react';
import Productos from '../paginas/Productos';

const Home = () => {
    return (
        <div className="container">
            <h1>Todos los productos</h1>
            <Productos />
        </div>
    );
}

export default Home;