// src/pages/ShopPage.jsx

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../data/categories";
import { PRODUCTS } from "../data/products"; // 🔥 ADDED

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

export default function ShopPage({
  filtered,
  search,
  setSearch,
  category,
  setCategory,
  wishlist,
  toggleWishlist,
  setQuickView,
  addToCart
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 🔥 🔥 MAIN FIX (AUTO OPEN PRODUCT)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product");

    if (!productId) return;

    const product = PRODUCTS.find(
      (p) => String(p.id) === String(productId)
    );

    if (product) {
      setQuickView(product); // ✅ Opens QuickView automatically

      // 🔥 OPTIONAL: Clean URL after opening
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <div
      style={{
        padding: isMobile ? "1.5rem 1rem" : "2rem 8%",
        background: "transparent"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          marginBottom: "1.8rem",
          gap: "1rem",
          flexWrap: "wrap",
          flexDirection: isMobile ? "column" : "row"
        }}
      >
        <h1
          className="serif"
          style={{
            fontSize: isMobile ? "1.7rem" : "2.4rem",
            fontWeight: 600,
            color: "#fff"
          }}
        >
          All Collections
        </h1>

        <input
          placeholder="🔍 Search styles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "1.5px solid " + c("#e8ddd4"),
            padding: "10px 14px",
            fontFamily: "'Jost', sans-serif",
            fontSize: ".85rem",
            background: c("white"),
            outline: "none",
            borderRadius: 8,
            width: isMobile ? "100%" : 240
          }}
        />
      </div>

      {/* CATEGORY */}
      <div style={{ position: "relative", marginBottom: "2rem" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 20,
            background:
              "linear-gradient(to right, rgba(0,0,0,0.7), transparent)",
            zIndex: 2,
            pointerEvents: "none"
          }}
        />

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 20,
            background:
              "linear-gradient(to left, rgba(0,0,0,0.7), transparent)",
            zIndex: 2,
            pointerEvents: "none"
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            overflowX: "auto",
            paddingBottom: "8px",
            paddingRight: "10px"
          }}
        >
          {CATEGORIES.map((cat) => {
            const active = category === cat;

            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  flex: "0 0 auto",
                  width: isMobile ? "45%" : "auto",
                  padding: "10px",
                  borderRadius: 30,
                  whiteSpace: "nowrap",
                  background: active
                    ? "linear-gradient(90deg, #000, #1a1a2e, #2a0a3d)"
                    : "rgba(0,0,0,0.25)",
                  color: active ? "var(--accent)" : "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: isMobile ? ".75rem" : ".8rem",
                  textTransform: "uppercase"
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRODUCTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(2, 1fr)"
            : "repeat(4, 1fr)",
          gap: isMobile ? "12px" : "1.5rem"
        }}
      >
        {filtered.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            setQuickView={setQuickView}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}