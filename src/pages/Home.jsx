import React from "react";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/movieapi";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  // const [year, setYear] = useState(""); // <-- REMOVED
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load default search results on component mount
  useEffect(() => {
    const loadDefaultMovies = async () => {
      try {
        const defaultMovies = await getPopularMovies();
        setMovies(defaultMovies);
      } catch (error) {
        setError("Failed to load default movies");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadDefaultMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    setError(null);
    try {
      // Pass only the query to the search function
      const searchResults = await searchMovies(searchQuery); // <-- REVERTED
      if (searchResults.length === 0) {
        setError("No movies found for that search term.");
      }
      setMovies(searchResults);
    } catch (err) {
      setError("Failed to search movies");
      console.log(`error while searching : ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form
        onSubmit={handleSearch}
        className="search-form flex flex-col md:flex-row items-center justify-center gap-4 mb-8 px-4"
      >
        {/* Search Input */}
        <input
          className="search-input w-full md:w-96 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          type="text"
          placeholder="Search for Movies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* --- YEAR INPUT REMOVED --- */}

        <button
          className="search-button gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          type="submit"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="error-message text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading text-center text-lg font-medium">
          Loading...
        </div>
      ) : (
        <div className="movies-grid grid gap-6 px-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
