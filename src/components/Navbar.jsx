import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Navbar muestra la navegación global del portfolio, y también los accesos a login/registro.
function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="nav-shell">
        <Link to="/" className="brand">
          Giovanni Nadaja
        </Link>

        <nav className="nav-links" aria-label="Navegación principal">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Portfolio
          </NavLink>
          <NavLink to="/ecommerce" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Demo tienda
          </NavLink>
        </nav>

        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="secondary-btn">
                Iniciar sesión
              </Link>
              <Link to="/registro" className="primary-btn">
                Registrarme
              </Link>
            </>
          ) : (
            <>
              <span className="user-badge">Hola, {user.nombre}</span>
              <button type="button" className="secondary-btn" onClick={logout}>
                Salir
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
