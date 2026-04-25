// src/components/CartSidebar.jsx

/* 🔥 COLOR HELPER */
const c = (v) => {
  if (typeof v !== "string") return v;

  return v
    .replace(/#faf7f4/gi, "var(--bg)")
    .replace(/#ffffff|white/gi, "var(--card)")
    .replace(/#1a0a00/gi, "var(--text)")
    .replace(/#e8ddd4|#d4c5b2/gi, "var(--border)")
    .replace(/#8a7060/gi, "var(--muted)")
    .replace(/#c9a96e/gi, "var(--accent)")
    .replace(/#f0e8df/gi, "var(--border)");
};

export default function CartSidebar({
  cart,
  cartCount,
  total,
  setCartOpen,
  setPage,
  updateQty,
  removeFromCart
}) {
  return (
    <>
      <div className="overlay" onClick={() => setCartOpen(false)} />

      <div
        className="slide-in"
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: 420,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(10px)",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-6px 0 40px rgba(0,0,0,.2)"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem 2rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <h2 className="serif" style={{ fontSize: "1.6rem" }}>
            Your Cart ({cartCount})
          </h2>

          <button
            onClick={() => setCartOpen(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.6rem",
              cursor: "pointer",
              color: "var(--muted)"
            }}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem 2rem" }}>
          {cart.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 0",
                color: "var(--muted)",
                fontFamily: "'Jost', sans-serif"
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒</div>
              Your cart is empty
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  paddingBottom: "1.5rem",
                  borderBottom: "1px solid var(--border)"
                }}
              >
                {/* 🔥 IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: 6
                  }}
                />

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 500,
                      fontSize: ".9rem"
                    }}
                  >
                    {item.name}
                  </div>

                  <div
                    style={{
                      fontSize: ".78rem",
                      color: "var(--muted)",
                      marginBottom: ".5rem"
                    }}
                  >
                    Size: {item.size} · {item.color}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    {/* Qty */}
                    <div style={{ display: "flex", gap: ".5rem" }}>
                      <button
                        onClick={() =>
                          updateQty(item.id, item.size, item.qty - 1)
                        }
                        style={{
                          width: 28,
                          height: 28,
                          border: "1px solid var(--border)",
                          background: "white",
                          cursor: "pointer"
                        }}
                      >
                        −
                      </button>

                      <span>{item.qty}</span>

                      <button
                        onClick={() =>
                          updateQty(item.id, item.size, item.qty + 1)
                        }
                        style={{
                          width: 28,
                          height: 28,
                          border: "1px solid var(--border)",
                          background: "white",
                          cursor: "pointer"
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ fontWeight: 600 }}>
                      ₹{(item.price * item.qty).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() =>
                    removeFromCart(item.id, item.size)
                  }
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--accent)"
                  }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: "1.5rem 2rem", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".8rem" }}>
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.2rem", color: "#16a34a" }}>
              <span>Shipping</span>
              <span>{total > 999 ? "FREE" : "₹99"}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", fontWeight: 600 }}>
              <span>Total</span>
              <span>
                ₹{(total > 999 ? total : total + 99).toLocaleString()}
              </span>
            </div>

            <button
              className="btn-primary"
              onClick={() => {
                setCartOpen(false);
                setPage("checkout");
              }}
              style={{ width: "100%", padding: "14px", borderRadius: 6 }}
            >
              Proceed to Checkout →
            </button>

            <button
              className="btn-outline"
              onClick={() => {
                setCartOpen(false);
                setPage("shop");
              }}
              style={{ width: "100%", padding: "12px", marginTop: ".8rem", borderRadius: 6 }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}