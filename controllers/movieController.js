const connection = require("./../data/db");

function index(req, res) {
  const sql = "SELECT * FROM movies";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

function show(req, res) {
  const { id } = req.params;

  const sql1 = "SELECT * FROM movies WHERE id = ?";
  const sql2 =
    "SELECT reviews.* FROM movies JOIN reviews ON reviews.movie_id = movies.id WHERE movies.id = ?";

  connection.query(sql1, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Movie not found" });

    const movie = results[0];
    connection.query(sql2, [id], (err, results) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      if (results.length === 0)
        return res.status(404).json({ error: "Reviews not found" });
      movie.reviews = results;
      res.json(movie);
    });
  });
}

module.exports = { index, show };
