import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
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

// PortfolioPage mantiene el contenido principal del portfolio existente.
// Se reorganiza dentro de rutas para incorporar login, registro y demo de e-commerce.
function PortfolioPage() {
  return (
    <div className="app-shell">
      <Hero />
      <Sobre />
      <Skills />
      <Experiencia />
      <Proyectos />
      <GithubRepos />
      <Contacto />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="site-shell">
          <Navbar />

          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/ecommerce" element={<EcommerceDemo />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
