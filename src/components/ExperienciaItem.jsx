// ExperienciaItem es un subcomponente reutilizable para cada puesto laboral.
// Recibe props con la información del trabajo y se encarga de renderizar el bloque.
function ExperienciaItem({ cargo, empresa, ubicacion, periodo, descripcion }) {
  return (
    <article className="experience-item">
      <h3>{cargo}</h3>
      <div className="experience-meta">
        <strong>{empresa}</strong> — {ubicacion} — {periodo}
      </div>
      <p>{descripcion}</p>
    </article>
  );
}

export default ExperienciaItem;
