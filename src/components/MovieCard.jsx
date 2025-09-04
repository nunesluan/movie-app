import React, { useState } from "react";

export default function MovieCard({
  movie,
  onToggleFavorite,
  isFavorite,
  onDetails,
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="border p-2 rounded flex flex-col items-center justify-between">
      {!imgLoaded && (
        <div className="w-[200px] h-[300px] bg-gray-700 animate-pulse rounded mb-2"></div>
      )}
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : "https://via.placeholder.com/200"
        }
        alt={movie.title}
        className={`mb-2 rounded shadow-lg transition-opacity duration-500 ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImgLoaded(true)}
      />
      <h3 className="font-bold text-center">{movie.title}</h3>
      <p>{movie.release_date?.slice(0, 4)}</p>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-[#2C82B5] py-2 px-4 text-white rounded font-bold"
          onClick={() => onDetails(movie.id)}
        >
          Detalhes
        </button>
        <button
          className={`px-4 py-2 rounded ${
            isFavorite ? "bg-red-500 text-white" : "bg-white text-[#015C91]"
          } font-bold`}
          onClick={() => onToggleFavorite(movie)}
        >
          {isFavorite ? "Remover" : "Favoritar"}
        </button>
      </div>
    </div>
  );
}
