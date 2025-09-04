import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/tmdb";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      const data = await getMovieDetails(id);
      setMovie(data);
    }
    fetchDetails();
  }, [id]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Carregando...
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col items-center px-4">
      <button
        className="py-2 px-4 rounded-xl mb-6 bg-[#2C82B5] text-white self-start"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>

      <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-8 max-w-4xl mx-auto">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "https://via.placeholder.com/300"
          }
          alt={movie.title}
          className="rounded-lg shadow-lg"
        />

        <div className="flex flex-col items-center lg:items-start">
          <h1 className="py-4 text-white text-[32px] font-bold">
            {movie.title}
          </h1>
          <p>
            <b>Diretor:</b>{" "}
            {movie.credits.crew.find((c) => c.job === "Director")?.name}
          </p>
          <p className="py-4 max-w-xl">
            <b>Sinopse:</b> {movie.overview}
          </p>
          <p>
            <b>Avaliação:</b> {movie.vote_average}
          </p>
        </div>
      </div>
    </div>
  );
}
