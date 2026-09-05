import { useState } from 'react';
import { ArrowRight, BarChart3, LayoutDashboard } from 'lucide-react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import SelectorIdioma from './components/SelectorIdioma';
import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Skills from './components/Skills';
import Experiencia from './components/Experiencia';
import Proyectos from './components/Proyectos';
import GithubRepos from './components/GithubRepos';
import Contacto from './components/Contacto';
import Login from './components/Login';
import Register from './components/Register';
import EcommerceDemo from './components/EcommerceDemo';
import StoreDashboard from './components/StoreDashboard';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

// CVPage muestra el curriculum y el contenido profesional completo.
function CVPage() {
  return (
    <div className="app-shell">
      <Hero />
      <Sobre />
      <Skills />
      <Experiencia />
      <Proyectos />
      <GithubRepos />
    </div>
  );
}

// PortfolioPage es la landing de presentación comercial con contacto y CTA a la demo.
function PortfolioPage() {
  const { t } = useLanguage();

  return (
    <div className="app-shell">
      <Contacto />

      <section className="section demo-card">
        <h2 className="section-title">{t('portfolio_demo_tienda')}</h2>
        <p>{t('portfolio_demo_descripcion')}</p>
        <Link to="/ecommerce" className="primary-btn">
          {t('portfolio_demo_tienda_boton')}
        </Link>
      </section>

      <section className="section demo-card store-dashboard-cta">
        <div>
          <span className="eyebrow">{t('ecommerce_dashboard_eyebrow')}</span>
          <h2>{t('ecommerce_dashboard_titulo')}</h2>
          <p>{t('ecommerce_dashboard_descripcion')}</p>
        </div>
        <Link to="/ecommerce/dashboard" className="primary-btn store-dashboard-btn">
          <LayoutDashboard size={18} />
          <span>{t('ecommerce_dashboard_boton')}</span>
          <ArrowRight size={17} />
        </Link>
      </section>

      <section className="section demo-card data-analyst-cta">
        <div>
          <span className="eyebrow">{t('data_analyst_eyebrow')}</span>
          <h2>{t('data_analyst_titulo')}</h2>
          <p>{t('data_analyst_descripcion')}</p>
          <p className="data-analyst-stack">{t('data_analyst_stack')}</p>
        </div>
        <a
          href="https://ai-data-analyst-two.vercel.app/"
          className="primary-btn store-dashboard-btn"
          target="_blank"
          rel="noreferrer"
        >
          <BarChart3 size={18} />
          <span>{t('data_analyst_boton')}</span>
          <ArrowRight size={17} />
        </a>
      </section>
    </div>
  );
}

function App() {
  const [languageModalOpen, setLanguageModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="site-shell">
            <SelectorIdioma isOpen={languageModalOpen} setIsOpen={setLanguageModalOpen} />
            <Navbar openLanguageModal={() => setLanguageModalOpen(true)} />

            <Routes>
              <Route path="/" element={<Navigate to="/cv" replace />} />
              <Route path="/cv" element={<CVPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/ecommerce" element={<EcommerceDemo />} />
              <Route path="/ecommerce/dashboard" element={<StoreDashboard />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
