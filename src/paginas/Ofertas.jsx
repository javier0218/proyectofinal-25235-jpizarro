import React from "react";
import ProductList from "./ProductList";

const Ofertas = () => {
    return (
        <div className="container">
            <h1>Productos Ofertas</h1>
            <ProductList categoria="Ropa Mujeres" />
        </div>
    );
}  

export default Ofertas;