// /api/movie.js
export default async function handler(req, res) {
  try {
    const id = req.query.id || "";
    if (!id) return res.status(400).json({ error: "Missing movie ID" });

    const key = process.env.OMDB_API_KEY; // Must be set in Vercel
    if (!key)
      return res.status(500).json({ error: "OMDB API key not configured" });

    const url = `https://www.omdbapi.com/?apikey=${key}&i=${encodeURIComponent(
      id
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
