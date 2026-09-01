import { useEffect, useState } from 'react';

// GithubRepos consulta la API pública de GitHub para mostrar repositorios.
// useEffect se usa para ejecutar la petición cuando el componente se monta.
// También se manejan estados de carga y error para mejorar la experiencia.
function GithubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/USERNAME/repos');

        if (!response.ok) {
          throw new Error('No se pudieron cargar los repositorios.');
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError('Ocurrió un error al intentar traer los repositorios de GitHub.');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section className="section">
      <h2 className="section-title">Repositorios de GitHub</h2>

      {loading && <div className="loading">Cargando repositorios...</div>}

      {error && <div className="error">{error}</div>}

      {!loading && !error && repos.length === 0 && (
        <div className="empty">No hay repositorios para mostrar.</div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="github-list">
          {repos.map((repo) => (
            <article key={repo.id} className="repo-card">
              <h3>{repo.name}</h3>
              <p>{repo.description || 'Sin descripción disponible.'}</p>
              <a className="repo-link" href={repo.html_url} target="_blank" rel="noreferrer">
                Ver repositorio
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default GithubRepos;
