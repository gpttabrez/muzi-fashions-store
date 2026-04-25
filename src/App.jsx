// src/App.jsx

import { useState, useEffect } from "react";

import { PRODUCTS } from "./data/products";
import globalStyles from "./styles/globalStyles";

import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import QuickViewModal from "./components/QuickViewModal";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [page, setPage] = useState("shop");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1);

  const isMobile = window.innerWidth < 768;

  /* 🔥 ENSURE DEFAULT CATEGORY */
  useEffect(() => {
    setCategory("All");
  }, []);

  const showToast = (msg, emoji = "✅") => {
    setToast({ msg, emoji });
    setTimeout(() => setToast(null), 2500);
  };

  /* 🔥 FINAL FILTER FIX */
  const filtered = PRODUCTS.filter((p) => {
    const matchCategory =
      category === "All" ||
      p.category.toLowerCase().trim() ===
        category.toLowerCase().trim();

    const matchSearch =
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase().trim());

    return matchCategory && matchSearch;
  });

  const addToCart = (product, size) => {
    const existing = cart.find(
      (i) => i.id === product.id && i.size === size
    );

    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === product.id && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      );
    } else {
      setCart([
        ...cart,
        { ...product, size: size || product.sizes[0], qty: 1 },
      ]);
    }

    showToast(`${product.name} added to cart!`, "🛒");
    setQuickView(null);
  };

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((w) => w !== id));
      showToast("Removed from wishlist", "💔");
    } else {
      setWishlist([...wishlist, id]);
      showToast("Added to wishlist!", "❤️");
    }
  };

  const removeFromCart = (id, size) =>
    setCart(cart.filter((i) => !(i.id === id && i.size === size)));

  const updateQty = (id, size, qty) => {
    if (qty < 1) return removeFromCart(id, size);

    setCart(
      cart.map((i) =>
        i.id === id && i.size === size ? { ...i, qty } : i
      )
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #000, #1a1a2e, #2a0a3d)",
        fontFamily: "'Jost', sans-serif",
        color: "var(--text)"
      }}
    >
      <style>{globalStyles}</style>

      {/* Toast */}
      {toast && (
        <div className="toast">
          {toast.emoji} {toast.msg}
        </div>
      )}

      {/* Navbar */}
      <Navbar
        page={page}
        setPage={setPage}
        wishlist={wishlist}
        cartCount={cartCount}
        setCartOpen={setCartOpen}
      />

      {/* MAIN CONTENT */}
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "0 12px" : "0 24px"
        }}
      >
        {page === "home" && (
          <HomePage setPage={setPage} setCategory={setCategory} />
        )}

        {page === "shop" && (
          <ShopPage
            filtered={filtered}
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            setQuickView={setQuickView}
            addToCart={addToCart}
          />
        )}

        {page === "wishlist" && (
          <WishlistPage
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            setQuickView={setQuickView}
            addToCart={addToCart}
            setPage={setPage}
          />
        )}

        {page === "checkout" && (
          <CheckoutPage
            checkoutStep={checkoutStep}
            setCheckoutStep={setCheckoutStep}
            setPage={setPage}
            setCart={setCart}
            cart={cart}
          />
        )}
      </div>

      {/* Cart */}
      {cartOpen && (
        <CartSidebar
          cart={cart}
          cartCount={cartCount}
          total={total}
          setCartOpen={setCartOpen}
          setPage={setPage}
          updateQty={updateQty}
          removeFromCart={removeFromCart}
        />
      )}

      {/* Quick View */}
      {quickView && (
        <QuickViewModal
          quickView={quickView}
          setQuickView={setQuickView}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}