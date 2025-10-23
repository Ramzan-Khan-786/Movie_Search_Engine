// /api/search.js
export default async function handler(req, res) {
  try {
    const query = req.query.q || "";
    if (!query) return res.status(400).json({ error: "Missing search query" });

    const key = process.env.OMDB_API_KEY; // Must be set in Vercel
    if (!key)
      return res.status(500).json({ error: "OMDB API key not configured" });

    const url = `https://www.omdbapi.com/?apikey=${key}&s=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      return res.status(404).json({ error: data.Error, results: [] });
    }

    return res.status(200).json(data.Search || []);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
