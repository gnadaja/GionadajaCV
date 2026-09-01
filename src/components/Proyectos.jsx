// Proyectos muestra una lista con diferentes tipos de trabajos y proyectos.
// Se usa renderizado condicional para mostrar si están en curso o finalizados.
const proyectos = [
  {
    nombre: 'Portfolio personal',
    tipo: 'Frontend',
    estado: 'finalizado',
    descripcion: 'Sitio web personal para presentar mi perfil profesional, experiencia y proyectos.',
  },
  {
    nombre: 'Servidor de videojuego',
    tipo: 'Proyecto personal',
    estado: 'en curso',
    descripcion: 'Desarrollo de backbone de servidor de videojuego con C++ y Lua, con base de datos MySQL.',
  },
  {
    nombre: 'Crackines',
    tipo: 'Landing page',
    estado: 'en curso',
    descripcion: 'Diseño y mantenimiento de una página web para una marca con presencia digital activa.',
  },
];

function Proyectos() {
  return (
    <section className="section">
      <h2 className="section-title">Proyectos</h2>
      <div className="project-list">
        {proyectos.map((proyecto) => (
          <article key={proyecto.nombre} className="project-item">
            <h3>{proyecto.nombre}</h3>
            <div className="project-meta">
              <strong>{proyecto.tipo}</strong>
            </div>
            <p>{proyecto.descripcion}</p>

            {proyecto.estado === 'en curso' ? (
              <span className="status active">En curso</span>
            ) : (
              <span className="status finished">Finalizado</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default Proyectos;
