import React from "react";
import Carousel from "../components/Carousel";
import "../App.css";
import "../pages/Home.css";

function Home({ onSizeSelected }) {
  // Ejemplos visuales de paletas
  const ejemplosPaletas = [
    {
      nombre: "Monocromática",
      colores: ["#3949ab", "#5c6bc0", "#7986cb", "#c5cae9"],
      ejemplo: "Ideal para atmósferas de misterio, tristeza o fantasmas. Ejemplo: Un fantasma azul en diferentes tonos."
    },
    {
      nombre: "Complementaria",
      colores: ["#e53935", "#43a047", "#b71c1c", "#388e3c"],
      ejemplo: "Resalta elementos usando colores opuestos. Ejemplo: Un personaje rojo sobre fondo verde."
    },
    {
      nombre: "Análoga",
      colores: ["#fbc02d", "#fdd835", "#fff176", "#ffd54f"],
      ejemplo: "Cohesión y calma, ideal para paisajes. Ejemplo: Un campo de trigo con tonos amarillos."
    },
    {
      nombre: "Triádica",
      colores: ["#8e24aa", "#039be5", "#fbc02d"],
      ejemplo: "Sprites vivos y alegres. Ejemplo: Un logo retro con morado, azul y amarillo."
    },
    {
      nombre: "Tetrádica",
      colores: ["#e53935", "#43a047", "#fbc02d", "#8e24aa"],
      ejemplo: "Dos pares de complementarios. Ejemplo: Un dragón con rojo, verde, amarillo y morado."
    }
  ];

  return (
    <div className="home-page">
      {/* Carrusel */}
      <section className="carousel-section">
        <h2>Ejemplos de Sprites</h2>
        <Carousel />
      </section>

      {/* Selección de tamaño */}
      <section className="size-selection">
        <h2>Selecciona el tamaño del sprite</h2>
        <div className="size-buttons">
          {[8, 16, 32, 64].map((size) => (
            <button
              key={size}
              className="size-btn"
              onClick={() => onSizeSelected(size)}
            >
              {size}x{size}
            </button>
          ))}
        </div>
      </section>

      {/* Teoría del color y ejemplos */}
      <section className="color-theory">
        <h2>Teoría de Color en Pixel Art</h2>
        <div className="color-theory-text">
          {ejemplosPaletas.map((paleta) => (
            <div key={paleta.nombre}>
              <div className="palette-example">
                <span className="palette-label">{paleta.nombre}</span>
                <div className="palette-colors">
                  {paleta.colores.map((c, i) => (
                    <span key={i} className="palette-color" style={{background: c}} />
                  ))}
                </div>
              </div>
              <p>{paleta.ejemplo}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
