import React from 'react';
import ProductList from './ProductList';
import FeaturedCarousel from '../components/FeaturedCarousel';
import hero from '../assets/hero.svg';
import quality from '../assets/quality.svg';
import secondhand from '../assets/secondhand.svg';

const Home = () => {
    return (
        <main>
            <section className="hero" style={{background: 'linear-gradient(90deg, #fff, #f8fbff)'}}>
                <div style={{maxWidth: 1100, margin: '0 auto', padding: '3rem 1rem', display: 'flex', alignItems: 'center'}}>
                <div style={{flex: 1, paddingRight: '2rem'}}>
                    <h1 style={{fontSize: '2.25rem', marginBottom: '0.5rem'}}>LaCasti Clothes</h1>
                    <p style={{fontSize: '1.05rem', color: '#333', lineHeight: 1.5}}>
                        Somos LaCasti Clothes: una tienda dedicada a la moda circular. Ofrecemos ropa de segunda mano seleccionada
                        con cuidado: prendas en excelente estado, revisadas y listas para lucir. Calidad, sostenibilidad y estilo se
                        encuentran en cada pieza.
                    </p>
                    <ul style={{marginTop: '1rem', paddingLeft: '1.2rem', color: '#333'}}>
                        <li>Inspección rigurosa de cada prenda</li>
                        <li>Selección por estilo y talla</li>
                        <li>Envíos rápidos y embalaje reciclable</li>
                    </ul>
                </div>
                <div style={{flex: 1, textAlign: 'center', paddingLeft: '1rem'}}>
                    <img src={hero} alt="LaCastiClothes hero" style={{maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}} />
                </div>
                </div>
            </section>

            <section className="features" style={{padding: '2rem 1rem'}}>
                <div style={{maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '1rem', justifyContent: 'center'}}>
                <article style={{flex: '0 1 300px', background: '#fff', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 6px 18px rgba(0,0,0,0.04)'}}>
                    <img src={quality} alt="Calidad" style={{width: 72, height: 72}} />
                    <h3 style={{marginTop: '0.6rem'}}>Calidad garantizada</h3>
                    <p style={{color: '#555'}}>Cada prenda pasa por una revisión profesional: sin defectos visibles y con presentación impecable.</p>
                </article>

                <article style={{flex: '0 1 300px', background: '#fff', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 6px 18px rgba(0,0,0,0.04)'}}>
                    <img src={secondhand} alt="Segunda mano" style={{width: 72, height: 72}} />
                    <h3 style={{marginTop: '0.6rem'}}>Moda sostenible</h3>
                    <p style={{color: '#555'}}>Al elegir segunda mano, das nueva vida a prendas con historia y reduces el impacto ambiental.</p>
                </article>

                <article style={{flex: '0 1 300px', background: '#fff', padding: '1.2rem', borderRadius: '10px', boxShadow: '0 6px 18px rgba(0,0,0,0.04)'}}>
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15 8H9L12 2Z" fill="#65d6ff" />
                        <path d="M4 22H20V20C20 16 16 14 12 14C8 14 4 16 4 20V22Z" fill="#ff7eb3" />
                    </svg>
                    <h3 style={{marginTop: '0.6rem'}}>Atención personalizada</h3>
                    <p style={{color: '#555'}}>Te ayudamos a encontrar tallas y estilos que realmente te favorezcan.</p>
                </article>
                </div>
            </section>

            <section className="destacados" style={{padding: '2rem 1rem'}}>
                <div style={{maxWidth: 1100, margin: '0 auto'}}>
                    <h2 style={{marginBottom: '0.5rem'}}>Productos destacados</h2>
                    <p style={{color: '#666', marginBottom: '1rem'}}>Una selección curada para ti — calidad y estilo en cada prenda.</p>
                    <FeaturedCarousel />
                </div>
            </section>
        </main>
    );
}

export default Home;