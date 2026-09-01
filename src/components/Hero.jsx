// Hero muestra la parte principal del portfolio: nombre, rol y una breve presentación.
function Hero() {
  return (
    <section className="section hero">
      <div className="hero-text">
        <span className="hero-role">Full Stack Junior Developer</span>
        <h1>Giovanni Nadaja</h1>
        <p className="hero-intro">
          Desarrollador Full Stack autodidacta, con experiencia práctica en desarrollo web,
          WordPress, e-commerce y marketing digital. Me gusta resolver problemas reales con
          herramientas modernas y mantener un flujo de trabajo ágil.
        </p>

        <div className="hero-meta">
          <span className="badge">Argentina</span>
          <span className="badge">Autodidacta</span>
          <span className="badge">IA en mi workflow</span>
        </div>
      </div>

      <div className="hero-card">
        <h3>Datos de contacto</h3>
        <ul>
          <li>Email: gnadaja2507@gmail.com</li>
          <li>LinkedIn: linkedin.com/in/gionadaja</li>
          <li>Idiomas: Español, Português, Inglés</li>
        </ul>
      </div>
    </section>
  );
}

export default Hero;
