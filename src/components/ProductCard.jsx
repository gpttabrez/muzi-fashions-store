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
    const base = `
MUZI Fashions

${product.name}

₹${product.price}
Sizes: ${product.sizes?.join(", ") || "Available"}
`;

    const isLowStock = product.stock && product.stock <= 5;
    const isTrending = product.trending;
    const isBestSeller = product.bestSeller;
    const isPremium = product.price >= 2000;

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

    let signalLine = "";

    if (isLowStock) {
      signalLine = "Limited pieces available.";
    } else if (isBestSeller) {
      signalLine = "One of our most in-demand picks.";
    } else if (isTrending) {
      signalLine = "Currently trending.";
    } else if (isPremium) {
      signalLine = "Premium quality. Elevated finish.";
    }

    return `${base}
${getCategoryLine()}
${signalLine ? "\n" + signalLine : ""}

Shop now:
${shareUrl}`;
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

        {/* 🔥 SHARE BUTTONS */}
        <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
          <button onClick={shareWhatsApp}>🟢</button>
          <button onClick={shareFacebook}>🔵</button>
          <button onClick={copyLink}>📋</button>
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