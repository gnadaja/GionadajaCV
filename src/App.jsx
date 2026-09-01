import Hero from './components/Hero';
import Sobre from './components/Sobre';
import Skills from './components/Skills';
import Experiencia from './components/Experiencia';
import Proyectos from './components/Proyectos';
import GithubRepos from './components/GithubRepos';
import Contacto from './components/Contacto';

// App es el componente principal que organiza el portfolio completo.
// Aquí se importan y renderizan todos los bloques del sitio.
function App() {
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

export default App;
