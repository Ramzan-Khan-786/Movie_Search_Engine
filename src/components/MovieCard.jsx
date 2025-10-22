import React from "react";
import { useMovieContext } from "../context/MovieContext";

const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/500x750.png?text=No+Image+Available";

export default function MovieCard({ movie }) {
  const { addToFavorite, removeFromFavorite, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFromFavorite(movie.id);
    } else {
      addToFavorite(movie);
    }
  }

  // OMDb returns "N/A" for missing posters.
  // The 'movie.poster_path' now contains the FULL URL from OMDb.
  const imageUrl =
    movie.poster_path && movie.poster_path !== "N/A"
      ? movie.poster_path
      : PLACEHOLDER_IMAGE;

  return (
    <div className="bg-blue-50 dark:bg-gray-800 rounded-xl border-blue-300 shadow-md hover:scale-105 transition-all duration-300 overflow-hidden w-full mx-auto">
      <div className="relative">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-64 md:h-72 lg:h-80 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={onFavoriteClick}
            className={`p-2 rounded-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm transition-colors duration-300 ${
              favorite ? "text-red-500" : "text-gray-900 dark:text-white"
            }`}
          >
            {/* Using a filled heart for favorite */}
            {favorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.004-.004.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold truncate" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {
            /* 'release_date' is now just the year from OMDb */
            movie.release_date
          }
        </p>
      </div>
    </div>
  );
}
