const connection = require("./../data/db");

function index(req, res) {
  const tag = req.query.tag;

  if (tag) {
    const newPosts = posts.filter((post) => {
      return post.tags.includes(tag.toLowerCase());
    });

    res.json({ posts: newPosts, numeroElementi: newPosts.length });
  } else res.json({ posts: posts, numeroElementi: posts.length });
}

function show(req, res) {
  const { id } = req.params;

  if (isNaN(id)) {
    const err = Error("Inserisci un numero");
    err.code = 400;
    throw err;
  }

  const postSelected = posts.find((post) => post.id === parseInt(id));

  if (postSelected) res.json(postSelected);
  else {
    const err = Error("Post non trovato");
    err.code = 404;
    throw err;
  }
}

module.exports = { index, show };
