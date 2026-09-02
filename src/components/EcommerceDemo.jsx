import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const productosIniciales = [
  { id: 1, nombre: 'Laptop Dev Pro', precio: 1200, icono: '💻' },
  { id: 2, nombre: 'Monitor Ultra', precio: 480, icono: '🖥️' },
  { id: 3, nombre: 'Teclado Mecánico', precio: 140, icono: '⌨️' },
  { id: 4, nombre: 'Mouse Premium', precio: 80, icono: '🖱️' },
];

// EcommerceDemo simula una tienda simple con carrito lateral y suma total en tiempo real.
function EcommerceDemo() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const totalItems = useMemo(
    () => carrito.reduce((sum, item) => sum + item.cantidad, 0),
    [carrito]
  );

  const totalCompra = useMemo(
    () => carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
    [carrito]
  );

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);

      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });

    setDrawerOpen(true);
  };

  const cambiarCantidad = (productoId, delta) => {
    setCarrito((prev) =>
      prev.flatMap((item) => {
        if (item.id !== productoId) {
          return [item];
        }

        const nuevaCantidad = item.cantidad + delta;

        return nuevaCantidad > 0 ? [{ ...item, cantidad: nuevaCantidad }] : [];
      })
    );
  };

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      return;
    }

    navigate('/checkout', {
      state: {
        items: carrito,
        total: totalCompra,
      },
    });
  };

  return (
    <>
      <div className="demo-page">
        <div className="demo-header">
          <div className="store-header">
            <div>
              <h1>Demo de tienda</h1>
              <p className="demo-description">
                Carrito de compras de práctica para mostrar catálogo, cantidades y resumen total.
              </p>
            </div>

            <button type="button" className="cart-toggle" onClick={() => setDrawerOpen((prev) => !prev)}>
              Carrito
              <span className="cart-badge">{totalItems}</span>
            </button>
          </div>
        </div>

        <div className="product-grid">
          {productosIniciales.map((producto) => (
            <article key={producto.id} className="product-card">
              <div className="product-image" aria-hidden="true">
                {producto.icono}
              </div>
              <h3>{producto.nombre}</h3>
              <div className="product-meta">
                <span>Precio</span>
                <strong>${producto.precio}</strong>
              </div>
              <button type="button" className="add-to-cart-btn" onClick={() => agregarAlCarrito(producto)}>
                Agregar al carrito
              </button>
            </article>
          ))}
        </div>
      </div>

      <aside className={`cart-drawer ${drawerOpen ? 'open' : ''}`} aria-label="Carrito de compras">
        <div className="cart-header">
          <h2>Tu carrito</h2>
          <button type="button" className="cart-close" onClick={() => setDrawerOpen(false)}>
            Cerrar
          </button>
        </div>

        {carrito.length === 0 ? (
          <div className="cart-items">
            <p className="empty-cart">Todavía no agregaste productos.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {carrito.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <h4>{item.nombre}</h4>
                    <p>${item.precio} c/u</p>
                  </div>

                  <div className="cart-qty">
                    <button type="button" className="qty-btn" onClick={() => cambiarCantidad(item.id, -1)}>
                      −
                    </button>
                    <span>{item.cantidad}</span>
                    <button type="button" className="qty-btn" onClick={() => cambiarCantidad(item.id, 1)}>
                      +
                    </button>
                  </div>

                  <div className="cart-item-total">${item.precio * item.cantidad}</div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Items</span>
                <strong>{totalItems}</strong>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <strong>${totalCompra}</strong>
              </div>
              <button type="button" className="cart-finish-btn" onClick={finalizarCompra}>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default EcommerceDemo;
