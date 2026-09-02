import { useLanguage } from '../context/LanguageContext';

// Sobre presenta el resumen profesional del desarrollador y su enfoque de trabajo.
function Sobre() {
  const { t } = useLanguage();

  return (
    <section className="section">
      <h2 className="section-title">{t('sobre_titulo')}</h2>
      <p className="about-text">{t('sobre_mi')}</p>
    </section>
  );
}

export default Sobre;
