import { useState } from "react";

export default function Navbar({
  page,
  setPage,
  wishlist,
  cartCount,
  setCartOpen
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const isMobile = window.innerWidth < 768;

  const linkStyle = (p) => ({
    cursor: "pointer",
    fontSize: ".9rem",
    letterSpacing: ".12em",
    textTransform: "uppercase",
    color: page === p ? "var(--accent)" : "#ffffff",
    fontWeight: page === p ? 700 : 500
  });

  return (
    <>
      <nav
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.9), rgba(20,20,40,0.9), rgba(40,20,60,0.9))",
          backdropFilter: "blur(10px)",

          // 🔥 FIX: more space on top for desktop
          padding: isMobile ? "6px 1rem" : "12px 2.5rem 8px",

          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}
      >

        {/* LEFT */}
        {isMobile ? (
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ fontSize: "1.4rem", color: "#fff", cursor: "pointer" }}
          >
            ☰
          </div>
        ) : (
          <div style={{ display: "flex", gap: "2rem" }}>
            {["shop", "collections"].map((item) => (
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

        {/* 🔥 CENTER LOGO */}
        <div
          onClick={() => setPage("home")}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",

            // 🔥 FIX: proper vertical placement
            top: isMobile ? "8px" : "10px",

            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <img
            src="/logo.png"
            alt="MUZI"
            style={{
              height: isMobile ? 30 : 48,
              objectFit: "contain"
            }}
          />

          <span
            style={{
              fontSize: isMobile ? "8px" : "12px",
              color: "var(--accent)",
              marginTop: "2px",
              letterSpacing: "1.5px"
            }}
          >
            A World of Possibilities
          </span>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span
            onClick={() => setPage("wishlist")}
            style={{ cursor: "pointer", fontSize: "1.2rem" }}
          >
            ❤️
          </span>

          <button
            className="btn-primary"
            onClick={() => setCartOpen(true)}
            style={{
              padding: isMobile ? "4px 10px" : "6px 16px",
              borderRadius: 8
            }}
          >
            🛒 {!isMobile && "Cart"}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
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
          {["shop", "collections", "wishlist"].map((item) => (
            <span
              key={item}
              style={{ color: "#fff", cursor: "pointer" }}
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