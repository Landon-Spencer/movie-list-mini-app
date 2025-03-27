const express = require('express');
const app = express();
const port = 8080;
const knex = require('knex')(require('../server/knexfile.js')['development']);
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('app is running')
})

app.get('/movies', (req, res) => {
  knex.select('*')
    .from('movies')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json('Unable to retrieve movies'))
  // console.log('get request heard')
})

app.post('/movies', (req, res) => {
  const { title, user_added } = req.body;

  const newMovie = {
    title: title,
    user_added: user_added
  };

  knex('movies')
   .insert(newMovie)
   .then(res.status(201).json(`${newMovie.title} was added to the database!`))
   .catch(err => {
    console.log(err);
    res.status(404).json(`Could not add ${newMovie.title} to the database :(`)
   })
})

app.delete(`/movies/:id`, (req, res) => {
  const movieId = req.params.id;

  knex('movies')
    .where({id: movieId})
    .delete()
    .returning('*')
    .then(records => {
      if (records.length === 0) {
        res.status(404).json('Movie not found.')
    }
    res.status(200).json('Movie deleted successfully.')
    })
  .catch(err => {
      console.log(err);
      res.status(404).json('Could not delete Movie.')
  })
})

app.listen(port, () => {
  console.log('server listening on port:', port);
})