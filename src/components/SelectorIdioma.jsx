import { useEffect } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useLanguage } from '../context/LanguageContext';

// SelectorIdioma es un popup que aparece solo la primera vez si no hay idioma guardado.
function SelectorIdioma({ isOpen, setIsOpen }) {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    if (!localStorage.getItem('idioma')) {
      setIsOpen(true);
    }
  }, [setIsOpen]);

  const elegirIdioma = (idioma) => {
    setLanguage(idioma);
    setIsOpen(false);
  };

  const idiomas = [
    { code: 'AR', value: 'es', label: 'Español' },
    { code: 'US', value: 'en', label: 'English' },
    { code: 'BR', value: 'pt', label: 'Português' },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="language-modal-backdrop">
      <div className="language-modal">
        <div className="language-options">
          {idiomas.map((idioma) => (
            <button key={idioma.value} type="button" onClick={() => elegirIdioma(idioma.value)}>
              <span className="language-flag-item">
                <ReactCountryFlag countryCode={idioma.code} svg style={{ width: '1.5em', height: '1.5em' }} />
              </span>
              {idioma.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectorIdioma;
