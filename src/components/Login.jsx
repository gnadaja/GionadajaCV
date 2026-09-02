import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

// Login utiliza Supabase cuando está configurado y cae a una demo local si no lo está.
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
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          throw error;
        }

        const nombre = data.user.user_metadata?.nombre || data.user.email?.split('@')[0] || 'Usuario';

        login({ nombre, email: data.user.email });
        setMessage({
          type: 'success',
          text: `${t('login_exito')} Hola, ${nombre}.`,
        });

        setTimeout(() => {
          navigate('/');
        }, 700);
        return;
      }

      const nombre = formData.email.split('@')[0];

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
