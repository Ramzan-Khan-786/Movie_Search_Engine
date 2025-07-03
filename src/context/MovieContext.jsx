import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");

    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorite = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };
  const removeFromFavorite = (movieId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== movieId));
  };

  const isFavorite = (movieId) => favorites.some((fav) => fav.id === movieId);

  const value = { favorites, addToFavorite, removeFromFavorite, isFavorite };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
