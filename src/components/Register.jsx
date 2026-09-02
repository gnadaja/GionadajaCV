import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const API_BASE_URL = 'https://TU-SITIO.infinityfreeapp.com';

// Registro permite crear un usuario nuevo usando el endpoint PHP del backend real.
// La demo es solo para practicar autenticación y no reemplaza un sistema de producción.
function Register() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: t('register_error_password'),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/registro.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
        }),
      });

      const rawText = await response.text();
      let data = {};

      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch (error) {
        data = { message: rawText || 'No se pudo registrar el usuario.' };
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || t('register_error'));
      }

      setMessage({
        type: 'success',
        text: data.message || t('register_exito'),
      });

      setFormData({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || t('register_error'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>{t('register_titulo')}</h1>
        <p className="auth-description">{t('register_descripcion')}</p>

        {message.text && <span className={`message ${message.type}`}>{message.text}</span>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="register-name">{t('form_nombre')}</label>
            <input
              id="register-name"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder={t('form_placeholder_nombre')}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="register-email">{t('form_email')}</label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('form_placeholder_email')}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="register-password">{t('form_password')}</label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('form_placeholder_password')}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="register-confirm-password">{t('form_confirm_password')}</label>
            <input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('form_placeholder_confirm')}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? t('auth_loading') : t('form_crear_cuenta')}
          </button>
        </form>

        <p className="form-note">
          {t('form_ya_tienes_cuenta')} <Link to="/login">{t('register_link')}</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
