import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

// Checkout es una simulación de checkout: valida datos del lado del cliente y muestra
// una confirmación final sin procesar pagos reales. La nota se deja visible para aclararlo.
function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  });
  const [orderCode, setOrderCode] = useState('');

  const cartItems = location.state?.items || [];
  const shippingCost = location.state?.shippingCost || 0;
  const shippingMethod = location.state?.shippingMethod || 'Envío estándar';
  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [cartItems]
  );
  const totalConEnvio = total + shippingCost;

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
      alert(t('checkout_error_tarjeta'));
      return;
    }

    if (!expiryPattern.test(formData.expiry)) {
      alert(t('checkout_error_vencimiento'));
      return;
    }

    if (!cvvPattern.test(formData.cvv)) {
      alert(t('checkout_error_cvv'));
      return;
    }

    if (!formData.cardName.trim()) {
      alert(t('checkout_error_titular'));
      return;
    }

    const generatedOrder = `ORD-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
    setOrderCode(generatedOrder);
  };

  if (orderCode) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <h2>{t('checkout_confirmado')}</h2>
          <p>{t('checkout_gracias')}</p>
          <span className="order-code">
            {t('checkout_orden')}: {orderCode}
          </span>
          <div style={{ marginTop: '20px' }}>
            <button type="button" className="primary-btn" onClick={() => navigate('/ecommerce')}>
              {t('checkout_volver')}
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
          <h1>{t('checkout_titulo')}</h1>
          <p className="checkout-note">{t('checkout_note')}</p>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="cardNumber">{t('checkout_tarjeta')}</label>
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
              <label htmlFor="expiry">{t('checkout_vencimiento')}</label>
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
              <label htmlFor="cvv">{t('checkout_cvv')}</label>
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
              <label htmlFor="cardName">{t('checkout_titular')}</label>
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
              {t('checkout_confirmar')}
            </button>
            <small className="simulation-note">{t('checkout_simulacion')}</small>
          </form>
        </div>

        <aside className="checkout-summary">
          <h2>{t('checkout_resumen')}</h2>
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
          <div className="summary-row">
            <span>{t('checkout_envio')}</span>
            <strong>{shippingMethod}</strong>
          </div>
          <div className="summary-row">
            <span>{t('checkout_costo_envio')}</span>
            <strong>${shippingCost}</strong>
          </div>
          <div className="summary-row total">
            <span>{t('checkout_total')}</span>
            <strong>${totalConEnvio}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
