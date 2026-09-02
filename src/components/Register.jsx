import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

// Registro usa Supabase cuando está configurado; si no, mantiene una demo local segura para la app.
function Register() {
  const { t } = useLanguage();
  const { login } = useAuth();
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
      if (supabase) {
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              nombre: formData.nombre,
            },
          },
        });

        if (error) {
          throw error;
        }

        const nombre = formData.nombre || formData.email.split('@')[0];

        login({ nombre, email: formData.email });
        setMessage({
          type: 'success',
          text: data.user?.identities?.length ? t('register_exito') : 'Revisa tu correo para confirmar la cuenta.',
        });

        setFormData({
          nombre: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        return;
      }

      const nombre = formData.nombre || formData.email.split('@')[0];

      login({ nombre, email: formData.email });
      setMessage({
        type: 'success',
        text: t('register_exito'),
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
