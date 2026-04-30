// src/data/products.js

export const PRODUCTS = [
  {
    id: 1,
    name: "Slim Fit Denim Jeans",
    category: "Jeans",
    price: 1999,
    originalPrice: 2799,
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    color: "Blue",
    sizes: ["30","32","34","36","38"],
    description: "Classic slim fit denim jeans designed for everyday comfort and modern style.",

    // 🔥 ADDED
    stock: 4,
    bestSeller: true,
    trending: false
  },
  {
    id: 2,
    name: "Casual Cotton Shirt",
    category: "Shirts",
    price: 1499,
    originalPrice: 2199,
    tag: "New",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157",
    color: "White",
    sizes: ["S","M","L","XL"],
    description: "Premium cotton shirt perfect for casual outings and daily wear.",

    // 🔥 ADDED
    stock: 12,
    bestSeller: false,
    trending: true
  },
  {
    id: 3,
    name: "Six Pocket Cargo Pants",
    category: "Six Pockets",
    price: 1899,
    originalPrice: 2499,
    tag: "Trending",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
    color: "Olive",
    sizes: ["30","32","34","36"],
    description: "Utility cargo pants with six pockets for style and functionality.",

    // 🔥 ADDED
    stock: 7,
    bestSeller: false,
    trending: true
  },
  {
    id: 4,
    name: "Men's Casual Jacket",
    category: "Jackets",
    price: 2999,
    originalPrice: 3999,
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800&q=80",
    color: "Black",
    sizes: ["M","L","XL"],
    description: "Stylish casual jacket for all seasons with a modern fit.",

    // 🔥 ADDED
    stock: 3,
    bestSeller: false,
    trending: false
  },
  {
    id: 5,
    name: "Graphic Casual T-Shirt",
    category: "Casuals",
    price: 899,
    originalPrice: 1299,
    tag: "New",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80&auto=format&fit=crop",
    color: "Grey",
    sizes: ["S","M","L","XL"],
    description: "Comfortable cotton t-shirt with trendy graphic print.",

    // 🔥 ADDED
    stock: 15,
    bestSeller: false,
    trending: true
  },
  {
    id: 6,
    name: "Men’s Sneakers",
    category: "Shoes",
    price: 2499,
    originalPrice: 3499,
    tag: "Sale",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    color: "White",
    sizes: ["7","8","9","10"],
    description: "Lightweight sneakers designed for everyday comfort and street style.",

    // 🔥 ADDED
    stock: 6,
    bestSeller: false,
    trending: false
  },
  {
    id: 7,
    name: "Leather Belt",
    category: "Accessories",
    price: 799,
    originalPrice: 1199,
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80&auto=format&fit=crop",
    color: "Brown",
    sizes: ["Free Size"],
    description: "Premium leather belt to complete your outfit.",

    // 🔥 ADDED
    stock: 2,
    bestSeller: true,
    trending: false
  },
  {
    id: 8,
    name: "Denim Jacket",
    category: "Jackets",
    price: 3299,
    originalPrice: 4499,
    tag: "Premium",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80&auto=format&fit=crop",
    color: "Blue",
    sizes: ["M","L","XL"],
    description: "Classic denim jacket for a rugged and stylish look.",

    // 🔥 ADDED
    stock: 5,
    bestSeller: false,
    trending: true
  }
];