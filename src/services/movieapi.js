const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

// OMDb returns data like { Title, Year, imdbID, Poster }
// We normalize it to what our app expects: { title, release_date, id, poster_path }
const normalizeMovieData = (movie) => {
  return {
    id: movie.imdbID,
    title: movie.Title,
    release_date: movie.Year, // OMDb only provides the year
    poster_path: movie.Poster, // OMDb provides a full URL
  };
};

// This function fetches a SINGLE movie by its specific IMDb ID
const fetchMovieById = async (imdbID) => {
  try {
    const response = await fetch(`${BASE_URL}&i=${imdbID}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.Response === "True") {
      return normalizeMovieData(data); // Returns one normalized movie
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    console.error(`Failed to fetch movie with ID ${imdbID}:`, error);
    return null; // Return null on error so Promise.all doesn't fail
  }
};

export const getPopularMovies = async () => {
  // --- UPDATED LIST ---
  // A hand-picked list of over 100 popular movies.
  const popularIds = [
    // === Recent Popular Movies (2022-2024) ===
    "tt15398776", // Oppenheimer (2023)
    "tt1517268", // Barbie (2023)
    "tt15239678", // Dune: Part Two (2024)
    "tt1630029", // Avatar: The Way of Water (2022)
    "tt1745960", // Top Gun: Maverick (2022)
    "tt9362722", // Spider-Man: Across the Spider-Verse (2023)
    "tt1160419", // Dune: Part One (2021)
    "tt22022452", // Inside Out 2 (2024)

    // === Marvel Cinematic Universe (Avengers) ===
    "tt0371746", // Iron Man (2008)
    "tt0848228", // The Avengers (2012)
    "tt3498820", // Captain America: Civil War
    "tt3501632", // Thor: Ragnarok
    "tt1825683", // Black Panther
    "tt4154756", // Avengers: Infinity War
    "tt4154796", // Avengers: Endgame
    "tt10872600", // Spider-Man: No Way Home

    // === DC Universe ===
    "tt0078346", // Superman (1978)
    "tt0468569", // The Dark Knight
    "tt1345836", // The Dark Knight Rises
    "tt0770828", // Man of Steel
    "tt0451279", // Wonder Woman
    "tt7286456", // Joker
    "tt1877830", // The Batman

    // === Pirates of the Caribbean ===
    "tt0325980", // The Curse of the Black Pearl
    "tt0383574", // Dead Man's Chest
    "tt0449088", // At World's End

    // === Harry Potter ===
    "tt0241527", // Harry Potter and the Sorcerer's Stone
    "tt0295297", // Chamber of Secrets
    "tt0304141", // Prisoner of Azkaban
    "tt0417741", // Order of the Phoenix
    "tt1201607", // Deathly Hallows: Part 2

    // === Lord of the Rings / Middle-earth ===
    "tt0120737", // The Fellowship of the Ring
    "tt0167261", // The Two Towers
    "tt0167260", // The Return of the King
    "tt0903624", // The Hobbit: An Unexpected Journey

    // === Star Wars ===
    "tt0076759", // A New Hope
    "tt0080684", // The Empire Strikes Back
    "tt0086190", // Return of the Jedi
    "tt2488496", // The Force Awakens

    // === Sci-Fi Classics & Franchises ===
    "tt0133093", // The Matrix
    "tt0107290", // Jurassic Park
    "tt1375666", // Inception
    "tt0816692", // Interstellar
    "tt0088763", // Back to the Future
    "tt0083658", // Blade Runner
    "tt0062622", // 2001: A Space Odyssey
    "tt0078748", // Alien
    "tt0090605", // Aliens
    "tt0103064", // Terminator 2: Judgment Day
    "tt0088247", // The Terminator
    "tt0499549", // Avatar (2009)
    "tt0119174", // Gattaca
    "tt0434409", // V for Vendetta
    "tt4154936", // Spider-Man: Into the Spider-Verse (2018)

    // === Action & Adventure Franchises ===
    "tt0082971", // Raiders of the Lost Ark
    "tt0097576", // Indiana Jones and the Last Crusade
    "tt0381061", // Casino Royale (James Bond)
    "tt0095016", // Die Hard
    "tt0110148", // Léon: The Professional
    "tt2911666", // John Wick
    "tt0413300", // Spider-Man 2 (2004)

    // === Iconic Dramas ===
    "tt0111161", // The Shawshank Redemption
    "tt0068646", // The Godfather
    "tt0071562", // The Godfather: Part II
    "tt0110912", // Pulp Fiction
    "tt0109830", // Forrest Gump
    "tt0137523", // Fight Club
    "tt0108052", // Schindler's List
    "tt0050083", // 12 Angry Men
    "tt0120815", // Saving Private Ryan
    "tt0169547", // American Beauty
    "tt0253474", // The Pianist
    "tt0120689", // The Green Mile
    "tt0172495", // Gladiator
    "tt0112573", // Braveheart
    "tt0073486", // One Flew Over the Cuckoo's Nest
    "tt0075314", // Taxi Driver
    "tt1675434", // The Intouchables
    "tt2582802", // Whiplash
    "tt1285016", // The Social Network

    // === Crime, Thriller & Horror ===
    "tt0102926", // The Silence of the Lambs
    "tt0114369", // Se7en
    "tt0114814", // The Usual Suspects
    "tt0099685", // Goodfellas
    "tt0086250", // Scarface
    "tt0105236", // Reservoir Dogs
    "tt0209144", // Memento
    "tt0407887", // The Departed
    "tt0482571", // The Prestige
    "tt0081505", // The Shining
    "tt0338013", // Eternal Sunshine of the Spotless Mind
    "tt0060196", // The Good, the Bad and the Ugly

    // === Animation (Pixar, Disney, Ghibli) ===
    "tt0245429", // Spirited Away
    "tt0114709", // Toy Story
    "tt0110357", // The Lion King (1994)
    "tt0910970", // WALL·E
    "tt1049413", // Up
    "tt2380307", // Coco
    "tt0119698", // Princess Mononoke
    "tt0095327", // Grave of the Fireflies
    "tt5311514", // Your Name.

    // === Comedy ===
    "tt0118715", // The Big Lebowski
    "tt0071853", // Monty Python and the Holy Grail
    "tt0107048", // Groundhog Day
    "tt0365748", // Shaun of the Dead
    "tt0425112", // Hot Fuzz
    "tt0446029", // Superbad
    "tt0057012", // Dr. Strangelove
    "tt0211915", // Amélie
    "tt1587310", // maleficent
  ];

  // Fetch all movies in parallel
  const moviePromises = popularIds.map(fetchMovieById);
  const movies = await Promise.all(moviePromises);

  // Filter out any nulls (from movies that failed to fetch)
  return movies.filter((movie) => movie !== null);
};

// This function searches for movies based on a query
export const searchMovies = async (query) => {
  try {
    let params = `s=${encodeURIComponent(query)}`;

    const response = await fetch(`${BASE_URL}&${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.Response === "True") {
      // The search results are in the 'Search' property
      return data.Search.map(normalizeMovieData);
    } else {
      console.error(data.Error);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch from API:", error);
    return [];
  }
};
