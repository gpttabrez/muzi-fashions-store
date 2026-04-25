// src/pages/CheckoutPage.jsx

export default function CheckoutPage({
  checkoutStep,
  setCheckoutStep,
  setPage,
  setCart,
  cart = []
}) {
  const isMobile = window.innerWidth < 768;

  return (
    <div
      style={{
        padding: isMobile ? "2rem 1rem" : "4rem 6%",
        maxWidth: 1100,
        margin: "0 auto",
        color: "#fff"
      }}
    >
      {/* TITLE */}
      <h1
        className="serif"
        style={{
          fontSize: isMobile ? "1.8rem" : "2.4rem",
          marginBottom: "2rem",
          textAlign: "center",
          color: "#fff"
        }}
      >
        Secure Checkout
      </h1>

      {/* STEPS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: isMobile ? "1rem" : "2rem",
          marginBottom: "2rem",
          flexWrap: "wrap"
        }}
      >
        {["Delivery", "Payment", "Done"].map((step, i) => {
          const stepNum = i + 1;
          const active = checkoutStep === stepNum;

          return (
            <div key={step} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  margin: "0 auto",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 600,
                  background: active
                    ? "linear-gradient(90deg,#000,#1a1a2e,#2a0a3d)"
                    : "rgba(255,255,255,0.15)",
                  color: active ? "var(--accent)" : "#fff",
                  border: "1px solid rgba(255,255,255,0.2)"
                }}
              >
                {stepNum}
              </div>

              <div
                style={{
                  marginTop: ".5rem",
                  fontSize: ".75rem",
                  color: active ? "#fff" : "rgba(255,255,255,0.7)"
                }}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>

      {/* CARD */}
      <div
        style={{
          background: "var(--card)",
          padding: isMobile ? "1.5rem" : "2.5rem",
          borderRadius: 14,
          boxShadow: "0 20px 60px rgba(0,0,0,.08)",
          color: "var(--text)"
        }}
      >
        {/* STEP 1 */}
        {checkoutStep === 1 && (
          <>
            <h2 style={{ marginBottom: "1.2rem" }}>
              Delivery Details
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "1rem"
              }}
            >
              {[
                "Full Name",
                "Phone Number",
                "Email Address",
                "Pincode",
                "Address",
                "City"
              ].map((label) => (
                <input
                  key={label}
                  placeholder={label}
                  style={{
                    gridColumn:
                      label === "Address" && !isMobile
                        ? "1 / -1"
                        : "auto",
                    padding: "12px",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "#fff",
                    fontSize: ".9rem"
                  }}
                />
              ))}
            </div>

            <button
              className="btn-primary"
              onClick={() => setCheckoutStep(2)}
              style={{
                marginTop: "1.5rem",
                width: "100%",
                padding: "12px",
                borderRadius: 8
              }}
            >
              Continue →
            </button>
          </>
        )}

        {/* STEP 2 */}
        {checkoutStep === 2 && (
          <>
            <h2 style={{ marginBottom: "1.2rem" }}>
              Select Payment Method
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr 1fr"
                  : "repeat(4,1fr)",
                gap: "1rem"
              }}
            >
              {/* CARD */}
              <div style={boxDisabled}>
                <div style={{ fontSize: "1.8rem" }}>💳</div>
                <div style={titleDisabled}>Card</div>
                <div style={tagStyle}>Unavailable</div>
              </div>

              {/* UPI */}
              <div
                style={boxActive}
                onClick={() => setCheckoutStep(3)}
              >
                <div style={{ fontSize: "1.8rem" }}>📱</div>
                <div style={titleActive}>UPI</div>
                <div style={subText}>
                  Pay via GPay / PhonePe
                </div>
              </div>

              {/* NET BANKING */}
              <div style={boxDisabled}>
                <div style={{ fontSize: "1.8rem" }}>🏦</div>
                <div style={titleDisabled}>Net Banking</div>
                <div style={tagStyle}>Unavailable</div>
              </div>

              {/* COD */}
              <div
                style={boxActive}
                onClick={() => setCheckoutStep(3)}
              >
                <div style={{ fontSize: "1.8rem" }}>💵</div>
                <div style={titleActive}>Cash on Delivery</div>
                <div style={subText}>
                  Pay at your doorstep
                </div>
              </div>
            </div>

            {/* WHATSAPP */}
            <button
              onClick={() => {
                const phone = "919591551099";

                if (!cart || cart.length === 0) {
                  alert("Cart is empty!");
                  return;
                }

                let message = "Hi MUZI FASHIONS 👋\n\n";
                message += "I would like to place an order:\n\n";

                let total = 0;

                cart.forEach((item, index) => {
                  const subtotal = item.price * item.qty;
                  total += subtotal;

                  message += `${index + 1}. ${item.name}\n`;
                  message += `Size: ${item.size}\n`;
                  message += `Qty: ${item.qty}\n`;
                  message += `Price: ₹${item.price}\n`;
                  message += `Subtotal: ₹${subtotal}\n`;

                  if (item.image) {
                    message += `Image: ${item.image}\n`;
                  }

                  message += `\n--------------------\n\n`;
                });

                message += `Total Amount: ₹${total}\n\n`;
                message += "Please confirm availability 🙂";

                window.open(
                  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
                  "_blank"
                );

                setCheckoutStep(3);
              }}
              style={{
                marginTop: "1.5rem",
                width: "100%",
                padding: "12px",
                borderRadius: 8,
                background: "#25D366",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              💬 Order via WhatsApp
            </button>
          </>
        )}

        {/* STEP 3 */}
        {checkoutStep === 3 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem" }}>🎉</div>

            <h2 style={{ marginTop: "1rem" }}>
              Order Confirmed
            </h2>

            <p style={{ margin: "1rem 0", color: "var(--muted)" }}>
              Your order will arrive in 3–5 days
            </p>

            <button
              className="btn-primary"
              onClick={() => {
                setPage("shop");
                setCart([]);
                setCheckoutStep(1);
              }}
              style={{ padding: "12px 20px" }}
            >
              Back to Shop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* 🔥 STYLES (unchanged) */
const boxActive = {
  padding: "1.5rem",
  borderRadius: 12,
  border: "1px solid var(--border)",
  textAlign: "center",
  background: "#ffffff",
  cursor: "pointer",
  transition: "all .2s",
  color: "#111"
};

const boxDisabled = {
  padding: "1.5rem",
  borderRadius: 12,
  border: "1px solid var(--border)",
  textAlign: "center",
  background: "#f1f1f1",
  color: "#444",
  position: "relative"
};

const titleActive = {
  fontWeight: 600,
  marginTop: "6px"
};

const titleDisabled = {
  fontWeight: 500,
  marginTop: "6px"
};

const subText = {
  fontSize: ".75rem",
  color: "#666"
};

const tagStyle = {
  position: "absolute",
  top: 10,
  right: 10,
  fontSize: ".65rem",
  background: "#ddd",
  color: "#333",
  padding: "4px 8px",
  borderRadius: 20
};