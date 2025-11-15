import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../src/App.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import CartPage from "./components/CartPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductDetail from "./components/ProductDetail";
import WishlistPage from "./components/WishlistPage";
import SearchResults from "./components/SearchResults";
import CategoryView from "./pages/CategoryView";
import Profile from "../src/components/Auth/Profile";
import Signup from "./components/Auth/Signup";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import { useCart } from "./context/CartContext";

function App() {
  const { cartItems, removeFromCart } = useCart();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="signup" element={<Signup/>} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:type" element={<CategoryView />} />
        <Route path="/profile" element={<Profile />} />


        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        <Route
          path="/cart"
          element={<CartPage cart={cartItems} removeFromCart={removeFromCart} />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
