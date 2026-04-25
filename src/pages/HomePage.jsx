// src/pages/HomePage.jsx

/* 🔥 COLOR HELPER */
const c = (v) => {
  if (typeof v !== "string") return v;

  return v
    .replace(/#faf7f4/gi, "var(--bg)")
    .replace(/#ffffff|#fff|white/gi, "var(--card)")
    .replace(/#1a0a00/gi, "var(--text)")
    .replace(/#e8ddd4|#d4c5b2/gi, "var(--border)")
    .replace(/#8a7060/gi, "var(--muted)")
    .replace(/#c9a96e/gi, "var(--accent)");
};

export default function HomePage({ setPage, setCategory }) {

  const isMobile = window.innerWidth < 768;

  return (
    <div>

      {/* 🔥 HERO */}
      <div
        className="hero-bg"
        style={{
          minHeight: isMobile ? "75vh" : "90vh",
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "2rem 1rem" : "4rem 8%",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{ position: "absolute", right: "5%", top: "10%", fontSize: isMobile ? "6rem" : "12rem", opacity: .06 }}>👗</div>
        <div style={{ position: "absolute", right: "20%", bottom: "10%", fontSize: isMobile ? "4rem" : "8rem", opacity: .06 }}>✨</div>

        <div style={{ maxWidth: 600, color: "white" }}>
          
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: isMobile ? ".7rem" : ".8rem",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "1rem"
            }}
          >
            New Collection 2026
          </div>

          <h1
            className="serif"
            style={{
              fontSize: isMobile ? "2.2rem" : "clamp(3rem, 6vw, 5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: "1rem"
            }}
          >
            Elevate Your<br />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
              Style
            </em>
          </h1>

          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: isMobile ? ".9rem" : "1rem",
              color: "#e5e7eb",
              lineHeight: 1.6,
              marginBottom: "1.8rem",
              maxWidth: 420
            }}
          >
            Discover the latest fashion trends at MUZI FASHIONS.  
            Designed for confidence, crafted for modern elegance.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexDirection: isMobile ? "column" : "row"
            }}
          >
            <button
              className="btn-primary"
              onClick={() => setPage("shop")}
              style={{
                padding: isMobile ? "12px" : "14px 36px",
                fontSize: ".82rem",
                borderRadius: 6
              }}
            >
              Shop Now
            </button>

            <button
              style={{
                background: "transparent",
                border: "1.5px solid var(--accent)",
                color: "var(--accent)",
                padding: isMobile ? "12px" : "14px 36px",
                fontSize: ".82rem",
                cursor: "pointer",
                fontFamily: "'Jost', sans-serif",
                letterSpacing: ".08em",
                textTransform: "uppercase",
                borderRadius: 6
              }}
            >
              View Collection
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 CATEGORIES */}
      <div
        style={{
          padding: isMobile ? "3rem 1rem" : "5rem 8%",
          background: "var(--card)"
        }}
      >
        
        <h2
          className="serif"
          style={{
            fontSize: isMobile ? "1.8rem" : "2.5rem",
            fontWeight: 400,
            textAlign: "center",
            marginBottom: ".5rem"
          }}
        >
          Shop by Category
        </h2>

        <div
          style={{
            textAlign: "center",
            color: "var(--accent)",
            marginBottom: "2rem",
            fontFamily: "'Jost', sans-serif",
            fontSize: ".8rem",
            letterSpacing: ".2em",
            textTransform: "uppercase"
          }}
        >
          Curated for every occasion
        </div>

        {/* 🔥 GRID FIX */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "repeat(2, 1fr)"
              : "repeat(4, 1fr)",
            gap: isMobile ? "1rem" : "1.5rem"
          }}
        >
          {[
            { name: "Kurtas", emoji: "👗", desc: "Everyday elegance" },
            { name: "Sarees", emoji: "🥻", desc: "Timeless classics" },
            { name: "Lehengas", emoji: "✨", desc: "Festive wear" },
            { name: "Co-ords", emoji: "👘", desc: "Modern comfort" },
          ].map(cat => (
            <div
              key={cat.name}
              onClick={() => {
                setCategory(cat.name);
                setPage("shop");
              }}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                padding: isMobile ? "1.5rem 1rem" : "2.5rem 1.5rem",
                textAlign: "center",
                cursor: "pointer",
                borderRadius: 8,
                transition: "all .25s"
              }}
            >
              <div style={{ fontSize: isMobile ? "2rem" : "2.5rem", marginBottom: ".8rem" }}>
                {cat.emoji}
              </div>

              <div
                className="serif"
                style={{
                  fontSize: isMobile ? "1rem" : "1.3rem",
                  fontWeight: 600,
                  marginBottom: ".3rem"
                }}
              >
                {cat.name}
              </div>

              <div
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: ".75rem",
                  color: "var(--muted)"
                }}
              >
                {cat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}