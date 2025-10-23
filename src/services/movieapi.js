// /src/services/movieapi.js
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

// Normalize OMDb data to app format
const normalizeMovieData = (movie) => ({
  id: movie.imdbID,
  title: movie.Title,
  release_date: movie.Year,
  poster_path: movie.Poster,
});

// Fetch single movie by IMDb ID
export const fetchMovieById = async (imdbID) => {
  try {
    const res = await fetch(`${BASE_URL}&i=${imdbID}`);
    const data = await res.json();
    if (data.Response === "True") return normalizeMovieData(data);
    throw new Error(data.Error);
  } catch (err) {
    console.error(`Failed to fetch movie ${imdbID}:`, err);
    return null;
  }
};

// Fetch popular movies (hardcoded IMDb IDs)
export const getPopularMovies = async () => {
  const popularIds = [
    
    "tt15398776",
    "tt1517268",
    "tt15239678",
    "tt1630029",
    "tt1745960",
    "tt9362722",
    "tt1160419",
    "tt22022452",
    "tt0371746",
    "tt0848228",
    "tt3498820",
    "tt3501632",
    "tt1825683",
    "tt4154756",
    "tt4154796",
    "tt10872600",
    "tt0078346",
    "tt0468569",
    "tt1345836",
    "tt0770828",
    "tt0451279",
    "tt7286456",
    "tt1877830",
    "tt0325980",
    "tt0383574",
    "tt0449088",
    "tt0241527",
    "tt0295297",
    "tt0304141",
    "tt0417741",
    "tt1201607",
    "tt0120737",
    "tt0167261",
    "tt0167260",
    "tt0903624",
    "tt0076759",
    "tt0080684",
    "tt0086190",
    "tt2488496",
    "tt0133093",
    "tt0107290",
    "tt1375666",
    "tt0816692",
    "tt0088763",
    "tt0083658",
    "tt0062622",
    "tt0078748",
    "tt0090605",
    "tt0103064",
    "tt0088247",
    "tt0499549",
    "tt0119174",
    "tt0434409",
    "tt4154936",
    "tt0082971",
    "tt0097576",
    "tt0381061",
    "tt0095016",
    "tt0110148",
    "tt2911666",
    "tt0413300",
    "tt0111161",
    "tt0068646",
    "tt0071562",
    "tt0110912",
    "tt0109830",
    "tt0137523",
    "tt0108052",
    "tt0050083",
    "tt0120815",
    "tt0169547",
    "tt0253474",
    "tt0120689",
    "tt0172495",
    "tt0112573",
    "tt0073486",
    "tt0075314",
    "tt1675434",
    "tt2582802",
    "tt1285016",
    "tt0102926",
    "tt0114369",
    "tt0114814",
    "tt0099685",
    "tt0086250",
    "tt0105236",
    "tt0209144",
    "tt0407887",
    "tt0482571",
    "tt0081505",
    "tt0338013",
    "tt0060196",
    "tt0245429",
    "tt0114709",
    "tt0110357",
    "tt0910970",
    "tt1049413",
    "tt2380307",
    "tt0119698",
    "tt0095327",
    "tt5311514",
    "tt0118715",
    "tt0071853",
    "tt0107048",
    "tt0365748",
    "tt0425112",
    "tt0446029",
    "tt0057012",
    "tt0211915",
    "tt1587310",
  ];

  const movies = await Promise.all(popularIds.map(fetchMovieById));
  return movies.filter(Boolean); // Remove nulls
};

// Search movies by query
export const searchMovies = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}&s=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.Response === "True" ? data.Search.map(normalizeMovieData) : [];
  } catch (err) {
    console.error("Search failed:", err);
    return [];
  }
};
