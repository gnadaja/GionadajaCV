import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, ShoppingBag, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const productosIniciales = [
  { id: 1, nombre: 'Laptop Dev Pro', precio: 1200, icono: '💻', modalidad: 'Laptop', color: 'Azul', nuevo: true },
  { id: 2, nombre: 'Monitor Ultra', precio: 480, icono: '🖥️', modalidad: 'Monitor', color: 'Negro', nuevo: false },
  { id: 3, nombre: 'Teclado Mecánico', precio: 140, icono: '⌨️', modalidad: 'Accesorio', color: 'Blanco', nuevo: true },
  { id: 4, nombre: 'Mouse Premium', precio: 80, icono: '🖱️', modalidad: 'Accesorio', color: 'Negro', nuevo: false },
  { id: 5, nombre: 'Notebook Studio', precio: 890, icono: '📓', modalidad: 'Laptop', color: 'Gris', nuevo: true },
  { id: 6, nombre: 'Webcam Pro', precio: 220, icono: '📷', modalidad: 'Accesorio', color: 'Blanco', nuevo: true },
];

const shippingOptions = {
  standard: { label: 'Envío estándar', cost: 150 },
  express: { label: 'Envío express', cost: 280 },
  pickup: { label: 'Retiro en local', cost: 0 },
};

// EcommerceDemo simula una tienda simple con carrito lateral y suma total en tiempo real.
function EcommerceDemo() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [carrito, setCarrito] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [storeMenuOpen, setStoreMenuOpen] = useState(false);
  const [activeStoreSection, setActiveStoreSection] = useState('inicio');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [filtros, setFiltros] = useState({
    precio: 'todos',
    modalidad: 'todos',
    color: 'todos',
    nuevo: 'todos',
  });

  const totalItems = useMemo(
    () => carrito.reduce((sum, item) => sum + item.cantidad, 0),
    [carrito]
  );

  const totalCompra = useMemo(
    () => carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [carrito]
  );

  const shipping = shippingOptions[shippingMethod];
  const totalConEnvio = totalCompra + shipping.cost;

  const productosFiltrados = useMemo(() => {
    return productosIniciales.filter((producto) => {
      if (filtros.precio !== 'todos') {
        if (filtros.precio === 'hasta-200' && producto.precio > 200) return false;
        if (filtros.precio === '200-500' && (producto.precio < 200 || producto.precio > 500)) return false;
        if (filtros.precio === '500-plus' && producto.precio <= 500) return false;
      }

      if (filtros.modalidad !== 'todos' && producto.modalidad !== filtros.modalidad) return false;
      if (filtros.color !== 'todos' && producto.color !== filtros.color) return false;
      if (filtros.nuevo !== 'todos') {
        const esNuevo = producto.nuevo === true;
        if (filtros.nuevo === 'nuevo' && !esNuevo) return false;
        if (filtros.nuevo === 'usado' && esNuevo) return false;
      }

      return true;
    });
  }, [filtros]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);

      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });

    setDrawerOpen(true);
  };

  const cambiarCantidad = (productoId, delta) => {
    setCarrito((prev) =>
      prev.flatMap((item) => {
        if (item.id !== productoId) {
          return [item];
        }

        const nuevaCantidad = item.cantidad + delta;

        return nuevaCantidad > 0 ? [{ ...item, cantidad: nuevaCantidad }] : [];
      })
    );
  };

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      return;
    }

    navigate('/checkout', {
      state: {
        items: carrito,
        total: totalCompra,
        shippingCost: shipping.cost,
        shippingMethod: shipping.label,
      },
    });
  };

  const cambiarFiltro = (campo, valor) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  };

  const seleccionarCategoria = (modalidad) => {
    setActiveStoreSection('catalogo');
    cambiarFiltro('modalidad', modalidad);
    setTimeout(() => document.getElementById('store-catalog')?.scrollIntoView({ behavior: 'smooth' }), 0);
    setStoreMenuOpen(false);
  };

  const mostrarInicio = () => {
    setActiveStoreSection('inicio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStoreMenuOpen(false);
  };

  return (
    <>
      <div className="demo-page">
        {activeStoreSection === 'inicio' && <section className="store-home" id="store-home">
          <div className="store-home-copy">
            <span className="eyebrow">{t('ecommerce_home_eyebrow')}</span>
            <h1>{t('ecommerce_home_titulo')}</h1>
            <p>{t('ecommerce_home_descripcion')}</p>
            <button type="button" className="primary-btn store-home-cta" onClick={() => document.getElementById('store-catalog')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>{t('ecommerce_home_boton')}</span>
              <ArrowRight size={17} />
            </button>
          </div>
          <div className="store-home-art" aria-hidden="true">
            <span className="home-art-label">YOUR BRAND</span>
            <span className="home-art-number">01</span>
          </div>
        </section>}

        {activeStoreSection === 'inicio' && <section className="store-launches">
          <div className="store-section-heading">
            <div>
              <span className="eyebrow">{t('ecommerce_lanzamientos_eyebrow')}</span>
              <h2>{t('ecommerce_lanzamientos_titulo')}</h2>
            </div>
            <button type="button" className="store-text-link" onClick={() => seleccionarCategoria('todos')}>
              {t('ecommerce_ver_catalogo')} <ArrowRight size={16} />
            </button>
          </div>
          <div className="launch-grid">
            {productosIniciales.slice(0, 3).map((producto) => (
              <article className="launch-card" key={producto.id}>
                <div className="launch-card-image" aria-hidden="true">{producto.icono}</div>
                <div>
                  <span>{producto.modalidad}</span>
                  <h3>{producto.nombre}</h3>
                  <strong>${producto.precio}</strong>
                </div>
                <button type="button" className="launch-add" onClick={() => agregarAlCarrito(producto)} aria-label={`${t('ecommerce_agregar')} ${producto.nombre}`}>
                  <ShoppingBag size={16} />
                </button>
              </article>
            ))}
          </div>
        </section>}

        <div className="demo-header">
          <div className="store-header">
            <button type="button" className="secondary-btn back-btn" onClick={() => navigate('/portfolio')}>
              {t('ecommerce_volver')}
            </button>

            <div className="header-copy">
              <h1>{t('ecommerce_titulo')}</h1>
              <p className="demo-description">{t('ecommerce_descripcion')}</p>
            </div>

          </div>
        </div>

        <div className="store-navbar">
          <button type="button" className="store-brand" onClick={mostrarInicio}>
            <span className="store-brand-mark"><ShoppingBag size={18} /></span>
            <span>YOUR BRAND</span>
          </button>

          <button
            type="button"
            className="store-menu-toggle"
            onClick={() => setStoreMenuOpen((prev) => !prev)}
            aria-label={storeMenuOpen ? t('ecommerce_cerrar_menu') : t('ecommerce_abrir_menu')}
            aria-expanded={storeMenuOpen}
          >
            {storeMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <nav className={`store-nav-links ${storeMenuOpen ? 'open' : ''}`} aria-label={t('ecommerce_navegacion')}>
            <button type="button" className={activeStoreSection === 'inicio' ? 'active' : ''} onClick={mostrarInicio}>{t('ecommerce_nav_inicio')}</button>
            <button type="button" className={activeStoreSection === 'catalogo' ? 'active' : ''} onClick={() => seleccionarCategoria('todos')}>{t('ecommerce_nav_categorias')}</button>
            <button type="button" onClick={() => seleccionarCategoria('Accesorio')}>{t('ecommerce_categoria_accesorios')}</button>
            <button type="button" onClick={() => seleccionarCategoria('Laptop')}>{t('ecommerce_categoria_laptops')}</button>
            <button type="button" onClick={() => seleccionarCategoria('Monitor')}>{t('ecommerce_categoria_monitores')}</button>
          </nav>

          <button type="button" className="store-nav-cart" onClick={() => setDrawerOpen(true)}>
            <ShoppingBag size={17} />
            <span>{t('ecommerce_carrito')}</span>
            <span className="cart-badge">{totalItems}</span>
          </button>
        </div>

        {activeStoreSection === 'catalogo' && <div className="store-layout">
          <aside className="filters-sidebar" aria-label="Filtros de productos">
            <div className="filters-panel">
              <div className="filter-group">
                <label>{t('ecommerce_filtro_precio')}</label>
                <select value={filtros.precio} onChange={(event) => cambiarFiltro('precio', event.target.value)}>
                  <option value="todos">{t('ecommerce_todos')}</option>
                  <option value="hasta-200">Hasta $200</option>
                  <option value="200-500">$200 - $500</option>
                  <option value="500-plus">$500+</option>
                </select>
              </div>

              <div className="filter-group">
                <label>{t('ecommerce_filtro_modalidad')}</label>
                <select value={filtros.modalidad} onChange={(event) => cambiarFiltro('modalidad', event.target.value)}>
                  <option value="todos">{t('ecommerce_todos')}</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Accesorio">Accesorio</option>
                </select>
              </div>

              <div className="filter-group">
                <label>{t('ecommerce_filtro_color')}</label>
                <select value={filtros.color} onChange={(event) => cambiarFiltro('color', event.target.value)}>
                  <option value="todos">{t('ecommerce_todos')}</option>
                  <option value="Azul">Azul</option>
                  <option value="Negro">Negro</option>
                  <option value="Blanco">Blanco</option>
                  <option value="Gris">Gris</option>
                </select>
              </div>

              <div className="filter-group">
                <label>{t('ecommerce_filtro_nuevo')}</label>
                <select value={filtros.nuevo} onChange={(event) => cambiarFiltro('nuevo', event.target.value)}>
                  <option value="todos">{t('ecommerce_todos')}</option>
                  <option value="nuevo">{t('ecommerce_nuevo')}</option>
                  <option value="usado">{t('ecommerce_usado')}</option>
                </select>
              </div>
            </div>
          </aside>

          <div className="catalog-panel" id="store-catalog">
            <div className="product-grid">
              {productosFiltrados.map((producto) => (
                <article key={producto.id} className="product-card">
                  <div className="product-image" aria-hidden="true">
                    {producto.icono}
                  </div>
                  <div className="product-card-header">
                    <h3>{producto.nombre}</h3>
                    <span className={`status-badge ${producto.nuevo ? 'new' : 'used'}`}>
                      {producto.nuevo ? t('ecommerce_nuevo') : t('ecommerce_usado')}
                    </span>
                  </div>
                  <div className="product-meta">
                    <span>{producto.modalidad}</span>
                    <strong>${producto.precio}</strong>
                  </div>
                  <div className="product-meta product-meta-small">
                    <span>{producto.color}</span>
                    <span>{producto.nuevo ? t('ecommerce_nuevo') : t('ecommerce_usado')}</span>
                  </div>
                  <button type="button" className="add-to-cart-btn" onClick={() => agregarAlCarrito(producto)}>
                    {t('ecommerce_agregar')}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>}

        {activeStoreSection === 'inicio' && <section className="store-contact" id="store-contact">
          <div>
            <span className="eyebrow">{t('ecommerce_contacto_eyebrow')}</span>
            <h2>{t('ecommerce_contacto_titulo')}</h2>
            <p>{t('ecommerce_contacto_descripcion')}</p>
          </div>
          <form className="store-contact-form" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="store-contact-name">{t('ecommerce_contacto_nombre')}</label>
            <input id="store-contact-name" type="text" placeholder={t('ecommerce_contacto_placeholder_nombre')} />
            <label htmlFor="store-contact-email">{t('form_email')}</label>
            <input id="store-contact-email" type="email" placeholder={t('ecommerce_contacto_placeholder_email')} />
            <label htmlFor="store-contact-message">{t('ecommerce_contacto_mensaje')}</label>
            <textarea id="store-contact-message" rows="3" placeholder={t('ecommerce_contacto_placeholder_mensaje')} />
            <button type="submit" className="primary-btn">{t('ecommerce_contacto_boton')}</button>
            <small>{t('ecommerce_contacto_nota')}</small>
          </form>
        </section>}

      </div>

      <aside className={`cart-drawer ${drawerOpen ? 'open' : ''}`} aria-label="Carrito de compras">
        <div className="cart-header">
          <h2>{t('ecommerce_tu_carrito')}</h2>
          <button type="button" className="cart-close" onClick={() => setDrawerOpen(false)} aria-label={t('ecommerce_cerrar')}>
            ×
          </button>
        </div>

        {carrito.length === 0 ? (
          <div className="cart-items">
            <p className="empty-cart">{t('ecommerce_vacio')}</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {carrito.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <h4>{item.nombre}</h4>
                    <p>${item.precio} c/u</p>
                  </div>

                  <div className="cart-qty">
                    <button type="button" className="qty-btn" onClick={() => cambiarCantidad(item.id, -1)}>
                      −
                    </button>
                    <span>{item.cantidad}</span>
                    <button type="button" className="qty-btn" onClick={() => cambiarCantidad(item.id, 1)}>
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">${item.precio * item.cantidad}</div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>{t('ecommerce_items')}</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="summary-row">
                <span>{t('ecommerce_envio')}</span>
                <strong>{shipping.label}</strong>
              </div>
              <div className="summary-row">
                <span>{t('ecommerce_costo_envio')}</span>
                <strong>${shipping.cost}</strong>
              </div>
              <div className="summary-row">
                <span>{t('ecommerce_metodo_envio')}</span>
                <select value={shippingMethod} onChange={(event) => setShippingMethod(event.target.value)}>
                  <option value="standard">{t('ecommerce_envio_estandar')}</option>
                  <option value="express">{t('ecommerce_envio_express')}</option>
                  <option value="pickup">{t('ecommerce_retiro_local')}</option>
                </select>
              </div>
              <div className="summary-row total">
                <span>{t('ecommerce_total')}</span>
                <strong>${totalConEnvio}</strong>
              </div>
              <button type="button" className="cart-finish-btn" onClick={finalizarCompra}>
                {t('ecommerce_finalizar')}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default EcommerceDemo;
