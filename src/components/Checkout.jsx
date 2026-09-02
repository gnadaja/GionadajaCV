import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Checkout es una simulación de checkout: valida datos del lado del cliente y muestra
// una confirmación final sin procesar pagos reales. La nota se deja visible para aclararlo.
function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  });
  const [orderCode, setOrderCode] = useState('');

  const cartItems = location.state?.items || [];
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [cartItems]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const digits = formData.cardNumber.replace(/\s+/g, '');
    const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const cvvPattern = /^\d{3}$/;

    if (digits.length !== 16 || !/^\d+$/.test(digits)) {
      alert('La tarjeta debe tener 16 dígitos numéricos.');
      return;
    }

    if (!expiryPattern.test(formData.expiry)) {
      alert('La fecha debe tener formato MM/AA.');
      return;
    }

    if (!cvvPattern.test(formData.cvv)) {
      alert('El CVV debe tener 3 dígitos.');
      return;
    }

    if (!formData.cardName.trim()) {
      alert('El nombre del titular es obligatorio.');
      return;
    }

    const generatedOrder = `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    setOrderCode(generatedOrder);
  };

  if (orderCode) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <h2>¡Compra confirmada!</h2>
          <p>Gracias por tu compra. Esta es una simulación y no procesa pagos reales.</p>
          <span className="order-code">N° de orden: {orderCode}</span>
          <div style={{ marginTop: '20px' }}>
            <button type="button" className="primary-btn" onClick={() => navigate('/ecommerce')}>
              Volver a la tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-grid">
        <div className="checkout-card">
          <h1>Finalizar compra</h1>
          <p className="checkout-note">
            Esta es una simulación de checkout para practicar frontend. No se procesan pagos reales.
          </p>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="cardNumber">Número de tarjeta</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(event) => {
                  const digits = event.target.value.replace(/\D/g, '').slice(0, 16);
                  const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
                  handleChange({ target: { name: 'cardNumber', value: formatted } });
                }}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="expiry">Fecha de vencimiento</label>
              <input
                id="expiry"
                name="expiry"
                type="text"
                placeholder="MM/AA"
                value={formData.expiry}
                onChange={(event) => {
                  let value = event.target.value.replace(/\D/g, '').slice(0, 4);
                  if (value.length > 2) {
                    value = `${value.slice(0, 2)}/${value.slice(2)}`;
                  }
                  handleChange({ target: { name: 'expiry', value } });
                }}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                name="cvv"
                type="text"
                inputMode="numeric"
                maxLength="3"
                placeholder="123"
                value={formData.cvv}
                onChange={(event) => handleChange({ target: { name: 'cvv', value: event.target.value.replace(/\D/g, '').slice(0, 3) } })}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="cardName">Nombre del titular</label>
              <input
                id="cardName"
                name="cardName"
                type="text"
                placeholder="Nombre como figura en la tarjeta"
                value={formData.cardName}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="checkout-btn">
              Confirmar compra
            </button>
            <small className="simulation-note">
              Simulación: no se realiza procesamiento real de pagos ni validación bancaria.
            </small>
          </form>
        </div>

        <aside className="checkout-summary">
          <h2>Resumen</h2>
          <div className="summary-list">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-item">
                <span>
                  {item.nombre} x {item.cantidad}
                </span>
                <strong>${item.precio * item.cantidad}</strong>
              </div>
            ))}
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>${total}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
