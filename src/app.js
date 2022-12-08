const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { readFile } = require('./fsUtils');

const moviesPath = path.resolve(__dirname, './movies.json');

const app = express();
app.use(express.json());

app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const movies = await readFile();
    const findMovie = movies.find((movie) => movie.id === Number(id));
    res.status(200).json(findMovie);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await readFile();
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.post('/movies', async (req, res) => {
  try {
    const { movie, price } = req.body;
    const movies = await readFile();

    const newMovie = {
      id: movies.length + 1,
      movie,
      price,
    };
    const allMovies = JSON.stringify([...movies, newMovie]);
    await fs.writeFile(moviesPath, allMovies);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { movie, price } = req.body;
    const movies = await readFile();
    const index = movies.findIndex((element) => element.id === Number(id));
    movies[index] = { id: Number(id), movie, price };
    const updatedMovies = JSON.stringify(movies, null, 2);
    await fs.writeFile(moviesPath, updatedMovies);
    res.status(200).json(movies[index]);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = app;