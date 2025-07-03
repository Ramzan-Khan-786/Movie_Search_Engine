import React from "react";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
function Favorites() {
  const { favorites } = useMovieContext();
  if (favorites) {
    return (
      <div className="favorites">
        <h2 className="text-2xl font-bold mb-4">Favorites</h2>
        <div className="movies-grid flex flex-wrap ">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h1>No Favorites added yet</h1>
    </div>
  );
}

export default Favorites;
