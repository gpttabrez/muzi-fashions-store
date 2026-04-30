// src/components/QuickViewModal.jsx

import { useEffect, useState } from "react";

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
    .replace(/#f0e8df/gi, "var(--border)")
    .replace(/#5a4030/gi, "var(--muted)");
};

export default function QuickViewModal({
  quickView,
  setQuickView,
  selectedSize,
  setSelectedSize,
  addToCart,
  toggleWishlist,
  wishlist
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* OVERLAY */}
      <div
        className="overlay"
        onClick={() => setQuickView(null)}
      />

      {/* MODAL */}
      <div
        className="fade-in"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",

          width: isMobile ? "95%" : 720,
          maxHeight: isMobile ? "90vh" : "auto",

          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",

          zIndex: 200,
          borderRadius: 12,
          overflow: "hidden",

          boxShadow: "0 20px 60px rgba(0,0,0,.25)",

          display: "flex",
          flexDirection: isMobile ? "column" : "row"
        }}
      >

        {/* CLOSE */}
        <button
          onClick={() => setQuickView(null)}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(0,0,0,0.6)",
            color: "#fff",
            border: "none",
            width: 32,
            height: 32,
            borderRadius: "50%",
            fontSize: "1.2rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10
          }}
        >
          ×
        </button>

        {/* IMAGE */}
        <div
          style={{
            width: isMobile ? "100%" : 300,
            height: isMobile ? 220 : "auto",
            flexShrink: 0,
            background: "#f5f5f5"
          }}
        >
          <img
            src={quickView.image}
            alt={quickView.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain"
            }}
          />
        </div>

        {/* CONTENT */}
        <div
          style={{
            padding: isMobile ? "1.2rem" : "2.5rem",
            flex: 1,
            overflowY: "auto"
          }}
        >
          {/* HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem"
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: ".7rem",
                  letterSpacing: ".15em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: ".3rem"
                }}
              >
                {quickView.category}
              </div>

              <h2
                className="serif"
                style={{
                  fontSize: isMobile ? "1.4rem" : "1.9rem",
                  fontWeight: 600
                }}
              >
                {quickView.name}
              </h2>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: ".85rem",
              color: c("#5a4030"),
              lineHeight: 1.6,
              marginBottom: "1.2rem"
            }}
          >
            {quickView.description}
          </p>

          {/* PRICE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".8rem",
              flexWrap: "wrap",
              marginBottom: "1.2rem"
            }}
          >
            <span
              className="serif"
              style={{
                fontSize: isMobile ? "1.5rem" : "2rem",
                fontWeight: 600
              }}
            >
              ₹{quickView.price.toLocaleString()}
            </span>

            <span
              style={{
                fontSize: ".85rem",
                color: c("#8a7060"),
                textDecoration: "line-through"
              }}
            >
              ₹{quickView.originalPrice.toLocaleString()}
            </span>

            <span
              style={{
                fontSize: ".75rem",
                background: "#fee2e2",
                color: "#dc2626",
                padding: "4px 8px",
                borderRadius: 6
              }}
            >
              {Math.round(
                (1 - quickView.price / quickView.originalPrice) *
                  100
              )}
              % OFF
            </span>
          </div>

          {/* SIZE */}
          <div style={{ marginBottom: "1.2rem" }}>
            <div
              style={{
                fontSize: ".75rem",
                marginBottom: ".5rem",
                color: c("#5a4030")
              }}
            >
              Select Size
            </div>

            <div
              style={
                isMobile
                  ? {
                      display: "flex",
                      overflowX: "auto",
                      gap: "6px",
                      paddingBottom: "6px"
                    }
                  : {
                      display: "grid",
                      gridTemplateColumns: "repeat(5, 1fr)",
                      gap: "6px"
                    }
              }
            >
              {quickView.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    flex: isMobile ? "0 0 auto" : undefined,

                    // 🔥 REAL FIX HERE
                    width: isMobile ? "fit-content" : "100%",
                    minWidth: isMobile ? "34px" : "100%",

                    padding: isMobile ? "4px 8px" : "8px",
                    fontSize: isMobile ? "0.7rem" : "0.8rem",

                    borderRadius: 12,

                    border:
                      selectedSize === s
                        ? "2px solid var(--accent)"
                        : "1px solid #ccc",

                    background:
                      selectedSize === s
                        ? "var(--accent)"
                        : "#fff",

                    color:
                      selectedSize === s ? "#fff" : "#000",

                    cursor: "pointer",
                    whiteSpace: "nowrap"
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div
            style={{
              display: "flex",
              gap: ".6rem",
              flexDirection: isMobile ? "column" : "row"
            }}
          >
            <button
              className="btn-primary"
              onClick={() =>
                addToCart(
                  quickView,
                  selectedSize || quickView.sizes[0]
                )
              }
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: 6
              }}
            >
              Add to Cart 🛒
            </button>

            <button
              onClick={() => toggleWishlist(quickView.id)}
              style={{
                padding: "12px",
                border: "1.5px solid " + c("#e8ddd4"),
                background: "white",
                cursor: "pointer",
                fontSize: "1.1rem",
                borderRadius: 6
              }}
            >
              {wishlist.includes(quickView.id)
                ? "❤️"
                : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}