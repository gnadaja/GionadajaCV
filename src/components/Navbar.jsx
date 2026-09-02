import { useState } from 'react';
import { Globe, LogOut, Menu, User } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import profileImage from '../../images/perfil.jpg';

// Navbar muestra la navegación global del portfolio, y también los accesos a login/registro.
function Navbar({ openLanguageModal }) {
  const { user, logout } = useAuth();
  const { idioma, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const idiomaActual =
    idioma === 'en' ? { code: 'US', label: 'EN' } : idioma === 'pt' ? { code: 'BR', label: 'PT' } : { code: 'AR', label: 'ES' };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="topbar">
      <div className="nav-shell">
        <Link to="/cv" className="brand" onClick={closeMenu}>
          <img src={profileImage} alt="Giovanni Nadaja" className="brand-avatar" />
          <span>Giovanni Nadaja</span>
        </Link>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <Menu size={20} strokeWidth={2.2} />
        </button>

        <div className={`nav-panel ${menuOpen ? 'open' : ''}`}>
          <nav className="nav-links" aria-label="Navegación principal">
            <NavLink to="/cv" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              {t('nav_portfolio')}
            </NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
              {t('nav_demo_tienda')}
            </NavLink>
          </nav>

          <div className="nav-actions">
            <button type="button" className="language-button" onClick={openLanguageModal} aria-label="Cambiar idioma">
              <span className="flag-badge" aria-hidden="true">
                <ReactCountryFlag countryCode={idiomaActual.code} svg style={{ width: '1.2em', height: '1.2em' }} />
              </span>
              <span className="language-short">{idiomaActual.label}</span>
              <Globe size={15} strokeWidth={2} className="language-globe" />
            </button>

            {!user ? (
              <>
                <Link to="/login" className="secondary-btn" onClick={closeMenu}>
                  <User size={16} strokeWidth={2} />
                  <span>{t('nav_iniciar_sesion')}</span>
                </Link>
                <Link to="/registro" className="primary-btn" onClick={closeMenu}>
                  {t('nav_registrarme')}
                </Link>
              </>
            ) : (
              <>
                <span className="user-badge">
                  <User size={16} strokeWidth={2} />
                  <span>
                    {t('nav_hola')}, {user.nombre}
                  </span>
                </span>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  <LogOut size={16} strokeWidth={2} />
                  <span>{t('nav_salir')}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
