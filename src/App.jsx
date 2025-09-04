import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Favorites from "./pages/Favorites";

export default function App() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div>
      <nav className="flex justify-between p-6 gap-4 mb-4 bg-[#2C82B5] text-white text-[24px]">
        <Link to="/">Buscar</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>

      <div className="p-4">
        <Routes>
          <Route
            path="/"
            element={
              <Search favorites={favorites} setFavorites={setFavorites} />
            }
          />
          <Route path="/detalhes/:id" element={<Details />} />
          <Route
            path="/favoritos"
            element={
              <Favorites favorites={favorites} setFavorites={setFavorites} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
