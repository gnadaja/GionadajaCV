import ExperienciaItem from './ExperienciaItem';

// Experiencia conforma la lista de trabajos usando datos en un array.
// Luego reutiliza el componente ExperienciaItem para cada experiencia.
const experiencias = [
  {
    cargo: 'E-Commerce Developer',
    empresa: 'VOAL',
    ubicacion: 'Argentina',
    periodo: 'Enero 2023 – Presente',
    descripcion:
      'Diseño y gestión de e-commerce con Tiendanube, campañas de Meta Ads, gestión de redes, analítica y optimización de la presencia digital del negocio.',
  },
  {
    cargo: 'Web Developer',
    empresa: 'Crackines',
    ubicacion: 'Argentina',
    periodo: 'Agosto 2024 – Presente',
    descripcion:
      'Diseño y desarrollo de landing pages, mantenimiento continuo del sitio y apoyo en la presencia web de la marca.',
  },
];

function Experiencia() {
  return (
    <section className="section">
      <h2 className="section-title">Experiencia</h2>
      <div className="experience-list">
        {experiencias.map((item) => (
          <ExperienciaItem
            key={`${item.empresa}-${item.periodo}`}
            cargo={item.cargo}
            empresa={item.empresa}
            ubicacion={item.ubicacion}
            periodo={item.periodo}
            descripcion={item.descripcion}
          />
        ))}
      </div>
    </section>
  );
}

export default Experiencia;
