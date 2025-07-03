import React, { useState } from "react";
import { useMovieContext } from "../context/MovieContext";

export default function MovieCard({ movie }) {
  const { addToFavorite, removeFromFavorite, isFavorite } = useMovieContext();
  const favorite=isFavorite(movie.id);
  function onFavoriteClick(e) {
    e.preventDefault();
    if(favorite){
      removeFromFavorite(movie.id);
    }else{
      addToFavorite(movie);
    } 
  }

  return (
    <div className="w-1/5 bg-blue-50 dark:bg-gray-800 rounded-lg border-blue-300 shadow-xl hover:scale-105 m-6 overflow-hidden transition-all duration-300">
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={onFavoriteClick}
            className={`text-2xl transition-colors duration-300 ${
              favorite ? "text-red-500" : "text-gray-900 dark:text-white"
            }`}
          >
            ❤︎
          </button>
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {movie.release_date}
        </p>
      </div>
    </div>
  );
}
