import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// GithubRepos consulta la API pública de GitHub para mostrar repositorios.
// useEffect se usa para ejecutar la petición cuando el componente se monta.
// También se manejan estados de carga y error para mejorar la experiencia.
function GithubRepos() {
  const { t } = useLanguage();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const username = 'gnadaja';
        const response = await fetch(`https://api.github.com/users/${username}/repos`);

        if (!response.ok) {
          throw new Error(t('contacto_form_error'));
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(t('contacto_form_error'));
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [t]);

  return (
    <section className="section">
      <h2 className="section-title">{t('github_titulo')}</h2>

      {loading && <div className="loading">{t('contacto_form_loading')}</div>}

      {error && <div className="error">{error}</div>}

      {!loading && !error && repos.length === 0 && (
        <div className="empty">{t('contacto_form_empty')}</div>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="github-list">
          {repos.map((repo) => (
            <article key={repo.id} className="repo-card">
              <h3>{repo.name}</h3>
              <p>{repo.description || t('github_sin_desc')}</p>
              <a className="repo-link" href={repo.html_url} target="_blank" rel="noreferrer">
                {t('github_ver_repo')}
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default GithubRepos;
