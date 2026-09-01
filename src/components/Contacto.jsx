import { useState } from 'react';

// Contacto maneja un formulario controlado con useState.
// En este caso solo se muestran los datos en consola, porque no hay backend.
function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí guardamos los datos del formulario en la consola del navegador.
    // Esto sirve para simular el envío sin backend.
    console.log('Formulario enviado:', formData);

    // Se limpia el formulario después del envío.
    setFormData({
      nombre: '',
      email: '',
      mensaje: '',
    });
  };

  return (
    <section className="section">
      <h2 className="section-title">Contacto</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tuemail@example.com"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Escribí tu mensaje..."
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Enviar mensaje
        </button>
      </form>
    </section>
  );
}

export default Contacto;
