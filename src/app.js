const express = require('express');
const { readFile } = require('./fsUtils');

const app = express();

app.get('./movies/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const movies = await readFile();
    const findMovie = movies.find((movie) => movie.id === Number(id));
    res.status(200).json(findMovie);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = app;