import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'https://TU-SITIO.infinityfreeapp.com';

// Login se conecta al backend PHP real y guarda el usuario si la autenticación es exitosa.
// Este flujo es una demostración de portfolio para practicar autenticación, no un sistema de producción.
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const rawText = await response.text();
      let data = {};

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch (error) {
        data = { message: rawText || 'Respuesta inválida del servidor.' };
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || 'Credenciales inválidas.');
      }

      const nombre = data.nombre || data.user?.nombre || formData.email.split('@')[0];

      login({ nombre, email: formData.email });
      setMessage({
        type: 'success',
        text: `Inicio de sesión correcto. Hola, ${nombre}.`,
      });

      setTimeout(() => {
        navigate('/');
      }, 700);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'No se pudo iniciar sesión.',
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Iniciar sesión</h1>
        <p className="auth-description">
          Esta demo de portfolio sirve para practicar autenticación con un backend PHP real.
        </p>

        {message.text && <span className={`message ${message.type}`}>{message.text}</span>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tuemail@example.com"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Ingresar
          </button>
        </form>

        <p className="form-note">
          ¿Todavía no tenés cuenta? <Link to="/registro">Registrate acá</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
