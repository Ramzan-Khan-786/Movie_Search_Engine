import React from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="favorites">
        <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">
          Favorites
        </h2>
        <div className="movies-grid grid gap-6 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites text-center mt-10">
      <h1 className="text-xl text-gray-500">No Favorites added yet</h1>
    </div>
  );
}

export default Favorites;
