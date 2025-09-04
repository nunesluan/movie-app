import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

export default function Search({ favorites, setFavorites }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSearch(p = 1) {
    try {
      setLoading(true);
      const data = await searchMovies(query, p);
      setMovies(data.results);
      setPage(p);
      setTotalPages(data.total_pages);
    } catch {
      alert("Erro ao buscar filmes");
    } finally {
      setLoading(false);
    }
  }

  function toggleFavorite(movie) {
    const exists = favorites.find((f) => f.id === movie.id);
    if (exists) {
      setFavorites(favorites.filter((f) => f.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  }

  function renderPageNumbers() {
    const maxButtons = 5;
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxButtons - 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleSearch(i)}
          className={`py-2 px-4 rounded-xl ${
            i === page ? "bg-[#1B4965] text-white" : "bg-[#2C82B5] text-white"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  }

  return (
    <div>
      <h1 className="text-center p-4 text-[32px] text-white">
        Busca de Filmes
      </h1>
      <div className="flex justify-center flex-wrap items-center">
        <input
          className="p-2 mx-6 rounded-xl mb-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite o filme"
        />
        <button
          className="py-2 px-4 rounded-xl mb-2 bg-[#2C82B5] text-white"
          onClick={() => handleSearch(1)}
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <p className="text-white text-xl">Carregando...</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
            {movies.map((m) => (
              <MovieCard
                key={m.id}
                movie={m}
                isFavorite={favorites.some((f) => f.id === m.id)}
                onToggleFavorite={toggleFavorite}
                onDetails={(id) => navigate(`/detalhes/${id}`)}
              />
            ))}
          </div>

          {movies.length > 0 && (
            <div className="flex justify-center gap-2 mt-6 flex-wrap">
              <button
                className="py-2 px-4 rounded-xl bg-[#2C82B5] text-white disabled:opacity-50"
                disabled={page === 1}
                onClick={() => handleSearch(page - 1)}
              >
                Anterior
              </button>

              {renderPageNumbers()}

              <button
                className="py-2 px-4 rounded-xl bg-[#2C82B5] text-white disabled:opacity-50"
                disabled={page === totalPages}
                onClick={() => handleSearch(page + 1)}
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
