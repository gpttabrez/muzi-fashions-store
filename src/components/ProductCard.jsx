// src/components/ProductCard.js

import { TAG_COLORS } from "../data/tagColors";
import { useState, useEffect } from "react";

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
    .replace(/#f0e8df/gi, "var(--card)");
};

export default function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  setQuickView,
  addToCart
}) {

  /* 🔥 SAFE TAG FIX */
  const tc = TAG_COLORS[product.tag] || {
    background: "#eee",
    color: "#333",
    border: "#ccc"
  };

  const discount = Math.round(
    (1 - product.price / product.originalPrice) * 100
  );

  /* 🔥 MOBILE DETECTION */
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* 🔥 SHARE SYSTEM */
  // ✅ UPDATED HERE
  const shareUrl = `https://muzi-preview.vercel.app/product/${product.id}`;

const getMessage = () => {
  const getCategoryLine = () => {
    switch (product.category?.toLowerCase()) {
      case "shirts":
        return "Sharp. Effortless. Everyday essential.";
      case "tshirts":
        return "Casual comfort meets modern style.";
      case "ethnic":
        return "Tradition redefined with elegance.";
      case "hoodies":
        return "Warm. Bold. Street-ready.";
      case "jeans":
        return "Built for comfort. Styled for impact.";
      case "jackets":
        return "Layer up with confidence.";
      default:
        return "Crafted for style. Designed for confidence.";
    }
  };

  return `${shareUrl}

${product.name} — ₹${product.price}
Sizes: ${product.sizes?.join(", ") || "Available"}

${getCategoryLine()}`;
};

  const message = getMessage();

  const shareWhatsApp = (e) => {
    e.stopPropagation();
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const shareFacebook = (e) => {
    e.stopPropagation();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const copyLink = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(message);
    alert("Product details copied!");
  };

  return (
    <div
      className="product-card"
      style={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all .3s ease",
        boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          height: isMobile ? 150 : 240,
          position: "relative",
          overflow: "hidden"
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />

        {/* ❤️ Wishlist */}
        <button
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          style={{
            width: isMobile ? 26 : 34,
            height: isMobile ? 26 : 34,
            fontSize: isMobile ? ".75rem" : "1rem"
          }}
        >
          {wishlist.includes(product.id) ? "❤️" : "🤍"}
        </button>

        {/* TAG */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: tc.background,
            color: tc.color,
            border: `1px solid ${tc.border}`,
            padding: isMobile ? "3px 7px" : "4px 12px",
            borderRadius: 6,
            fontSize: isMobile ? ".6rem" : ".72rem"
          }}
        >
          {product.tag}
        </div>

        {/* QUICK VIEW */}
        <button
          className="btn-primary"
          onClick={() => setQuickView(product)}
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: isMobile ? "85%" : "auto",
            padding: isMobile ? "8px" : "8px 22px",
            fontSize: ".75rem",
            borderRadius: 6,
            background: isMobile
              ? "rgba(0,0,0,0.7)"
              : "",
            backdropFilter: isMobile ? "blur(6px)" : ""
          }}
        >
          Quick View
        </button>
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: isMobile ? ".6rem" : "1rem",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1
        }}
      >
        <div
          style={{
            fontSize: isMobile ? ".6rem" : ".72rem",
            color: c("#8a7060"),
            letterSpacing: ".08em",
            textTransform: "uppercase",
            marginBottom: ".2rem"
          }}
        >
          {product.category}
        </div>

        <div
          className="serif"
          style={{
            fontSize: isMobile ? ".85rem" : "1.05rem",
            fontWeight: 600,
            marginBottom: ".3rem"
          }}
        >
          {product.name}
        </div>

        {/* PRICE */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: isMobile ? 50 : 60
          }}
        >
          <div style={{ display: "flex", gap: ".4rem" }}>
            <span style={{ fontWeight: 600 }}>
              ₹{product.price.toLocaleString()}
            </span>

            <span
              style={{
                fontSize: ".7rem",
                textDecoration: "line-through",
                color: c("#8a7060")
              }}
            >
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>

          <span
            style={{
              fontSize: ".65rem",
              color: "#ef4444",
              fontWeight: 600
            }}
          >
            {discount}% OFF
          </span>
        </div>

<div
  style={{
    display: "flex",
    gap: "5px",
    marginTop: "4px",
    marginBottom: "4px",
    transform: "translateY(-2px)"
  }}
>

  {/* WhatsApp */}
  <button
    onClick={shareWhatsApp}
    style={{
      background: "#25D366",
      border: "none",
      borderRadius: "50%",
      width: "22px",
      height: "22px",
      minWidth: "22px",
      minHeight: "22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      padding: 0
    }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
      <path d="M20.52 3.48A11.94 11.94 0 0012.06 0C5.5 0 .1 5.4.1 12c0 2.1.55 4.16 1.6 5.97L0 24l6.2-1.62A11.95 11.95 0 0012.06 24c6.56 0 11.94-5.4 11.94-12 0-3.18-1.24-6.17-3.48-8.52zM12.06 21.8c-1.8 0-3.55-.48-5.08-1.4l-.36-.21-3.68.96.98-3.6-.24-.37A9.77 9.77 0 012.3 12c0-5.38 4.37-9.76 9.76-9.76 2.6 0 5.04 1.01 6.87 2.84A9.67 9.67 0 0121.82 12c0 5.38-4.37 9.8-9.76 9.8zm5.36-7.34c-.3-.15-1.77-.88-2.05-.98-.28-.1-.48-.15-.68.15s-.78.98-.96 1.18c-.18.2-.36.23-.66.08-.3-.15-1.26-.47-2.4-1.5-.88-.78-1.47-1.75-1.65-2.05-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.94-2.25-.25-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5s1.08 2.88 1.23 3.08c.15.2 2.13 3.25 5.17 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35z"/>
    </svg>
  </button>

  {/* Facebook */}
  <button
    onClick={shareFacebook}
    style={{
      background: "#1877F2",
      border: "none",
      borderRadius: "50%",
      width: "22px",
      height: "22px",
      minWidth: "22px",
      minHeight: "22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      padding: 0
    }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
      <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-2.9h2V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.6-1.3 1.3v1.6h2.2l-.35 2.9h-1.85v7A10 10 0 0022 12z"/>
    </svg>
  </button>

  {/* Copy */}
  <button
    onClick={copyLink}
    style={{
      background: "#111",
      border: "none",
      borderRadius: "50%",
      width: "22px",
      height: "22px",
      minWidth: "22px",
      minHeight: "22px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      padding: 0
    }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
      <path d="M16 1H4a2 2 0 00-2 2v12h2V3h12V1zm3 4H8a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h11v14z"/>
    </svg>
  </button>

</div>

        {/* ADD TO CART */}
        <button
          className="btn-primary"
          onClick={() =>
            addToCart(product, product.sizes[0])
          }
          style={{
            width: "100%",
            padding: isMobile ? "8px" : "11px",
            fontSize: isMobile ? ".7rem" : ".82rem",
            marginTop: "auto",
            borderRadius: 6
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}