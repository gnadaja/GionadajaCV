import { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://TU-SITIO.infinityfreeapp.com';

// Registro permite crear un usuario nuevo usando el endpoint PHP del backend real.
// La demo es solo para practicar autenticación y no reemplaza un sistema de producción.
function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Las contraseñas no coinciden.',
      });
      return;
    }

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
        throw new Error(data.message || 'No se pudo completar el registro.');
      }

      setMessage({
        type: 'success',
        text: data.message || 'Usuario registrado con éxito.',
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
        text: error.message || 'Hubo un error al enviar el formulario.',
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Registrarme</h1>
        <p className="auth-description">
          Esta demo de portfolio sirve para practicar autenticación con un backend PHP real.
        </p>

        {message.text && <span className={`message ${message.type}`}>{message.text}</span>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="register-name">Nombre</label>
            <input
              id="register-name"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tuemail@example.com"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="register-confirm-password">Confirmar password</label>
            <input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repetí la contraseña"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Crear cuenta
          </button>
        </form>

        <p className="form-note">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
