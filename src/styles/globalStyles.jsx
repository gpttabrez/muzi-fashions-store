// src/styles/globalStyles.js

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --primary: #7C3AED;
    --secondary: #06B6D4;
    --accent: #F59E0B;

    --bg: #F9FAFB;
    --card: #FFFFFF;
    --text: #111827;
    --muted: #6B7280;
    --border: #E5E7EB;

    --gradient: linear-gradient(135deg, #7C3AED, #06B6D4);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Jost', sans-serif;
    background: linear-gradient(180deg, #ffffff, #f3f4f6);
    color: var(--text);
  }

  .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .sans { font-family: 'Jost', sans-serif; }

  /* ================= PRODUCT ================= */

  .product-card:hover .product-img {
    transform: scale(1.06);
  }

  .product-card:hover .quick-view-btn {
    opacity: 1;
    transform: translateY(0);
  }

  .quick-view-btn {
    opacity: 0;
    transform: translateY(8px);
    transition: all .3s;
  }

  /* ================= BUTTONS ================= */

  .btn-primary {
    background: var(--gradient);
    color: white;
    border: none;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-weight: 500;
    letter-spacing: .08em;
    text-transform: uppercase;
    transition: all .25s;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(124, 58, 237, 0.35);
  }

  .btn-outline {
    background: transparent;
    color: var(--primary);
    border: 1.5px solid var(--primary);
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-weight: 500;
    letter-spacing: .08em;
    text-transform: uppercase;
    transition: all .25s;
  }

  .btn-outline:hover {
    background: var(--primary);
    color: white;
  }

  /* ================= NAV ================= */

  .nav-link {
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-size: .82rem;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--text);
    transition: all .2s;
  }

  .nav-link:hover {
    color: var(--primary);
  }

  /* ================= SIZE ================= */

  .size-btn {
    border: 1.5px solid var(--border);
    background: white;
    cursor: pointer;
    padding: 6px 14px;
    font-size: .8rem;
    font-family: 'Jost', sans-serif;
    transition: all .2s;
  }

  .size-btn:hover,
  .size-btn.active {
    border-color: var(--primary);
    background: var(--primary);
    color: white;
  }

  /* ================= CATEGORY ================= */

  .cat-btn {
    border: none;
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(6px);
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-size: .82rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    padding: 10px 18px;
    border-radius: 20px;
    transition: all .25s ease;

    color: var(--text);
    opacity: 0.8;
  }

  .cat-btn:hover {
    opacity: 1;
    background: rgba(124, 58, 237, 0.12);
  }

  .cat-btn.active {
    background: linear-gradient(135deg, #7C3AED, #06B6D4);
    color: white;
    opacity: 1;
    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.3);
  }

  /* ================= SCROLL ================= */

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  /* ================= OVERLAY ================= */

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.4);
    z-index: 100;
    backdrop-filter: blur(4px);
  }

  /* ================= ANIMATIONS ================= */

  .slide-in { animation: slideIn .35s ease; }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .fade-in { animation: fadeIn .3s ease; }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(.97); }
    to { opacity: 1; transform: scale(1); }
  }

  /* ================= TOAST ================= */

  .toast {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--gradient);
    color: white;
    padding: 12px 28px;
    border-radius: 50px;
    font-family: 'Jost', sans-serif;
    font-size: .85rem;
    z-index: 999;
    animation: toastIn .3s ease;
    white-space: nowrap;
  }

  @keyframes toastIn {
    from { opacity: 0; bottom: 1rem; }
    to { opacity: 1; bottom: 2rem; }
  }

  /* ================= HERO ================= */

  .hero-bg {
    background: linear-gradient(135deg, #7C3AED, #06B6D4);
  }

  /* ================= IMAGE ================= */

  .product-img {
    transition: transform .5s ease;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ================= WISHLIST ================= */

  .wishlist-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
    transition: transform .2s;
    z-index: 2;
  }

  .wishlist-btn:hover {
    transform: scale(1.15);
  }

  /* ================= 🔥 MOBILE RESPONSIVE ================= */

  @media (max-width: 768px) {

    body {
      font-size: 15px;
    }

    h1 {
      font-size: 1.8rem !important;
    }

    h2 {
      font-size: 1.2rem !important;
    }

    /* Product grid (use this class in ShopPage) */
    .product-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 12px !important;
    }

    /* Buttons full width */
    .btn-primary {
      width: 100%;
      padding: 12px !important;
    }

    /* Category scroll */
    .cat-container {
      display: flex;
      overflow-x: auto;
      gap: 8px;
      padding-bottom: 6px;
    }

    .cat-btn {
      flex: 0 0 auto;
      font-size: .75rem;
      padding: 8px 14px;
    }

    /* Fix text spacing */
    .nav-link {
      font-size: .75rem;
    }
  }
`;

export default globalStyles;