// src/pages/WishlistPage.jsx

import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

export default function WishlistPage({ wishlist, toggleWishlist, setQuickView, addToCart, setPage }) {
  return (
    <div style={{ padding: "2rem 8%" }}>
      <h1 className="serif" style={{ fontSize: "2.2rem", fontWeight: 400, marginBottom: "2rem" }}>My Wishlist ❤️</h1>
      {wishlist.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "#8a7060", fontFamily: "'Jost', sans-serif" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💔</div>
          Your wishlist is empty. <span style={{ color: "#c9a96e", cursor: "pointer" }} onClick={() => setPage("shop")}>Start shopping!</span>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {PRODUCTS.filter(p => wishlist.includes(p.id)).map(product => (
            <ProductCard key={product.id} product={product} wishlist={wishlist} toggleWishlist={toggleWishlist} setQuickView={setQuickView} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}
