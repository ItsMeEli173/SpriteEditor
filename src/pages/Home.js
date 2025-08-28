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
      {/* Introducción */}
      <section className="intro-section" style={{maxWidth: '900px', margin: '32px auto 24px auto', background: '#fff', borderRadius: '16px', boxShadow: '0 2px 12px rgba(26,35,126,0.08)', padding: '32px 24px'}}>
        <h1 style={{color: '#1a237e', fontSize: '2.2em', marginBottom: '18px'}}>¿Quieres diseñar y crear desde cero una imagen pixel art o sprite GRATIS?</h1>
        <div style={{display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap'}}>
          <p style={{fontSize: '1.18em', color: '#222', flex: '1 1 300px', margin: 0}}><b>¡Estás en el lugar indicado!</b> <br></br><br></br> Sprite Editor UAJMS es una herramienta online gratuita y fácil de usar para crear sprites y pixel art sin experiencia previa. <br></br><br></br>
          
          Con Sprite Editor puedes dibujar píxel por píxel, elegir colores, usar paletas de colores automáticas, exportar tus creaciones y aprender sobre teoría del color o simplemente entretenerte un rato. ¡No necesitas conocimientos previos! <b>Solo   selecciona el tamaño, elige una herramienta y comienza a crear.</b>
          </p>

          <img src={require("../assets/sprite4.png")} alt="Ejemplo Sprite 4x4" style={{width: '400px', height: '400px', imageRendering: 'pixelated', borderRadius: '8px', border: '2px solid #3949ab', background: '#e3eafc'}} />
        </div>
      </section>

      {/* ¿Qué es un sprite? y Acerca de */}
      <section className="about-section" style={{maxWidth: '900px', margin: '0 auto 24px auto', background: '#fff', borderRadius: '16px', boxShadow: '0 2px 12px rgba(26,35,126,0.08)', padding: '28px 22px'}}>
        <h2 style={{color: '#3949ab', fontSize: '1.5em'}}>¿Qué es un sprite?</h2>
        <p style={{fontSize: '1.08em', color: '#222'}}>Un <b>sprite</b> es una imagen pequeña o textura utilizada en videojuegos, aplicaciones y animaciones para representar personajes, objetos, íconos o efectos visuales. Los sprites permiten crear gráficos llamativos y personalizables en estilo pixel art.</p>

      </section>

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

      {/* Consejos y teoría del color */}
      <section className="color-theory">
        <h2>¿Cómo uso una paleta de colores?</h2>
        <div className="color-theory-text">
          <p style={{fontSize: '1.08em', color: '#222', marginBottom: '18px'}}>
             Elige una paleta de colores adecuada para tu sprite o imagen. Usa contrastes para destacar elementos importantes y prueba las paletas automáticas para lograr armonía visual. Recuerda que menos colores pueden hacer tu diseño más claro y profesional.
          </p>
          <div style={{marginBottom: '18px', background: '#e3eafc', borderRadius: '10px', padding: '12px 16px'}}>
            <h3 style={{color: '#3949ab', marginTop: 0, marginBottom: '8px'}}>¿De dónde nacen las paletas de colores?</h3>
            <p style={{color: '#222', fontSize: '1.05em', marginBottom: '6px'}}>
              Las paletas de colores que ves aquí se generan a partir del color base que elijas usando reglas de la <b>teoría del color</b>. Por ejemplo, una paleta complementaria toma el color opuesto en el círculo cromático, mientras que una paleta análoga usa colores cercanos al color base. Estas combinaciones se utilizan en arte, diseño gráfico y fotografía para lograr armonía, contraste y efectos visuales atractivos. ¡Explora cada tipo y descubre cómo cambia la atmósfera de tu sprite!
            </p>
          </div>
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

      {/* Consejos para dibujar pixel art */}
      <section className="pixelart-tips" style={{maxWidth: '900px', margin: '0 auto 24px auto', background: '#fff', borderRadius: '16px', boxShadow: '0 2px 12px rgba(26,35,126,0.08)', padding: '28px 22px'}}>
        <h2 style={{color: '#3949ab', fontSize: '1.5em'}}>Tips para dibujar Pixel Art</h2>
        <ul style={{color: '#222', fontSize: '1.08em', marginTop: '12px', paddingLeft: '18px'}}>
          <li><b>Divide la dibujo en figuras geométricas:</b> Antes de dibujar, observa o imagina lo que quieres dibujar y trata de descomponerla en formas simples como círculos, cuadrados y triángulos. Esto te ayudará a planificar la estructura y proporciones de tu sprite.</li>
          <li><b>Empieza con un boceto simple:</b> Dibuja primero el contorno general usando pocos colores y líneas rectas. No te preocupes por los detalles al principio.</li>
          <li><b>Usa la cuadrícula a tu favor:</b> El pixel art se basa en la cuadrícula, así que aprovecha las líneas para alinear y ajustar tus formas.</li>
          <li><b>Agrega detalles y sombras al final:</b> Una vez que tengas la base, añade detalles, luces y sombras para dar profundidad y volumen.</li>
          <h3><center><b>Diviértete!</b></center></h3>
        </ul>
      </section>
    </div>
  );
}

export default Home;
