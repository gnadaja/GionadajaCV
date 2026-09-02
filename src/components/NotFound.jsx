import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 540, textAlign: 'center' }}>
        <h1>{t('not_found_title')}</h1>
        <p className="auth-description">{t('not_found_message')}</p>

        <Link to="/" className="primary-btn" style={{ display: 'inline-block', marginTop: '1rem' }}>
          {t('not_found_back_home')}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
