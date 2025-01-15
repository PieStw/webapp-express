const connection = require("./../data/db");

function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    const movies = results.map((movie) => ({
      ...movie,
      image: `${process.env.HOST_DOMAIN}:${process.env.HOST_PORT}/img/${movie.image}`,
    }));

    res.json(movies);
  });
}

function show(req, res) {
  const { id } = req.params;

  const sql1 = "SELECT * FROM movies WHERE id = ?";

  connection.query(sql1, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Movie not found" });

    const movie = {
      ...results[0],
      image: `${process.env.HOST_DOMAIN}:${process.env.HOST_PORT}/img/${results[0].image}`,
    };

    res.json(movie);
  });
}

module.exports = { index, show };
