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

module.exports = { store };
