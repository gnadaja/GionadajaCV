import { useState } from 'react';
import { submitCvRequest } from '../lib/supabase';
import { useLanguage } from '../context/LanguageContext';

// Contacto usa Supabase cuando está configurado; en caso contrario mantiene una respuesta demo segura.
function Contacto() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
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
    setStatus({ type: '', message: '' });

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await submitCvRequest({
        nombre: formData.nombre,
        email: formData.email,
      });

      setStatus({
        type: 'success',
        message: result.message || 'Tu solicitud se envió correctamente.',
      });

      setFormData({ nombre: '', email: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'No se pudo enviar la solicitud.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section contact-card">
      <h2 className="section-title">{t('contacto_titulo')}</h2>
      <p className="contact-demo-note">
        Demo funcional de lo que puede desarrollarse para una web comercial, con formulario integrado
        a backend y envío real de la solicitud.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="nombre">{t('contacto_nombre')}</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            placeholder={t('contacto_placeholder_nombre')}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">{t('form_email')}</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('contacto_placeholder_email')}
            required
          />
        </div>

        {status.message && (
          <div className={status.type === 'success' ? 'success-message' : 'error-message'}>
            {status.message}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? t('auth_loading') : t('contacto_enviar')}
        </button>
      </form>
    </section>
  );
}

export default Contacto;
