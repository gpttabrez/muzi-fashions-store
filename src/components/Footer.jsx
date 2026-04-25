// src/components/Footer.jsx

import { useEffect, useState } from "react";

export default function Footer() {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
        color: "white",
        padding: isMobile ? "2rem 1.2rem" : "3rem 8%",
        marginTop: "4rem",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "2fr 1fr 1fr",
          gap: isMobile ? "2rem" : "3rem",
          marginBottom: "2rem",
          textAlign: isMobile ? "center" : "left"
        }}
      >
        {/* 🔥 BRAND */}
        <div>
          <div
            className="serif"
            style={{
              fontSize: isMobile ? "1.6rem" : "1.9rem",
              marginBottom: ".5rem"
            }}
          >
            MUZI FASHIONS
          </div>

          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: ".85rem",
              opacity: 0.9,
              lineHeight: 1.7
            }}
          >
            Style That Speaks Confidence.  
            Premium fashion wear crafted for modern trends.  
            Serving Bengaluru since 2020.
          </div>
        </div>

        {/* 🔗 LINKS */}
        <div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: ".75rem",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
              opacity: 0.8
            }}
          >
            Quick Links
          </div>

          {["Shop", "Collections", "About Us", "Contact"].map(
            (l) => (
              <div
                key={l}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: ".9rem",
                  marginBottom: ".6rem",
                  cursor: "pointer",
                  transition: "all .2s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = "1";
                }}
              >
                {l}
              </div>
            )
          )}
        </div>

        {/* 📞 CONTACT */}
        <div>
          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: ".75rem",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              marginBottom: "1rem",
              opacity: 0.8
            }}
          >
            Contact
          </div>

          <div
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: ".9rem",
              lineHeight: 1.8
            }}
          >
            <div>📍 Thanisandra, Bengaluru - 560077</div>
            <div>📞 +91 9591551099</div>
            <div>💬 WhatsApp Available</div>
          </div>
        </div>
      </div>

      {/* 🔻 BOTTOM */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          paddingTop: "1.2rem",
          fontFamily: "'Jost', sans-serif",
          fontSize: ".75rem",
          textAlign: "center",
          opacity: 0.7
        }}
      >
        © 2026 MUZI FASHIONS. All rights reserved.
      </div>
    </footer>
  );
}