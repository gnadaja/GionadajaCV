import { useState } from 'react';
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
