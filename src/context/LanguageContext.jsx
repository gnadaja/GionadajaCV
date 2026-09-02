import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [idioma, setIdioma] = useState(() => {
    const saved = localStorage.getItem('idioma');
    return saved ?? null;
  });

  useEffect(() => {
    if (idioma) {
      localStorage.setItem('idioma', idioma);
    } else {
      localStorage.removeItem('idioma');
    }
  }, [idioma]);

  const t = (clave) => translations[idioma || 'es']?.[clave] ?? translations.es[clave];

  const value = useMemo(
    () => ({
      idioma,
      setLanguage: setIdioma,
      t,
    }),
    [idioma]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }

  return context;
}
