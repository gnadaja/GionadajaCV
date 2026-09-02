import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Hero muestra la parte principal del portfolio: nombre, rol y una breve presentación.
function Hero() {
  const { t } = useLanguage();

  return (
    <section className="section hero">
      <div className="hero-text">
        <span className="hero-role">{t('hero_role')}</span>
        <h1>Giovanni<br />Nadaja</h1>
        <p className="hero-intro">{t('hero_intro')}</p>

        <Link to="/portfolio" className="hero-cta">
          {t('hero_cta')}
        </Link>
      </div>

      <div className="hero-card" aria-label={t('hero_contacto')}>
        <div className="code-window-header" aria-hidden="true">
          <span className="window-dot red" />
          <span className="window-dot yellow" />
          <span className="window-dot green" />
        </div>

        <div className="code-window-content">
          <p className="code-line">
            <span className="code-key">const</span> developer = {'{' }
          </p>
          <p className="code-line">&nbsp;&nbsp;name: <span className="code-string">'Giovanni Nadaja'</span>,</p>
          <p className="code-line">
            &nbsp;&nbsp;role: <span className="code-string">'Full Stack Developer Jr'</span>,
          </p>
          <p className="code-line">
            &nbsp;&nbsp;focus: <span className="code-array">['Web Development', 'Backend', 'React.js']</span>,
          </p>
          <p className="code-line">
            &nbsp;&nbsp;passion: <span className="code-string">'Building useful solutions'</span>,
          </p>
          <p className="code-line">
            &nbsp;&nbsp;available: <span className="code-key">true</span>,
          </p>
          <p className="code-line">};</p>

          <div className="code-status-list" aria-label="stack status">
            <div className="code-status-item">
              <span className="status-icon" />
              <span>Frontend</span>
              <span className="status-online">online</span>
            </div>
            <div className="code-status-item">
              <span className="status-icon" />
              <span>Backend</span>
              <span className="status-online">online</span>
            </div>
            <div className="code-status-item">
              <span className="status-icon" />
              <span>Database</span>
              <span className="status-online">online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
