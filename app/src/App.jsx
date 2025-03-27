import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

import DeleteMovie from '../src/components/DeleteMovie.jsx';
import AddMovie from '../src/components/AddMovie.jsx';
import EditMovie from '../src/components/EditMovie.jsx'

import './App.css'
const URL = 'http://localhost:8080';

// import Searchbar from '../src/components/Searchbar.jsx';

function App() {
  const [movies, setMovies] = useState([]);
  // const [searchResults, setSearchResults] = useState(movies);
  const [value, setValue] = useState(null);
  const [addedMovie, setAddedMovie] = useState(false);

  // const handleSearch = (searchTitle) => {
  //   if (searchTitle) {
  //     const filteredResults = movies.filter(title =>
  //       title.toLowerCase().includes(searchTitle.toLowerCase())
  //     );
  //     setSearchResults(filteredResults);
  //   } else {
  //     setSearchResults(movies);
  //   }
  // };

  useEffect(() => {
    fetch(`${URL}/movies`)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.log(err));
  }, [addedMovie]);

  const handleDelete = (id) => {

  }

  // const onChange = (event, newValue) => {
  //   setValue(newValue); // Update state with the selected value
  // }

  const filterTitles = (array, value) => {
    const result = array.filter((movie) => movie.title?.includes(value));
    return result;
  }

  const movieList = () => {
    if (value == null) {
      return movies;
    } else {
      return filterTitles(movies, value);
    }
  }

  return (
    <>
      <h1>Movie List</h1>
      {/* <Searchbar data={movies} onSearch={handleSearch} />
      <ul>
        {searchResults.map((title) => (
          <li key={title}>{title}</li>
        ))}
      </ul> */}
      <div>
        <Autocomplete
          disablePortal
          options={movies.map((options) => options.title)}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search Movies" />}
        />
        <AddMovie addedMovie={addedMovie} setAddedMovie={setAddedMovie}/>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movieList().map((movie) => (
              <TableRow
                key={movie.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">{movie.id}</TableCell>
                <TableCell align="center">{movie.title}</TableCell>
                <TableCell align="center">
                  {movie.user_added ?
                    <>
                      <DeleteMovie movie={movie} addedMovie={addedMovie} setAddedMovie={setAddedMovie}/>
                      <EditMovie movie={movie} addedMovie={addedMovie} setAddedMovie={setAddedMovie}/>
                    </>
                    : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default App
