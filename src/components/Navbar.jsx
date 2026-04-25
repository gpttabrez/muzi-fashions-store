// src/components/Navbar.jsx

import { useEffect, useState } from "react";

export default function Navbar({
  page,
  setPage,
  wishlist,
  cartCount,
  setCartOpen
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle = (p) => ({
    cursor: "pointer",
    fontSize: isMobile ? "1rem" : ".9rem",
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: page === p ? "var(--accent)" : "#ffffff",
    fontWeight: page === p ? 700 : 500,
    transition: "all .25s ease"
  });

  return (
    <>
      <nav
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.85), rgba(20,20,40,0.85), rgba(40,20,60,0.85))",
          backdropFilter: "blur(10px)",

          boxShadow: scrolled
            ? "0 8px 30px rgba(0,0,0,0.4)"
            : "none",

          padding: isMobile ? "0 1rem" : "0 2.5rem",
          height: 64,

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          position: "sticky",
          top: 0,
          zIndex: 100
        }}
      >
        {/* 🔥 LEFT (DESKTOP ONLY) */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "2rem" }}>
            {["shop", "collections", "about"].map((item) => (
              <span
                key={item}
                style={linkStyle(item)}
                onClick={() => setPage(item)}
              >
                {item.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        {/* 🔥 MOBILE MENU ICON */}
        {isMobile && (
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: "1.5rem",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            ☰
          </div>
        )}

        {/* 🔥 LOGO */}
        <div
          className="serif"
          onClick={() => setPage("home")}
          style={{
            fontSize: isMobile ? "1.2rem" : "1.8rem",
            fontWeight: 700,
            cursor: "pointer",
            color: "#fff",
            textAlign: "center"
          }}
        >
          MUZI FASHIONS

          {!isMobile && (
            <div
              style={{
                fontSize: ".55rem",
                fontFamily: "'Jost', sans-serif",
                letterSpacing: ".25em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginTop: -4
              }}
            >
              Style That Speaks Confidence
            </div>
          )}
        </div>

        {/* 🔥 RIGHT */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {!isMobile && (
            <span
              style={linkStyle("wishlist")}
              onClick={() => setPage("wishlist")}
            >
              Wishlist{" "}
              {wishlist.length > 0 && (
                <span style={{ color: "var(--accent)" }}>
                  ({wishlist.length})
                </span>
              )}
            </span>
          )}

          <button
            className="btn-primary"
            onClick={() => setCartOpen(true)}
            style={{
              padding: isMobile ? "6px 12px" : "9px 22px",
              borderRadius: 8,
              fontSize: isMobile ? ".75rem" : ".9rem"
            }}
          >
            🛒 {isMobile ? "" : "Cart"}
            {cartCount > 0 && (
              <span
                style={{
                  background: "#fff",
                  color: "var(--primary)",
                  borderRadius: "50%",
                  width: 18,
                  height: 18,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: ".65rem",
                  marginLeft: 6,
                  fontWeight: 700
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* 🔥 MOBILE DROPDOWN MENU */}
      {isMobile && menuOpen && (
        <div
          style={{
            background: "#111",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          {["shop", "collections", "about", "wishlist"].map((item) => (
            <span
              key={item}
              style={{
                color: "#fff",
                fontSize: "1rem",
                cursor: "pointer"
              }}
              onClick={() => {
                setPage(item);
                setMenuOpen(false);
              }}
            >
              {item.toUpperCase()}
            </span>
          ))}
        </div>
      )}
    </>
  );
}