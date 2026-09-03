import { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  CircleDollarSign,
  LayoutDashboard,
  Menu,
  Package,
  Plus,
  Settings,
  ShoppingCart,
  Store,
  UserRound,
  Users,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function StoreDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('metricas');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productForm, setProductForm] = useState({ name: '', price: '' });
  const [products, setProducts] = useState([
    { name: 'Laptop Dev Pro', price: '$1.200' },
    { name: 'Monitor Ultra', price: '$480' },
    { name: 'Teclado Mecánico', price: '$140' },
  ]);

  const metrics = [
    { label: t('dashboard_ventas'), value: '$12.480', change: '+18,4%', icon: CircleDollarSign },
    { label: t('dashboard_pedidos'), value: '184', change: '+12,8%', icon: ShoppingCart },
    { label: t('dashboard_clientes'), value: '1.284', change: '+9,2%', icon: Users },
    { label: t('dashboard_productos'), value: '36', change: t('dashboard_activos'), icon: Package },
  ];

  const sales = [
    { order: '#1048', customer: 'Ana Martínez', product: 'Laptop Dev Pro', amount: '$1.200', status: t('dashboard_completada') },
    { order: '#1047', customer: 'Lucas Gómez', product: 'Monitor Ultra', amount: '$480', status: t('dashboard_completada') },
    { order: '#1046', customer: 'Sofía Ruiz', product: 'Teclado Mecánico', amount: '$140', status: t('dashboard_pendiente') },
    { order: '#1045', customer: 'Mateo Silva', product: 'Webcam Pro', amount: '$220', status: t('dashboard_completada') },
  ];

  const sidebarItems = [
    { id: 'metricas', label: t('dashboard_nav_metricas'), icon: LayoutDashboard },
    { id: 'productos', label: t('dashboard_nav_productos'), icon: Package },
    { id: 'ventas', label: t('dashboard_nav_ventas'), icon: ShoppingCart },
    { id: 'clientes', label: t('dashboard_nav_clientes'), icon: Users },
    { id: 'settings', label: t('dashboard_nav_settings'), icon: Settings },
  ];

  const changeSection = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  const addProduct = (event) => {
    event.preventDefault();

    if (!productForm.name.trim() || !productForm.price.trim()) return;

    setProducts((currentProducts) => [
      ...currentProducts,
      { name: productForm.name.trim(), price: `$${productForm.price.trim()}` },
    ]);
    setProductForm({ name: '', price: '' });
  };

  const renderMetrics = () => (
    <>
      <section className="dashboard-metrics" aria-label={t('dashboard_metricas')}>
        {metrics.map(({ label, value, change, icon: Icon }) => (
          <article key={label} className="dashboard-metric">
            <div className="dashboard-metric-icon"><Icon size={19} /></div>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{change}</small>
          </article>
        ))}
      </section>

      <section className="dashboard-panels">
        <article className="dashboard-panel sales-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>{t('dashboard_ventas_titulo')}</h2>
              <p>{t('dashboard_ventas_periodo')}</p>
            </div>
            <strong>$12.480</strong>
          </div>
          <div className="sales-chart" aria-hidden="true">
            <div className="chart-bars">
              {[42, 58, 49, 72, 64, 84, 76].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
            </div>
            <div className="chart-labels">
              <span>{t('dashboard_lun')}</span><span>{t('dashboard_mar')}</span><span>{t('dashboard_mie')}</span><span>{t('dashboard_jue')}</span><span>{t('dashboard_vie')}</span><span>{t('dashboard_sab')}</span><span>{t('dashboard_dom')}</span>
            </div>
          </div>
        </article>

        <article className="dashboard-panel products-panel">
          <div className="dashboard-panel-heading">
            <div>
              <h2>{t('dashboard_productos_titulo')}</h2>
              <p>{t('dashboard_productos_periodo')}</p>
            </div>
          </div>
          {products.slice(0, 3).map((product, index) => (
            <div className="dashboard-product-row" key={`${product.name}-${index}`}>
              <span className="dashboard-product-rank">0{index + 1}</span>
              <span>{product.name}</span>
              <strong>{index === 0 ? `48 ${t('dashboard_unidades')}` : index === 1 ? `35 ${t('dashboard_unidades')}` : `27 ${t('dashboard_unidades')}`}</strong>
            </div>
          ))}
        </article>
      </section>
    </>
  );

  const renderProducts = () => (
    <section className="dashboard-section-content">
      <div className="dashboard-section-heading">
        <div>
          <span className="eyebrow">{t('dashboard_nav_productos')}</span>
          <h2>{t('dashboard_productos_gestion')}</h2>
          <p>{t('dashboard_productos_gestion_desc')}</p>
        </div>
        <button type="button" className="primary-btn dashboard-add-button" onClick={() => document.getElementById('product-name')?.focus()}>
          <Plus size={17} /> {t('dashboard_subir_producto')}
        </button>
      </div>

      <div className="dashboard-products-layout">
        <form className="dashboard-panel product-form" onSubmit={addProduct}>
          <h3>{t('dashboard_nuevo_producto')}</h3>
          <label htmlFor="product-name">{t('dashboard_nombre_producto')}</label>
          <input id="product-name" value={productForm.name} onChange={(event) => setProductForm({ ...productForm, name: event.target.value })} placeholder={t('dashboard_placeholder_producto')} />
          <label htmlFor="product-price">{t('dashboard_precio_producto')}</label>
          <input id="product-price" inputMode="decimal" value={productForm.price} onChange={(event) => setProductForm({ ...productForm, price: event.target.value })} placeholder="0" />
          <button type="submit" className="primary-btn"><Plus size={16} /> {t('dashboard_agregar_producto')}</button>
          <small>{t('dashboard_producto_demo_nota')}</small>
        </form>

        <div className="dashboard-panel product-list">
          <div className="dashboard-panel-heading"><div><h2>{t('dashboard_catalogo')}</h2><p>{products.length} {t('dashboard_productos_cargados')}</p></div></div>
          {products.map((product, index) => (
            <div className="dashboard-product-row" key={`${product.name}-${index}`}>
              <span className="dashboard-product-rank">{String(index + 1).padStart(2, '0')}</span>
              <span>{product.name}</span>
              <strong>{product.price}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderSales = (showCustomers = false) => (
    <section className="dashboard-section-content">
      <div className="dashboard-section-heading">
        <div>
          <span className="eyebrow">{showCustomers ? t('dashboard_nav_clientes') : t('dashboard_nav_ventas')}</span>
          <h2>{showCustomers ? t('dashboard_clientes_titulo') : t('dashboard_ventas_lista_titulo')}</h2>
          <p>{showCustomers ? t('dashboard_clientes_desc') : t('dashboard_ventas_lista_desc')}</p>
        </div>
      </div>
      <div className="dashboard-panel dashboard-table-wrap">
        <div className="dashboard-table-head"><span>{t('dashboard_orden')}</span><span>{t('dashboard_comprador')}</span><span>{t('dashboard_pedido')}</span><span>{t('dashboard_importe')}</span><span>{t('dashboard_estado')}</span></div>
        {sales.map((sale) => (
          <div className="dashboard-table-row" key={sale.order}>
            <strong>{sale.order}</strong><span>{sale.customer}</span><span>{sale.product}</span><strong>{sale.amount}</strong><span className={`table-status ${sale.status === t('dashboard_pendiente') ? 'pending' : ''}`}>{sale.status}</span>
          </div>
        ))}
      </div>
    </section>
  );

  const renderSettings = () => (
    <section className="dashboard-section-content">
      <div className="dashboard-section-heading"><div><span className="eyebrow">{t('dashboard_nav_settings')}</span><h2>{t('dashboard_settings_titulo')}</h2><p>{t('dashboard_settings_desc')}</p></div></div>
      <div className="dashboard-panel settings-panel">
        <div className="settings-row"><div><strong>{t('dashboard_store_name')}</strong><span>{t('dashboard_store_name_desc')}</span></div><input value="YOUR BRAND" readOnly /></div>
        <div className="settings-row"><div><strong>{t('dashboard_notifications')}</strong><span>{t('dashboard_notifications_desc')}</span></div><input type="checkbox" defaultChecked /></div>
        <div className="settings-row"><div><strong>{t('dashboard_currency')}</strong><span>{t('dashboard_currency_desc')}</span></div><select defaultValue="USD"><option>USD</option><option>ARS</option><option>EUR</option></select></div>
      </div>
    </section>
  );

  return (
    <main className="store-dashboard-page">
      <header className="dashboard-topbar">
        <button type="button" className="dashboard-back" onClick={() => navigate('/portfolio')}>
          <ArrowLeft size={17} />
          <span>{t('dashboard_volver')}</span>
        </button>
        <span className="dashboard-brand"><Store size={16} />YOUR BRAND</span>
        <button type="button" className="dashboard-mobile-menu" onClick={() => setSidebarOpen((prev) => !prev)} aria-label={sidebarOpen ? t('dashboard_cerrar_menu') : t('dashboard_abrir_menu')}>
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <span className="dashboard-live"><span />{t('dashboard_en_vivo')}</span>
      </header>

      <div className="dashboard-shell">
        <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="dashboard-sidebar-label">{t('dashboard_menu')}</div>
          <nav>
            {sidebarItems.map(({ id, label, icon: Icon }) => (
              <button type="button" className={activeSection === id ? 'active' : ''} onClick={() => changeSection(id)} key={id}>
                <Icon size={18} /><span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="dashboard-sidebar-footer"><UserRound size={16} /><span>{t('dashboard_admin')}</span></div>
        </aside>

        <div className="dashboard-content">
        <div className="dashboard-heading">
          <div>
            <span className="eyebrow">{t('dashboard_eyebrow')}</span>
            <h1>{t('dashboard_titulo')}</h1>
            <p>{t('dashboard_descripcion')}</p>
          </div>
          <BarChart3 className="dashboard-heading-icon" size={42} strokeWidth={1.5} />
        </div>
        {activeSection === 'metricas' && renderMetrics()}
        {activeSection === 'productos' && renderProducts()}
        {activeSection === 'ventas' && renderSales()}
        {activeSection === 'clientes' && renderSales(true)}
        {activeSection === 'settings' && renderSettings()}
        </div>
      </div>
    </main>
  );
}

export default StoreDashboard;
