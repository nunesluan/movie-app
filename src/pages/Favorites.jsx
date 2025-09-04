import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

export default function Favorites({ favorites, setFavorites }) {
  const navigate = useNavigate();

  function toggleFavorite(movie) {
    setFavorites(favorites.filter((f) => f.id !== movie.id));
  }

  return (
    <div>
      <h1 className="px-6 pb-6 text-white text-[24px] font-bold">Favoritos</h1>
      {favorites.length === 0 && <p>Nenhum favorito ainda</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {favorites.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            isFavorite={true}
            onToggleFavorite={toggleFavorite}
            onDetails={(id) => navigate(`/detalhes/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}
