import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const API_BASE_URL = 'https://TU-SITIO.infinityfreeapp.com';

// Login se conecta al backend PHP real y guarda el usuario si la autenticación es exitosa.
// Este flujo es una demostración de portfolio para practicar autenticación, no un sistema de producción.
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    if (isSubmitting) return;
    setIsSubmitting(true);

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
        throw new Error(data.message || t('login_incorrecto'));
      }

      const nombre = data.nombre || data.user?.nombre || formData.email.split('@')[0];

      login({ nombre, email: formData.email });
      setMessage({
        type: 'success',
        text: `${t('login_exito')} Hola, ${nombre}.`,
      });

      setTimeout(() => {
        navigate('/');
      }, 700);
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || t('login_error'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{t('login_titulo')}</h1>
        <p className="auth-description">{t('login_descripcion')}</p>

        {message.text && <span className={`message ${message.type}`}>{message.text}</span>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="login-email">{t('form_email')}</label>
            <input
              id="login-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('form_placeholder_email')}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">{t('form_password')}</label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('form_placeholder_password')}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? t('auth_loading') : t('form_ingresar')}
          </button>
        </form>

        <p className="form-note">
          {t('form_no_tienes_cuenta')} <Link to="/registro">{t('form_registrate')}</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
