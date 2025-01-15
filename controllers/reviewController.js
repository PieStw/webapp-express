const connection = require("./../data/db");

function store(req, res) {
  const { name, vote, text, movie_id } = req.body;

  const sql = `INSERT INTO movies.reviews (name, vote, text, movie_id) VALUES (?, ?, ?, ?);`;

  connection.query(sql, [name, vote, text, movie_id], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Database query failed", err: err.sqlMessage });

    res.json(results);
  });
}

function show(req, res) {
  const { id } = req.params;

  const sql =
    "SELECT reviews.* FROM movies JOIN reviews ON reviews.movie_id = movies.id WHERE movies.id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Reviews not found" });

    res.json(results);
  });
}

module.exports = { store, show };
